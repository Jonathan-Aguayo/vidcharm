/*
  Warnings:

  - You are about to drop the column `chanId` on the `Video` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Playlist_chanId_fkey` ON `Playlist`;

-- DropIndex
DROP INDEX `Video_chanId_fkey` ON `Video`;

-- AlterTable
ALTER TABLE `Video` DROP COLUMN `chanId`;
