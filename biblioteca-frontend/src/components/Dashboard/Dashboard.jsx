import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Siderbar/Sidebar";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  const [stats, setStats] = useState({
    lidos: 0,
    naoLidos: 0,
    abandonados: 0,
    desejos: 0,
  });

  // Carrega usuário logado
  useEffect(() => {
    const user = localStorage.getItem("usuarioLogado");
    if (user) {
      setUsuario(JSON.parse(user));
    }
  }, []);

  // Carregar estatísticas dos livros
  useEffect(() => {
    const livros = JSON.parse(localStorage.getItem("livros")) || [];
    const desejos = JSON.parse(localStorage.getItem("listaDesejos")) || [];

    const lidos = livros.filter((l) => l.status === "lido").length;
    const naoLidos = livros.filter((l) => l.status === "nao-lido").length;
    const abandonados = livros.filter((l) => l.status === "abandonado").length;

    setStats({
      lidos,
      naoLidos,
      abandonados,
      desejos: desejos.length,
    });
  }, []);

  const sair = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/login");
  };

  const dataGrafico = [
    { name: "Lidos", value: stats.lidos },
    { name: "Não Lidos", value: stats.naoLidos },
    { name: "Abandonados", value: stats.abandonados },
    { name: "Desejos", value: stats.desejos },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* SIDEBAR */}
      <Sidebar user={usuario || { nome: "Usuário", fotoPerfil: "/user.png" }} />

      {/* CONTEÚDO PRINCIPAL */}
      <div className="dashboard-container" style={{ flex: 1, padding: "20px" }}>
        <h1 className="titulo-dashboard">
          Olá, {usuario?.nome || "usuário"}!
        </h1>
        <h2 className="sub-titulo-dashboard">Que bom tê-lo conosco!</h2>

        <button 
          className="botao-perfil"
          onClick={() => navigate("/Perfil")}
        >
          Perfil
        </button>

        {/* Resumo */}
        <div className="cards-resumo">
          <div className="card">
            <h2>{stats.lidos}</h2>
            <p>Livros Lidos</p>
          </div>

          <div className="card">
            <h2>{stats.naoLidos}</h2>
            <p>Não Lidos</p>
          </div>

          <div className="card">
            <h2>{stats.abandonados}</h2>
            <p>Abandonados</p>
          </div>

          <div className="card">
            <h2>{stats.desejos}</h2>
            <p>Lista de Desejos</p>
          </div>
        </div>

        {/* Atalhos */}
        <div className="atalhos-container">
          <h2>Atalhos</h2>
          <div className="atalhos-grid">
            <button onClick={() => navigate("/listalivros")}>Livros</button>
            <button onClick={() => navigate("/listalidos")}>Lidos</button>
            <button onClick={() => navigate("/listanaolidos")}>Não Lidos</button>
            <button onClick={() => navigate("/listaabandonados")}>Abandonados</button>
            <button onClick={() => navigate("/listadesejos")}>Desejos</button>
          </div>
        </div>

        {/* Gráfico */}
        <div className="grafico-container">
          <h2>Estatísticas de Leitura</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataGrafico}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
              >
                {dataGrafico.map((entry, index) => (
                  <Cell key={index} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Logout */}
        <button className="botao-logout" onClick={sair}>
          Sair da Conta
        </button>

      </div>
    </div>
  );
}

export default Dashboard;
