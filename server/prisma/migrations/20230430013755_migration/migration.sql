-- CreateTable
CREATE TABLE "DragQueen" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "season" INTEGER NOT NULL,
    "winner" BOOLEAN NOT NULL,
    "info" TEXT,

    CONSTRAINT "DragQueen_pkey" PRIMARY KEY ("id")
);
