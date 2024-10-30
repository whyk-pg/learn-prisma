/*
  Warnings:

  - You are about to drop the `tbl_movieinfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_theater` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tbl_movieinfo` DROP FOREIGN KEY `tbl_movieinfo_creater_country_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_movieinfo` DROP FOREIGN KEY `tbl_movieinfo_movie_format_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_movieinfo` DROP FOREIGN KEY `tbl_movieinfo_screening_format_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_movieinfo` DROP FOREIGN KEY `tbl_movieinfo_theater_id_fkey`;

-- DropTable
DROP TABLE `tbl_movieinfo`;

-- DropTable
DROP TABLE `tbl_theater`;

-- CreateTable
CREATE TABLE `movies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(246) NOT NULL,
    `is_subtitles` BOOLEAN NOT NULL,
    `theater_id` INTEGER NOT NULL,
    `creater_country_id` INTEGER NOT NULL,
    `movie_format_id` INTEGER NOT NULL,
    `screening_format_id` INTEGER NOT NULL,
    `view_start_datetime` DATETIME(3) NOT NULL,
    `view_end_datetime` DATETIME(3) NOT NULL,
    `companions_count` INTEGER NULL,
    `rating` INTEGER NULL,
    `comment` TEXT NULL,

    UNIQUE INDEX `movies_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `theaters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(246) NOT NULL,

    UNIQUE INDEX `theaters_id_key`(`id`),
    UNIQUE INDEX `theaters_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `movies` ADD CONSTRAINT `movies_theater_id_fkey` FOREIGN KEY (`theater_id`) REFERENCES `theaters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movies` ADD CONSTRAINT `movies_creater_country_id_fkey` FOREIGN KEY (`creater_country_id`) REFERENCES `creaters_countries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movies` ADD CONSTRAINT `movies_movie_format_id_fkey` FOREIGN KEY (`movie_format_id`) REFERENCES `movie_formats`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movies` ADD CONSTRAINT `movies_screening_format_id_fkey` FOREIGN KEY (`screening_format_id`) REFERENCES `screening_formats`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
