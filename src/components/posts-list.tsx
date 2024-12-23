import prisma from '@/lib/db';
import Link from 'next/link';

export default async function PostsList() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const posts = await prisma.post.findMany();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-700 mb-4">{post.body}</p>
          <Link
            href={`/dashboard/posts/${post.id}`}
            className="text-blue-500 hover:underline"
          >
            Read more
          </Link>
        </div>
      ))}
    </div>
  );
}
