import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./CadastroUsuario.scss";

function CadastroUsuario() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const atualizarCampo = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nome, email, senha, confirmarSenha } = formData;

    if (senha !== confirmarSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existeEmail = usuarios.some((u) => u.email === email);

    if (existeEmail) {
      setMensagem("Este e-mail já está cadastrado.");
      return;
    }

    const novoUsuario = { nome, email, senha };
    localStorage.setItem("usuarios", JSON.stringify([...usuarios, novoUsuario]));

    setMensagem("Usuário cadastrado com sucesso!");

    setFormData({
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
    });

    navigate("/");
  };

  return (
    <div className="container-cadastro">
      <div className="coluna-esquerda-cadastro"></div>

      <div className="coluna-direita-cadastro">
        <h1 className="titulo-cadastro">Cadastre-se</h1>
        <p className="descricao-cadastro">Cadastre-se para continuar</p>

        <form onSubmit={handleSubmit} className="formulario-cadastro">
          <div className="group-input">
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              className="input-form"
              value={formData.nome}
              onChange={atualizarCampo}
              required
            />
          </div>

          <div className="group-input">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className="input-form"
              value={formData.email}
              onChange={atualizarCampo}
              required
            />
          </div>

          <div className="group-input">
            <label>Data de Nascimento</label>
            <input
              type="date"
              name="dataNasc"
              placeholder="Data de Nascimento"
              className="input-form"
              value={formData.dataNasc}
              onChange={atualizarCampo}
            />
          </div>

          <div className="group-input">
            <label>Senha</label>
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              className="input-form"
              value={formData.senha}
              onChange={atualizarCampo}
              required
            />
          </div>

          <div className="group-input">
            <label>Confirme sua senha</label>
            <input
              type="password"
              name="confirmarSenha"
              placeholder="Confirmar senha"
              className="input-form"
              value={formData.confirmarSenha}
              onChange={atualizarCampo}
              required
            />
          </div>

          <button className="button-primary" type="submit">
            Cadastrar
          </button>
        </form>

        <p className="texto-cadastrado">
          Já possui cadastro?{" "}
          <span
            className="link-cadastrado"
            onClick={() => navigate("/")}
          >
            Faça seu login!
          </span>
        </p>

        {mensagem && <p className="mensagem">{mensagem}</p>}
      </div>
    </div>
  );
}

export default CadastroUsuario;
