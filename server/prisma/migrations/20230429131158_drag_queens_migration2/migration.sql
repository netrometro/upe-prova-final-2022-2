-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DragQueen" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "season" INTEGER NOT NULL,
    "winner" BOOLEAN NOT NULL,
    "info" TEXT,

    CONSTRAINT "DragQueen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
