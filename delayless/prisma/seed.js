import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const mumbai = await prisma.station.create({
    data: { name: "Mumbai CST", code: "CST", line: "Central" }
  });

  const thane = await prisma.station.create({
    data: { name: "Thane", code: "TNA", line: "Central" }
  });

  const train = await prisma.train.create({
    data: {
      trainNumber: "12345",
      name: "Fast Local",
      line: "Central"
    }
  });

  await prisma.schedule.create({
    data: {
      delayMinutes: 10,
      trainId: train.id,
      sourceId: mumbai.id,
      destinationId: thane.id
    }
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
