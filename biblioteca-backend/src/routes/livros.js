import { Router } from "express";
import {
  getTodosOsLivros,
  getLivroPorId,
  criarLivro,
  atualizarLivro,
  deletarLivro
} from "../controller/Livro/LivroController.js";

export const livroRouter = Router();

// GET /livros
livroRouter.get("/livros", getTodosOsLivros);

// GET /livros/:id
livroRouter.get("/livros/:id", getLivroPorId);

// POST /livros
livroRouter.post("/livros", criarLivro);

// PUT /livros/:id
livroRouter.put("/livros/:id", atualizarLivro);

// DELETE /livros/:id
livroRouter.delete("/livros/:id", deletarLivro);