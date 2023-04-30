-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dono" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,

    CONSTRAINT "Dono_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "vacinado" BOOLEAN NOT NULL,
    "donoId" INTEGER,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dono_cpf_key" ON "Dono"("cpf");

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_donoId_fkey" FOREIGN KEY ("donoId") REFERENCES "Dono"("id") ON DELETE SET NULL ON UPDATE CASCADE;
