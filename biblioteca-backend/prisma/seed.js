import prisma from "../prisma/client.js";

async function main() {
  console.log("🌱 Iniciando seed...");

  // Criar usuário inicial
  const usuario = await prisma.usuario.create({
    data: {
      nome: "Usuário Teste",
      email: "teste@biblioteca.com",
      senha: "123456", // coloque hash de senha no sistema real!
    },
  });

  console.log("Usuário criado:", usuario.email);

  // Criar livros desse usuário
  await prisma.livro.createMany({
    data: [
      {
        isbn: "9788535933865",
        autor: "George Orwell",
        genero: "Ficção",
        editora: "Companhia das Letras",
        tipo_leitura: "Digital",
        valor: 29.90,
        status: "LIDO",
        avaliacao: "Muito bom",
        comentario: "Clássico obrigatório",
        usuarioId: usuario.id,
      },
      {
        isbn: "9786555604691",
        autor: "Agatha Christie",
        genero: "Mistério",
        editora: "HarperCollins",
        tipo_leitura: "Físico",
        valor: 42.50,
        status: "NAO_LIDO",
        avaliacao: "—",
        comentario: "Ainda não comecei",
        usuarioId: usuario.id,
      },
      {
        isbn: "9788503012990",
        autor: "J. K. Rowling",
        genero: "Fantasia",
        editora: "Rocco",
        tipo_leitura: "Físico",
        valor: 59.90,
        status: "LISTA_DE_DESEJOS",
        avaliacao: "—",
        comentario: "Quero comprar futuramente",
        usuarioId: usuario.id,
      },
    ],
  });

  console.log("Livros criados!");

  // Criar um token para esse usuário
  await prisma.token.create({
    data: {
      token: "meu_token_de_teste_123",
      type: "ACCESS",
      usuarioId: usuario.id,
      revoked: false,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h
    },
  });

  console.log("Token criado!");

  console.log("🌱 Seed finalizada com sucesso!");
}

// Rodar seed
main()
  .then(() => {
    console.log("✔ Seed executada");
    process.exit(0);
  })
  .catch((e) => {
    console.error("❌ Erro na seed:", e);
    process.exit(1);
  });
