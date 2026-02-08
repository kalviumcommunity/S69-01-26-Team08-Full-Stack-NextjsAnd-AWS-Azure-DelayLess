-- CreateEnum
CREATE TYPE "CrowdLevel" AS ENUM ('Low', 'Medium', 'High');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Station" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Train" (
    "id" SERIAL NOT NULL,
    "trainNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Train_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "trainId" INTEGER NOT NULL,
    "sourceId" INTEGER NOT NULL,
    "destinationId" INTEGER NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiveStatus" (
    "id" SERIAL NOT NULL,
    "trainId" INTEGER NOT NULL,
    "delayMinutes" INTEGER NOT NULL,
    "crowdLevel" "CrowdLevel" NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LiveStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteSuggestion" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fromStation" TEXT NOT NULL,
    "toStation" TEXT NOT NULL,
    "suggestion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RouteSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Station_code_key" ON "Station"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Train_trainNumber_key" ON "Train"("trainNumber");

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiveStatus" ADD CONSTRAINT "LiveStatus_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteSuggestion" ADD CONSTRAINT "RouteSuggestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
