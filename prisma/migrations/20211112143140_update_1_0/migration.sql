/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uid` on the `User` table. All the data in the column will be lost.
  - Added the required column `uId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `uid`,
    ADD COLUMN `uId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`uId`);

-- CreateTable
CREATE TABLE `Comment` (
    `comId` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `datePosted` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `like` INTEGER NOT NULL,
    `dislike` INTEGER NOT NULL,
    `uId` VARCHAR(191) NOT NULL,
    `vId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`comId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Video` (
    `vId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `vidUrl` VARCHAR(191) NOT NULL,
    `datePosted` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `views` INTEGER NOT NULL,
    `like` INTEGER NOT NULL,
    `dislike` INTEGER NOT NULL,
    `uId` VARCHAR(191) NOT NULL,
    `chanId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Video_vidUrl_key`(`vidUrl`),
    PRIMARY KEY (`vId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Channel` (
    `chanId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `profilePicUrl` VARCHAR(191) NOT NULL,
    `uId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Channel_name_key`(`name`),
    UNIQUE INDEX `Channel_uId_key`(`uId`),
    PRIMARY KEY (`chanId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Playlist` (
    `pId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `listUrl` VARCHAR(191) NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uId` VARCHAR(191) NOT NULL,
    `chanId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Playlist_listUrl_key`(`listUrl`),
    PRIMARY KEY (`pId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `include` (
    `pId` VARCHAR(191) NOT NULL,
    `vId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`pId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_uId_fkey` FOREIGN KEY (`uId`) REFERENCES `User`(`uId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_vId_fkey` FOREIGN KEY (`vId`) REFERENCES `Video`(`vId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_uId_fkey` FOREIGN KEY (`uId`) REFERENCES `User`(`uId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_chanId_fkey` FOREIGN KEY (`chanId`) REFERENCES `Channel`(`chanId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Channel` ADD CONSTRAINT `Channel_uId_fkey` FOREIGN KEY (`uId`) REFERENCES `User`(`uId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Playlist` ADD CONSTRAINT `Playlist_uId_fkey` FOREIGN KEY (`uId`) REFERENCES `User`(`uId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Playlist` ADD CONSTRAINT `Playlist_chanId_fkey` FOREIGN KEY (`chanId`) REFERENCES `Channel`(`chanId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `include` ADD CONSTRAINT `include_pId_fkey` FOREIGN KEY (`pId`) REFERENCES `Playlist`(`pId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `include` ADD CONSTRAINT `include_vId_fkey` FOREIGN KEY (`vId`) REFERENCES `Video`(`vId`) ON DELETE RESTRICT ON UPDATE CASCADE;
