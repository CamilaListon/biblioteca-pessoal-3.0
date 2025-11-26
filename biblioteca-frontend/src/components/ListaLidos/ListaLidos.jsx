import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListaLidos = () => {
  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const porPagina = 5;

  const carregarLidos = async () => {
    try {
      const response = await api.get("/livros?status=lido");
      setLivros(response.data);
    } catch (error) {
      console.log("Erro ao carregar livros:", error);
    }
  };

  useEffect(() => {
    carregarLidos();
  }, []);

  const livrosFiltrados = livros.filter((livro) =>
    livro.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  const totalPaginas = Math.ceil(livrosFiltrados.length / porPagina);
  const inicio = (pagina - 1) * porPagina;
  const livrosPaginados = livrosFiltrados.slice(inicio, inicio + porPagina);

  const excluirLivro = async (id) => {
    if (!confirm("Deseja excluir este livro?")) return;

    try {
      await api.delete(`/livros/${id}`);
      carregarLidos();
    } catch (error) {
      console.log("Erro ao excluir:", error);
    }
  };

  return (
    <div className="lista-lidos-container">
      <h2>Livros Lidos</h2>

      <input
        type="text"
        placeholder="Buscar livro..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <div className="lista-livros">
        {livrosPaginados.map((livro) => (
          <div key={livro._id} className="card-livro">
            <img src={livro.capa} alt={livro.titulo} className="capa" />

            <div className="info">
              <h3>{livro.titulo}</h3>
              <p>{livro.autor}</p>
              <p>Status: {livro.status}</p>

              <Link to={`/livro/${livro._id}`}>
                <button>Ver detalhes</button>
              </Link>

              <Link to={`/editar/${livro._id}`}>
                <button>Editar</button>
              </Link>

              <button onClick={() => excluirLivro(livro._id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>

      {/* Paginação */}
      <div className="paginacao">
        <button disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>
          ◀ Anterior
        </button>

        <span>{pagina} / {totalPaginas}</span>

        <button disabled={pagina === totalPaginas} onClick={() => setPagina(pagina + 1)}>
          Próxima ▶
        </button>
      </div>
    </div>
  );
};

export default ListaLidos;
