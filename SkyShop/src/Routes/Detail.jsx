import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import customCss from "./Detail.module.css";
import { BotonContext } from '../Context/Context';
import { arrayToLowerCase } from '../utils/products';

const Detail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { producto } = location.state || {};
  const { loggedUser } = useContext(BotonContext);

  const caracteristicasLowerCase = arrayToLowerCase(producto.caracteristicas);

  const mostrarCaracteristicas = () => {
    return producto.caracteristicas.map((caracteristica, i) => {
      const caracteristicaUrlImg = `/caracteristica_${caracteristicasLowerCase[i]}.png`;
      return (
        <li key={i}>
          <img src={caracteristicaUrlImg} alt={caracteristicasLowerCase[i]} />
          <p>{caracteristica}</p>
        </li>
      );
    });
  };

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
            {loggedUser ? (
              <button className={customCss.btnAgregar}>Agregar a mi pedido</button>
            ) : (
              <button className={customCss.btnAgregarDisabled} disabled>
                Debes iniciar sesión para agregar al carrito
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={customCss.divCaracteristicas}>
        <h3>Características</h3>
        <ul className={customCss.listaCaracteristicas}>
          {mostrarCaracteristicas()}
        </ul>
      </div>
    </section>
  );
};

export default Detail;