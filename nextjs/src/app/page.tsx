import Link from 'next/link';
import { getAllPages } from '../../direct-next/service/page-service';

export default async function Home() {
  const pages = await getAllPages();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Available Pages</h1>

      {pages.length === 0 ? (
        <p>No pages found. Make sure your Directus server is running and has pages configured.</p>
      ) : (
        <div className="grid gap-4">
          {pages.map((page) => (
            <Link
              key={page.id}
              href={`/${page.slug}`}
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-xl font-semibold">{page.title}</h2>
              <p className="text-gray-600">/{page.slug}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
