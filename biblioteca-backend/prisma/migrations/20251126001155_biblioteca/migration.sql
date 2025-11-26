/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `livro` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `token` table. All the data in the column will be lost.
  - Added the required column `usuario_id` to the `livro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_id` to the `token` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."livro" DROP CONSTRAINT "livro_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."token" DROP CONSTRAINT "token_usuarioId_fkey";

-- AlterTable
ALTER TABLE "livro" DROP COLUMN "usuarioId",
ADD COLUMN     "usuario_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "token" DROP COLUMN "usuarioId",
ADD COLUMN     "usuario_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "livro" ADD CONSTRAINT "livro_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
