'use client';

import React, { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-800">Error</h1>
        <p className="text-2xl text-red-600 mt-4">
          Something went wrong. Please try again later.
        </p>
      </div>
    </div>
  );
}
