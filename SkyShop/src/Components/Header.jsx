import "../index.css"
import { routes } from "../utils/routes"
import { Link } from "react-router-dom"
const Header = () => {
  return (
    <header>
        <div className='header-divs'>
            <div className='logo'>
                <img src="./logoSkyShop.png" alt="" />                        {/*<Link to={routes.home}></Link> */}
                <h2 className='slogan'>Del cielo a tu heladera</h2>    {/*<Link to={routes.home}></Link>*/}
            </div>
            <nav className="nav-links">
              <ul>
                <li><a href="#">Ofertas</a></li>
                <li><a href="#">Productos</a></li>
                <li><a href="#">Contacto</a></li>
              </ul>
            </nav>
            <div className="botones-header">
              <a href="#" className="login">login</a>
            <div className="separator"></div>
              <div className="create-account">
                <a href="#"><span className="part">create</span></a>
                <a href="#"><span className="part">account</span></a>
          </div>
        </div>
        </div>
    </header>
  )
}

export default Header