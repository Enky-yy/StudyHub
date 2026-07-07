"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import api from "@/libs/api";
import { getToken } from "@/libs/auth";
import ProtectedRoute from "@/components/ProtectedRoutes";

const topics = [
  "DSA",
  "Competitive Programming",
  "Machine Learning",
  "Web Development",
  "Python",
  "Java",
  "System Design",
  "Open Source",
];

interface GroupForm {
  title: string;
  description: string;
  topic: string;
  meeting_location: string;
}

export default function EditGroupPage() {
  const params = useParams();
  const router = useRouter();

  const groupId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<GroupForm>({
    title: "",
    description: "",
    topic: "",
    meeting_location: "",
  });

  useEffect(() => {
    fetchGroup();
  }, []);

  async function fetchGroup() {
    try {
      const res = await api.get(`/groups/${groupId}`);

      setForm({
        title: res.data.title,
        description: res.data.description,
        topic: res.data.topic,
        meeting_location: res.data.meeting_location,
      });
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.detail || "Failed to load group.");
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.topic.trim() ||
      !form.meeting_location.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setSaving(true);

      const token = getToken();

      await api.put(`/groups/${groupId}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Group updated successfully!");

      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);

      alert(
        err.response?.data?.detail ??
          "Failed to update the group."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-6 py-10">

          <div className="mb-8">
            <h1 className="text-5xl font-bold text-slate-900">
              Edit Study Group
            </h1>

            <p className="text-slate-500 mt-2">
              Update your group's information.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="block mb-2 font-medium text-slate-700">
                  Group Title
                </label>

                <input
                  required
                  disabled={saving}
                  placeholder="DSA Interview Prep"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-slate-100"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-slate-700">
                  Topic
                </label>

                <select
                  required
                  disabled={saving}
                  value={form.topic}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      topic: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-slate-100"
                >
                  <option value="">Select Topic</option>

                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium text-slate-700">
                  Meeting Location
                </label>

                <input
                  required
                  disabled={saving}
                  placeholder="Central Library, IIT BHU"
                  value={form.meeting_location}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      meeting_location: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-slate-100"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  required
                  rows={6}
                  disabled={saving}
                  placeholder="Describe your study group..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-slate-100"
                />
              </div>

              <div className="flex gap-4">

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => router.back()}
                  className="flex-1 border border-slate-300 rounded-xl py-3 font-semibold hover:bg-slate-100 transition disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold transition disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

              </div>

            </form>

          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}