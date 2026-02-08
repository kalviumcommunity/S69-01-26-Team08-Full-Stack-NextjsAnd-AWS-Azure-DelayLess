"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline"; // ← install @heroicons/react if not already

interface TrainDetail {
  trainNumber: string;
  name: string;
  delay: number;
  crowdLevel: string;
  status: string;
  progress: number;
  lastUpdated: string;
  route: Array<{ station: string; time: string; isPassed?: boolean }>;
}

export default function TrainDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [train, setTrain] = useState<TrainDetail | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadTrain() {
    setLoading(true);
    try {
      const r = await fetch("/api/status");
      const d = await r.json();
      const found = (d.trains || []).find(
        (t: TrainDetail) => t.trainNumber === id
      );
      setTrain(found || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTrain();

    // Optional: refresh every 20–30s for live feel
    const interval = setInterval(loadTrain, 20000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading train details...</p>
        </div>
      </main>
    );
  }

  if (!train) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Train not found</h2>
        <p className="text-gray-600 mb-6">The train number may be invalid or not currently active.</p>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Go Back
        </button>
      </main>
    );
  }

  const delayColor =
    train.delay > 15
      ? "bg-red-50 text-red-700 border-red-100"
      : train.delay > 5
      ? "bg-orange-50 text-orange-700 border-orange-100"
      : "bg-emerald-50 text-emerald-700 border-emerald-100";

  const progressGradient =
    train.delay > 10
      ? "from-red-500 via-orange-500 to-orange-600"
      : "from-orange-400 via-orange-500 to-orange-600";

  return (
    <main className="min-h-screen bg-white px-5 py-8 md:px-10 lg:px-16">
      {/* Header with back button */}
      <div className="mb-10">
        <button
          onClick={() => router.back()}
          className="group mb-4 inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition"
        >
          <ArrowLeftIcon className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          Back to dashboard
        </button>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          {train.name}
        </h1>
        <div className="mt-2 flex items-center gap-3 text-gray-600">
          <span>Train #{train.trainNumber}</span>
          <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full">
            Last updated: {train.lastUpdated || "moments ago"}
          </span>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
        <StatCard label="Current Status" value={train.status} />
        <StatCard
          label="Delay"
          value={train.delay > 0 ? `+${train.delay} min` : "On time"}
          className={delayColor}
        />
        <StatCard label="Crowd Level" value={train.crowdLevel} />
        <StatCard label="Progress" value={`${train.progress}%`} />
      </div>

      {/* Journey Progress – prominent & animated */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-12 transition-all hover:shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Journey Progress
        </h2>

        <div className="relative h-4 bg-gray-50 rounded-full overflow-hidden">
          <div
            className={`absolute inset-y-0 left-0 bg-gradient-to-r ${progressGradient} transition-all duration-1500 ease-out`}
            style={{ width: `${train.progress}%` }}
          />
        </div>

        <div
          className="absolute -top-3 transition-all duration-1500 ease-out pointer-events-none"
          style={{ left: `calc(${train.progress}% - 1.25rem)` }}
        >
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-orange-400/30" />
            <div className="h-10 w-10 rounded-full bg-orange-600 shadow-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">{train.progress}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between text-sm text-gray-600">
          <span>Origin</span>
          <span className="font-medium text-orange-700">{train.progress}% complete</span>
          <span>Destination</span>
        </div>
      </div>

      {/* Route Timeline */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
        <h2 className="text-xl font-semibold text-gray-900 mb-8">
          Full Route Timeline
        </h2>

        <div className="space-y-8">
          {train.route.map((stop, idx) => (
            <div
              key={idx}
              className={`relative pl-10 transition-opacity duration-700 ${stop.isPassed ? "opacity-60" : "opacity-100"}`}
            >
              {/* Connecting line */}
              {idx < train.route.length - 1 && (
                <div
                  className={`absolute left-4 top-5 bottom-0 w-0.5 transition-colors duration-500 ${
                    stop.isPassed ? "bg-gray-200" : "bg-orange-200"
                  }`}
                />
              )}

              {/* Dot */}
              <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center">
                <div
                  className={`h-4 w-4 rounded-full border-2 transition-all duration-500 ${
                    stop.isPassed
                      ? "bg-gray-100 border-gray-300"
                      : "bg-orange-600 border-orange-700 shadow-sm"
                  }`}
                />
              </div>

              {/* Content */}
              <div className="bg-white">
                <p
                  className={`text-lg font-medium ${
                    stop.isPassed ? "text-gray-500 line-through" : "text-gray-900"
                  }`}
                >
                  {stop.station}
                </p>
                <p className="text-sm text-gray-600 mt-0.5">{stop.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  className = "bg-white border-gray-100",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border shadow-sm p-5 transition-all hover:shadow-md ${className}`}
    >
      <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}