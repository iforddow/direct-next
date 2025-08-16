// DirectNext Schema Components
// Extracted from OpenAPI for TypeScript intellisense
// Only includes the components we need for type definitions

export interface components {
  schemas: {
    // Core Directus types
    Files: {
      id: string;
      title?: string;
      filename_disk: string;
      filename_download: string;
      type?: string;
      filesize?: number;
      width?: number;
      height?: number;
      uploaded_by?: string;
      uploaded_on?: string;
    };

    Users: {
      id: string;
      first_name?: string;
      last_name?: string;
      email?: string;
      avatar?: string | Files;
    };

    // DirectNext specific schema types
    ItemsPages: {
      id: string;
      title: string;
      slug: string;
      seo?: unknown;
      parent_page?: string | ItemsPages | null;
      page_blocks?: (number | ItemsPagesPageBlocks)[] | null;
    };

    ItemsPagesPageBlocks: {
      id?: number;
      pages_id?: string | ItemsPages | null;
      item?: string[] | null;
      sort?: number | null;
      collection?: string | null;
    };
  };
}

// Direct type exports for easier access
export type Files = components["schemas"]["Files"];
export type Users = components["schemas"]["Users"];
export type ItemsPages = components["schemas"]["ItemsPages"];
export type ItemsPagesPageBlocks =
  components["schemas"]["ItemsPagesPageBlocks"];
