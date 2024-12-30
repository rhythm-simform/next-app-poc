'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setLoading, setLoggedIn } from '@/store/authSlice';

const navLinks = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/dashboard/posts',
    label: 'Posts',
  },
  {
    href: '/dashboard/create-post',
    label: 'Create Post',
  },
  {
    href: '/dashboard/csr',
    label: 'CSR',
  },
  {
    href: '/dashboard/ssr',
    label: 'SSR',
  },
  {
    href: '/dashboard/isr',
    label: 'ISR',
  },
  {
    href: '/dashboard/ssg',
    label: 'SSG',
  },
  {
    href: '/dashboard/lazy-load',
    label: 'Lazy Loading',
  },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const dispatch = useDispatch();

  const { isLoggedIn, email, loading } = useSelector(
    (state: RootState) => state.auth
  );

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // promise to delay of 5s
      dispatch(setLoading(true));
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Send a GET request to the logout route
      const response = await fetch('/api/logout', {
        method: 'GET',
      });

      if (response.ok) {
        dispatch(setLoading(false));
        dispatch(setLoggedIn(false));
        router.refresh();
        // router.push('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  return (
    <header className="flex justify-between items-center py-4 px-7 border-b">
      <Link href="/">
        {process.env.NEXT_PUBLIC_APP_NAME}
        <Image
          src="https://cdn-icons-png.flaticon.com/512/60/60736.png"
          alt="Logo"
          className="w-[35px] h-[35px]"
          width="35"
          height="35"
        />
      </Link>

      <nav>
        <ul className="flex gap-x-5 text-[14px]">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                className={`${
                  pathname === link.href ? 'text-zinc-900' : 'text-zinc-400'
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <p>{email}</p>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:bg-gray-400"
            >
              {loading ? 'Logging out...' : 'Logout'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
