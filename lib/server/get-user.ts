import { auth } from '@/lib/auth';

/**
 * Get the current user from the auth session.
 * Returns null if not authenticated (auth is optional).
 */
export async function getUser(): Promise<{ id: string; name?: string | null; email?: string | null } | null> {
  try {
    const session = await auth();
    return session?.user?.id ? { id: session.user.id, name: session.user.name, email: session.user.email } : null;
  } catch {
    return null;
  }
}
