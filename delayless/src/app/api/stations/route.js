import { connectDB } from "@/lib/mongodb";
import Station from "@/models/Station";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const stations = await Station.find();
  return NextResponse.json(stations);
}
