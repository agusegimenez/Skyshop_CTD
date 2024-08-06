// Card.jsx
import customCss from "./Card.module.css";

export const Card = ({ producto, onClick }) => {
  const { imagen, nombre, precio, id } = producto;

  return (
    <article className={customCss.card} key={id} onClick={onClick}>
      <div className={customCss.divImg}>
        <img src={imagen} alt={nombre} />
      </div>
      <div className={customCss.divNombreYPrecio}>
        <h3>{nombre}</h3>
        <p id="precio">${precio}</p>
      </div>
    </article>
  );
};