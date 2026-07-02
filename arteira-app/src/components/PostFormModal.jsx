import { useState } from 'react'
import { arquivoParaDataURL } from '../utils/imagem.js'

const CATEGORIAS = ['Crochê', 'Pintura', 'Macramê', 'Miçangas', 'Bordado', 'Outros']

// Imagens de exemplo disponíveis no projeto (atalho, além do upload).
const IMAGENS_EXEMPLO = [
  { valor: '/imagens/ecobagdavibrito.png', nome: 'Ecobag de crochê' },
  { valor: '/imagens/VASO.png', nome: 'Vaso decorado' },
  { valor: '/imagens/FOLHA.png', nome: 'Cerâmica / folha' },
  { valor: '/imagens/gatopintura.png', nome: 'Pintura de pet' },
  { valor: '/imagens/ABELHA.png', nome: 'Quadro bordado' },
  { valor: '/imagens/camagato.png', nome: 'Caminha para pet' },
]

function PostFormModal({ postInicial, autorAtual, onSalvar, onCancelar }) {
  const editando = Boolean(postInicial)

  const [descricao, setDescricao] = useState(postInicial?.descricao ?? '')
  const [categoria, setCategoria] = useState(postInicial?.categoria ?? CATEGORIAS[0])
  const [imagem, setImagem] = useState(postInicial?.imagem ?? '')
  const [erros, setErros] = useState({})

  // Quem publica: ao editar mantém o autor original; ao criar, o usuário logado.
  const autor = postInicial?.autor ?? autorAtual

  async function handleUpload(e) {
    const arquivo = e.target.files?.[0]
    if (!arquivo) return
    try {
      const dataURL = await arquivoParaDataURL(arquivo)
      setImagem(dataURL)
      setErros((prev) => ({ ...prev, imagem: undefined }))
    } catch (err) {
      setErros((prev) => ({ ...prev, imagem: err.message }))
    }
  }

  function validar() {
    const novosErros = {}
    if (!descricao.trim()) novosErros.descricao = 'Descreva a peça.'
    if (!imagem.trim()) novosErros.imagem = 'Escolha uma foto para a postagem.'
    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validar()) return
    onSalvar({
      descricao: descricao.trim(),
      categoria,
      imagem,
    })
  }

  return (
    <div className="modalOverlay" onClick={onCancelar}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2>{editando ? 'Editar postagem' : 'Nova postagem'}</h2>

        <p className="modalTextoConfirma">
          Publicando como <strong>{autor}</strong>
        </p>

        <label htmlFor="descricao">Descrição da peça</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Ex.: Duas ecobags de crochê"
        />
        {erros.descricao && <p className="erroCampo">{erros.descricao}</p>}

        <label htmlFor="categoria">Categoria</label>
        <select
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <label htmlFor="imagemUpload">Foto da peça</label>
        <input
          id="imagemUpload"
          type="file"
          accept="image/*"
          onChange={handleUpload}
        />

        <label htmlFor="imagemExemplo">…ou escolha um exemplo</label>
        <select
          id="imagemExemplo"
          value={IMAGENS_EXEMPLO.some((i) => i.valor === imagem) ? imagem : ''}
          onChange={(e) => setImagem(e.target.value)}
        >
          <option value="">— selecione —</option>
          {IMAGENS_EXEMPLO.map((img) => (
            <option key={img.valor} value={img.valor}>{img.nome}</option>
          ))}
        </select>

        {imagem && (
          <div className="previewImagem">
            <img src={imagem} alt="Prévia da foto" />
          </div>
        )}
        {erros.imagem && <p className="erroCampo">{erros.imagem}</p>}

        <div className="modalAcoes">
          <button type="button" className="btnSecundario" onClick={onCancelar}>
            Cancelar
          </button>
          <button type="submit" className="btnPrimario">
            {editando ? 'Salvar alterações' : 'Publicar'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostFormModal
