'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

export default function Page() {
  const [isComponentVisible, setComponentVisible] = useState(false);

  // Dynamically import the component without using suspense
  const LazyComponent = dynamic(
    () => import('../../../../components/lazy-component'),
    {
      loading: () => <div className="text-gray-500">Loading component...</div>,
    }
  );

  const handleButtonClick = () => {
    setComponentVisible(true);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Lazy Loading on Button Click
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Click the button below to load the component lazily.
      </p>

      <button
        onClick={handleButtonClick}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md mb-6"
      >
        Load Component
      </button>

      {isComponentVisible && <LazyComponent />}
    </main>
  );
}
