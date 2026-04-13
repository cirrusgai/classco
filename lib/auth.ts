import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';

// Custom WeChat provider
function WeChat(options: { clientId: string; clientSecret: string }) {
  return {
    id: 'wechat',
    name: 'WeChat',
    type: 'oauth' as const,
    authorization: {
      url: 'https://open.weixin.qq.com/connect/qrconnect',
      params: {
        appid: options.clientId,
        response_type: 'code',
        scope: 'snsapi_login',
      },
    },
    token: {
      url: 'https://api.weixin.qq.com/sns/oauth2/access_token',
      params: {
        appid: options.clientId,
        secret: options.clientSecret,
        grant_type: 'authorization_code',
      },
    },
    userinfo: {
      url: 'https://api.weixin.qq.com/sns/userinfo',
    },
    profile(profile: { openid: string; nickname: string; headimgurl: string }) {
      return {
        id: profile.openid,
        name: profile.nickname,
        image: profile.headimgurl,
      };
    },
    clientId: options.clientId,
    clientSecret: options.clientSecret,
  };
}

// Build providers list based on configured env vars
const providers: NextAuthConfig['providers'] = [];

if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
  }));
}

if (process.env.AUTH_WECHAT_APP_ID && process.env.AUTH_WECHAT_APP_SECRET) {
  providers.push(WeChat({
    clientId: process.env.AUTH_WECHAT_APP_ID,
    clientSecret: process.env.AUTH_WECHAT_APP_SECRET,
  }));
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Only use database adapter if db is available
  ...(db ? { adapter: DrizzleAdapter(db, {
    usersTable: schema.users,
    accountsTable: schema.accounts,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }) } : {}),
  providers,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Use JWT strategy when no database is configured
  session: {
    strategy: db ? 'database' : 'jwt',
  },
});
