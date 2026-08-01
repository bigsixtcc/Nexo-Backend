/*
  Warnings:

  - A unique constraint covering the columns `[tokenVerificacao]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tokenResetSenha]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `emailVerificado` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `tokenResetSenha` VARCHAR(191) NULL,
    ADD COLUMN `tokenResetSenhaExpira` DATETIME(3) NULL,
    ADD COLUMN `tokenVerificacao` VARCHAR(191) NULL,
    ADD COLUMN `tokenVerificacaoExpira` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_tokenVerificacao_key` ON `User`(`tokenVerificacao`);

-- CreateIndex
CREATE UNIQUE INDEX `User_tokenResetSenha_key` ON `User`(`tokenResetSenha`);
