import { useEffect, useState } from "react";

function Perfil() {
  const [usuario, setUsuario] = useState(null);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    dataNasc: "",
    senha: "",
    foto: ""
  });

  const [preview, setPreview] = useState("");

  // Carrega infos do usuário ao entrar na tela
  useEffect(() => {
    const usuarioSalvo = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (usuarioSalvo) {
      setUsuario(usuarioSalvo);

      setForm({
        nome: usuarioSalvo.nome,
        email: usuarioSalvo.email,
        dataNasc: usuarioSalvo.dataNasc || "",
        senha: "", // senha nunca aparece preenchida
        foto: usuarioSalvo.foto || ""
      });

      setPreview(usuarioSalvo.foto || "/default-user.png");
    }
  }, []);

  // Input onChange
  const atualizarCampo = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Foto
  const atualizarFoto = (e) => {
    const arquivo = e.target.files[0];
    if (!arquivo) return;

    const url = URL.createObjectURL(arquivo);

    setPreview(url);
    setForm((prev) => ({ ...prev, foto: url }));
  };

  // Salvar alterações
  const salvar = (e) => {
    e.preventDefault();

    const atualizado = {
      ...usuario,
      nome: form.nome,
      email: form.email,
      dataNasc: form.dataNasc,
      foto: form.foto
    };

    // Atualiza localStorage
    localStorage.setItem("usuarioLogado", JSON.stringify(atualizado));

    alert("Perfil atualizado!");
  };

  if (!usuario) return <p>Carregando perfil...</p>;

  return (
    <div className="perfil-container">
      <h1>Meu Perfil</h1>

      <div className="foto-perfil-area">
        <img src={preview} className="foto-perfil" alt="Foto de perfil" />

        <input
          type="file"
          accept=".png,.jpg"
          onChange={atualizarFoto}
        />
      </div>

      <form onSubmit={salvar} className="perfil-form">

        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={atualizarCampo}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={atualizarCampo}
          required
        />

        <label>Data de Nascimento</label>
        <input
          type="date"
          name="dataNasc"
          value={form.dataNasc}
          onChange={atualizarCampo}
        />

        <label>Nova Senha (opcional)</label>
        <input
          type="password"
          name="senha"
          value={form.senha}
          onChange={atualizarCampo}
          placeholder="Deixe vazio para não alterar"
        />

        <button className="btn-salvar" type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default Perfil;
