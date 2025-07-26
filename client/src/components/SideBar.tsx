'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const links = [
  { label: 'Feed', href: '/feed' },
  { label: 'Cells', href: '/cells' },
  { label: 'Create Cell', href: '/create-cell' },
  { label: 'Profile', href: '/profile' },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={cn(
          "fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] z-40 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 transition-transform duration-300 ease-in-out md:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-between items-center p-4 border-b border-zinc-200 dark:border-zinc-700">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition">
            <X size={20} />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "block text-base rounded px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition",
                pathname === link.href ? "bg-zinc-100 dark:bg-zinc-800 font-semibold" : ""
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <aside className="hidden md:flex fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-6">
        <nav className="space-y-3 w-full">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block text-base rounded px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition",
                pathname === link.href ? "bg-zinc-100 dark:bg-zinc-800 font-semibold" : ""
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
