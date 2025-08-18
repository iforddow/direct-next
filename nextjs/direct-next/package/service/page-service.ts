import { fetchFromDirectus } from "../directus-utils";

/* 
A method to fetch all pages from Directus.

@author IFD
@since 2025-08-13
*/
export async function getAllPages(): Promise<any[]> {
  try {
    // Try to fetch all pages
    const data = await fetchFromDirectus(
      "/items/pages?fields=id,title,slug,seo,page_blocks.id,page_blocks.item.*,page_blocks.sort,page_blocks.collection",
    );

    // Return the fetched data as a list of pages
    return data.data as any[];
  } catch (error) {
    // On the event of an error, log it and return an empty array
    console.error("Error fetching pages:", error);

    return [];
  }
}

/* 
A lightweight method to fetch only page slugs for static generation.
This is much more efficient than getAllPages() for generateStaticParams.

@author IFD
@since 2025-08-15
*/
export async function getAllPageSlugs(): Promise<string[]> {
  try {
    // Fetch only the slug field - much more efficient
    const data = await fetchFromDirectus("/items/pages?fields=slug");

    return data.data.map((page: { slug: string }) => page.slug);
  } catch (error) {
    console.error("Error fetching page slugs:", error);
    return [];
  }
}

/* 
A method to fetch a single page by its slug from Directus.

@author IFD
@since 2025-08-13
*/
export async function getPageBySlug(slug: string): Promise<any | null> {
  try {
    // Fetch the page by its slug
    const data = await fetchFromDirectus(
      `/items/pages?filter[slug][_eq]=${slug}&fields=id,title,slug,seo,page_blocks.id,page_blocks.item.*,page_blocks.sort,page_blocks.collection`,
    );

    return data.data.length > 0 ? (data.data[0] as any) : null;
  } catch (error) {
    console.error("Error fetching page by slug:", error);
    return null;
  }
}
