'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

type TokenPayload = {
  userId: string;
  email: string;
  hasUsername: boolean;
};

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
      router.replace('/auth/login');
      return;
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);

      localStorage.setItem('authToken', token);
      localStorage.setItem('authUser', JSON.stringify(decoded));

      if (decoded.hasUsername) {
        router.replace('/');
      } else {
        router.replace('/auth/username');
      }
    } catch (err) {
      console.error('Invalid token:', err);
      router.replace('/auth/login');
    }
  }, [router]);

  return (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <img src="/logo.svg" alt="Logo" className="w-12 h-12 mx-auto animate-bounce" />
      <p className="mt-4 text-lg font-semibold text-zinc-700 dark:text-zinc-200">
        Hang tight, logging you in...
      </p>
    </div>
  </div>
);
}
