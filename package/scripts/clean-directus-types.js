const fs = require("fs");
const path = require("path");

// Accept file path as argument, or use default
const inputPath =
  process.argv[2] ||
  path.join(process.cwd(), "directnext", "types", "directus-types.ts");
const outputPath = inputPath.replace(/\.ts$/, "-schemas.ts");

async function transform() {
  if (!fs.existsSync(inputPath)) {
    console.log("No types file found to clean, skipping...");
    return;
  }

  const content = fs.readFileSync(inputPath, "utf8");

  // Extract all Items<CollectionName> type definitions from the schemas section
  const regex = /^\s*(Items[A-Za-z_]+):\s*{/gm;
  let match;
  const aliases = [];
  const collections = new Set();

  // Add header comment
  aliases.push("// DirectNext Generated Types");
  aliases.push("// Auto-generated from your Directus schema");
  aliases.push("// Run 'npm run generate:types' to update these types");
  aliases.push("");

  while ((match = regex.exec(content)) !== null) {
    const schemaName = match[1]; // e.g., "ItemsPages"
    const tsName = schemaName.replace(/^Items/, ""); // e.g., "Pages"

    // Create a clean export using the original generated types
    const typeDefinition = extractTypeDefinition(content, schemaName);
    if (typeDefinition) {
      aliases.push(`// ${tsName} collection`);
      aliases.push(`export type ${tsName} = ${typeDefinition};`);
      aliases.push("");
      collections.add(tsName);
    }
  }

  // Add some common Directus core types if they exist in the generated file
  const coreTypes = ["Files", "Users", "Roles"];
  for (const coreType of coreTypes) {
    const typeDefinition = extractTypeDefinition(content, coreType);
    if (typeDefinition) {
      aliases.push(`// Directus ${coreType}`);
      aliases.push(
        `export type Directus${
          coreType === "Files"
            ? "File"
            : coreType === "Users"
            ? "User"
            : coreType
        } = ${typeDefinition};`,
      );
      aliases.push("");
    }
  }

  // Add a note about available types
  if (collections.size > 0) {
    aliases.push("// Available collection types:");
    aliases.push(`// ${Array.from(collections).join(", ")}`);
  }

  const finalOutput = aliases.join("\n");

  fs.writeFileSync(outputPath, finalOutput);
  console.log("✅ Clean types generated with", collections.size, "collections");
}

function extractTypeDefinition(content, typeName) {
  // Look for the type definition in the content
  const regex = new RegExp(`^\\s*${typeName}:\\s*({[\\s\\S]*?^\\s*});?`, "gm");
  const match = regex.exec(content);

  if (match) {
    return match[1].trim();
  }

  return null;
}

transform().catch(console.error);
