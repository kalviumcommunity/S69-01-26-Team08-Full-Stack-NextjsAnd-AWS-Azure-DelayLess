import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.station.createMany({
    data: [
      { name: "Mumbai CST", code: "CST" },
      { name: "Thane", code: "TNA" }
    ]
  });

  await prisma.train.create({
    data: {
      trainNumber: "12345",
      name: "Fast Local"
    }
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
