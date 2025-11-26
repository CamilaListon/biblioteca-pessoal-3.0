import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const LivroDetalhado = () => {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);

  const carregarLivro = async () => {
    try {
      const response = await api.get(`/livros/${id}`);
      setLivro(response.data);
    } catch (error) {
      console.log("Erro ao carregar:", error);
    }
  };

  useEffect(() => {
    carregarLivro();
  }, []);

  if (!livro) return <p>Carregando...</p>;

  return (
    <div className="detalhes-container">
      <Link to="/lidos">
        <button>◀ Voltar</button>
      </Link>

      <div className="conteudo">
        <img src={livro.capa} alt={livro.titulo} className="capa-detalhe" />

        <div className="info">
          <h2>{livro.titulo}</h2>
          <p><strong>Autor:</strong> {livro.autor}</p>
          <p><strong>Editora:</strong> {livro.editora}</p>
          <p><strong>Gênero:</strong> {livro.genero}</p>
          <p><strong>ISBN:</strong> {livro.isbn}</p>
          <p><strong>Tipo de leitura:</strong> {livro.tipoLeitura}</p>
          <p><strong>Avaliação:</strong> ⭐ {livro.avaliacao}/5</p>

          <h3>Descrição / Resenha</h3>
          <p>{livro.descricao}</p>

          <Link to={`/editar/${livro._id}`}>
            <button>Editar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LivroDetalhado;
