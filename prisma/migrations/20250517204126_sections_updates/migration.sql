/*
  Warnings:

  - You are about to drop the column `themeId` on the `Footer` table. All the data in the column will be lost.
  - You are about to drop the column `themeId` on the `ServicesData` table. All the data in the column will be lost.
  - Added the required column `templateId` to the `Footer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Footer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `templateId` to the `ServicesData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ServicesData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Footer" DROP CONSTRAINT "Footer_themeId_fkey";

-- DropForeignKey
ALTER TABLE "ServicesData" DROP CONSTRAINT "ServicesData_themeId_fkey";

-- AlterTable
ALTER TABLE "Footer" DROP COLUMN "themeId",
ADD COLUMN     "templateId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ServicesData" DROP COLUMN "themeId",
ADD COLUMN     "templateId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ServicesData" ADD CONSTRAINT "ServicesData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesData" ADD CONSTRAINT "ServicesData_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "AbstractTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Footer" ADD CONSTRAINT "Footer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Footer" ADD CONSTRAINT "Footer_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "AbstractTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
