import { Router } from "express";
import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
} from "../controller/Usuario/UsuarioController.js";

const usuarioRouter = Router();

// ✅ GET - lista todos os usuários
usuarioRouter.get("/", getUsuarios);

// ✅ GET - busca um usuário específico
usuarioRouter.get("/:id", getUsuarioById);

// ✅ POST - cria um novo usuário
usuarioRouter.post("/", createUsuario);

export default usuarioRouter;