import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Public routes — no auth required
  const publicPaths = ['/login', '/api/auth', '/api/health'];
  const isPublicPath = publicPaths.some((p) => pathname.startsWith(p));

  // Static assets and Next.js internals — always allow
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/logos') ||
    pathname.includes('.') // static files
  ) {
    return NextResponse.next();
  }

  // Allow public paths
  if (isPublicPath) {
    return NextResponse.next();
  }

  // If AUTH_SECRET is not configured, skip auth (development without auth)
  if (!process.env.AUTH_SECRET || process.env.AUTH_SECRET === 'dev-secret-change-in-production') {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login
  if (!isLoggedIn) {
    const loginUrl = new URL('/login', req.nextUrl.origin);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
