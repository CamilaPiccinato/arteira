import { useState } from 'react'
import { useUser } from '../context/UserContext.jsx'
import { arquivoParaDataURL } from '../utils/imagem.js'

function LoginModal({ onFechar }) {
  const { entrar } = useUser()
  const [nome, setNome] = useState('')
  const [avatar, setAvatar] = useState('/imagens/usuario.png')
  const [erro, setErro] = useState('')

  async function handleAvatar(e) {
    const arquivo = e.target.files?.[0]
    if (!arquivo) return
    try {
      const dataURL = await arquivoParaDataURL(arquivo, 200)
      setAvatar(dataURL)
    } catch (err) {
      setErro(err.message)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!nome.trim()) {
      setErro('Digite um nome de usuário para entrar.')
      return
    }
    entrar(nome, avatar)
    onFechar()
  }

  return (
    <div className="modalOverlay" onClick={onFechar}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2>Entrar na Arteira</h2>
        <p className="modalTextoConfirma">
          Escolha um nome de usuário para publicar na comunidade e gerenciar
          suas próprias postagens.
        </p>

        <label htmlFor="loginNome">Nome de usuário</label>
        <input
          id="loginNome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex.: MariaArtes"
        />

        <label htmlFor="loginAvatar">Foto de perfil (opcional)</label>
        <input id="loginAvatar" type="file" accept="image/*" onChange={handleAvatar} />
        <div className="previewAvatar">
          <img src={avatar} alt="Prévia do avatar" />
        </div>

        {erro && <p className="erroCampo">{erro}</p>}

        <div className="modalAcoes">
          <button type="button" className="btnSecundario" onClick={onFechar}>
            Cancelar
          </button>
          <button type="submit" className="btnPrimario">
            Entrar
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginModal
