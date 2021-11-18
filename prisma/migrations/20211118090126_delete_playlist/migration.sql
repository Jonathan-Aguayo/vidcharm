/*
  Warnings:

  - You are about to drop the `Playlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `include` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Playlist` DROP FOREIGN KEY `Playlist_uId_fkey`;

-- DropForeignKey
ALTER TABLE `include` DROP FOREIGN KEY `include_pId_fkey`;

-- DropForeignKey
ALTER TABLE `include` DROP FOREIGN KEY `include_vId_fkey`;

-- DropTable
DROP TABLE `Playlist`;

-- DropTable
DROP TABLE `include`;
