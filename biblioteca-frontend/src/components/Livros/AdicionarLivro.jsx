import { useState } from "react";

const AdicionarLivro = () => {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [status, setStatus] = useState("Não lido");
  const [genero, setGenero] = useState("");
  const [avaliacao, setAvaliacao] = useState("");
  const [autor, setAutor] = useState("");
  const [editora, setEditora] = useState("");
  const [tipoLeitura, setTipoLeitura] = useState("");
  const [comentario, setComentario] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const novoLivro = {
        nome,
        valor: valor || null,
        isbn,
        status,
        genero,
        avaliacao: avaliacao || null,
        autor,
        editora: editora || null,
        tipoLeitura: tipoLeitura || null,
        comentario: comentario || null,
      };

      const response = await api.post("/livros", novoLivro);

      alert("Livro cadastrado com sucesso!");
      console.log(response.data);

      // limpa o formulário
      setNome("");
      setValor("");
      setIsbn("");
      setStatus("Não lido");
      setGenero("");
      setAvaliacao("");
      setAutor("");
      setEditora("");
      setTipoLeitura("");
      setComentario("");

    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar o livro.");
    }
  };

  return (
    <div className="add-livro-container">
      <h2>Adicionar Livro</h2>

      <form onSubmit={handleSubmit} className="form-livro">

        <label>Título</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label>Valor (opcional)</label>
        <input
          type="number"
          step="0.01"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />

        <label>ISBN</label>
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
        />

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Lido">Lido</option>
          <option value="Não lido">Não lido</option>
          <option value="Abandonado">Abandonado</option>
          <option value="Desejo">Desejo</option>
        </select>

        <label>Gênero</label>
        <input
          type="text"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          required
        />

        <label>Avaliação (0 a 5)</label>
        <input
          type="number"
          min="0"
          max="5"
          step="0.5"
          value={avaliacao}
          onChange={(e) => setAvaliacao(e.target.value)}
        />

        <label>Autor</label>
        <input
          type="text"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          required
        />

        <label>Editora (opcional)</label>
        <input
          type="text"
          value={editora}
          onChange={(e) => setEditora(e.target.value)}
        />

        <label>Tipo de leitura</label>
        <select
          value={tipoLeitura}
          onChange={(e) => setTipoLeitura(e.target.value)}
        >
          <option value="">Selecione...</option>
          <option value="Físico">Físico</option>
          <option value="Digital">Digital (eBook)</option>
          <option value="Áudio">Audiobook</option>
        </select>

        <label>Comentário / Resenha</label>
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          rows="4"
        />

        <button type="submit" className="btn-cadastrar">
          Cadastrar Livro
        </button>
      </form>
    </div>
  );
};

export default AdicionarLivro;
