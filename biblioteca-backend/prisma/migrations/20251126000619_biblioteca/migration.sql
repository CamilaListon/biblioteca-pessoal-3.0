/*
  Warnings:

  - You are about to drop the column `tipoLeitura` on the `livro` table. All the data in the column will be lost.
  - Added the required column `tipo_leitura` to the `livro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "livro" DROP COLUMN "tipoLeitura",
ADD COLUMN     "tipo_leitura" TEXT NOT NULL;
