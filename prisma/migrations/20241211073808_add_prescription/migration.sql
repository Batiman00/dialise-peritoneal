/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropTable
DROP TABLE "Account";

-- CreateTable
CREATE TABLE "Prescription" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "TotalVolumeUpper" DOUBLE PRECISION NOT NULL,
    "CycleCountUpper" INTEGER NOT NULL,
    "TherapyDurationUpper" INTEGER NOT NULL,
    "SolutionCalciumUpper" DOUBLE PRECISION NOT NULL,
    "SolutionPotassiumUpper" DOUBLE PRECISION NOT NULL,
    "SolutionGlucoseUpper" DOUBLE PRECISION NOT NULL,
    "SolutionInsulinUpper" DOUBLE PRECISION NOT NULL,
    "TotalVolumeLower" DOUBLE PRECISION NOT NULL,
    "CycleCountLower" INTEGER NOT NULL,
    "TherapyDurationLower" INTEGER NOT NULL,
    "SolutionCalciumLower" DOUBLE PRECISION NOT NULL,
    "SolutionPotassiumLower" DOUBLE PRECISION NOT NULL,
    "SolutionGlucoseLower" DOUBLE PRECISION NOT NULL,
    "SolutionInsulinLower" DOUBLE PRECISION NOT NULL,
    "ModelVersion" TEXT NOT NULL,
    "PacientId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Prescription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
