/*
  Warnings:

  - You are about to drop the column `abstractTemplateId` on the `MenuItems` table. All the data in the column will be lost.
  - Added the required column `fillBtnText` to the `AbstractTemplate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `headerTitle` to the `AbstractTemplate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaTitle` to the `AbstractTemplate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outlineBtnText` to the `AbstractTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MenuItems" DROP CONSTRAINT "MenuItems_abstractTemplateId_fkey";

-- AlterTable
ALTER TABLE "AbstractTemplate" ADD COLUMN     "fillBtnText" TEXT NOT NULL,
ADD COLUMN     "headerTitle" TEXT NOT NULL,
ADD COLUMN     "metaTitle" TEXT NOT NULL,
ADD COLUMN     "outlineBtnText" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MenuItems" DROP COLUMN "abstractTemplateId",
ADD COLUMN     "templateId" TEXT;

-- CreateTable
CREATE TABLE "ServicesData" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "btnText" TEXT NOT NULL,
    "themeId" TEXT NOT NULL,

    CONSTRAINT "ServicesData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Footer" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "themeId" TEXT NOT NULL,

    CONSTRAINT "Footer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FooterOption" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "footerId" TEXT,

    CONSTRAINT "FooterOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MenuItems" ADD CONSTRAINT "MenuItems_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "AbstractTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesData" ADD CONSTRAINT "ServicesData_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "AbstractTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Footer" ADD CONSTRAINT "Footer_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "AbstractTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FooterOption" ADD CONSTRAINT "FooterOption_footerId_fkey" FOREIGN KEY ("footerId") REFERENCES "Footer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
