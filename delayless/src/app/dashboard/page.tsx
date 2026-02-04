// app/dashboard/page.tsx — Beautiful Light Theme Dashboard

"use client";

import { useEffect, useState } from "react";
import StatusCard from "../components/StatusCard";
import TrainLoader from "../components/TrainLoader";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <TrainLoader />;
  }

  const routes = [
    {
      route: "Electronic City → Central Silk Board",
      status: "Delayed by 12 minutes",
      updatedAt: "2 mins ago",
      delayType: "delayed" as const,
    },
    {
      route: "Whitefield → Majestic",
      status: "On Time",
      updatedAt: "Just now",
      delayType: "on-time" as const,
    },
    {
      route: "KR Puram → Hebbal",
      status: "Delayed by 8 minutes",
      updatedAt: "5 mins ago",
      delayType: "delayed" as const,
    },
    {
      route: "Yelahanka → Yeshwantpur",
      status: "On Time",
      updatedAt: "1 min ago",
      delayType: "on-time" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-gray-50">
      <main className="mx-auto max-w-7xl px-5 py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-700 px-5 py-2 text-sm font-medium mb-4">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-500 opacity-75"></span>
              <span className="relative inline-flex size-2.5 rounded-full bg-amber-600"></span>
            </span>
            Live Updates Active
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Your Daily Routes
          </h1>
          <div className="mt-3 h-1 w-28 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          <p className="mt-5 text-gray-600 text-lg">
            Real-time status of your frequent commutes • Powered by community + AI
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {routes.map((item, index) => (
            <StatusCard key={index} {...item} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 Delayloadess • Helping Bengaluru commute smarter every day
          </p>
        </div>
      </main>
    </div>
  );
}