import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";


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

  // "../../public/coluna-esquerda.svg"

  return (
    <div className="container-login">

      <div className="coluna-esquerda-login">
        <img src="../../public/coluna-esquerda.svg" alt="Imagem estante de livros" id="estante-livros" />
      </div>

      <div className="coluna-direita">
        <div className="coluna-direita-login">
          <div className="topo">
            <div className="logo">
              <img src="../../public/lumia-logo.svg" alt="logo lumia" />
            </div>
            <div className="descricao-login">
              <p>Entre para continuar</p>
            </div>
          </div>
          <div className="formulario-login">
            <form onSubmit={handleLogin} className="formulario-login">
              <div className="group-input">
                <div className="email-senha">
                  <label>E-mail</label>
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-form"
                />
              </div>
              <div className="group-input">
                <div className="email-senha">
                  <label>Senha</label>
                </div>
                <input
                  type="password"
                  name="senha"
                  placeholder="Senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                  className="input-form"
                />
              </div>
              <button type="submit" className="button-primary">
                Login
              </button>
              <div className="texto-cadastro">
                <p>
                  Ainda não possui cadastro?</p>
                <div>
                  <span
                    className="link-cadastro"
                    onClick={() => navigate("/cadastro")}
                  >
                    Cadastre-se aqui!
                  </span>
                </div>

              </div>
            </form>
          </div>

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
    </div>
  );
}

export default LoginUsuario;
