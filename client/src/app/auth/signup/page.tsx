'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpInput, signUpSchema } from '../../../../utils/zod/auth';
import { useMutation } from '@tanstack/react-query';
import api from '../../../../utils/axios';
import toast from 'react-hot-toast';

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: SignUpInput) => api.post('/auth/signup', data),
    onSuccess: (res) => {
      toast.success('Signed up successfully!');
    },
    onError: (err) => {
      toast.error('Signup failed. Try again.');
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border dark:border-zinc-800 shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-zinc-800 dark:text-white">
          Create Your Account
        </h2>

        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="space-y-5"
        >
          {['name', 'username', 'email', 'password'].map((field) => (
            <div key={field}>
              <input
                {...register(field as keyof SignUpInput)}
                type={field === 'password' ? 'password' : 'text'}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors[field as keyof SignUpInput] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field as keyof SignUpInput]?.message}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          >
            {mutation.isPending ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
