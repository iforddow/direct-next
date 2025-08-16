// DirectNext - Next.js integration for Directus CMS with Visual Editing

// Core components
export { VisualEditingProvider } from "./provider/visual-editing-provider";
export { BlockRenderer } from "./renderers/block-renderer";
export { PageRenderer } from "./renderers/page-renderer";

// Services - individual exports for clarity
export {
  getAllPages,
  getAllPageSlugs,
  getPageBySlug,
} from "./service/page-service";
export { directusImageLoader } from "./service/directus-image-loader";

// Hooks
export { useVisualEditing } from "./hooks/visual-editing-hook";

// Utilities
export * from "./directus-utils";
export {
  setBlockRegistry,
  getBlockRegistry,
  getBlockComponent,
} from "./utils/block-registry-utils";

// Types - export DirectNext schema types
export type {
  Pages,
  PagesPageBlocks,
  DirectusFile,
  DirectusUser,
} from "./types/directus-schemas";
export type { SEO } from "./types/seo";
