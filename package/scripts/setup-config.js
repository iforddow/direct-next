const fs = require("fs");
const path = require("path");

// Create DirectNext config folder in user's project root
const configDir = path.join(process.cwd(), "directnext");
const configFile = path.join(configDir, "directus.config.ts");
const envFile = path.join(configDir, ".env.example");
const typesDir = path.join(configDir, "types");
const registryFile = path.join(configDir, "block-registry.ts");
const typesFile = path.join(typesDir, "directus-types.ts");

// Create the main config directory
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
  console.log("Created directnext/ folder");
}

// Create types directory
if (!fs.existsSync(typesDir)) {
  fs.mkdirSync(typesDir, { recursive: true });
  console.log("Created directnext/types/ folder");
}

// Create Directus connection config file
if (!fs.existsSync(configFile)) {
  const configContent = `// DirectNext Directus Configuration
// Configure with your Directus instance details

const config = {
  // Your Directus instance URL
  host: process.env.DIRECTUS_HOST || 'https://your-directus-instance.com',
  
  // Authentication for type generation (not used in production)
  email: process.env.DIRECTUS_EMAIL || 'admin@example.com',
  password: process.env.DIRECTUS_PASSWORD || 'your-password',
  
  // Output paths
  typesOutput: './directnext/types/directus-types.ts',
  
  // Visual editing configuration
  visualEditing: {
    enabled: process.env.NODE_ENV === 'development',
  }
};

export default config;
`;

  fs.writeFileSync(configFile, configContent);
  console.log("Created directnext/directus.config.ts");
}

// Create example environment file
if (!fs.existsSync(envFile)) {
  const envContent = `# DirectNext Environment Variables
# Copy these to your .env.local file and configure with your values

DIRECTUS_HOST=https://your-directus-instance.com
DIRECTUS_EMAIL=admin@example.com
DIRECTUS_PASSWORD=your-password
`;

  fs.writeFileSync(envFile, envContent);
  console.log("Created directnext/.env.example");
}

// Create README for the directnext folder
const readmeFile = path.join(configDir, "README.md");
if (!fs.existsSync(readmeFile)) {
  const readmeContent = `# DirectNext Configuration

This folder contains your DirectNext configuration files and types.

## Files

- **directus.config.js** - Main configuration for your Directus connection
- **block-registry.ts** - Register your custom block components for visual editing
- **types/directus-types.ts** - Generated TypeScript types from your Directus schema
- **.env.example** - Example environment variables

## Getting Started

### 1. Configure Directus Connection
Update \`directus.config.ts\` with your Directus instance details:

\`\`\`typescript
const config = {
  host: 'https://your-directus-instance.com',
  email: 'admin@example.com',
  password: 'your-password',
  // ... other config
};

export default config;
\`\`\`

### 2. Environment Variables  
Copy variables from \`.env.example\` to your \`.env.local\` file and update with your actual values.

### 3. Generate Types
Run the type generation command to get TypeScript types from your Directus schema:

\`\`\`bash
npm run generate:types
\`\`\`

This will create/update \`types/directus-types.ts\` with types for all your collections.

### 4. Register Block Components
In your \`block-registry.ts\`, import and register your custom block components:

\`\`\`typescript
import { HeroSection } from '../components/blocks/HeroSection';
import { TextBlock } from '../components/blocks/TextBlock';
import { setBlockRegistry } from 'directnext';

export const blockRegistry = {
  "hero_block": HeroSection,
  "text_block": TextBlock,
};

// Auto-register with DirectNext
setBlockRegistry(blockRegistry);
\`\`\`

### 5. Use Types in Your Components
Import and use the generated types in your React components:

\`\`\`typescript
import type { Pages, HeroBlock } from './directnext/types/directus-types';
// or from the package directly:
// import type { Pages, HeroBlock } from 'directnext';

const PageComponent = ({ page }: { page: Pages }) => {
  return (
    <div>
      <h1>{page.title}</h1>
      {/* Your page content */}
    </div>
  );
};
\`\`\`

## Required Directus Schema

DirectNext expects your Directus instance to have the following collections structure:

### Core Collections

- **pages** - Main page collection
  - \`id\` (string/UUID)
  - \`title\` (string)
  - \`slug\` (string, unique)
  - \`seo\` (JSON for SEO data)
  - \`page_blocks\` (Many-to-Any relation)

- **pages_page_blocks** - Junction table for page blocks
  - \`id\` (integer)
  - \`pages_id\` (relation to pages)
  - \`collection\` (string - block type identifier)
  - \`item\` (relation to block collections)
  - \`sort\` (integer for ordering)

### Example Block Collections

You can create any block collections you need. Here are some examples:

- **hero_block**
  - \`title\` (string)
  - \`subtitle\` (string)
  - \`background_image\` (file relation)
  - \`call_to_action_text\` (string)
  - \`call_to_action_link\` (string)

- **text_block**
  - \`content\` (rich text)
  - \`alignment\` (dropdown: left, center, right)

### Adding New Block Types

1. Create the collection in Directus
2. Add it to the Many-to-Any relation in the pages collection
3. Run \`npm run generate:types\` to get updated TypeScript types
4. Create a React component for your block
5. Register it in \`block-registry.ts\`

## Development Workflow

1. **Design in Directus**: Create your block collections and configure fields
2. **Generate Types**: Run \`npm run generate:types\` to get TypeScript definitions
3. **Build Components**: Create React components using the generated types
4. **Register Blocks**: Add components to your block registry
5. **Use Everywhere**: Import and use types throughout your Next.js app

This workflow ensures you have full TypeScript intellisense and type safety!
`;

  fs.writeFileSync(readmeFile, readmeContent);
  console.log("Created directnext/README.md");
}

// Create block registry file
if (!fs.existsSync(registryFile)) {
  const registryContent = `// DirectNext Block Registry
// Add your custom blocks here for visual editing
// Import your block components and register them

// import { HeroSectionComponent } from '../components/HeroSection';
// import { TextBlockComponent } from '../components/TextBlock';

export const blockRegistry = {
  // Example:
  // "hero_section": HeroSectionComponent,
  // "text_block": TextBlockComponent,
};

export type BlockRegistry = typeof blockRegistry;

// Auto-register blocks with DirectNext (optional helper)
// import { setBlockRegistry } from 'directnext';
// setBlockRegistry(blockRegistry);
`;

  fs.writeFileSync(registryFile, registryContent);
  console.log("Created directnext/block-registry.ts");
}

// Create default types file
if (!fs.existsSync(typesFile)) {
  const defaultTypesContent = `// DirectNext Schema Types
// This file contains the expected schema types for DirectNext
// Your Directus instance should have 'pages' and related collections

import type { components } from 'directnext/dist/types/schema-components';

// Main DirectNext types (these match the expected schema)
export type Pages = components["schemas"]["ItemsPages"];
export type PagesPageBlocks = components["schemas"]["ItemsPagesPageBlocks"]; 

// Directus core types
export type DirectusFile = components["schemas"]["Files"];
export type DirectusUser = components["schemas"]["Users"];

// Example block types (add your own as needed)
// export type HeroBlock = components["schemas"]["ItemsHeroBlock"];
// export type TextBlock = components["schemas"]["ItemsTextBlock"];

// If you have additional collections, add them here:
// export type CustomCollection = {
//   id: string;
//   // ... your fields
// };
`;

  fs.writeFileSync(typesFile, defaultTypesContent);
  console.log("Created directnext/types/directus-types.ts");
}

console.log("DirectNext configuration setup complete!");

console.log("Next steps:");
console.log(
  "1. Configure directnext/directus.config.ts with your Directus instance details",
);
console.log(
  "2. Copy environment variables from directnext/.env.example to your .env.local",
);
console.log("3. Run 'npm run generate:types' to generate TypeScript types");
