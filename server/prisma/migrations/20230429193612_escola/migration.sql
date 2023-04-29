-- CreateTable
CREATE TABLE "Escola" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "qntdSalas" INTEGER NOT NULL,
    "qntdAlunos" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Escola_pkey" PRIMARY KEY ("id")
);
