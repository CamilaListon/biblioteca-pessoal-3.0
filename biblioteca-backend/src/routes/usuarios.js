import { Router } from "express";
import {
  getTodosOsUsuarios,
  getUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
  getLivrosDoUsuario
} from "../controller/Usuario/UsuarioController.js";

export const usuarioRouter = Router();

// GET /usuarios?email=...
// Se houver query ?email=..., busca pelo email; senão retorna todos os usuários
usuarioRouter.get("/usuarios", getTodosOsUsuarios);

// GET /usuarios/:id
usuarioRouter.get("/usuarios/:id", getUsuarioPorId);

// GET /usuarios/:id/livros
usuarioRouter.get("/usuarios/:id/livros", getLivrosDoUsuario);

// POST /usuarios
usuarioRouter.post("/usuarios", criarUsuario);

// PUT /usuarios/:id
usuarioRouter.put("/usuarios/:id", atualizarUsuario);

// DELETE /usuarios/:id
usuarioRouter.delete("/usuarios/:id", deletarUsuario);
