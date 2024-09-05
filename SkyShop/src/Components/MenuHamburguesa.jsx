import React, { useContext, useState } from 'react';
import customCss from './MenuHamburguesa.module.css';
import { BotonContext } from '../Context/Context';

const MenuHamburguesa = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { loggedUser } = useContext(BotonContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={customCss.hamburgerMenu}>
      <div className={customCss.hamburgerIcon} onClick={toggleMenu}>
        &#9776;
      </div>
      <nav className={`${customCss.menu} ${isOpen ? customCss.open : ''}`}>
        <ul>
          <li><a href="#">Ofertas</a></li>
          <li><a href="#">Productos</a></li>
          {loggedUser && <li><a href="/carrito">Carrito</a></li>}
        </ul>
      </nav>
    </div>
  );
};

export default MenuHamburguesa;