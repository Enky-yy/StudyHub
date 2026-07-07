"use client";

import { useEffect, useState } from "react";

import api from "@/libs/api";
import GroupCards from "@/components/GroupCards";
import Groups from "@/types/groups";

export default function GroupsPage() {
  const [groups, setGroups] = useState<Groups[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGroups();
  }, []);

  async function fetchGroups() {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/groups");
      setGroups(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load groups.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">

          <div>
            <h1 className="text-5xl font-bold text-slate-900">
              Find Study Groups
            </h1>

            <p className="text-slate-500 mt-2 text-lg">
              Discover groups that match your interests.
            </p>
          </div>

          <button
            onClick={fetchGroups}
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            Refresh
          </button>

        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-3xl font-bold text-blue-600">
              {groups.length}
            </h3>

            <p className="text-slate-500">
              Total Groups
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-3xl font-bold text-green-600">
              {groups.reduce(
                (sum, group) => sum + group.total_member,
                0
              )}
            </h3>

            <p className="text-slate-500">
              Total Members
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-3xl font-bold text-purple-600">
              {
                groups.filter(
                  (group) =>
                    group.lat !== null &&
                    group.long !== null
                ).length
              }
            </h3>

            <p className="text-slate-500">
              Mapped Groups
            </p>
          </div>

        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center text-slate-500">
            Loading groups...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 rounded-3xl p-6 text-red-600">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && groups.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center">
            <h3 className="text-2xl font-semibold text-slate-900">
              No Groups Found
            </h3>

            <p className="text-slate-500 mt-2">
              Be the first to create one!
            </p>
          </div>
        )}

        {/* Groups Grid */}
        {!loading && !error && groups.length > 0 && (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <GroupCards
                key={group.id}
                groups={group}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}