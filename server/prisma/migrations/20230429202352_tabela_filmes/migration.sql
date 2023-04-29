/*
  Warnings:

  - You are about to drop the column `userId` on the `Filme` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Filme" DROP CONSTRAINT "Filme_userId_fkey";

-- AlterTable
ALTER TABLE "Filme" DROP COLUMN "userId";
