//import "../index.css"
import customCss from "./Header.module.css"

import { routes } from "../utils/routes"
import { Link } from "react-router-dom"
const Header = () => {
  return (
    <header>
        <div className={customCss.headerDivs}>
          <div className={customCss.logo}>
            <img src="./logoSkyShop.png" alt="logo" />
            <div className={customCss.separator}></div>
            <div className={customCss.sloganContainer}>
              <span className={customCss.slogan}>Los productos</span>
              <span className={customCss.sloganSegundo}>vuelan a tu hogar</span>
            </div>
            </div>
            <nav className={customCss.navLinks}>
              <ul>
                <li><a href="#">Ofertas</a></li>
                <li><a href="#">Productos</a></li>
                <li><a href="#">Contacto</a></li>
              </ul>
            </nav>
            <div className={customCss.botonesHeader}>
              <button className={customCss.btn}>Crear cuenta</button>
              <button className={customCss.btn}>Iniciar Sesión</button>
          </div>
        </div>
    </header>
  )
}

export default Header