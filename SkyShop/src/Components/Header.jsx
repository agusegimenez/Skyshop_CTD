import { useNavigate } from "react-router-dom";
import customCss from "./Header.module.css";
import MenuHamburguesa from "./MenuHamburguesa";
import { useContext, useEffect, useState } from "react";
import { BotonContext } from "../Context/Context";
import { UserIcon } from "./UserIcon";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuLog, setMenuLog] = useState(false);
  const navigate = useNavigate();
  const { showButtons, setShowButtons, loggedUser, setLoggedUser, cerrarSesion} = useContext(BotonContext);

  useEffect(() => {
    setShowButtons(loggedUser === null);
}, [loggedUser]);
  

  const toggleLog = () => {
    setMenuLog(!menuLog);
  }

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
        {loggedUser !== null && <div className={customCss.loguedIcon} onClick={toggleLog}>
       <a href="#"><UserIcon username={loggedUser.username}/></a>
      </div>}
      {loggedUser && menuLog && (
        <div className={customCss.dropdownMenu}>
           <a href="#" className={customCss.logMenu}>Usuario</a>
           <a href="#" className={customCss.logMenu}>Carrito</a>
           <button className={customCss.logBtn} onClick={cerrarSesion}>Cerrar Sesión</button>
        </div>
       )}
          <div className={customCss.botonesHeader} style={{ display: loggedUser ? 'none' : 'flex', visibility: showButtons ? 'visible' : 'hidden' }}>
            <button className={customCss.btn} onClick={handleCrearCuentaClick}>Crear cuenta</button>
            <button className={customCss.btn} onClick={handleLoginCuentaClick}>Iniciar Sesión</button>
          </div>
          {loggedUser === null && (
          <div className={customCss.userIcon} onClick={toggleMenu}>
            <a href="#"><img src="/user.png" alt="icon-usuario" /></a>
          </div>
          )}
        {loggedUser === null && menuOpen && (
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