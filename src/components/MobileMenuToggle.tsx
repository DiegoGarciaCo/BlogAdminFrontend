"use client";

import React, { useState } from "react";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default function MobileMenuToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-brand-text focus:outline-none"
        aria-label="Toggle mobile menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-brand-primary text-brand-text p-4 z-20 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="space-y-4">
            <Link
              href="/admin"
              className="block text-brand-secondary hover:text-brand-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Posts
            </Link>
            <Link
              href="/admin/create"
              className="block text-brand-secondary hover:text-brand-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Create New Post
            </Link>
            <p className="text-sm opacity-75">Posts Management</p>
            <SignOutButton />
          </nav>
        </div>
      )}
    </>
  );
}
