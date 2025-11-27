import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

// =====================================================
// GET – Listar livros do usuário autenticado
// =====================================================
export const getLivrosPorUsuario = async (req, res) => {
  try {
    const usuarioId = req.user.id;

    const livros = await prisma.livro.findMany({
      where: { usuario_id: usuarioId },
    });

    return res.status(200).json(livros);
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return res.status(500).json({ message: "Erro interno." });
  }
};

// =====================================================
// GET – Buscar 1 livro específico do usuário autenticado
// =====================================================
export const getLivroDoUsuarioPorId = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const livroId = Number(req.params.id);

    const livro = await prisma.livro.findFirst({
      where: {
        id: livroId,
        usuario_id: usuarioId,
      },
    });

    if (!livro) {
      return res.status(404).json({ message: "Livro não encontrado." });
    }

    return res.status(200).json(livro);
  } catch (error) {
    console.error("Erro ao buscar livro:", error);
    return res.status(500).json({ message: "Erro interno." });
  }
};

// =====================================================
// POST – Criar livro para o usuário autenticado
// =====================================================
export const criarLivroParaUsuario = async (req, res) => {
  try {
    const usuarioId = req.user.id;

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
    } = req.body;

    const novoLivro = await prisma.livro.create({
      data: {
        isbn,
        autor,
        genero,
        editora,
        tipo_leitura,
        valor,
        status,
        avaliacao,
        comentario,
        usuario_id: usuarioId,
      },
    });

    return res.status(201).json(novoLivro);
  } catch (error) {
    console.error("Erro ao criar livro:", error);

    if (error.code === "P2002") {
      return res.status(400).json({ message: "ISBN já cadastrado!" });
    }

    return res.status(500).json({ message: "Erro interno." });
  }
};

// =====================================================
// PUT – Atualizar livro do usuário autenticado
// =====================================================
export const atualizarLivroDoUsuario = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const livroId = Number(req.params.id);
    const dados = req.body;

    const livro = await prisma.livro.findFirst({
      where: { id: livroId, usuario_id: usuarioId },
    });

    if (!livro) {
      return res.status(404).json({
        message: "Livro não encontrado para o usuário.",
      });
    }

    const atualizado = await prisma.livro.update({
      where: { id: livroId },
      data: dados,
    });

    return res.status(200).json(atualizado);
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);

    if (error.code === "P2002") {
      return res.status(400).json({ message: "ISBN já cadastrado!" });
    }

    return res.status(500).json({ message: "Erro interno." });
  }
};

// =====================================================
// DELETE – Remover livro do usuário autenticado
// =====================================================
export const deletarLivroDoUsuario = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const livroId = Number(req.params.id);

    const livro = await prisma.livro.findFirst({
      where: { id: livroId, usuario_id: usuarioId },
    });

    if (!livro) {
      return res.status(404).json({
        message: "Livro não encontrado para o usuário.",
      });
    }

    await prisma.livro.delete({
      where: { id: livroId },
    });

    return res.status(200).json({ message: "Livro removido com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
    return res.status(500).json({ message: "Erro interno." });
  }
};

// =====================================================
// PATCH – Atualizar apenas alguns campos do livro
// =====================================================
export const atualizarInfoLivro = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const livroId = Number(req.params.id);
    const dados = req.body;

    const livro = await prisma.livro.findFirst({
      where: { id: livroId, usuario_id: usuarioId },
    });

    if (!livro) {
      return res.status(404).json({ message: "Livro não encontrado." });
    }

    const atualizado = await prisma.livro.update({
      where: { id: livroId },
      data: dados,
    });

    return res.status(200).json({
      message: "Informações atualizadas!",
      data: atualizado,
    });
  } catch (error) {
    console.error("Erro ao atualizar informações do livro:", error);

    if (error.code === "P2002") {
      return res.status(400).json({ message: "ISBN já cadastrado!" });
    }

    return res.status(500).json({ message: "Erro interno." });
  }
};
