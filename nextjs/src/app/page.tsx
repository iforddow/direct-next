import Link from 'next/link';
import { getAllPages } from '../../direct-next/package/service/page-service';

export default async function Home() {
  const pages = await getAllPages();

  return (
    <div>
      <h1>Available Pages</h1>

      {pages.length === 0 ? (
        <p>No pages found. Make sure your Directus server is running and has pages configured.</p>
      ) : (
        <div>
          {pages.map((page) => (
            <Link
              key={page.id}
              href={`/${page.slug}`}
            >
              <h2>{page.title}</h2>
              <p>/{page.slug}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
