import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

// HTTP Basic Auth gate — enabled when BASIC_AUTH_USER and BASIC_AUTH_PASS are set.
// Used to protect the app when sharing via public tunnel for testing.
function checkBasicAuth(request: Request): NextResponse | null {
  const user = process.env.BASIC_AUTH_USER;
  const pass = process.env.BASIC_AUTH_PASS;
  if (!user || !pass) return null; // Basic auth not configured — skip

  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ');
    if (scheme === 'Basic' && encoded) {
      const decoded = atob(encoded);
      const [u, p] = decoded.split(':');
      if (u === user && p === pass) return null; // Authenticated — continue
    }
  }

  // Prompt for credentials
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Chinese Learning"' },
  });
}

export default auth((req) => {
  // Basic auth gate (for public tunnel sharing)
  const basicAuthResponse = checkBasicAuth(req);
  if (basicAuthResponse) return basicAuthResponse;

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
