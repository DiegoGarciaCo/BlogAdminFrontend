"use client";

import React, { useState } from "react";
import Link from "next/link";
import MobileMenuToggle from "./MobileMenuToggle";
import SignOutButton from "./SignOutButton";
import { Menu, X } from "lucide-react"; // Import hamburger and close icons

export default function SidebarNav() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar starts expanded

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`p-6 bg-brand-primary text-brand-text hidden md:flex flex-col min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Hamburger Toggle */}
        <div className="flex justify-between items-center mb-6">
          {isSidebarOpen && (
            <h2 className="text-xl font-bold">Admin Dashboard</h2>
          )}
          <button
            onClick={toggleSidebar}
            className="text-brand-secondary hover:text-brand-accent focus:outline-none"
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={`mt-6 space-y-4 ${isSidebarOpen ? "block" : "hidden"}`}>
          <Link
            href="/"
            className="block text-brand-secondary hover:text-brand-accent transition-colors"
          >
            Posts
          </Link>
          <Link
            href="/create"
            className="block text-brand-secondary hover:text-brand-accent transition-colors"
          >
            Create New Post
          </Link>
        </nav>

        {/* Sign Out Button */}
        <div className={`mt-auto ${isSidebarOpen ? "block" : "hidden"}`}>
          <SignOutButton />
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden p-4 bg-brand-primary text-brand-text flex justify-between items-center fixed top-0 left-0 right-0 z-10">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <MobileMenuToggle />
      </header>
    </>
  );
}
