import { createContext, useContext, useEffect, useState } from 'react'
import postsIniciais from '../data/postsIniciais.js'

const PostsContext = createContext(null)

const STORAGE_KEY = 'arteira:posts'

function carregarPosts() {
  try {
    const salvo = localStorage.getItem(STORAGE_KEY)
    if (salvo) return JSON.parse(salvo)
  } catch {
    // Se der erro ao ler/parsear, cai no seed.
  }
  return postsIniciais
}

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(carregarPosts)

  // Persiste no localStorage sempre que a lista muda (nosso "backend").
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  }, [posts])

  // CREATE
  function criarPost(dados) {
    const novo = {
      id: Date.now(),
      curtidas: 0,
      curtido: false,
      ...dados,
    }
    setPosts((atuais) => [novo, ...atuais])
  }

  // UPDATE
  function editarPost(id, dados) {
    setPosts((atuais) =>
      atuais.map((p) => (p.id === id ? { ...p, ...dados } : p)),
    )
  }

  // DELETE
  function excluirPost(id) {
    setPosts((atuais) => atuais.filter((p) => p.id !== id))
  }

  // Curtir / descurtir
  function alternarCurtida(id) {
    setPosts((atuais) =>
      atuais.map((p) =>
        p.id === id
          ? {
              ...p,
              curtido: !p.curtido,
              curtidas: p.curtido ? p.curtidas - 1 : p.curtidas + 1,
            }
          : p,
      ),
    )
  }

  const valor = {
    posts,
    criarPost,
    editarPost,
    excluirPost,
    alternarCurtida,
  }

  return <PostsContext.Provider value={valor}>{children}</PostsContext.Provider>
}

export function usePosts() {
  const ctx = useContext(PostsContext)
  if (!ctx) throw new Error('usePosts precisa estar dentro de <PostsProvider>')
  return ctx
}
