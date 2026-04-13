import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conversation Review',
};

export default function ReviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
