'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import {
  LoginInput,
  loginSchema,
  SignUpInput,
  signUpSchema,
} from '../../../utils/zod/auth';
import api from '../../../utils/axios';
import './auth.css'; // Make sure this file contains the flip styles

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);

  const loginForm = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });
  const signupForm = useForm<SignUpInput>({ resolver: zodResolver(signUpSchema) });

  const loginMutation = useMutation({
    mutationFn: (data: LoginInput) => api.post('/auth/login', data),
    onSuccess: (res) => {
      const { token, user } = res.data;
      if (token && user) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('authUser', JSON.stringify(user));
        toast.success('Login successful!');
      } else {
        toast.error('Invalid response from server');
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Login failed');
    },
  });

  const signupMutation = useMutation({
    mutationFn: (data: SignUpInput) => api.post('/auth/signup', data),
    onSuccess: () => {
      toast.success('Signup successful!');
      setIsSignup(false);
    },
    onError: () => {
      toast.error('Signup failed. Try again.');
    },
  });

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="relative w-full max-w-md perspective">
        <div
          className={`relative w-full transition-transform duration-700 transform-style-preserve-3d ${
            isSignup ? 'rotate-y-180' : ''
          }`}
        >
          {/* Login Form */}
          <div
            className={`w-full backface-hidden ${
              isSignup ? 'invisible absolute' : 'relative visible'
            }`}
          >
            <FormCard
              title="Welcome Back"
              buttonText={loginMutation.isPending ? 'Logging in...' : 'Login'}
              onSubmit={loginForm.handleSubmit((data) => loginMutation.mutate(data))}
              formFields={[
                {
                  name: 'identifier',
                  placeholder: 'Username or Email',
                  type: 'text',
                  register: loginForm.register,
                  error: loginForm.formState.errors.identifier?.message,
                },
                {
                  name: 'password',
                  placeholder: 'Password',
                  type: 'password',
                  register: loginForm.register,
                  error: loginForm.formState.errors.password?.message,
                },
              ]}
              footerText="Don't have an account?"
              toggleText="Sign up"
              onToggle={() => setIsSignup(true)}
              showGoogle
            />
          </div>

          {/* Signup Form */}
          <div
            className={`w-full rotate-y-180 backface-hidden ${
              isSignup ? 'relative visible' : 'invisible absolute'
            }`}
          >
            <FormCard
              title="Create Your Account"
              buttonText={signupMutation.isPending ? 'Signing up...' : 'Sign Up'}
              onSubmit={signupForm.handleSubmit((data) => signupMutation.mutate(data))}
              formFields={[
                {
                  name: 'name',
                  placeholder: 'Name',
                  type: 'text',
                  register: signupForm.register,
                  error: signupForm.formState.errors.name?.message,
                },
                {
                  name: 'username',
                  placeholder: 'Username',
                  type: 'text',
                  register: signupForm.register,
                  error: signupForm.formState.errors.username?.message,
                },
                {
                  name: 'email',
                  placeholder: 'Email',
                  type: 'email',
                  register: signupForm.register,
                  error: signupForm.formState.errors.email?.message,
                },
                {
                  name: 'password',
                  placeholder: 'Password',
                  type: 'password',
                  register: signupForm.register,
                  error: signupForm.formState.errors.password?.message,
                },
              ]}
              footerText="Already have an account?"
              toggleText="Login"
              onToggle={() => setIsSignup(false)}
              showGoogle
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type FormField = {
  name: string;
  placeholder: string;
  type: string;
  register: any;
  error?: string;
};

function FormCard({
  title,
  buttonText,
  onSubmit,
  formFields,
  footerText,
  toggleText,
  onToggle,
  showGoogle = false,
}: {
  title: string;
  buttonText: string;
  onSubmit: () => void;
  formFields: FormField[];
  footerText: string;
  toggleText: string;
  onToggle: () => void;
  showGoogle?: boolean;
}) {
  return (
    <div className="w-full bg-white dark:bg-zinc-900 border dark:border-zinc-800 shadow-lg rounded-2xl p-8 flex flex-col gap-6">
      <div>
        <h2 className="text-3xl font-semibold mb-4 text-center text-zinc-800 dark:text-white">
          {title}
        </h2>

        <form onSubmit={onSubmit} className="space-y-5">
          {formFields.map(({ name, type, placeholder, register, error }) => (
            <div key={name}>
              <input
                {...register(name)}
                type={type}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          >
            {buttonText}
          </button>
        </form>

        {showGoogle && (
          <div className="mt-6">
            <button
              className="w-full py-2 px-4 border border-zinc-300 dark:border-zinc-600 rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
              onClick={() =>
                (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`)
              }
            >
              <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
              <span className="text-sm">Continue with Google</span>
            </button>
          </div>
        )}
      </div>

      <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
        {footerText}{' '}
        <button onClick={onToggle} className="text-blue-600 hover:underline">
          {toggleText}
        </button>
      </p>
    </div>
  );
}
