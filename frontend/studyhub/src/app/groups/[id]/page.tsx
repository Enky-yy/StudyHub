 "use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/libs/api";
import { getToken } from "@/libs/auth";
import ProtectedRoutes from "@/components/ProtectedRoutes";

interface Group {
  id: number;
  title: string;
  topic: string;
  description: string;
  meeting_location: string;
  total_member: number;
  creator_id: number;
  lat: number | null;
  long: number | null;
  created_at: string;
}

export default function GroupDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [group, setGroup] = useState<Group | null>(null);

  useEffect(() => {
    fetchGroup();
  }, []);

  async function fetchGroup() {
    try {
      const res = await api.get(`/groups/${params.id}`);
      setGroup(res.data);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.detail || "Failed to load group.");
      router.push("/groups");
    } finally {
      setLoading(false);
    }
  }

  async function joinGroup() {
    if (!group) return;

    try {
      setJoining(true);

      await api.post(
        `/groups/${group.id}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      alert("Successfully joined the group!");
      fetchGroup();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to join group.");
    } finally {
      setJoining(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Group not found.
      </div>
    );
  }

  return (
    <ProtectedRoutes>
      <div className="min-h-screen bg-slate-50 py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

            <div className="flex flex-col md:flex-row md:justify-between gap-6 mb-8">
              <div>
                <h1 className="text-5xl font-bold text-slate-900">
                  {group.title}
                </h1>

                <span className="inline-block mt-4 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium">
                  {group.topic}
                </span>
              </div>

              <button
                onClick={() => router.push(`/edit-groups/${group.id}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
              >
                Edit Group
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">

              <div className="bg-slate-100 rounded-2xl p-5">
                <p className="text-sm text-slate-500">Creator ID</p>
                <h3 className="text-2xl font-semibold">{group.creator_id}</h3>
              </div>

              <div className="bg-slate-100 rounded-2xl p-5">
                <p className="text-sm text-slate-500">Members</p>
                <h3 className="text-2xl font-semibold">{group.total_member}</h3>
              </div>

              <div className="bg-slate-100 rounded-2xl p-5">
                <p className="text-sm text-slate-500">Meeting Location</p>
                <h3 className="text-lg font-semibold">{group.meeting_location}</h3>
              </div>

              <div className="bg-slate-100 rounded-2xl p-5">
                <p className="text-sm text-slate-500">Created</p>
                <h3 className="text-lg font-semibold">
                  {new Date(group.created_at).toLocaleDateString()}
                </h3>
              </div>

              <div className="bg-slate-100 rounded-2xl p-5 md:col-span-2">
                <p className="text-sm text-slate-500">Coordinates</p>
                <h3 className="text-lg font-semibold">
                  {group.lat ?? "N/A"}, {group.long ?? "N/A"}
                </h3>
              </div>

            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">Description</h2>
              <p className="text-slate-600 leading-7">
                {group.description || "No description provided."}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={joinGroup}
                disabled={joining}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-6 py-3 rounded-xl"
              >
                {joining ? "Joining..." : "Join Group"}
              </button>

              <button
                onClick={() => router.back()}
                className="bg-slate-200 hover:bg-slate-300 px-6 py-3 rounded-xl"
              >
                Back
              </button>
            </div>

          </div>
        </div>
      </div>
    </ProtectedRoutes>
  );
}
