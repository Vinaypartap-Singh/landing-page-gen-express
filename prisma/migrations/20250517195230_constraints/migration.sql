/*
  Warnings:

  - A unique constraint covering the columns `[templateName]` on the table `AbstractTemplate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[templateName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `AbstractTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AbstractTemplate" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AbstractTemplate_templateName_key" ON "AbstractTemplate"("templateName");

-- CreateIndex
CREATE UNIQUE INDEX "User_templateName_key" ON "User"("templateName");

-- AddForeignKey
ALTER TABLE "AbstractTemplate" ADD CONSTRAINT "AbstractTemplate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
