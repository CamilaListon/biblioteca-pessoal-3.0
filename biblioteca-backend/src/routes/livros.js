import { Router } from "express";

import {
  getLivrosPorUsuario,
  getLivroDoUsuarioPorId,
  criarLivroParaUsuario,
  atualizarLivroDoUsuario,
  deletarLivroDoUsuario
} from "../controller/Livro/LivroController.js";

export const livroRouter = Router();

// GET – todos os livros do usuário
livroRouter.get("/usuarios/:usuarioId/livros", getLivrosPorUsuario);

// GET – livro específico do usuário
livroRouter.get("/usuarios/:usuarioId/livros/:livroId", getLivroDoUsuarioPorId);

// POST – criar livro para um usuário
livroRouter.post("/usuarios/:usuarioId/livros", criarLivroParaUsuario);

// PUT – atualizar livro do usuário
livroRouter.put("/usuarios/:usuarioId/livros/:livroId", atualizarLivroDoUsuario);

// DELETE – deletar livro do usuário
livroRouter.delete("/usuarios/:usuarioId/livros/:livroId", deletarLivroDoUsuario);