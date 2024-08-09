import React from 'react';
import customCss from './Modal.module.css'; 

const Modal = ({ isOpen, onClose, producto }) => {
  if (!isOpen || !producto) return null; 

  const { imagen, nombre, precio, contenido} = producto;

  const renderContenido = () => {
    return contenido.map((content, index) => (
      <p key={index}>{content} x1</p>
    ));
  };
  

  return (
    <div className={customCss.modalCard}>
      <div className={customCss.contenidoMod}>
        <button className={customCss.btnCerrar} onClick={onClose}><img src="./icono-flecha.png" alt="flechaAtras" /></button>
        <h2>{nombre}</h2>
        <img src={imagen} alt={nombre} />
        <div className={customCss.descripcion}>
          {renderContenido()}
        </div>
        <p className={customCss.nombreSt}>Precio: <span className={customCss.precioSp}>${precio}</span></p>
        <button className={customCss.btnAgregar}>Agregar a mi pedido</button>
      </div>
    </div>
  );
};

export default Modal;