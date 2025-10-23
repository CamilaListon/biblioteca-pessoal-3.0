-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "livro" (
    "id" SERIAL NOT NULL,
    "isbn" INTEGER NOT NULL,
    "autor" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "editora" TEXT NOT NULL,
    "tipo_leitura" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "status" TEXT NOT NULL,
    "avaliacao" TEXT NOT NULL,
    "comentario" TEXT NOT NULL,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "livro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "livro_isbn_key" ON "livro"("isbn");

-- AddForeignKey
ALTER TABLE "livro" ADD CONSTRAINT "livro_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
