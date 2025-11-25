import React from "react";
import { Link } from "react-router-dom";

function Header({ semBotaoVoltar = false }) {
  return (
    <header className="header-superior">
      <div className="superior">

        {/* Botão de voltar (opcional) */}
        {!semBotaoVoltar ? (
          <Link to="/Dashboard" className="botao-voltar">
            <img src="/seta.svg" alt="Voltar" />
            <span>Voltar</span>
          </Link>
        ) : (
          <div className="espaco-vazio" />
        )}

        {/* Botão de sair */}
        <Link to="/" className="botao-saida">
          <img src="/saida.svg" alt="Sair" className="icon-sair" />
        </Link>

      </div>
    </header>
  );
}

export default Header;
