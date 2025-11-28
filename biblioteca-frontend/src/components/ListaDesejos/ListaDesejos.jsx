import { useState } from "react";

const ListaDesejos = () => {
  const [listaDesejos, setListaDesejos] = useState([
    // {
    //   id: 1,
    //   nome: "A Revolução dos Bichos",
    //   autor: "George Orwell",
    //   genero: "Fábula Política",
    //   isbn: "123456789",
    // },
    // {
    //   id: 2,
    //   nome: "O Hobbit",
    //   autor: "J.R.R. Tolkien",
    //   genero: "Fantasia",
    //   isbn: "987654321",
    // },
  ]);

  // remover da lista (local)
  const removerDesejo = (id) => {
    const novaLista = listaDesejos.filter((livro) => livro.id !== id);
    setListaDesejos(novaLista);
  };

  // marcar como lido (local)
  const marcarComoLido = (id) => {
    alert(`Livro ID ${id} marcado como lido! (função local)`);
  };

  return (
    <div className="listaDesejos-container">
      <h2>📚 Minha Lista de Desejos</h2>

      {listaDesejos.length === 0 ? (
        <p className="empty-msg">Sua lista está vazia...</p>
      ) : (
        <div className="listaDesejos-grid">
          {listaDesejos.map((livro) => (
            <div key={livro.id} className="listaDesejos-card">

              <h3>{livro.nome}</h3>
              <p><strong>Autor:</strong> {livro.autor}</p>
              <p><strong>Gênero:</strong> {livro.genero}</p>
              <p><strong>ISBN:</strong> {livro.isbn}</p>

              <div className="listaDesejos-buttons">
                <button
                  className="remove-btn"
                  onClick={() => removerDesejo(livro.id)}
                >
                  Remover
                </button>

                <button
                  className="read-btn"
                  onClick={() => marcarComoLido(livro.id)}
                >
                  Marcar como Lido
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaDesejos;
