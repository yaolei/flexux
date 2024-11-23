-- CreateTable
CREATE TABLE `TtsVoides` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `message_id` VARCHAR(191) NOT NULL,
    `send_user_id` INTEGER NOT NULL,
    `send_user_name` VARCHAR(191) NOT NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `message_data` LONGBLOB NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
