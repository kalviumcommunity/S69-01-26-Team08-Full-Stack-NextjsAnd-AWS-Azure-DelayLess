"use client";

import { useEffect, useState } from "react";

interface Train {
  trainNumber: string;
  name: string;
  delay: number;
  crowdLevel: string;
  status: string;
  progress: number;
  route: Array<{ station: string; time: string; isPassed?: boolean }>;
}

export default function Dashboard() {
  const [trains, setTrains] = useState<Train[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/status")
      .then((r) => r.json())
      .then((d) => setTrains(d.trains || []));

    const interval = setInterval(() => {
      fetch("/api/status")
        .then((r) => r.json())
        .then((d) => setTrains(d.trains || []));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-white px-5 py-8 md:px-10 lg:px-16">
      {/* Header with live indicator */}
      <div className="mb-10 flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Live Train Status
          </h1>
          <p className="mt-1.5 text-gray-600">
            Real-time updates • Powered by AI
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5 text-sm font-medium text-green-700 shadow-sm">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
          </span>
          Live Intelligence Active
        </div>
      </div>

      {/* Train cards – main focus */}
      {trains.length === 0 ? (
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center text-gray-500">
          <p className="text-lg">No active trains found at the moment</p>
          <p className="mt-2 text-sm">Check back soon or search for a specific train</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {trains.map((train) => {
            const delayColor =
              train.delay > 15
                ? "bg-red-50 text-red-700 border-red-100"
                : train.delay > 5
                ? "bg-orange-50 text-orange-700 border-orange-100"
                : "bg-emerald-50 text-emerald-700 border-emerald-100";

            const progressColor = train.delay > 10 ? "from-red-500 to-orange-500" : "from-orange-400 to-orange-600";

            const isOpen = open === train.trainNumber;

            return (
              <div
                key={train.trainNumber}
                className={`
                  group relative overflow-hidden rounded-2xl border border-gray-100 bg-white
                  shadow transition-all duration-300 hover:shadow-xl hover:border-orange-200/60
                  ${isOpen ? "shadow-2xl border-orange-300/50 scale-[1.015]" : ""}
                `}
                onClick={() => setOpen(isOpen ? null : train.trainNumber)}
              >
                {/* Card header */}
                <div className="flex items-start justify-between px-6 py-5">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {train.name}
                    </h3>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Train #{train.trainNumber}
                    </p>
                  </div>

                  <span
                    className={`
                      inline-flex shrink-0 items-center rounded-full border px-3.5 py-1 text-xs font-semibold
                      ${delayColor} transition-colors
                    `}
                  >
                    {train.delay > 0 ? `+${train.delay} min` : "On time"}
                  </span>
                </div>

                {/* Quick info */}
                <div className="px-6 pb-3 text-sm text-gray-600">
                  <span className="font-medium">{train.status}</span>
                  {" • "}Crowd level: {train.crowdLevel}
                </div>

                {/* Progress – prominent */}
                <div className="px-6 pb-5">
                  <div className="relative h-3 w-full rounded-full bg-gray-50">
                    <div
                      className={`absolute h-full rounded-full bg-gradient-to-r ${progressColor} transition-all duration-1000 ease-out`}
                      style={{ width: `${train.progress}%` }}
                    />
                    <div
                      className="absolute -top-2 h-6 w-6 -translate-x-1/2 transform transition-all duration-1000 ease-out"
                      style={{ left: `${train.progress}%` }}
                    >
                      <span className="relative flex h-full w-full items-center justify-center">
                        <span className="absolute h-5 w-5 animate-ping rounded-full bg-orange-400/20" />
                        <span className="relative h-3 w-3 rounded-full bg-orange-600 shadow-sm" />
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>Departed</span>
                    <span>{train.progress}% complete</span>
                  </div>
                </div>

                {/* Expandable route */}
                <div
                  className={`
                    overflow-hidden border-t border-gray-50 transition-all duration-500 ease-in-out
                    ${isOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <div className="px-6 pb-6 pt-5">
                    <div className="space-y-5">
                      {train.route.map((stop, idx) => (
                        <div key={idx} className="relative pl-7">
                          {idx < train.route.length - 1 && (
                            <div className="absolute left-3 top-0 h-full w-0.5 bg-gray-100" />
                          )}
                          <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-gray-200 bg-white" />
                          <div>
                            <p className={`font-medium ${stop.isPassed ? "text-gray-400" : "text-gray-900"}`}>
                              {stop.station}
                            </p>
                            <p className="text-sm text-gray-500">{stop.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Expand hint */}
                <div className="px-6 pb-5 text-right text-xs text-gray-400 opacity-60 transition-opacity group-hover:opacity-100">
                  {isOpen ? "Click to collapse" : "View route details"}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}