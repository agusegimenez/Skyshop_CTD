import { useNavigate } from "react-router-dom";
import customCss from "./Header.module.css";
import MenuHamburguesa from "./MenuHamburguesa";
import { useContext, useState } from "react";
import { BotonContext } from "../Context/Context";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { showButtons, setShowButtons } = useContext(BotonContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLoginCuentaClick = () => {
    setShowButtons(false);
    navigate("/login");
  };
  const handleCrearCuentaClick = () => {
    setShowButtons(false);
    navigate("/register");
  };

  return (
    <header>
      <div className={customCss.headerDivs}>
        <div className={customCss.logo}>
          <MenuHamburguesa />
          <a href="/"><img src="/logoSkyShop.png" alt="logo" /></a>
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
            <li><a href="#">Carrito</a></li>
          </ul>
        </nav>
          <div className={customCss.botonesHeader} style={{ visibility: showButtons ? 'visible' : 'hidden' }}>
            <button className={customCss.btn} onClick={handleCrearCuentaClick}>Crear cuenta</button>
            <button className={customCss.btn} onClick={handleLoginCuentaClick}>Iniciar Sesión</button>
          </div>
        <div className={customCss.userIcon} onClick={toggleMenu}>
          <a href="#"><img src="/user.png" alt="icon-usuario" /></a>
        </div>
        {menuOpen && (
        <div className={customCss.dropdownMenu}>
           <button className={customCss.menuButton} onClick={handleLoginCuentaClick}>Iniciar sesión</button>
          <button className={customCss.menuButton} onClick={handleCrearCuentaClick}>Crear cuenta</button>
        </div>
      )}
        <div className={customCss.cartIcon}>
          <a href="#"><img src="/cart.png" alt="carrito" /></a>
        </div>
      </div>
    </header>
  );
};

export default Header;