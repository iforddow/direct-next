import type { components } from "./schema-components";

// Main schema types for DirectNext
export type Pages = components["schemas"]["ItemsPages"];
export type PagesPageBlocks = components["schemas"]["ItemsPagesPageBlocks"];

// Directus core types
export type DirectusFile = components["schemas"]["Files"];
export type DirectusUser = components["schemas"]["Users"];
