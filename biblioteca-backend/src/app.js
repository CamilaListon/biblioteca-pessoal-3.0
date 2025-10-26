import express from "express";
import { usuarioRouter } from "./routes/usuarios.js";
import { livroRouter } from "./routes/livros.js";


const app = express();
app.use(express.json());

app.use(usuarioRouter);
app.use(livroRouter);

app.listen(3000, () => console.log("🚀 Servidor rodando na porta 3000"));
