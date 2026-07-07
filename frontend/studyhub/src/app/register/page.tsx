"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/libs/api";

export default function Register() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    branch: "CSE",
    year: "",
    skills: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/register", {...form , year:Number(form.year)});
      router.push("/login");
    } catch (err: any) {
      console.log(err.response?.data);
      alert(JSON.stringify(err.response?.data?.detail) || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-slate-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900">Register</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="your name"
                value={form.name}
                required
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                }}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                required
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                }}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                placeholder="********"
                value={form.password}
                required
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                }}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Bio
              </label>
              <input
                type="text"
                placeholder="You Bio"
                value={form.bio}
                onChange={(e) => {
                  setForm({ ...form, bio: e.target.value });
                }}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Branch
              </label>
              <select
                required
                name="branch"
                id="branch"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => {
                  setForm({ ...form, branch: e.target.value });
                }} value={form.branch}
              >
                <option value="CSE">CSE</option>
                <option value="CIVIL">CIVIL</option>
                <option value="META">META</option>
                <option value="MIN">MIN</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Year
              </label>
              <input
                type="number"
                step={1}
                min={1}
                value={form.year}
                required
                onChange={(e) => {
                  setForm({ ...form, year: e.target.value });
                }}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Skills
              </label>
              <input
                type="text"
                placeholder="Your skills"
                value={form.skills}
                required
                onChange={(e) => {
                  setForm({ ...form, skills: e.target.value });
                }}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-70"
              >
                {loading ? "Signing in" : "sign in"}
              </button>
            </div>
          </form>
          <div className="mt-8 text-center">
            <p className="text-slate-500">
              Have an account?
              <Link
                href="/login"
                className="ml-2 text-blue-600 font-semibold hover:text-blue-700"
              >
                Log In Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
