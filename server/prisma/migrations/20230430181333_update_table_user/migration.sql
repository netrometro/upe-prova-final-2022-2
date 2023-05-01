-- DropIndex
DROP INDEX "Usuario_email_key";

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "maiorIdade" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sexo" TEXT,
ALTER COLUMN "name" DROP NOT NULL;
