/*
  Warnings:

  - You are about to drop the column `tipo_leitura` on the `livro` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_id` on the `livro` table. All the data in the column will be lost.
  - Added the required column `tipoLeitura` to the `livro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `livro` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."livro" DROP CONSTRAINT "livro_usuario_id_fkey";

-- AlterTable
ALTER TABLE "livro" DROP COLUMN "tipo_leitura",
DROP COLUMN "usuario_id",
ADD COLUMN     "tipoLeitura" TEXT NOT NULL,
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "livro" ADD CONSTRAINT "livro_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
