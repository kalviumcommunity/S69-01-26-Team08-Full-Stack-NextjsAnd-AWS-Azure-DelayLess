"use client";

import { useState } from "react";
import { Clock, AlertTriangle, Bell } from "lucide-react";

export default function Home() {
  const [trainNumber, setTrainNumber] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch Live Train Data
  const handleSearch = async () => {
    if (!trainNumber.trim()) {
      setError("Please enter a train number.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trainNumber }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Train not found.");
        setLoading(false);
        return;
      }

      setResult(data.live);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-gray-50">
      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* ✅ Hero Section */}
        <div className="text-center mb-14">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-6 py-2 text-sm font-medium text-green-700 border border-green-200 mb-6 shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Live Intelligence Active
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            Know delays{" "}
            <span className="text-amber-600">before</span> they happen.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time Train Delay + Crowd Tracking powered by Prisma + AI.
          </p>

          {/* ✅ Search Bar */}
          <div className="mt-10 flex justify-center">
            <div className="flex w-full max-w-xl rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-md">
              <input
                value={trainNumber}
                onChange={(e) => setTrainNumber(e.target.value)}
                placeholder="Enter Train Number (eg: 12627)"
                className="flex-1 px-6 py-4 text-gray-800 outline-none text-lg"
              />

              <button
                onClick={handleSearch}
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-semibold transition-all"
              >
                Check Delay
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm md:text-base">
            <div className="flex items-center gap-2 text-green-700">
              <Clock size={18} /> Live updates
            </div>
            <div className="flex items-center gap-2 text-amber-700">
              <AlertTriangle size={18} /> Delay prediction
            </div>
            <div className="flex items-center gap-2 text-blue-700">
              <Bell size={18} /> Smart alerts
            </div>
          </div>
        </div>

        {/* ✅ Loading */}
        {loading && (
          <div className="text-center text-lg font-medium text-gray-500 mt-10">
            Fetching live train status...
          </div>
        )}

        {/* ✅ Error */}
        {error && (
          <div className="text-center mt-10 text-red-600 font-medium">
            ❌ {error}
          </div>
        )}

        {/* ✅ Live Result Card */}
        {result && (
          <div className="max-w-4xl mx-auto mt-14">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 bg-gradient-to-r from-amber-50 to-white border-b">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Train {result.trainNumber} — {result.trainName || "Live"}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Updated just now • Current Station:{" "}
                    <span className="font-medium">
                      {result.currentStation || "Unknown"}
                    </span>
                  </p>
                </div>

                <span className="px-5 py-2 rounded-full bg-amber-100 text-amber-800 border border-amber-200 text-sm font-semibold">
                  Delay +{result.delay} min
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 px-8 py-8">
                <div className="p-6 rounded-2xl bg-gray-50 border shadow-sm">
                  <p className="text-sm text-gray-500 mb-2">Delay Time</p>
                  <p className="text-3xl font-bold text-amber-700">
                    {result.delay} min
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gray-50 border shadow-sm">
                  <p className="text-sm text-gray-500 mb-2">Crowd Level</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {result.crowdLevel || "N/A"}
                  </p>
                </div>
              </div>

              {/* ✅ Route Timeline */}
              <div className="px-8 pb-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Live Route Tracking
                </h3>

                {result.route?.length > 0 ? (
                  <div className="space-y-4 relative">
                    {/* Line */}
                    <div className="absolute left-3 top-2 bottom-2 w-[2px] bg-gradient-to-b from-amber-400 to-gray-200"></div>

                    {result.route.map((stop: any, index: number) => (
                      <div
                        key={index}
                        className="relative flex items-start gap-4 bg-white border rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition"
                      >
                        {/* Dot */}
                        <div className="mt-1 z-10 h-4 w-4 rounded-full bg-amber-500 border-4 border-white shadow"></div>

                        <div>
                          <p className="font-semibold text-gray-900">
                            {stop.station}
                          </p>
                          <p className="text-sm text-gray-500">
                            Departure: {stop.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No route stops available in API response.
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="px-8 py-5 text-center text-xs text-gray-400 bg-gray-50 border-t">
                © 2026 DelayLess • Smarter rail commutes for India
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}