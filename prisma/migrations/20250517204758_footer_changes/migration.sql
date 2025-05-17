/*
  Warnings:

  - Made the column `footerId` on table `FooterOption` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "FooterOption" DROP CONSTRAINT "FooterOption_footerId_fkey";

-- AlterTable
ALTER TABLE "FooterOption" ALTER COLUMN "footerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "FooterOption" ADD CONSTRAINT "FooterOption_footerId_fkey" FOREIGN KEY ("footerId") REFERENCES "Footer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
