/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `AbstractTemplate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `MenuItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MenuItems" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AbstractTemplate_userId_key" ON "AbstractTemplate"("userId");

-- AddForeignKey
ALTER TABLE "MenuItems" ADD CONSTRAINT "MenuItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
