"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Train {
  trainNumber: string;
  name: string;
  delay: number;
  crowdLevel: string;
  status: string;
  progress: number;
}

export default function Dashboard() {
  const [trains, setTrains] = useState<Train[]>([]);

  useEffect(() => {
    const load = () => {
      fetch("/api/status")
        .then((r) => r.json())
        .then((d) => setTrains(d.trains || []));
    };

    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 py-10">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Live Train Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Real-time delay & crowd insights
          </p>
        </div>

        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
          <span className="h-2.5 w-2.5 bg-green-500 rounded-full animate-pulse" />
          Live
        </div>
      </div>

      {/* Cards */}
      {trains.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          No trains available
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {trains.map((t) => {
            const delayColor =
              t.delay > 15
                ? "bg-red-100 text-red-700"
                : t.delay > 5
                ? "bg-orange-100 text-orange-700"
                : "bg-emerald-100 text-emerald-700";

            return (
              <Link key={t.trainNumber} href={`/train/${t.trainNumber}`}>
                <div className="cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">

                  {/* Title */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {t.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        #{t.trainNumber}
                      </p>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${delayColor}`}>
                      {t.delay > 0 ? `+${t.delay} min` : "On time"}
                    </span>
                  </div>

                  {/* Status */}
                  <p className="mt-3 text-sm text-gray-600">
                    {t.status} • Crowd: {t.crowdLevel}
                  </p>

                  {/* Progress */}
                  <div className="mt-5">
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-700"
                        style={{ width: `${t.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {t.progress}% journey completed
                    </p>
                  </div>

                  <p className="mt-4 text-xs text-orange-600 font-medium">
                    View full live details →
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}