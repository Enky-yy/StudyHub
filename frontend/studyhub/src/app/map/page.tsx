"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import api from "@/libs/api";
import Groups from "@/types/groups";

const GroupMap = dynamic(() => import("@/components/GroupMap"), {
  ssr: false,
});

export default function GroupsPage() {
  const [groups, setGroups] = useState<Groups[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroups();
  }, []);

  async function fetchGroups() {
    try {
      const res = await api.get("/groups");
      setGroups(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-slate-900">
            Explore Groups
          </h1>

          <p className="text-slate-500 mt-2">
            Discover nearby study groups on the map.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-3xl font-bold text-blue-600">
              {groups.length}
            </h3>
            <p className="text-slate-500 mt-1">Groups Listed</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-3xl font-bold text-green-600">
              {groups.filter((g) => g.total_member > 0).length}
            </h3>
            <p className="text-slate-500 mt-1">Active Groups</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-3xl font-bold text-purple-600">
              {
                groups.filter(
                  (g) =>
                    g.lat !== null &&
                    g.long !== null
                ).length
              }
            </h3>
            <p className="text-slate-500 mt-1">Groups on Map</p>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900">
              Study Groups Map
            </h2>

            <p className="text-slate-500 mt-1">
              Click on a marker to view group details.
            </p>
          </div>

          <div className="h-[650px]">
            {loading ? (
              <div className="flex items-center justify-center h-full text-slate-500">
                Loading map...
              </div>
            ) : (
              <GroupMap groups={groups} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}