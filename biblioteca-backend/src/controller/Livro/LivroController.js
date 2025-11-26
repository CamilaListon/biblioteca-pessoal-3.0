// import { prisma } from '../../../prisma/prisma.js';
import { PrismaClient } from "@prisma/client";
export const prismaClient = new PrismaClient();



// GET /livros
export async function getTodosOsLivros(req, res) {
  try {
    const livros = await prismaClient.livro.findMany({
      include: { usuario: true } // inclui o usuário dono do livro
    });
    return res.json(livros);
  } catch (error) {
    console.error("Erro em getTodosOsLivros:", error);
    return res.status(500).json({ error: "Erro ao buscar livros" });
  }
}

// GET /livros/:id
export async function getLivroPorId(req, res) {
  try {
    const livro = await prismaClient.livro.findMany({
      where: { id: Number(req.params.id) },
      include: { usuario: true }
    });
    if (!livro) return res.status(404).send("Livro não existe!");
    return res.json(livro);
  } catch (error) {
    console.error("Erro em getLivroPorId:", error);
    return res.status(500).json({ error: "Erro ao buscar livro" });
  }
}

// POST /livros
export async function criarLivro(req, res) {
  try {
    const {
      isbn,
      autor,
      genero,
      editora,
      tipo_leitura,
      valor,
      status,
      avaliacao,
      comentario,
      usuario_id
    } = req.body;

    const livro = await prismaClient.livro.create({
      data: {
        isbn,
        autor,
        genero,
        editora,
        tipo_leitura,
        valor,
        status: status || "disponível",
        avaliacao: avaliacao || "",
        comentario: comentario || "",
        usuario_id
      }
    });

    return res.status(201).json(livro);
  } catch (error) {
    console.error("Erro ao criar livro:", error);

    if (error.code === "P2002") {
      return res
        .status(400)
        .send("Falha ao cadastrar livro: ISBN já cadastrado!");
    }

    return res.status(500).send("Erro inesperado no servidor");
  }
}

// PUT /livros/:id
export async function atualizarLivro(req, res) {
  try {
    const { body, params } = req;

    const livroAtualizado = await prismaClient.livro.update({
      where: { id: Number(params.id) },
      data: { ...body }
    });

    return res.status(200).json({
      message: "Livro atualizado!",
      data: livroAtualizado
    });
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);

    if (error.code == "P2025") {
      return res.status(404).send("Livro não existe no banco");
    }
    if (error.code === "P2002") {
      return res
        .status(400)
        .send("Falha ao cadastrar livro: ISBN já cadastrado!");
    }

    return res.status(500).send("Erro inesperado no servidor");
  }
}

// DELETE /livros/:id
export async function deletarLivro(req, res) {
  try {
    const livroDeletado = await prismaClient.livro.delete({
      where: { id: Number(req.params.id) }
    });

    return res.status(200).json({
      message: "Livro deletado!",
      data: livroDeletado
    });
  } catch (error) {
    console.error("Erro ao deletar livro:", error);

    if (error.code == "P2025") {
      return res.status(404).send("Livro não existe no banco");
    }

    return res.status(500).send("Erro inesperado no servidor");
  }
}

// PATCH /livros/:id
export async function atualizarInfoLivro(req, res) {
  try {
    const { id } = req.params;
    const dadosParaAtualizar = req.body;

    const livroAtualizado = await prismaClient.livro.update({
      where: { id: Number(id) },
      data: dadosParaAtualizar
    });

    return res.json({
      message: "Informações do livro atualizadas!",
      data: livroAtualizado
    });

  } catch (error) {
    console.error("Erro ao atualizar informações do livro:", error);

    if (error.code === "P2025") {
      return res.status(404).send("Livro não encontrado!");
    }

    if (error.code === "P2002") {
      return res
        .status(400)
        .send("Falha ao atualizar: ISBN já cadastrado!");
    }

    return res.status(500).send("Erro inesperado no servidor");
  }
}