import React from 'react';
import { useLocation } from 'react-router-dom';
import customCss from "./Detail.module.css";

const Detail = () => {
  const location = useLocation();
  const { producto } = location.state || {}; 

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }
  console.log(producto);

  const { imagen, nombre, precio, id, contenido } = producto;

  return (
    <section className={customCss.detailSect}>
      <div>
        <img src={imagen} alt={nombre} />
      </div>
      <div>
        <h3>{nombre}</h3>
        <p>${precio}</p>
      </div>
      <h2>Detalles del Producto</h2>
      <p>ID del Producto: {id}</p>
      <ul>
        {contenido.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
};

export default Detail;