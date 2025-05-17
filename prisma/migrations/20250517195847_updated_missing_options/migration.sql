/*
  Warnings:

  - Added the required column `heroTitle` to the `AbstractTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AbstractTemplate" ADD COLUMN     "heroTitle" TEXT NOT NULL;
