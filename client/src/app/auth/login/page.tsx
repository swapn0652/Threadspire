'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginInput } from '../../../../utils/zod/auth';
import { useMutation } from '@tanstack/react-query';
import api from '../../../../utils/axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: LoginInput) => api.post('/auth/login', data),
    onSuccess: (res) => {
      const { token, user } = res.data;

      if (token && user) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('authUser', JSON.stringify(user));
        toast.success("Login successful!");
      } else {
        toast.error("Invalid response from server");
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Login failed");
    }
  });

  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border dark:border-zinc-800 shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-zinc-800 dark:text-white">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-5">
          <div>
            <input
              {...register('identifier')}
              placeholder="Username or Email"
              className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.identifier && (
              <p className="text-red-500 text-sm mt-1">{errors.identifier.message}</p>
            )}
          </div>

          <div>
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          >
            {mutation.isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            className="w-full py-2 px-4 border border-zinc-300 dark:border-zinc-600 rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
            onClick={() =>
              (window.location.href = 'http://localhost:8080/auth/google')
            }
          >
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            <span className="text-sm">Continue with Google</span>
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
