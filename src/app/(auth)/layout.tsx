import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Container from '@/components/container';
import { Suspense } from 'react';
import ReduxProvider from '@/providers/ReduxProvider';
import './../globals.css';
import Loading from './loading';

const inter = Inter({ subsets: ['latin'] });

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-zinc-100 text-zinc-900 min-h-screen`}
      >
        <ReduxProvider>
          <Container>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </Container>
        </ReduxProvider>
      </body>
    </html>
  );
}
