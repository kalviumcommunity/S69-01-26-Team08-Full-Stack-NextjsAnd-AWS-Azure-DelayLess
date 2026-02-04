// components/StatusCard.tsx

interface StatusCardProps {
  route: string;
  status: string;
  updatedAt: string;
  delayType: "on-time" | "delayed";
}

export default function StatusCard({ route, status, updatedAt, delayType }: StatusCardProps) {
  const isOnTime = delayType === "on-time";

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-2xl hover:shadow-amber-100/50 transition-all duration-300 hover:-translate-y-1">
      {/* Subtle top accent bar */}
      <div className={`h-1.5 ${isOnTime ? "bg-gradient-to-r from-emerald-500 to-emerald-600" : "bg-gradient-to-r from-amber-500 to-orange-500"}`} />

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 leading-tight">
            {route}
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isOnTime 
              ? "bg-emerald-100 text-emerald-700" 
              : "bg-amber-100 text-amber-700"
          }`}>
            {isOnTime ? "On Time" : "Delayed"}
          </span>
        </div>

        <p className={`text-lg font-medium mb-3 ${isOnTime ? "text-emerald-700" : "text-amber-700"}`}>
          {status}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
          Updated {updatedAt}
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl ring-4 ring-transparent group-hover:ring-amber-200/30 transition-all duration-500 pointer-events-none" />
    </div>
  );
}