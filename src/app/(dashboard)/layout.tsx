import { cookies } from 'next/headers'; // For accessing cookies server-side
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './../globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Container from '@/components/container';
import { Toaster } from '@/components/ui/toaster';
import { Suspense } from 'react';
import ReduxProvider from '@/providers/ReduxProvider';
import Loading from './loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'Lorem ipsumd oler meit',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const cookieStore = cookies();
  // const tokenCookie = cookieStore.get('token');

  // Determine if the user is logged in
  // const isLoggedIn = !!tokenCookie?.value;
  // const isLoggedIn = false;

  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-zinc-100 text-zinc-900 min-h-screen`}
      >
        <ReduxProvider>
          <Container>
            <Header />
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <Toaster />
            <Footer />
          </Container>
        </ReduxProvider>
      </body>
    </html>
  );
}
