-- AlterTable
ALTER TABLE `User` ADD COLUMN `createData` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE INDEX `Post_authorId_idx` ON `Post`(`authorId`);
