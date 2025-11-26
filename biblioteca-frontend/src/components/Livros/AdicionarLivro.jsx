import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header'

function AdicionarLivro() {
  const navigate = useNavigate()

  const [titulo, setTitulo] = useState("")
  const [autor, setAutor] = useState("")
  const [genero, setGenero] = useState("")
  const [status, setStatus] = useState("nao-lido")
  const [imagem, setImagem] = useState("")

  const handleSalvar = (e) => {
    e.preventDefault()

    const livros = JSON.parse(localStorage.getItem("livros")) || []

    const novoLivro = {
      id: Date.now(),
      titulo,
      autor,
      genero,
      status,
      imagem
    }

    livros.push(novoLivro)
    localStorage.setItem("livros", JSON.stringify(livros))

    navigate("/listalivros")
  }

  return (
    <>
      <Header />
      <div className="form-container">
        <h1>Adicionar Livro</h1>

        <form onSubmit={handleSalvar} className="formulario">

          <label>Título</label>
          <input 
            type="text" 
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />

          <label>Autor</label>
          <input 
            type="text" 
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
          />

          <label>Gênero</label>
          <input 
            type="text" 
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          />

          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="nao-lido">Não Lido</option>
            <option value="lendo">Lendo</option>
            <option value="lido">Lido</option>
            <option value="abandonado">Abandonado</option>
          </select>

          <label>URL da Imagem (opcional)</label>
          <input 
            type="text" 
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            placeholder="https://imagem.com/capa.jpg"
          />

          <button type="submit" className="button-primary">
            Salvar
          </button>

        </form>
      </div>
    </>
  )
}

export default AdicionarLivro
