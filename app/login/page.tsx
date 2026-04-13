import { auth, signIn } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Sign In — Chinese Learning',
};

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect('/lobby');

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-sm space-y-6 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Chinese Scenario Practice</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to start practicing
          </p>
        </div>

        <div className="space-y-3">
          <form
            action={async () => {
              'use server';
              await signIn('google', { redirectTo: '/lobby' });
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-lg border bg-background px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>
          </form>

          <form
            action={async () => {
              'use server';
              await signIn('wechat', { redirectTo: '/lobby' });
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-lg border bg-[#07C160] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#06AD56]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05a6.913 6.913 0 01-.235-1.758c0-3.832 3.612-6.941 8.064-6.941.263 0 .514.024.768.043C17.164 4.588 13.274 2.188 8.691 2.188zm-2.32 4.407c.58 0 1.05.47 1.05 1.05s-.47 1.05-1.05 1.05-1.05-.47-1.05-1.05.47-1.05 1.05-1.05zm5.258 0c.58 0 1.05.47 1.05 1.05s-.47 1.05-1.05 1.05-1.05-.47-1.05-1.05.47-1.05 1.05-1.05zM17.23 9.13c-3.89 0-7.04 2.72-7.04 6.07 0 3.35 3.15 6.07 7.04 6.07.77 0 1.51-.12 2.21-.33a.75.75 0 01.55.07l1.48.87a.25.25 0 00.13.04c.13 0 .23-.1.23-.23 0-.06-.02-.11-.04-.17l-.3-1.15a.46.46 0 01.17-.52c1.43-1.05 2.34-2.6 2.34-4.31 0-3.35-3.15-6.07-7.04-6.07z"/>
              </svg>
              Sign in with WeChat
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Practice real Chinese conversations with AI characters
        </p>
      </div>
    </div>
  );
}
