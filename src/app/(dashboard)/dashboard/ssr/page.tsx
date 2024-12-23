import PostCard from '@/components/post-card';
import { Post } from '@/types/post';

// export const dynamic = 'force-dynamic';

export default async function SSRPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || '1');
  const res = await fetch(
    `https://676424e552b2a7619f5b948a.mockapi.io/api/post?page=${page}&limit=10`
    // {
    //   cache: 'no-store',
    // }
  );
  const posts = await res.json();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Server-Side Rendering (SSR)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post: Post) => (
          <PostCard key={post.id} title={post.title} body={post.body} />
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <a
          href={`?page=${Math.max(page - 1, 1)}`}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          Previous
        </a>
        <span>Page {page}</span>
        <a
          href={`?page=${page + 1}`}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          Next
        </a>
      </div>
    </main>
  );
}
