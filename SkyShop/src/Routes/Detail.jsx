import React from 'react';
import { useLocation } from 'react-router-dom';
import customCss from "../Components/Card.module.css";

const Detail = () => {
  const location = useLocation();
  const { producto } = location.state || {}; 

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  const { imagen, nombre, precio, id, contenido } = producto;

  return (
    <>
      <div className={customCss.imagenPrueba}>
        <img src={imagen} alt={nombre} />
      </div>
      <div className={customCss.divNombreYPrecio}>
        <h3>{nombre}</h3>
        <p id="precio">${precio}</p>
      </div>
      <h2>Detalles del Producto</h2>
      <p>ID del Producto: {id}</p>
      <ul>
        {contenido.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default Detail;