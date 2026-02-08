export default function StatusCard({
  route,
  status,
  updatedAt,
  delayType,
  crowdLevel,
}: any) {
  // ✅ Crowd Badge Colors
  const badge =
    crowdLevel === "High"
      ? "bg-red-100 text-red-700"
      : crowdLevel === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (
    <div className="rounded-2xl bg-white shadow-md p-6 hover:shadow-lg transition">
      {/* Route */}
      <h2 className="text-lg font-semibold text-gray-900">{route}</h2>

      {/* Delay Status */}
      <p
        className={`mt-3 text-xl font-bold ${
          delayType === "delayed" ? "text-red-600" : "text-green-600"
        }`}
      >
        {status}
      </p>

      {/* Footer Row */}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">{updatedAt}</span>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${badge}`}
        >
          Crowd: {crowdLevel}
        </span>
      </div>
    </div>
  );
}