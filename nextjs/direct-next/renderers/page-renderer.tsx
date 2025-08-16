import { Pages } from "../types/directus-schemas";
import "../../src/app/page-renderer.css"
import { BlockRenderer } from "./block-renderer";

type PageRendererProps = {
    page: Pages;
}

/* 
A component to render a single page.

@author IFD
@since 2025-08-13
*/
export function PageRenderer({ page }: PageRendererProps) {
    if (!page) return <div>Page not found</div>;

    return (
        <div className="page-renderer">
            <main>
                {page.page_blocks && page.page_blocks.map((blockWrapper: any, index: number) => {
                    const block = typeof blockWrapper === 'object' ? blockWrapper : null;
                    return (
                        <BlockRenderer
                            key={block?.id || index}
                            block={block}
                        />
                    );
                })}
            </main>
        </div>
    );
}
