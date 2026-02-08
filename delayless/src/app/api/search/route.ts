import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { trainNumber } = await req.json();

    if (!trainNumber) {
      return NextResponse.json(
        { success: false, message: "Train number required" },
        { status: 400 }
      );
    }

    // ✅ Search train in database
    const train = await prisma.train.findUnique({
      where: { trainNumber },
      include: {
        schedules: true,
        statuses: true,
      },
    });

    if (!train) {
      return NextResponse.json({
        success: false,
        message: "Train not found in DelayLess database",
      });
    }

    // ✅ Latest live status
    const status = train.statuses[0];

    // ✅ Convert schedules to readable route timeline
    const routeTimeline = train.schedules.map((s) => ({
      station: `Stop ${s.sourceId} → Stop ${s.destinationId}`,
      departure: s.departureTime,
      arrival: s.arrivalTime,
    }));

    // ✅ Response like real tracker
    return NextResponse.json({
      success: true,
      live: {
        trainNumber: train.trainNumber,
        trainName: train.name,
        delay: status?.delayMinutes ?? 0,
        crowdLevel: status?.crowdLevel ?? "Medium",
        updatedAt: status?.updatedAt ?? null,
        route: routeTimeline,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Server crashed",
        error: err.message,
      },
      { status: 500 }
    );
  }
}