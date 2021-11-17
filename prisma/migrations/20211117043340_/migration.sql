/*
  Warnings:

  - You are about to drop the `Channel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Channel` DROP FOREIGN KEY `Channel_uId_fkey`;

-- DropForeignKey
ALTER TABLE `Playlist` DROP FOREIGN KEY `Playlist_chanId_fkey`;

-- DropForeignKey
ALTER TABLE `Video` DROP FOREIGN KEY `Video_chanId_fkey`;

-- DropTable
DROP TABLE `Channel`;
