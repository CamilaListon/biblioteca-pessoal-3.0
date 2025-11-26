import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../Header/Header'

function EditarLivro() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [livro, setLivro] = useState(null)

  useEffect(() => {
    const livros = JSON.parse(localStorage.getItem("livros")) || []
    const encontrado = livros.find(l => l.id === Number(id))
    setLivro(encontrado)
  }, [id])

  const handleSalvar = (e) => {
    e.preventDefault()

    const livros = JSON.parse(localStorage.getItem("livros")) || []
    const atualizados = livros.map((l) =>
      l.id === livro.id ? livro : l
    )

    localStorage.setItem("livros", JSON.stringify(atualizados))
    navigate("/listalivros")
  }

  if (!livro) return <p>Carregando...</p>

  return (
    <>
      <Header />
      <div className="form-container">

        <h1>Editar Livro</h1>

        <form onSubmit={handleSalvar} className="formulario">

          <label>Título</label>
          <input 
            type="text"
            value={livro.titulo}
            onChange={(e) => setLivro({ ...livro, titulo: e.target.value })}
          />

          <label>Autor</label>
          <input 
            type="text"
            value={livro.autor}
            onChange={(e) => setLivro({ ...livro, autor: e.target.value })}
          />

          <label>Gênero</label>
          <input 
            type="text"
            value={livro.genero}
            onChange={(e) => setLivro({ ...livro, genero: e.target.value })}
          />

          <label>Status</label>
          <select
            value={livro.status}
            onChange={(e) => setLivro({ ...livro, status: e.target.value })}
          >
            <option value="nao-lido">Não Lido</option>
            <option value="lendo">Lendo</option>
            <option value="lido">Lido</option>
            <option value="abandonado">Abandonado</option>
          </select>

          <label>Imagem</label>
          <input 
            type="text"
            value={livro.imagem}
            onChange={(e) => setLivro({ ...livro, imagem: e.target.value })}
          />

          <button className="button-primary" type="submit">
            Salvar Alterações
          </button>
        </form>
      </div>
    </>
  )
}

export default EditarLivro
