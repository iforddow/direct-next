const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// Try to load user's config
let config = {};
const configPathTs = path.join(
  process.cwd(),
  "directnext",
  "directus.config.ts",
);
const configPathJs = path.join(
  process.cwd(),
  "directnext",
  "directus.config.js",
);

if (fs.existsSync(configPathTs)) {
  // For TypeScript config, we'll need to use dynamic import or compile it
  // For now, let's check if there's a compiled version or fall back to env vars
  console.log(
    "Found directnext/directus.config.ts - using environment variables for now",
  );
  console.log(
    "Note: TypeScript config support coming soon - using .env.local for now",
  );

  // Fallback to environment variables
  require("dotenv").config({
    path: path.join(process.cwd(), ".env.local"),
  });

  config = {
    host: process.env.DIRECTUS_HOST,
    email: process.env.DIRECTUS_EMAIL,
    password: process.env.DIRECTUS_PASSWORD,
    typesOutput: "./directnext/types/directus-types.ts",
  };
} else if (fs.existsSync(configPathJs)) {
  config = require(configPathJs);
  console.log("Using config from directnext/directus.config.js");
} else {
  // Fallback to environment variables
  require("dotenv").config({
    path: path.join(process.cwd(), ".env.local"),
  });

  config = {
    host: process.env.DIRECTUS_HOST,
    email: process.env.DIRECTUS_EMAIL,
    password: process.env.DIRECTUS_PASSWORD,
    typesOutput: "./directnext/types/directus-types.ts",
  };
}

const { host, email, password, typesOutput } = config;

if (!host || !email || !password) {
  console.error(
    "❌ Missing required configuration. Please check your directnext/directus.config.js or environment variables: DIRECTUS_HOST, DIRECTUS_EMAIL, DIRECTUS_PASSWORD",
  );
  process.exit(1);
}

// Ensure types directory exists
const typesDir = path.dirname(typesOutput);
if (!fs.existsSync(typesDir)) {
  fs.mkdirSync(typesDir, { recursive: true });
}

const outputPath = typesOutput || "./directnext/types/directus-types.ts";
const tempOutputPath = outputPath.replace(".ts", "-temp.ts");

console.log("🔄 Generating types from Directus...");

try {
  // Generate types to a temporary file first
  const command = `npx directus-typescript-gen --host "${host}" --email "${email}" --password "${password}" --outFile "${tempOutputPath}"`;

  execSync(command, { stdio: "inherit" });

  // Clean and transform the generated types
  const cleanupScript = path.join(__dirname, "clean-directus-types.js");
  if (fs.existsSync(cleanupScript)) {
    execSync(`node "${cleanupScript}" "${tempOutputPath}"`, {
      stdio: "inherit",
    });

    // Move the cleaned types to the final location
    const cleanedPath = tempOutputPath.replace("-temp.ts", "-temp-schemas.ts");
    if (fs.existsSync(cleanedPath)) {
      fs.renameSync(cleanedPath, outputPath);
      console.log(`✅ Clean types moved to ${outputPath}`);
    }

    // Remove temporary file
    if (fs.existsSync(tempOutputPath)) {
      fs.unlinkSync(tempOutputPath);
    }
  } else {
    // If no cleanup script, just use the generated file directly
    fs.renameSync(tempOutputPath, outputPath);
  }

  console.log(`✅ Types generated successfully at ${outputPath}`);
  console.log(
    "💡 You can now import types like: import type { Pages } from './directnext/types/directus-types';",
  );
} catch (error) {
  console.error("❌ Error generating types:", error.message);

  // Clean up temporary file if it exists
  if (fs.existsSync(tempOutputPath)) {
    fs.unlinkSync(tempOutputPath);
  }

  process.exit(1);
}
