-- CreateTable
CREATE TABLE "Train" (
    "id" TEXT NOT NULL,
    "trainNo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "delayMin" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Train_pkey" PRIMARY KEY ("id")
);
