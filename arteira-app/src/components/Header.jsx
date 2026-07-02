import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'
import LoginModal from './LoginModal.jsx'

function Header() {
  const { usuario, sair } = useUser()
  const [mostrarLogin, setMostrarLogin] = useState(false)

  return (
    <header>
      <Link to="/" className="logo">
        <h1 className="h1Titulo">Arteira</h1>
      </Link>

      <div className="barradepesquisa">
        <img src="/imagens/lupa.png" alt="Lupa de pesquisa" />
        <input type="search" placeholder="O que você está procurando?" />
      </div>

      <button className="sacoladecompras" id="btnCarrinho">
        <img src="/imagens/sacoladecompras.png" alt="Sacola de compras" />
        <span className="badge">1</span>
      </button>

      <div className="botoes">
        {usuario ? (
          <>
            <button className="usuario">
              <img src={usuario.avatar} alt={usuario.nome} />
            </button>
            <div className="textoLogin">
              <span>Olá, <strong>{usuario.nome}</strong></span>{' '}
              <button className="Entrar" onClick={sair}>Sair</button>
            </div>
          </>
        ) : (
          <>
            <button className="usuario" onClick={() => setMostrarLogin(true)}>
              <img src="/imagens/usuario.png" alt="Usuário" />
            </button>
            <div className="textoLogin">
              <button className="Entrar" onClick={() => setMostrarLogin(true)}>Entre</button>{' '}
              <span>ou</span>{' '}
              <button className="Registrar" onClick={() => setMostrarLogin(true)}>Cadastre-se</button>
            </div>
          </>
        )}
      </div>

      {mostrarLogin && <LoginModal onFechar={() => setMostrarLogin(false)} />}
    </header>
  )
}

export default Header
