'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import ReactQueryProvider from '@/components/providers/ReactQueryProvider';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider enableSystem defaultTheme="system">
        <ReactQueryProvider>
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          {children}
        </ReactQueryProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
