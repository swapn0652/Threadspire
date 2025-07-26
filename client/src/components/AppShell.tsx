'use client';

import { useState } from "react";
import Navbar from "./Navbar";
import { Sidebar } from "./SideBar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar onHamburgerClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex relative">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 md:ml-64 min-h-screen px-4 py-6">{children}</main>
      </div>
    </>
  );
}
