'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { UsernameInput, UsernameSchema } from '../../../../utils/zod/auth';
import api from '../../../../utils/axios';

export default function SetUsernamePage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsernameInput>({
    resolver: zodResolver(UsernameSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: UsernameInput) => {
      const token = localStorage.getItem('authToken');
      return api.patch(
        `/auth/set-username`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      const user = JSON.parse(localStorage.getItem('authUser') || '{}');
      user.username = form.getValues().username;
      localStorage.setItem('authUser', JSON.stringify(user));
      toast.success('Username set successfully!');
      router.replace('/');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    },
  });

  const form = useForm<UsernameInput>({
    resolver: zodResolver(UsernameSchema),
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.replace('/auth/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border dark:border-zinc-800 shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-zinc-800 dark:text-white">
          Choose a Username
        </h2>

        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
          <div>
            <input
              {...form.register('username')}
              placeholder="Enter a unique username"
              className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {form.formState.errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
          >
            {mutation.isPending ? 'Saving...' : 'Save Username'}
          </button>
        </form>
      </div>
    </div>
  );
}
