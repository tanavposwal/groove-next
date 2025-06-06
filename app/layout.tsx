import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import RecoilContextProvider from '@/components/RecoilConetextProvider';
import { SessionProvider } from 'next-auth/react';

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'groove',
  description: 'Music social media app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className + ' light'}>
        <RecoilContextProvider>
          <SessionProvider>{children}</SessionProvider>
        </RecoilContextProvider>
      </body>
    </html>
  );
}
