-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Music" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "artista" TEXT NOT NULL,
    "album" TEXT NOT NULL,
    "ano_lancamento" INTEGER NOT NULL,
    "brasileira" BOOLEAN NOT NULL,

    CONSTRAINT "Music_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
