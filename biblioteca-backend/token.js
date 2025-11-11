import jwt from "jsonwebtoken";
const SECRET_KEY = "chaveSuperSecreta123456";
const token = jwt.sign(
    { userId: 1, email: "usuario@exemplo.com", role: "admin" },
    SECRET_KEY,
    {
        expiresIn: "1h",
    });

console.log("JWT:", token);

try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Decodificado:", decoded);
}
catch (error) {
    console.error("Token inválido:", error.message);
}
