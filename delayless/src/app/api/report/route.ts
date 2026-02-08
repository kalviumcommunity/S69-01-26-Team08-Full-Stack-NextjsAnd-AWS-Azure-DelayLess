import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();

  const report = await prisma.communityReport.create({
    data: {
      trainNumber: body.trainNumber,
      station: body.station,
      delayMins: body.delayMins,
      crowdLevel: body.crowdLevel,
    },
  });

  return Response.json({ success: true, report });
}