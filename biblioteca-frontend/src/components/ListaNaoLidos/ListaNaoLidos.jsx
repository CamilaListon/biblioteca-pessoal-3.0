import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'

function LivrosNaoLidos() {
  const [lista, setLista] = useState([])

  useEffect(() => {
    const livros = JSON.parse(localStorage.getItem("livros")) || []
    const filtrados = livros.filter(l => l.status === "nao-lido")
    setLista(filtrados)
  }, [])

  return (
    <>
      <Header />
      <div className="lista-livros-container">
        <h1>Livros Não Lidos</h1>

        {lista.length === 0 ? (
          <p>Você ainda não cadastrou livros não lidos.</p>
        ) : (
          <div className="grid-livros">
            {lista.map(livro => (
              <div key={livro.id} className="card-livro">
                <h3>{livro.titulo}</h3>
                <p>{livro.autor}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default LivrosNaoLidos
