import { useNavigate } from "react-router-dom";
import customCss from "./Header.module.css";
import MenuHamburguesa from "./MenuHamburguesa";
import { useContext, useEffect, useRef, useState } from "react";
import { BotonContext } from "../Context/Context";
import { UserIcon } from "./UserIcon";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuLog, setMenuLog] = useState(false);
  const navigate = useNavigate();
  const { showButtons, setShowButtons, loggedUser, cerrarSesion} = useContext(BotonContext);

  useEffect(() => {
    setShowButtons(loggedUser === null);
}, [loggedUser]);


  const toggleLog = () => {
    setMenuLog(prev => !prev);
    setMenuOpen(false);
  }

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
    setMenuLog(false);
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
            {loggedUser && <li><a href="/carrito">Carrito</a></li>}
          </ul>
        </nav>
        {loggedUser !== null && <div className={customCss.loguedIcon} onClick={toggleLog}>
       <a href="#"><UserIcon username={loggedUser.username}/></a>
      </div>}
      {loggedUser && menuLog && (
  <>
    {loggedUser.role === "ADMIN" ? (
      <div className={customCss.dropdownMenu}>
        <a href="/admin" className={customCss.logMenu}>Admin</a>
        <button className={customCss.logBtn} onClick={cerrarSesion}><a href="/">Cerrar Sesión</a></button>
      </div>
    ) : (
      <div className={customCss.dropdownMenu}>
        <a href="/user" className={customCss.logMenu}>Usuario</a>
        <a href="/carrito" className={customCss.logMenu}>Carrito</a>
        <a href="/panel" className={customCss.logMenu}>Favoritos</a>
        <button className={customCss.logBtn} onClick={cerrarSesion}>Cerrar Sesión</button>
      </div>
    )}
  </>
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
          {loggedUser && <a href="/carrito"><img src="/cart.png" alt="carrito" /></a>}
        </div>
      </div>
    </header>
  );
};

export default Header;