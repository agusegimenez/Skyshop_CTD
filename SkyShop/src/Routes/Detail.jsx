import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import customCss from "./Detail.module.css";

const Detail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { producto } = location.state || {}; 

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  const { imagen, nombre, precio, id, contenido } = producto;

  return (
    <section className={customCss.detailSect}>
      <div className={customCss.divGral}>
        <div className={customCss.primerDiv}>
          <div className={customCss.divNombreYBoton}>
            <h3 className={customCss.nombreSt}>{nombre}</h3>
            <button
              className={customCss.btnCerrar}
              onClick={() => navigate(-1)}>
              <img src="/flechaizquierda.png" alt="flecha atras"/>
            </button>
          </div>
          <div className={customCss.imgDiv}>
            <img src={imagen} alt={nombre} />
          </div>
        </div>
        <div>
          <div className={customCss.contenidoMod}>
            <ul>
              {contenido.map((item, index) => (
                <li key={index}>
                  {item}
                  <p>x1</p>
                </li>
              ))}
            </ul>
            <p className={customCss.precioP}><span>Precio </span>${precio}</p>
          </div>
          <div className={customCss.divBtn}>
            <button className={customCss.btnAgregar}>Agregar a mi pedido</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;