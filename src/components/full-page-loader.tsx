// components/NavigationLoader.tsx
'use client';

import { useLayoutEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NavigationLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

    setIsNavigating(true);
    const timeout = setTimeout(() => setIsNavigating(false), 500);
    return () => clearTimeout(timeout);
  }, [pathname, searchParams, mounted]);

  if (!mounted || !isNavigating) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
    </div>
  );
}
