import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  // 🔹 Demo fallback data (replace later with RapidAPI merge)
  const train = {
    trainNumber: id,
    name: "Express Superfast",
    status: "Running",
    delay: 12,
    progress: 62,
    route: [
      { station: "Bangalore", time: "10:00", isPassed: true },
      { station: "Chennai", time: "14:00", isPassed: true },
      { station: "Vijayawada", time: "18:00" },
      { station: "Delhi", time: "06:00" },
    ],
  };

  return NextResponse.json({ train });
}