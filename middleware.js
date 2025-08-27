import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedRoutes = ['/dashboard', '/profile', '/addjobs', '/pricing', '/email', '/help', '/contactus'];

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Only protect specific routes
  const needsAuth = protectedRoutes.some(route => pathname.startsWith(route));
  if (!needsAuth) return NextResponse.next();

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET, // Same as used in [...nextauth]
  });

  if (!token) {
    return NextResponse.redirect(new URL('/api/auth/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/addjobs/:path*',],
};
