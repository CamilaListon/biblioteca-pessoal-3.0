import bcrypt from "bcrypt";
const senha = "123456";
const saltRounds = 10;  // custo computacional, dobra a cada incremento
// Gerando o hash (para armazenar no banco)
const hash = await bcrypt.hash(senha, saltRounds);
console.log("Senha Hasheada:", hash);// $2b$10$XLqUVQUoQaXMTKBG7dXeN.L8uZivrCGcBHKzHbKAGNkEzytI0dKqm
const hash2 = await bcrypt.hash(senha, saltRounds);
console.log("Senha Hasheada:", hash2);
// Verificando a senha (durante login)
const isMatch = await bcrypt.compare("1234567", hash);
console.log("Validação:", isMatch);
// true
const string = "alex"
const base = btoa(string)
console.log(base)
console.log(atob(base))