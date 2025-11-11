import express from "express";
import cors from "cors";
import { usuarioRouter } from "./routes/usuarios.js";
import { livroRouter } from "./routes/livros.js";
import authRouter from "./routes/authRoutes.js";
import { auth } from "./middleware/auth.js";


export const app = express();

app.use(cors()); 
app.use(express.json());

app.get("/ping", (req, res) => {
  console.log(" GET /ping chegou");
  res.send("pong");
});

app.use('/auth', authRouter)

app.use(auth);
app.use(usuarioRouter);
app.use(livroRouter);

