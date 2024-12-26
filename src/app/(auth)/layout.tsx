import type { Metadata } from 'next';
import Container from '@/components/container';
import { Suspense } from 'react';
import ReduxProvider from '@/providers/ReduxProvider';
import './../globals.css';
import Loading from './loading';
import dynamic from 'next/dynamic';

// Dynamically import NavigationLoader with ssr disabled
const NavigationLoader = dynamic(
  () => import('@/components/full-page-loader'),
  { ssr: false, loading: () => null }
);

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ReduxProvider>
        <NavigationLoader />
        <Container>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </Container>
      </ReduxProvider>
    </>
  );
}
