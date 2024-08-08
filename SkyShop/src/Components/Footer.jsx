import React from 'react';
import customCss from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={customCss.footer}>
      <div className={customCss.izquierda}>
        <img className={customCss.logoFooter} src="./logoSkyShop.png" alt="logoSumo" />
        <div className={customCss.iconsFooter}>
          <a href="https://www.facebook.com">
            <img src="./iconoFacebook.png" alt="facebook" />
          </a>
          <a href="https://www.youtube.com">
            <img src="./iconoYoutube.png" alt="youtube" />
          </a>
          <a href="https://www.x.com">
            <img src="./iconoTwitter.png" alt="twitter" />
          </a>
          <a href="https://www.pinterest.com">
            <img src="./iconoPinterest.png" alt="pinterest" />
          </a>
          <a href="https://www.instagram.com">
            <img src="./iconoInstagram.png" alt="instagram" />
          </a>
        </div>
        <p className={customCss.copyLogo}>Copyright 2024. All Rights Reserved</p>
      </div>
      <div className={customCss.medio}>
        <h2>Contactanos</h2>
        <form className={customCss.contactForm}>
            <div className={customCss.dosInput}>
          <input type="text" placeholder="Nombre" className={customCss.inputF} required/>
          <input type="email" placeholder="Email" className={customCss.inputF} required/>
          </div>
          <div className={customCss.coments}>
          <textarea placeholder="Mensaje" className={customCss.textArea}></textarea>
          <button type="submit" className={customCss.btn}>Enviar</button>
          </div>
        </form>
      </div>
      <div className={customCss.derecha}>
        <ul>
          <li><a href="./home.html">Home</a></li>
          <li><a href="./productos.html">Productos</a></li>
          <li><a href="./contacto.html">Contactanos</a></li>
        </ul>
        <p>Copyright 2024. All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;