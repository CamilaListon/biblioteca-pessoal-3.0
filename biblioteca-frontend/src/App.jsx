import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CadastroUsuario from './components/CadastroUsuario/CadastroUsuario'
import LoginUsuario from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import LivroDetalhado from './components/Livros/LivroDetalhado'
import ListaLidos from './components/ListaLidos/ListaLidos'
import Perfil from './components/Perfil/Perfil'
import AdicionarLivro from './components/Livros/AdicionarLivro'

function App() {    
  return (
    <BrowserRouter>
      

      <Routes>
        <Route path="/" element={<LoginUsuario />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/livro/:id" element={<LivroDetalhado />} />
        <Route path="/listalidos" element={<ListaLidos />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/adicionar" element={<AdicionarLivro />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App