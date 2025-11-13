import { prisma } from "../../../prisma/prisma.js";

// ✅ GET /usuarios → Lista todos os usuários
export async function getUsuarios(req, res) {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });
    res.status(200).json(usuarios);
  } catch (err) {
    console.error("❌ Erro ao buscar usuários:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// ✅ GET /usuarios/:id → Busca um usuário específico
export async function getUsuarioById(req, res) {
  try {
    const { id } = req.params;
    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(id) },
      select: { id: true, nome: true, email: true },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(200).json(usuario);
  } catch (err) {
    console.error("❌ Erro ao buscar usuário:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// ✅ POST /usuarios → Cria novo usuário
export async function createUsuario(req, res) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const existingUser = await prisma.usuario.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    const novoUsuario = await prisma.usuario.create({
      data: { nome, email, senha },
    });

    res.status(201).json(novoUsuario);
  } catch (err) {
    console.error("❌ Erro ao criar usuário:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}
