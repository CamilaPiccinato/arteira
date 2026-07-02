import { Link } from 'react-router-dom'

const categorias = [
  { classe: 'croche', img: 'croche.png', nome: 'Crochê' },
  { classe: 'pintura', img: 'pintura.png', nome: 'Pintura' },
  { classe: 'macrame', img: 'macrame.png', nome: 'Macramê' },
  { classe: 'micangas', img: 'micangas.png', nome: 'Miçangas' },
]

function Home() {
  return (
    <>
      <section className="Comunidade">
        <Link to="/comunidade" className="comunidade">
          <img src="/imagens/imagemcomunidade.png" alt="Comunidade" />
        </Link>
      </section>

      <section className="categorias">
        {categorias.map((cat) => (
          <a href="#" className={cat.classe} key={cat.classe}>
            <img src={`/imagens/${cat.img}`} alt={cat.nome} />
            <span className="overlay">{cat.nome}</span>
          </a>
        ))}
      </section>
    </>
  )
}

export default Home
