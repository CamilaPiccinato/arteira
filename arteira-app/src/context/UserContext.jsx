import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext(null)

const STORAGE_KEY = 'arteira:usuario'

function carregarUsuario() {
  try {
    const salvo = localStorage.getItem(STORAGE_KEY)
    if (salvo) return JSON.parse(salvo)
  } catch {
    // ignora e retorna deslogado
  }
  return null
}

export function UserProvider({ children }) {
  // usuario = null (deslogado) ou { nome, avatar }
  const [usuario, setUsuario] = useState(carregarUsuario)

  useEffect(() => {
    if (usuario) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [usuario])

  function entrar(nome, avatar) {
    setUsuario({
      nome: nome.trim(),
      avatar: avatar || '/imagens/usuario.png',
    })
  }

  function sair() {
    setUsuario(null)
  }

  return (
    <UserContext.Provider value={{ usuario, entrar, sair }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser precisa estar dentro de <UserProvider>')
  return ctx
}
