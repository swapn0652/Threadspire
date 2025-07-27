'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Menu, User2 } from 'lucide-react';
import { useMe } from '../../utils/hooks/useMe';

export default function Navbar({ onHamburgerClick }: { onHamburgerClick: () => void }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: user, isLoading } = useMe();

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 border-b bg-zinc-50 shadow-sm bg-white text-black dark:bg-neutral-950 dark:text-white border-gray-200 dark:border-neutral-800 transition-colors">
      <div className="h-16 flex items-center justify-between px-4 sm:px-6 md:pl-8">
        
        <div className="flex items-center gap-4">
          <button
            className="md:hidden p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
            onClick={onHamburgerClick}
          >
            <Menu size={22} />
          </button>

          <Link href="/" className="text-xl font-bold">
            Threadspire
          </Link>
        </div>

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

          {!isLoading && user ? (
            <Link href="/profile" className="flex items-center gap-2 text-sm font-medium hover:underline">
              <User2 className="w-4 h-4" />
              {user.username}
            </Link>
          ) : (
            <Link
              href="/auth/signup"
              className="text-sm font-medium hover:underline"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
