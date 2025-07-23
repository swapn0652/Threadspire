'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky text-white top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Threadspire
        </Link>

        <div className="hidden md:block w-1/2 color-white">
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
          />
        </div>

        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-sm px-2 py-1 border rounded"
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
          )}

          <Link href="/auth/signup" className="text-sm font-medium hover:underline">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
