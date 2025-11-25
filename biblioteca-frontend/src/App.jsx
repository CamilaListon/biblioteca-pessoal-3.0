import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CadastroUsuario from './components/CadastroUsuario/CadastroUsuario'
import LoginUsuario from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'

function App() {    
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginUsuario />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App