import './../globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Container from '@/components/container';
import { Toaster } from '@/components/ui/toaster';
import { Suspense } from 'react';
import ReduxProvider from '@/providers/ReduxProvider';
import Loading from './loading';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'Lorem ipsumd oler meit',
};

// Dynamically import NavigationLoader with ssr disabled
const NavigationLoader = dynamic(
  () => import('@/components/full-page-loader'),
  { ssr: false, loading: () => null }
);

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ReduxProvider>
        <NavigationLoader />
        <Container>
          <Header />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Toaster />
          <Footer />
        </Container>
      </ReduxProvider>
    </>
  );
}
