/*
  Warnings:

  - You are about to drop the `user_purchase` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "user_purchase";

-- CreateTable
CREATE TABLE "todos" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);
