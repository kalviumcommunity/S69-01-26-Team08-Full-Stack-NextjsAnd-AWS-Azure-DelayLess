-- CreateTable
CREATE TABLE "CommunityReport" (
    "id" SERIAL NOT NULL,
    "trainNumber" TEXT NOT NULL,
    "station" TEXT NOT NULL,
    "delayMins" INTEGER NOT NULL,
    "crowdLevel" "CrowdLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunityReport_pkey" PRIMARY KEY ("id")
);
