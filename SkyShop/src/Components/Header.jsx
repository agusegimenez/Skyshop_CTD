import "../index.css"
import { routes } from "../utils/routes"
import { Link } from "react-router-dom"
const Header = () => {
  return (
    <header>
        <div className='header-divs'>
            <div className='logo'>
                <h2>logo</h2>                          {/*<Link to={routes.home}></Link> */}
                <h2 className='slogan'>Del cielo a tu heladera</h2>    {/*<Link to={routes.home}></Link>*/}
            </div>
            <div className='botones-header'>
                <button className="button">Crear cuenta</button>
                <button className="button">Iniciar sesión</button>
            </div>
        </div>
    </header>
  )
}

export default Header