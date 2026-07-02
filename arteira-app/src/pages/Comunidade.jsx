import { useState } from 'react'
import { usePosts } from '../context/PostsContext.jsx'
import { useUser } from '../context/UserContext.jsx'
import PostCard from '../components/PostCard.jsx'
import PostFormModal from '../components/PostFormModal.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import LoginModal from '../components/LoginModal.jsx'

function Comunidade() {
  const { posts, criarPost, editarPost, excluirPost } = usePosts()
  const { usuario } = useUser()

  // Controla qual modal está aberto: null | 'form' | 'confirm' | 'login'
  const [modal, setModal] = useState(null)
  const [postSelecionado, setPostSelecionado] = useState(null)

  function abrirNova() {
    // Só é possível publicar estando logado.
    if (!usuario) {
      setModal('login')
      return
    }
    setPostSelecionado(null)
    setModal('form')
  }

  function abrirEdicao(post) {
    setPostSelecionado(post)
    setModal('form')
  }

  function abrirExclusao(post) {
    setPostSelecionado(post)
    setModal('confirm')
  }

  function fechar() {
    setModal(null)
    setPostSelecionado(null)
  }

  function handleSalvar(dados) {
    if (postSelecionado) {
      editarPost(postSelecionado.id, dados)
    } else {
      // Novo post pertence ao usuário logado.
      criarPost({
        ...dados,
        autor: usuario.nome,
        dono: usuario.nome,
        avatar: usuario.avatar,
      })
    }
    fechar()
  }

  function handleConfirmarExclusao() {
    excluirPost(postSelecionado.id)
    fechar()
  }

  return (
    <section aria-label="Postagens da Comunidade">
      <div className="addComunidadeContainer">
        <button className="addComunidade" id="btnAddComunidade" onClick={abrirNova}>
          <img src="/imagens/botaomais.png" alt="Botão de adicionar postagens" />
        </button>
        <span className="addComunidadeLabel">
          {usuario ? 'Publicar na comunidade' : 'Entre para publicar na comunidade'}
        </span>
      </div>

      {posts.length === 0 ? (
        <p className="feedVazio">
          Nenhuma postagem ainda. Clique em “+” para publicar a primeira!
        </p>
      ) : (
        <div className="gridComunidade">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEditar={abrirEdicao}
              onExcluir={abrirExclusao}
            />
          ))}
        </div>
      )}

      {modal === 'login' && <LoginModal onFechar={fechar} />}

      {modal === 'form' && (
        <PostFormModal
          postInicial={postSelecionado}
          autorAtual={usuario?.nome}
          onSalvar={handleSalvar}
          onCancelar={fechar}
        />
      )}

      {modal === 'confirm' && postSelecionado && (
        <ConfirmDialog
          titulo="Excluir postagem"
          mensagem={`Tem certeza que deseja excluir a postagem "${postSelecionado.descricao}"? Essa ação não pode ser desfeita.`}
          onConfirmar={handleConfirmarExclusao}
          onCancelar={fechar}
        />
      )}
    </section>
  )
}

export default Comunidade
