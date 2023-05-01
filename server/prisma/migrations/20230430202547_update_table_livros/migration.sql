/*
  Warnings:

  - You are about to drop the column `editoraId` on the `Livro` table. All the data in the column will be lost.
  - You are about to drop the `Editora` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Livro" DROP CONSTRAINT "Livro_editoraId_fkey";

-- AlterTable
ALTER TABLE "Livro" DROP COLUMN "editoraId";

-- DropTable
DROP TABLE "Editora";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
