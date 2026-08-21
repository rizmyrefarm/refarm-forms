-- CreateTable
CREATE TABLE `Submission` (
    `id` VARCHAR(191) NOT NULL,
    `formSlug` VARCHAR(191) NOT NULL,
    `formTitle` VARCHAR(191) NOT NULL,
    `projectName` VARCHAR(191) NULL,
    `clientName` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'submitted',
    `data` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Submission_formSlug_idx`(`formSlug`),
    INDEX `Submission_clientName_idx`(`clientName`),
    INDEX `Submission_projectName_idx`(`projectName`),
    INDEX `Submission_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
