"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/libs/api";
import { saveToken } from "@/libs/auth";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const formData = new URLSearchParams();
      formData.append("username", form.username);
      formData.append("password", form.password);

      const res = await api.post("/auth/login", formData);

      saveToken(res.data.access_token);

      router.push("/groups");
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

          {/* Logo */}

          <div className="text-center mb-8">

            <div className="text-6xl mb-4">
              📚
            </div>

            <h1 className="text-4xl font-bold text-slate-900">
              StudyHub
            </h1>

            <p className="text-slate-500 mt-2">
              Sign in to continue your learning journey.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                required
                placeholder="Enter your username"
                value={form.username}
                onChange={(e) =>
                  setForm({
                    ...form,
                    username: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>

              <label className="block mb-2 text-sm font-medium text-slate-700">
                Password
              </label>

              <input
                type="password"
                required
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl py-3 font-semibold disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

          <div className="mt-8 text-center">

            <p className="text-slate-500">
              Don't have an account?

              <Link
                href="/register"
                className="ml-2 text-blue-600 hover:text-blue-700 font-semibold"
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>

      </div>
    </main>
  );
}