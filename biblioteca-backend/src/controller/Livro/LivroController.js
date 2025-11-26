<<<<<<< HEAD
// import { prisma } from '../../../prisma/prisma.js';
import { PrismaClient } from "@prisma/client";
export const prismaClient = new PrismaClient();


=======
import prisma from "../../prisma/client.js";
>>>>>>> 4e5421ffb70bdcf23fe2199b9cf0d6bfa15ee27e

// ==============================
//  GET – Livros do usuário
// ==============================
export const getLivrosPorUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;

    const livros = await prisma.livro.findMany({
      where: { usuarioId: Number(usuarioId) },
    });

    if (livros.length === 0) {
      return res.status(404).json({
        message: "Esse usuário não possui livros cadastrados."
      });
    }

    return res.status(200).json(livros);
  } catch (error) {
    console.error("Erro ao buscar livros por usuário:", error);
    return res.status(500).json({ message: "Erro interno." });
  }
};

// ==============================
//  GET – Livro específico do usuário
// ==============================
export const getLivroDoUsuarioPorId = async (req, res) => {
  try {
<<<<<<< HEAD
    const livro = await prismaClient.livro.findMany({
      where: { id: Number(req.params.id) },
      include: { usuario: true }
=======
    const { usuarioId, livroId } = req.params;

    const livro = await prisma.livro.findFirst({
      where: {
        id: Number(livroId),
        usuarioId: Number(usuarioId),
      },
>>>>>>> 4e5421ffb70bdcf23fe2199b9cf0d6bfa15ee27e
    });

    if (!livro) {
      return res.status(404).json({
        message: "Livro não encontrado para este usuário."
      });
    }

    return res.status(200).json(livro);
  } catch (error) {
    console.error("Erro ao buscar livro do usuário:", error);
    return res.status(500).json({ message: "Erro interno." });
  }
};

// ==============================
//  POST – Criar livro para um usuário
// ==============================
export const criarLivroParaUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const {
      isbn,
      autor,
      genero,
      editora,
      tipo_leitura,
      valor,
      status,
      avaliacao,
      comentario
    } = req.body;

    const novoLivro = await prisma.livro.create({
      data: {
        isbn,
        autor,
        genero,
        editora,
        tipo_leitura,
        valor,
        status,        // precisa ser um valor do enum StatusLivro
        avaliacao,
        comentario,
        usuarioId: Number(usuarioId),
      }
    });

    return res.status(201).json(novoLivro);
  } catch (error) {
    console.error("Erro ao criar livro:", error);
    return res.status(500).json({ message: "Erro interno." });
  }
};

// ==============================
//  PUT – Atualizar livro de um usuário
// ==============================
export const atualizarLivroDoUsuario = async (req, res) => {
  try {
    const { usuarioId, livroId } = req.params;
    const dados = req.body;

    const livro = await prisma.livro.findFirst({
      where: {
        id: Number(livroId),
        usuarioId: Number(usuarioId),
      },
    });

    if (!livro) {
      return res.status(404).json({
        message: "Livro não encontrado para este usuário."
      });
    }

    const livroAtualizado = await prisma.livro.update({
      where: { id: Number(livroId) },
      data: dados,
    });

    return res.status(200).json(livroAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
    return res.status(500).json({ message: "Erro interno." });
  }
};

// ==============================
//  DELETE – Remover livro de um usuário
// ==============================
export const deletarLivroDoUsuario = async (req, res) => {
  try {
    const { usuarioId, livroId } = req.params;

    const livro = await prisma.livro.findFirst({
      where: {
        id: Number(livroId),
        usuarioId: Number(usuarioId),
      },
    });

    if (!livro) {
      return res.status(404).json({
        message: "Livro não encontrado para este usuário."
      });
    }

    await prisma.livro.delete({
      where: { id: Number(livroId) },
    });

    return res.status(200).json({ message: "Livro deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
    return res.status(500).json({ message: "Erro interno." });
  }
<<<<<<< HEAD
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
=======
};
>>>>>>> 4e5421ffb70bdcf23fe2199b9cf0d6bfa15ee27e
