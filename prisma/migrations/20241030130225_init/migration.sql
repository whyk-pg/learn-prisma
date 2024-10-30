-- CreateTable
CREATE TABLE `tbl_movieinfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(246) NOT NULL,
    `is_dubbed` BOOLEAN NOT NULL,
    `is_domestic` BOOLEAN NOT NULL,
    `is_live_action` BOOLEAN NOT NULL,
    `theater_id` INTEGER NOT NULL,
    `view_start_datetime` DATETIME(3) NOT NULL,
    `view_end_datetime` DATETIME(3) NOT NULL,
    `accompanier` INTEGER NULL,
    `rating` INTEGER NULL,
    `comment` TEXT NULL,

    UNIQUE INDEX `tbl_movieinfo_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_theater` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(246) NOT NULL,

    UNIQUE INDEX `tbl_theater_id_key`(`id`),
    UNIQUE INDEX `tbl_theater_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_movieinfo` ADD CONSTRAINT `tbl_movieinfo_theater_id_fkey` FOREIGN KEY (`theater_id`) REFERENCES `tbl_theater`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
