# DirectNext

A powerful Next.js integration package for Directus CMS with visual editing capabilities and automatic TypeScript type generation.

## Features

- 🚀 **One-Command Setup**: Auto-creates configuration files on install
- 📝 **TypeScript-First**: Full type safety with auto-generated types from your Directus schema
- ✨ **Visual Editing**: Built-in support for Directus visual editing
- 🧱 **Block-Based Content**: Flexible content blocks with React component registry
- ⚡ **Next.js Optimized**: SSG/SSR ready with optimized data fetching

## Installation

```bash
npm install directnext
```

DirectNext automatically creates a `directnext/` folder in your project with all configuration files.

## Quick Setup

1. **Configure your Directus connection** in `directnext/directus.config.ts`:

   ```typescript
   const config = {
     host: "https://your-directus-instance.com",
     email: "admin@example.com",
     password: "your-password",
     typesOutput: "./directnext/types/directus-types.ts",
   };

   export default config;
   ```

2. **Set environment variables** by copying from `directnext/.env.example` to your `.env.local`:

   ```env
   DIRECTUS_HOST=https://your-directus-instance.com
   DIRECTUS_EMAIL=admin@example.com
   DIRECTUS_PASSWORD=your-password
   ```

3. **Generate TypeScript types** from your Directus schema:
   ```bash
   npm run generate:types
   ```

This creates `directnext/types/directus-types.ts` with full TypeScript definitions for all your collections.

## Usage

### Basic Page Rendering

```typescript
import { getAllPageSlugs, getPageBySlug, PageRenderer } from "directnext";

// In your Next.js page component
export default function DynamicPage({ page }) {
  return <PageRenderer page={page} />;
}

// Generate static paths
export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Fetch page data
export async function generateMetadata({ params }) {
  const page = await getPageBySlug(params.slug);
  return {
    title: page?.seo?.title || page?.title,
    description: page?.seo?.meta_description,
  };
}
```

### Visual Editing Setup

```typescript
import { VisualEditingProvider } from "directnext";

// In your layout or app component
export default function Layout({ children }) {
  return <VisualEditingProvider>{children}</VisualEditingProvider>;
}
```

### Custom Blocks

Register your custom blocks in `directnext/block-registry.ts`:

```typescript
import { HeroSection } from "../components/HeroSection";
import { TextBlock } from "../components/TextBlock";

export const blockRegistry = {
  hero_section: HeroSection,
  text_block: TextBlock,
};
```

## Available Commands

- `npm run generate:types` - Generate TypeScript types from your Directus schema

## API Reference

### Services

- `getAllPages()` - Fetch all pages from Directus
- `getAllPageSlugs()` - Fetch only page slugs (efficient for static generation)
- `getPageBySlug(slug)` - Fetch a single page by slug
- `directusImageLoader` - Next.js image loader for Directus assets

### Components

- `PageRenderer` - Renders a complete page with blocks
- `BlockRenderer` - Renders individual content blocks
- `VisualEditingProvider` - Enables visual editing capabilities

### Hooks

- `useVisualEditing()` - Access visual editing context

### Types

- `Pages` - Generated page type from Directus
- `SEO` - SEO metadata type
- All other types generated from your Directus schema

## Configuration

The `directnext/directus.config.ts` file supports these options:

```typescript
const config = {
  // Required: Your Directus instance URL
  host: process.env.DIRECTUS_HOST,

  // Required for type generation: Admin credentials
  email: process.env.DIRECTUS_EMAIL,
  password: process.env.DIRECTUS_PASSWORD,

  // Optional: Custom output path for generated types
  typesOutput: "./directnext/types/directus-types.ts",

  // Optional: Visual editing configuration
  visualEditing: {
    enabled: process.env.NODE_ENV === "development",
  },
};

export default config;
```

## Auto-Generated Structure

After installation, your project will have:

```
your-project/
├── directnext/
│   ├── directus.config.ts       # Directus connection configuration
│   ├── .env.example            # Environment variables template
│   ├── block-registry.ts       # Register your React block components
│   ├── README.md               # Detailed setup instructions
│   └── types/
│       └── directus-types.ts   # Generated TypeScript types
└── ...
```

All files are created automatically - just configure and start building!

## Contributing

Issues and pull requests are welcome!

## License

MIT
