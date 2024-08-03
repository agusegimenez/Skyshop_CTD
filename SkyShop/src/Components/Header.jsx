//import "../index.css"
import customCss from "./Header.module.css"

import { routes } from "../utils/routes"
import { Link } from "react-router-dom"
import MenuHamburguesa from "./MenuHamburguesa"
const Header = () => {
  return (
    <header>
        <div className={customCss.headerDivs}>
          <div className={customCss.logo}>
          <MenuHamburguesa/>
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
          <div className={customCss.userIcon}>
          <a href="#"><img src="./usuario.png" alt="icon-usuario" /></a>
        </div>
        <div className={customCss.cartIcon}>
          <a href="#"><img src="./cartIcon.png" alt="carrito" /></a>
        </div>
        </div>
    </header>
  )
}

export default Header