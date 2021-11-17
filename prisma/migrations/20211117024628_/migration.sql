/*
  Warnings:

  - A unique constraint covering the columns `[posterUrl]` on the table `Video` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Video` ADD COLUMN `posterUrl` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX `Video_posterUrl_key` ON `Video`(`posterUrl`);
