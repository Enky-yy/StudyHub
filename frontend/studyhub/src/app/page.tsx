"use client";

import Link from "next/link";

const topics = [
  "DSA",
  "Competitive Programming",
  "Web Development",
  "Machine Learning",
  "Python",
  "React",
  "FastAPI",
  "Open Source",
];

const features = [
  {
    icon: "👥",
    title: "Find Study Partners",
    description:
      "Connect with students who share your learning goals and study together.",
  },
  {
    icon: "📍",
    title: "Nearby Groups",
    description:
      "Discover study groups around your campus using location-based search.",
  },
  {
    icon: "📅",
    title: "Schedule Sessions",
    description:
      "Plan meetings, revision sessions, and coding practice with your group.",
  },
  {
    icon: "🚀",
    title: "Boost Productivity",
    description:
      "Stay motivated by learning consistently with like-minded students.",
  },
  {
    icon: "💬",
    title: "Collaborate",
    description:
      "Discuss problems, share resources, and prepare for interviews together.",
  },
  {
    icon: "🎯",
    title: "Achieve Goals",
    description:
      "Track progress and build better study habits through collaboration.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-blue-100 px-5 py-2 text-blue-700 font-semibold">
              📚 Welcome to StudyHub
            </span>

            <h1 className="mt-8 text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
              Learn Better.
              <br />
              Together.
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-8 max-w-xl">
              Discover study groups, connect with motivated students, prepare
              for placements, coding interviews, DSA, AI/ML, Web Development
              and much more—all in one platform.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/groups"
                className="px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Explore Groups
              </Link>

              <Link
                href="/register"
                className="px-8 py-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 font-semibold transition"
              >
                Create Account
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 p-8 w-full max-w-lg">
              <div className="bg-blue-600 rounded-2xl p-6 text-white">
                <h2 className="text-3xl font-bold">
                  StudyHub Dashboard
                </h2>

                <p className="mt-2 text-blue-100">
                  Your learning starts here.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-5 mt-8">
                <div className="rounded-2xl bg-blue-50 p-5">
                  <h3 className="text-3xl font-bold text-blue-600">
                    120+
                  </h3>
                  <p className="text-slate-600 mt-2">
                    Study Groups
                  </p>
                </div>

                <div className="rounded-2xl bg-green-50 p-5">
                  <h3 className="text-3xl font-bold text-green-600">
                    500+
                  </h3>
                  <p className="text-slate-600 mt-2">
                    Students
                  </p>
                </div>

                <div className="rounded-2xl bg-purple-50 p-5">
                  <h3 className="text-3xl font-bold text-purple-600">
                    30+
                  </h3>
                  <p className="text-slate-600 mt-2">
                    Topics
                  </p>
                </div>

                <div className="rounded-2xl bg-orange-50 p-5">
                  <h3 className="text-3xl font-bold text-orange-600">
                    95%
                  </h3>
                  <p className="text-slate-600 mt-2">
                    Success
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            ["500+", "Students"],
            ["120+", "Study Groups"],
            ["30+", "Topics"],
            ["95%", "Collaboration Rate"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center hover:shadow-lg transition"
            >
              <h2 className="text-5xl font-bold text-blue-600">
                {value}
              </h2>

              <p className="mt-3 text-slate-500">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-slate-900">
            Why Choose StudyHub?
          </h2>

          <p className="text-slate-500 mt-4 text-lg">
            Everything you need to study smarter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="text-5xl">{feature.icon}</div>

              <h3 className="mt-6 text-2xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-4 text-slate-600 leading-7">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Topics */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center text-slate-900">
            Popular Topics
          </h2>

          <p className="text-center text-slate-500 mt-5">
            Join a community that matches your interests.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-14">
            {topics.map((topic) => (
              <div
                key={topic}
                className="rounded-full border border-blue-200 bg-blue-50 px-6 py-3 font-medium hover:bg-blue-600 hover:text-white transition cursor-pointer"
              >
                {topic}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-5xl font-bold">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10 mt-16">
            {[
              [
                "1️⃣",
                "Create an Account",
                "Register and build your student profile.",
              ],
              [
                "2️⃣",
                "Join a Group",
                "Browse available study groups and connect instantly.",
              ],
              [
                "3️⃣",
                "Learn Together",
                "Attend sessions, solve problems and achieve your goals.",
              ],
            ].map(([icon, title, desc]) => (
              <div
                key={title}
                className="bg-white rounded-3xl p-8 text-center shadow-sm"
              >
                <div className="text-6xl">{icon}</div>

                <h3 className="mt-6 text-2xl font-bold">
                  {title}
                </h3>

                <p className="mt-4 text-slate-600">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto py-24 px-6">
        <h2 className="text-5xl font-bold text-center">
          Student Feedback
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              name: "Aman",
              text: "StudyHub helped me find an amazing DSA practice group.",
            },
            {
              name: "Priya",
              text: "Preparing for placements became much easier with weekly study sessions.",
            },
            {
              name: "Rohan",
              text: "I met teammates for hackathons through StudyHub.",
            },
          ].map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8"
            >
              <div className="text-4xl">⭐⭐⭐⭐⭐</div>

              <p className="mt-5 text-slate-600 leading-7">
                "{item.text}"
              </p>

              <h3 className="mt-6 font-bold text-lg">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-blue-600 rounded-[2rem] px-10 py-20 text-center">
          <h2 className="text-5xl font-bold text-white">
            Ready to Find Your Study Group?
          </h2>

          <p className="mt-6 text-lg text-blue-100">
            Join StudyHub today and start learning with students who share your
            goals.
          </p>

          <Link
            href="/register"
            className="inline-block mt-10 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">
              📚 StudyHub
            </h2>

            <p className="text-slate-500 mt-2">
              Learn Together. Grow Together.
            </p>
          </div>

          <div className="flex gap-8 mt-6 md:mt-0">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>

            <Link href="/groups" className="hover:text-blue-600">
              Groups
            </Link>

            <Link href="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>

            <Link href="/profile" className="hover:text-blue-600">
              Profile
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}