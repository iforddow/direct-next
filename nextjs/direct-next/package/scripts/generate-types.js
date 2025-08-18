const { execSync } = require("child_process");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "..", "..", "..", ".env"),
  quiet: true,
});

const host = process.env.DIRECTUS_HOST;
const email = process.env.DIRECTUS_EMAIL;
const password = process.env.DIRECTUS_PASSWORD;

if (!host || !email || !password) {
  console.error(
    "Missing required environment variables: DIRECTUS_HOST, DIRECTUS_EMAIL, DIRECTUS_PASSWORD",
  );
  process.exit(1);
}

const command = `npx directus-typescript-gen --host "${host}" --email "${email}" --password "${password}" --outFile direct-next/types/open-api.ts --output direct-next/types/open-api.ts`;

try {
  execSync(command, { stdio: "inherit" });
  execSync("node direct-next/scripts/clean-directus-types.js", {
    stdio: "inherit",
  });
} catch (error) {
  console.error("Error generating types:", error.message);
  process.exit(1);
}
