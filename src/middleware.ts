import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const currentUrl = new URL(request.url);

  // If the user is logged in
  if (token) {
    // Prevent logged-in users from accessing login/register pages
    if (
      currentUrl.pathname === '/login' ||
      currentUrl.pathname === '/register'
    ) {
      const dashboardUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }

    try {
      // Validate token for protected routes
      await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
      return NextResponse.next(); // Token is valid, proceed to the requested route
    } catch (error) {
      console.error('Token verification failed:', error);
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl); // Redirect to login if token is invalid or expired
    }
  } else {
    // If the user is not logged in, they cannot access certain routes
    if (
      currentUrl.pathname !== '/login' &&
      currentUrl.pathname !== '/register'
    ) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl); // Redirect to login if token is missing
    }
    return NextResponse.next(); // Allow access to login/register
  }
}

// Protect routes
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'], // Match any route under /rendering
};
