"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/libs/api";
import { getToken } from "@/libs/auth";
import ProtectedRoute from "@/components/ProtectedRoutes";

export default function CreateGroupPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    topic: "",
    meeting_location: "",
    max_members: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const token = getToken();

      await api.post(
        "/groups",
        {
          ...form,
          max_members: Number(form.max_members),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Study group created successfully!");

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to create group.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-6 py-10">

          <div className="mb-8">
            <h1 className="text-5xl font-bold text-slate-900">
              Create Study Group
            </h1>

            <p className="text-slate-500 mt-3 text-lg">
              Start a new learning community.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="block mb-2 font-medium">
                  Group Title
                </label>

                <input
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                  placeholder="DSA Interview Preparation"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Topic
                </label>

                <select
                  required
                  value={form.topic}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      topic: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select Topic</option>
                  <option>DSA</option>
                  <option>Competitive Programming</option>
                  <option>Machine Learning</option>
                  <option>Web Development</option>
                  <option>Python</option>
                  <option>Java</option>
                  <option>System Design</option>
                  <option>Open Source</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Meeting Location
                </label>

                <input
                  required
                  value={form.meeting_location}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      meeting_location: e.target.value,
                    })
                  }
                  placeholder="Central Library, IIT BHU"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Maximum Members
                </label>

                <input
                  required
                  type="number"
                  min={2}
                  max={100}
                  value={form.max_members}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      max_members: e.target.value,
                    })
                  }
                  placeholder="10"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Description
                </label>

                <textarea
                  rows={6}
                  required
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe the purpose of your study group..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-xl font-semibold transition"
              >
                {loading ? "Creating..." : "Create Group"}
              </button>

            </form>

          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}