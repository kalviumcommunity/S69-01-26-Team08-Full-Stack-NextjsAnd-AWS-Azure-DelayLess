import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ✅ Seed Stations
  await prisma.station.createMany({
    data: [
      { name: "Bangalore City", code: "SBC" },
      { name: "Delhi Junction", code: "DLI" },
      { name: "Mumbai Central", code: "BCT" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Stations Seeded!");

  // ✅ Seed Trains
  await prisma.train.createMany({
    data: [
      { trainNumber: "12627", name: "Karnataka Express" },
      { trainNumber: "12009", name: "Shatabdi Express" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Trains Seeded!");

  // ✅ Fetch Train IDs
  const trains = await prisma.train.findMany();

  // ✅ Seed Live Status
  await prisma.liveStatus.createMany({
    data: [
      {
        trainId: trains[0].id,
        delayMinutes: 12,
        crowdLevel: "High",
      },
      {
        trainId: trains[1].id,
        delayMinutes: 0,
        crowdLevel: "Low",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Live Status Seeded!");
}

console.log("🚉 Seeding Schedules...");

const stations = await prisma.station.findMany();
const trains = await prisma.train.findMany();

await prisma.schedule.createMany({
  data: [
    {
      trainId: trains[0].id,
      sourceId: stations[0].id,
      destinationId: stations[1].id,
      departureTime: new Date("2026-02-04T10:00:00"),
      arrivalTime: new Date("2026-02-04T14:00:00"),
    },
    {
      trainId: trains[0].id,
      sourceId: stations[1].id,
      destinationId: stations[2].id,
      departureTime: new Date("2026-02-04T15:00:00"),
      arrivalTime: new Date("2026-02-04T20:00:00"),
    },
  ],
  skipDuplicates: true,
});

console.log("✅ Schedules Seeded!");

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });