/*
  Warnings:

  - You are about to drop the column `createData` on the `User` table. All the data in the column will be lost.
  - Added the required column `email` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdTime` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `createData`,
    ADD COLUMN `createdTime` DATETIME(3) NOT NULL;
