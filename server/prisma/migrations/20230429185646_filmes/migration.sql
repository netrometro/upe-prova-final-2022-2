-- CreateTable
CREATE TABLE "Filme" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "duracao" INTEGER NOT NULL,
    "em_cartaz" BOOLEAN NOT NULL,

    CONSTRAINT "Filme_pkey" PRIMARY KEY ("id")
);
