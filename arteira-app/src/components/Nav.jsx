import { Link } from 'react-router-dom'

function Nav() {
  return (
    <nav aria-label="Menu Principal">
      <ul className="menu">
        <li><a href="#">Categorias</a></li>
        <li><Link to="/comunidade">Comunidade</Link></li>
        <li><a href="#">Frete</a></li>
        <li><a href="#">Catálogo</a></li>
        <li><a href="#">Denunciar</a></li>
        <li><a href="#">Cupons</a></li>
        <li><a href="#">Contato</a></li>
        <li><a href="#">Vender</a></li>
        <li><a href="#">Ofertas</a></li>
      </ul>
    </nav>
  )
}

export default Nav
