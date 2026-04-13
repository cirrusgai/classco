import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chinese Scenario Practice',
};

export default function LobbyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
