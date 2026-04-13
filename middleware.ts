import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

// Auth is optional — all routes are accessible without signing in.
// The middleware just attaches the session to the request so
// API routes can optionally use it for per-user storage.
export default auth(() => {
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
