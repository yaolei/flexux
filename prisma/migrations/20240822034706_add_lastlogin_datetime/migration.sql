/*
  Warnings:

  - Added the required column `lastUpdatedTime` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `lastUpdatedTime` DATETIME(3) NOT NULL;
