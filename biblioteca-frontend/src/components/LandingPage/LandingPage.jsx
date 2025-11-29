import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <header className="landing-header">
        <img
          src="/logo-lumia.png" 
          alt="Lumia Logo"
          className="landing-logo"
        />
        <h1 className="landing-title">Lumia</h1>
      </header>

      <main className="landing-content">
        <p className="landing-description">
          Bem-vindo ao Lumia — um sistema criado para facilitar a gestão,
          organização e experiência do usuário com agilidade e praticidade.
        </p>

        <div className="landing-buttons">
          <button className="btn-login" onClick={() => navigate("/login")}>
            Entrar
          </button>

          <button className="btn-cadastro" onClick={() => navigate("/register")}>
            Criar Conta
          </button>
        </div>
      </main>

      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} - Projeto Lumia</p>
      </footer>
    </div>
  );
}
