"use client";

import { useVisualEditing } from "../../../direct-next/hooks/visual-editing-hook";
import { HeroBlock } from "../../../direct-next/types/directus-schemas";

// Hero Block Component
export function HeroBlockComponent({ block }: { block: HeroBlock }) {

    const { getDirectusAttr } = useVisualEditing();

    if (!block) return null;

    const imageUrl = typeof block.image === 'string'
        ? block.image
        : block.image?.filename_disk;

    return (
        <section className="hero-block">
            <div className="hero-content">
                {block.headline && (
                    <h1 {...getDirectusAttr('hero_block', block.id, 'headline', 'popover')}>
                        {block.headline}
                    </h1>
                )}
                {block.content && (
                    <div
                        {...getDirectusAttr('hero_block', block.id, 'content', 'popover')}
                        dangerouslySetInnerHTML={{ __html: block.content }}
                    />
                )}
                {imageUrl && (
                    <img
                        {...getDirectusAttr('hero_block', block.id, 'image', 'drawer')}
                        src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'}/assets/${imageUrl}`}
                        alt={block.headline || 'Hero image'}
                    />
                )}
            </div>
        </section>
    );
}