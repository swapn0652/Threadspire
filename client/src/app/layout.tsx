import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import AppShell from "@/components/AppShell";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threadspire",
  description: "Discuss everything you love!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white`}
      >
        <ThemeProvider enableSystem defaultTheme="system">
          <ReactQueryProvider>
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
            <AppShell>{children}</AppShell>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
