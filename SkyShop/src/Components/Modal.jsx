import React from 'react';
import customCss from './Modal.module.css'; 

const Modal = ({ isOpen, onClose, producto }) => {
  if (!isOpen || !producto) return null; 

  const { imagen, nombre, precio } = producto;

  return (
    <div className={customCss.modalCard}>
      <div className={customCss.contenidoMod}>
        <button className={customCss.btnCerrar} onClick={onClose}>X</button>
        <h2>{nombre}</h2>
        <img src={imagen} alt={nombre} />
        <p className={customCss.nombreSt}>{nombre} <span className={customCss.precioSp}>${precio}</span></p>
        <div className={customCss.descripcion}>
          <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>
          <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>
        </div>
        <button className={customCss.btnAgregar}>Agregar a mi pedido</button>
      </div>
    </div>
  );
};

export default Modal;