import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose'; // Import SignJWT from jose

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: 'Email and password are required' }),
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
        status: 401,
      });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
        status: 401,
      });
    }

    // Generate JWT token using jose (SignJWT)
    const token = await new SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(SECRET_KEY));

    // Set the cookie using the Set-Cookie header
    const response = new Response(
      JSON.stringify({ message: 'Login successful' }),
      { status: 200 }
    );

    response.headers.append(
      'Set-Cookie',
      `token=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=3600`
    );

    return response;

    // // Set token in cookies (HTTP only, Secure)
    // cookies().set('token', token, {
    //   httpOnly: true, // Prevent client-side access
    //   secure: false, // Use Secure in production
    //   sameSite: 'strict', // CSRF protection
    //   path: '/', // Root path
    //   maxAge: 60 * 60, // 1 hour
    // });

    // return new Response(JSON.stringify({ message: 'Login successful' }), {
    //   status: 200,
    // });
  } catch (error) {
    console.error('Error during login:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
    });
  }
}
