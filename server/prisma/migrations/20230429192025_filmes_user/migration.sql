/*
  Warnings:

  - Added the required column `userId` to the `Filme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Filme" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Filme" ADD CONSTRAINT "Filme_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
