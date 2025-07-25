'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 border-b shadow-sm bg-white text-black dark:bg-neutral-950 dark:text-white border-gray-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <Link href="/" className="text-xl font-bold">
          Threadspire
        </Link>

        <div className="hidden md:block w-1/2">
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-lg px-2 py-1 border border-gray-300 dark:border-neutral-600 bg-gray-100 dark:bg-neutral-800 rounded hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
              title="Toggle Theme"
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
          )}

          <Link
            href="/auth/signup"
            className="text-sm font-medium hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
