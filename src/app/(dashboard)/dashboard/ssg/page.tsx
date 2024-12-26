import React from 'react';

export default function SSGPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Static Site Generation (SSG)
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          This page is pre-rendered at build time, providing fast and reliable
          content delivery. SSG is great for pages that don’t need to change
          often, ensuring a highly optimized experience.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Fast Performance
            </h2>
            <p className="text-gray-500">
              SSG pages are served as static files, reducing load time and
              improving SEO.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Scalable
            </h2>
            <p className="text-gray-500">
              These pages scale effortlessly, making them ideal for high-traffic
              sites.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              SEO Friendly
            </h2>
            <p className="text-gray-500">
              Fully pre-rendered pages ensure search engines can index your
              content easily.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Great for Blogs
            </h2>
            <p className="text-gray-500">
              Perfect for content that doesn’t require frequent updates, such as
              blogs or documentation.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
