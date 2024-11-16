-- DropTable
DROP TABLE `movies`;

-- DropTable
DROP TABLE `theaters`;

-- DropTable
DROP TABLE `creaters_countries`;

-- DropTable
DROP TABLE `movie_formats`;

-- DropTable
DROP TABLE `screening_formats`;

-- CreateTable
CREATE TABLE `movies` (
    `movie_pk` INTEGER NOT NULL AUTO_INCREMENT,
    `id` CHAR(26) NOT NULL,
    `title` VARCHAR(246) NOT NULL,
    `is_subtitles` BOOLEAN NOT NULL,
    `theater_id` CHAR(26) NOT NULL,
    `creater_country_id` CHAR(26) NOT NULL,
    `movie_format_id` CHAR(26) NOT NULL,
    `screening_format_id` CHAR(26) NOT NULL,
    `view_start_datetime` DATETIME(3) NOT NULL,
    `view_end_datetime` DATETIME(3) NOT NULL,
    `companions_count` INTEGER NULL,
    `rating` INTEGER NULL,
    `comment` TEXT NULL,

    UNIQUE INDEX `movies_movie_pk_key`(`movie_pk`),
    PRIMARY KEY (`movie_pk`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `theaters` (
    `theater_pk` INTEGER NOT NULL AUTO_INCREMENT,
    `id` CHAR(26) NOT NULL,
    `name` VARCHAR(246) NOT NULL,

    UNIQUE INDEX `theaters_theater_pk_key`(`theater_pk`),
    UNIQUE INDEX `theaters_id_key`(`id`),
    UNIQUE INDEX `theaters_name_key`(`name`),
    PRIMARY KEY (`theater_pk`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `creaters_countries` (
    `creater_country_pk` INTEGER NOT NULL AUTO_INCREMENT,
    `id` CHAR(26) NOT NULL,
    `name` VARCHAR(246) NOT NULL,

    UNIQUE INDEX `creaters_countries_creater_country_pk_key`(`creater_country_pk`),
    UNIQUE INDEX `creaters_countries_id_key`(`id`),
    UNIQUE INDEX `creaters_countries_name_key`(`name`),
    PRIMARY KEY (`creater_country_pk`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movie_formats` (
    `movie_format_pk` INTEGER NOT NULL AUTO_INCREMENT,
    `id` CHAR(26) NOT NULL,
    `name` VARCHAR(246) NOT NULL,

    UNIQUE INDEX `movie_formats_movie_format_pk_key`(`movie_format_pk`),
    UNIQUE INDEX `movie_formats_id_key`(`id`),
    UNIQUE INDEX `movie_formats_name_key`(`name`),
    PRIMARY KEY (`movie_format_pk`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `screening_formats` (
    `screening_format_pk` INTEGER NOT NULL AUTO_INCREMENT,
    `id` CHAR(26) NOT NULL,
    `name` VARCHAR(246) NOT NULL,

    UNIQUE INDEX `screening_formats_screening_format_pk_key`(`screening_format_pk`),
    UNIQUE INDEX `screening_formats_id_key`(`id`),
    UNIQUE INDEX `screening_formats_name_key`(`name`),
    PRIMARY KEY (`screening_format_pk`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `movies` ADD CONSTRAINT `movies_theater_id_fkey` FOREIGN KEY (`theater_id`) REFERENCES `theaters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movies` ADD CONSTRAINT `movies_creater_country_id_fkey` FOREIGN KEY (`creater_country_id`) REFERENCES `creaters_countries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movies` ADD CONSTRAINT `movies_movie_format_id_fkey` FOREIGN KEY (`movie_format_id`) REFERENCES `movie_formats`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movies` ADD CONSTRAINT `movies_screening_format_id_fkey` FOREIGN KEY (`screening_format_id`) REFERENCES `screening_formats`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
