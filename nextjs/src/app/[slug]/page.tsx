import { PageRenderer } from '../../../direct-next/package/renderers/page-renderer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SEO } from '../../../direct-next/package/types/seo';
import { getAllPageSlugs, getPageBySlug } from '../../../direct-next/package/service/page-service';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const page = await getPageBySlug(slug);

    if (!page) {
        return {
            title: 'Page Not Found'
        };
    }

    const seo = page.seo as SEO;

    return {
        title: seo?.title || 'Default Title',
        description: seo?.meta_description || 'Default Description'
    };
}

export async function generateStaticParams() {
    const slugs = await getAllPageSlugs();

    return slugs.map((slug) => ({
        slug: slug
    }));
}

export default async function SingleSlugPage({ params }: PageProps) {
    const { slug } = await params;
    const page = await getPageBySlug(slug);

    if (!page) {
        notFound();
    }

    return <PageRenderer page={page} />;
}
