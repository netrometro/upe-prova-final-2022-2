/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `Livro` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Livro" DROP CONSTRAINT "Livro_usuarioId_fkey";

-- DropIndex
DROP INDEX "Livro_usuarioId_key";

-- AlterTable
ALTER TABLE "Livro" DROP COLUMN "usuarioId";
