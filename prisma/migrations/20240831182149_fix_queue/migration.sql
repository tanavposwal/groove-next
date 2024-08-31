/*
  Warnings:

  - Added the required column `seconds` to the `Queue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Queue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Queue" ADD COLUMN     "seconds" INTEGER NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL;
