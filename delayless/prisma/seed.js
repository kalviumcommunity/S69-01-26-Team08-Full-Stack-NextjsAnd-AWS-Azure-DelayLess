const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.station.createMany({
    data: [
      { name: "Mumbai CST", code: "CST" },
      { name: "Thane", code: "TNA" }
    ],
    skipDuplicates: true
  });

  await prisma.train.create({
    data: {
      trainNumber: "12345",
      name: "Fast Local"
    }
  });

  console.log("✅ Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
