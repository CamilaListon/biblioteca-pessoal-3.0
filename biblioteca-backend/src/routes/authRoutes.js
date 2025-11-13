import { Router } from "express";
import { register, login } from "../controller/Auth/AuthController.js";
import { auth } from "../middleware/auth.js";

const authRouter = Router();

// Registro de usuário – não exige token
authRouter.post("/register", register);

// Login – não exige token
authRouter.post("/login", login);

// Logout – exige token
// authRouter.post("/logout", auth, logout); // se tiver logout exportado
// Refresh token – exige token
// authRouter.post("/refresh", auth, refresh); // se tiver refresh exportado

export default authRouter;
