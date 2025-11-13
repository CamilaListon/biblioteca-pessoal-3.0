// src/controller/Auth/AuthController.js
import { prisma } from '../../../prisma/prisma.js'; // caminho correto para o prisma
import bcrypt from 'bcryptjs';
import { signAccessToken, signRefreshToken } from '../../utils/jwt.js';

export async function register(req, res) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    // Verifica se usuário já existe
    const existingUser = await prisma.usuario.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    // Cria hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Cria usuário
    const user = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: hashedPassword
      }
    });

    // Gera tokens
    const accessToken = signAccessToken({ id: user.id, email: user.email });
    const refreshToken = signRefreshToken({ id: user.id, email: user.email });

    res.status(201).json({
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email
      },
      accessToken,
      refreshToken
    });
  } catch (err) {
    console.error("Erro no registro:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Email ou senha inválidos" });
    }

    const passwordMatch = await bcrypt.compare(senha, user.senha);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Email ou senha inválidos" });
    }

    const accessToken = signAccessToken({ id: user.id, email: user.email });
    const refreshToken = signRefreshToken({ id: user.id, email: user.email });

    res.json({
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email
      },
      accessToken,
      refreshToken
    });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}
