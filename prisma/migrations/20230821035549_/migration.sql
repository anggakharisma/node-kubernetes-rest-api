/*
  Warnings:

  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Todo";

-- CreateTable
CREATE TABLE "user_purchase" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_purchase_pkey" PRIMARY KEY ("id")
);
