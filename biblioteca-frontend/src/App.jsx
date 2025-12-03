import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CadastroUsuario from './components/CadastroUsuario/CadastroUsuario'
import LoginUsuario from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import LivroDetalhado from './components/Livros/LivroDetalhado'
import ListaLidos from './components/ListaLidos/ListaLidos'
import Perfil from './components/Perfil/Perfil'
import AdicionarLivro from './components/Livros/AdicionarLivro'
import LivrosNaoLidos from './components/ListaNaoLidos/ListaNaoLidos'
import LivrosAbandonados from './components/ListaAbandonados/ListaAbandonados'
import ListaDesejos from './components/ListaDesejos/ListaDesejos'
import LandingPage from './components/LandingPage/LandingPage'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import './main.scss'


function App() {    
  return (
    <BrowserRouter>
      

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginUsuario />} />
        <Route path="/register" element={<CadastroUsuario />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/livro/:id" element={<LivroDetalhado />} />
        <Route path="/listalidos" element={<ListaLidos />} />
        <Route path="/listanaolidos" element={<LivrosNaoLidos />} />
        <Route path="/listaabandonados" element={<LivrosAbandonados />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/adicionar" element={<AdicionarLivro />} />
        <Route path="/listadesejos" element={<ListaDesejos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App