import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  // Clear the token cookie
  const cookie = cookies();
  cookie.set('token', '', { maxAge: 0 }); // Clear the token by setting maxAge to 0

  return NextResponse.json({ message: 'Logged out successfully' });
}
