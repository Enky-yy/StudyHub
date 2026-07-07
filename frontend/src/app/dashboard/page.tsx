"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import api from "@/libs/api";
import { getToken } from "@/libs/auth";
import ProtectedRoute from "@/components/ProtectedRoutes";

interface Group {
  id: number;
  title: string;
  description: string;
  topic: string;
  meeting_location: string;
  total_member: number;
  creator_id: number;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
}

export default function DashboardPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroups();
  }, []);

  async function fetchGroups() {
    try {
      const token = getToken();

      const res = await api.get("/groups/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGroups(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteGroup(id: number) {
    if (!confirm("Delete this study group?")) return;

    try {
      const token = getToken();

      await api.delete(`/groups/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGroups(groups.filter((g) => g.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete group.");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50">

        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* Header */}

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">

            <div>
              <h1 className="text-5xl font-bold text-slate-900">
                Dashboard
              </h1>

              <p className="text-slate-500 mt-2">
                Manage the study groups you've created.
              </p>
            </div>

            <Link
              href="/add-groups"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              + Create Group
            </Link>

          </div>

          {/* Stats */}

          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

              <h2 className="text-4xl font-bold text-blue-600">
                {groups.length}
              </h2>

              <p className="text-slate-500 mt-2">
                Groups Created
              </p>

            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

              <h2 className="text-4xl font-bold text-green-600">
                {groups.reduce(
                  (sum, group) => sum + group.total_member,
                  0
                )}
              </h2>

              <p className="text-slate-500 mt-2">
                Total Members
              </p>

            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

              <h2 className="text-4xl font-bold text-purple-600">
                {
                  new Set(groups.map((g) => g.topic)).size
                }
              </h2>

              <p className="text-slate-500 mt-2">
                Topics Covered
              </p>

            </div>

          </div>

          {/* Empty State */}

          {groups.length === 0 ? (

            <div className="bg-white rounded-3xl border border-slate-200 p-20 text-center">

              <div className="text-6xl mb-5">
                📚
              </div>

              <h2 className="text-3xl font-bold text-slate-900">
                No Groups Yet
              </h2>

              <p className="text-slate-500 mt-4">
                Create your first study group and start collaborating.
              </p>

              <Link
                href="/add-groups"
                className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
              >
                Create Group
              </Link>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

              {groups.map((group) => (

                <div
                  key={group.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition overflow-hidden"
                >

                  <div className="bg-blue-600 text-white p-6">

                    <h2 className="text-2xl font-bold">
                      {group.title}
                    </h2>

                    <p className="mt-2 text-blue-100">
                      {group.topic}
                    </p>

                  </div>

                  <div className="p-6">

                    <p className="text-slate-600 line-clamp-3">
                      {group.description}
                    </p>

                    <div className="mt-6 space-y-3">

                      <div className="flex justify-between">
                        <span className="font-semibold">
                          Members
                        </span>

                        <span>
                          👥 {group.total_member}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="font-semibold">
                          Location
                        </span>

                        <span className="text-slate-600">
                          📍 {group.meeting_location}
                        </span>
                      </div>

                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-8">

                      <Link
                        href={`/groups/${group.id}`}
                        className="text-center border border-slate-300 rounded-xl py-2 hover:bg-slate-100"
                      >
                        View
                      </Link>

                      <Link
                        href={`/edit-groups/${group.id}`}
                        className="text-center bg-blue-600 text-white rounded-xl py-2 hover:bg-blue-700"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteGroup(group.id)}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
    </ProtectedRoute>
  );
}