/*
  Warnings:

  - A unique constraint covering the columns `[templateId]` on the table `Footer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[templateId]` on the table `MenuItems` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[templateId]` on the table `ServicesData` will be added. If there are existing duplicate values, this will fail.
  - Made the column `templateId` on table `MenuItems` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "MenuItems" DROP CONSTRAINT "MenuItems_templateId_fkey";

-- AlterTable
ALTER TABLE "MenuItems" ALTER COLUMN "templateId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Footer_templateId_key" ON "Footer"("templateId");

-- CreateIndex
CREATE UNIQUE INDEX "MenuItems_templateId_key" ON "MenuItems"("templateId");

-- CreateIndex
CREATE UNIQUE INDEX "ServicesData_templateId_key" ON "ServicesData"("templateId");

-- AddForeignKey
ALTER TABLE "MenuItems" ADD CONSTRAINT "MenuItems_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "AbstractTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
