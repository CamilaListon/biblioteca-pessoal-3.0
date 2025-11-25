import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginUsuario() {
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(
      (user) =>
        user.email === formData.email && user.senha === formData.senha
    );

    if (usuarioEncontrado) {
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
      navigate("/Dashboard");
    } else {
      setMensagem("E-mail ou senha inválidos.");
    }
  };

  return (
    <div className="container-login">
      <div className="coluna-esquerda-login"></div>

      <div className="coluna-direita-login">
        <h1 className="titulo-login">Lumia!</h1>
        <h2 className="sub-titulo-login">Sua Biblioteca Pessoal</h2>
        <p className="descricao-login">Entre para continuar</p>

        <form onSubmit={handleLogin} className="formulario-login">
          <div className="group-input">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              className="input-form"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="group-input">
            <label>Senha</label>
            <input
              type="password"
              name="senha"
              className="input-form"
              placeholder="Senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="button-primary">
            Login
          </button>

          <p className="texto-cadastro">
            Ainda não possui cadastro?
            <span
              className="link-cadastro"
              onClick={() => navigate("/cadastro")}
            >
              Cadastre-se aqui!
            </span>
          </p>
        </form>

        {mensagem && (
          <p
            id="mensagem"
            className={
              mensagem.includes("sucesso")
                ? "mensagem-sucesso"
                : "mensagem-erro"
            }
          >
            {mensagem}
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginUsuario;
