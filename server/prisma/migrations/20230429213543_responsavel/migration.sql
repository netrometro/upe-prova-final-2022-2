/*
  Warnings:

  - You are about to drop the column `dono` on the `Animal` table. All the data in the column will be lost.
  - Added the required column `responsavel` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "dono",
ADD COLUMN     "responsavel" TEXT NOT NULL;
