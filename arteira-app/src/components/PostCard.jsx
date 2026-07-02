import { usePosts } from '../context/PostsContext.jsx'
import { useUser } from '../context/UserContext.jsx'

function PostCard({ post, onEditar, onExcluir }) {
  const { alternarCurtida } = usePosts()
  const { usuario } = useUser()

  // Só o dono da postagem (usuário logado com o mesmo nome) pode editar/excluir.
  const ehDono = usuario && post.dono === usuario.nome

  return (
    <div className="postComunidade">
      <img className="postImg" src={post.imagem} alt={post.descricao} />

      <div className="infopost">
        <img className="avatar" src={post.avatar} alt={post.autor} />
        <div className="textopost">
          <span>{post.autor}</span>
          <p>{post.descricao}</p>
        </div>
        <button
          className={`curtir ${post.curtido ? 'ativo' : ''}`}
          onClick={() => alternarCurtida(post.id)}
          aria-label="Curtir"
          title="Curtir"
        >
          <img src="/imagens/CURTIDA.png" alt="Curtir" />
          <span>{post.curtidas}</span>
        </button>
      </div>

      {ehDono && (
        <div className="postAcoes">
          <button className="btnEditar" onClick={() => onEditar(post)}>
            Editar
          </button>
          <button className="btnExcluir" onClick={() => onExcluir(post)}>
            Excluir
          </button>
        </div>
      )}
    </div>
  )
}

export default PostCard
