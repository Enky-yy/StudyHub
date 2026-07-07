"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { isLoggedIn, removeToken } from "@/libs/auth";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLoggedIn(isLoggedIn());
  }, []);

  function logout() {
    removeToken();
    setLoggedIn(false);
    router.push("/");
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Groups", href: "/groups" },
    { name: "Map", href: "/map" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200">
      <nav className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="text-3xl">📚</div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              StudyHub
            </h1>

            <p className="text-xs text-slate-500">
              Learn Together
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition font-medium ${
                pathname === item.href
                  ? "text-blue-600"
                  : "text-slate-600 hover:text-blue-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {!mounted ? (
            <div className="w-28 h-10" />
          ) : loggedIn ? (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="text-slate-600 hover:text-blue-600 font-medium transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}