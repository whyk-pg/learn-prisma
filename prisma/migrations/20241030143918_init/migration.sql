/*
  Warnings:

  - You are about to drop the column `accompanier` on the `tbl_movieinfo` table. All the data in the column will be lost.
  - You are about to drop the column `is_domestic` on the `tbl_movieinfo` table. All the data in the column will be lost.
  - You are about to drop the column `is_dubbed` on the `tbl_movieinfo` table. All the data in the column will be lost.
  - You are about to drop the column `is_live_action` on the `tbl_movieinfo` table. All the data in the column will be lost.
  - Added the required column `creater_country_id` to the `tbl_movieinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_subtitles` to the `tbl_movieinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movie_format_id` to the `tbl_movieinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `screening_format_id` to the `tbl_movieinfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_movieinfo` DROP COLUMN `accompanier`,
    DROP COLUMN `is_domestic`,
    DROP COLUMN `is_dubbed`,
    DROP COLUMN `is_live_action`,
    ADD COLUMN `companions_count` INTEGER NULL,
    ADD COLUMN `creater_country_id` INTEGER NOT NULL,
    ADD COLUMN `is_subtitles` BOOLEAN NOT NULL,
    ADD COLUMN `movie_format_id` INTEGER NOT NULL,
    ADD COLUMN `screening_format_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `creaters_countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(246) NOT NULL,

    UNIQUE INDEX `creaters_countries_id_key`(`id`),
    UNIQUE INDEX `creaters_countries_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movie_formats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(246) NOT NULL,

    UNIQUE INDEX `movie_formats_id_key`(`id`),
    UNIQUE INDEX `movie_formats_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `screening_formats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(246) NOT NULL,

    UNIQUE INDEX `screening_formats_id_key`(`id`),
    UNIQUE INDEX `screening_formats_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_movieinfo` ADD CONSTRAINT `tbl_movieinfo_creater_country_id_fkey` FOREIGN KEY (`creater_country_id`) REFERENCES `creaters_countries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_movieinfo` ADD CONSTRAINT `tbl_movieinfo_movie_format_id_fkey` FOREIGN KEY (`movie_format_id`) REFERENCES `movie_formats`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_movieinfo` ADD CONSTRAINT `tbl_movieinfo_screening_format_id_fkey` FOREIGN KEY (`screening_format_id`) REFERENCES `screening_formats`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
