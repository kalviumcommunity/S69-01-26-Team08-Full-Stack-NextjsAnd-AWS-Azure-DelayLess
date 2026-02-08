import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    trains: [
      {
        trainNumber: "12627",
        name: "Karnataka Express",
        delay: 12,
        crowdLevel: "High",
        status: "Running",
        progress: 65,
        route: [
          { station: "Bangalore", time: "10:00" },
          { station: "Nagpur", time: "16:00" },
          { station: "Delhi", time: "22:00" }
        ]
      },
      {
        trainNumber: "12009",
        name: "Shatabdi Express",
        delay: 0,
        crowdLevel: "Low",
        status: "On Time",
        progress: 30,
        route: [
          { station: "Mysore", time: "08:00" },
          { station: "Bangalore", time: "10:30" },
          { station: "Chennai", time: "15:00" }
        ]
      }
    ]
  });
}