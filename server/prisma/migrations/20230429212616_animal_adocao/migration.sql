/*
  Warnings:

  - You are about to drop the column `donoId` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the `Dono` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dono` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_donoId_fkey";

-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "donoId",
ADD COLUMN     "dono" TEXT NOT NULL;

-- DropTable
DROP TABLE "Dono";
