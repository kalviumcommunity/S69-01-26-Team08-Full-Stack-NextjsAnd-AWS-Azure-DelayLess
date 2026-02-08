import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const stations = await prisma.station.findMany();

  return Response.json({
    success: true,
    data: stations,
  });
}