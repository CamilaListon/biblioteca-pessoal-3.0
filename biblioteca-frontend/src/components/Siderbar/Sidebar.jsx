import { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ user }) => {
  const [openLists, setOpenLists] = useState(false);

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <h1>Lumia</h1>
      </div>

      {/* Usuário */}
      <div className="sidebar-user">
        <img src={user.fotoPerfil} alt="foto" className="user-img" />
        <span>{user.nome}</span>
      </div>

      {/* Navegação */}
      <nav className="sidebar-nav">
        <Link to="/dashboard" className="nav-item">
          <i className="fi fi-rr-home"></i> Página inicial
        </Link>

        <Link to="/abandonados" className="nav-item">
          <i className="fi fi-rr-books"></i> Abandonados
        </Link>

        {/* Minhas Listas */}
        <div
          className="nav-item dropdown"
          onClick={() => setOpenLists(!openLists)}
        >
          <i className="fi fi-rr-list"></i> Minhas Listas
          <span className={`arrow ${openLists ? "open" : ""}`}>⌃</span>
        </div>

        {openLists && (
          <div className="dropdown-content">
            <Link to="/listalidos" className="sub-item">Lidos</Link>
            <Link to="/listanaolidos" className="sub-item">Não Lidos</Link>
            <Link to="/listaabandonados" className="sub-item">Abandonados</Link>
            <Link to="/listadesejos" className="sub-item">Lista de Desejos</Link>
          </div>
        )}

        <Link to="/adicionar" className="add-book-btn">
          + Adicionar Livro
        </Link>
      </nav>

      {/* Desconectar */}
      <button className="logout-btn">⏻ Desconectar</button>
    </aside>
  );
};

export default Sidebar;
