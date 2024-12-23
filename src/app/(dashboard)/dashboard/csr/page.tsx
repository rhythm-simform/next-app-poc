'use client';

import { useState, useEffect } from 'react';
import PostCard from '@/components/post-card';

export default function CSRPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        `https://676424e552b2a7619f5b948a.mockapi.io/api/post?page=${page}&limit=10`
      );
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    };
    fetchData();
  }, [page]);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Client-Side Rendering (CSR)</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} title={post.title} body={post.body} />
          ))}
        </div>
      )}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          Next
        </button>
      </div>
    </main>
  );
}
