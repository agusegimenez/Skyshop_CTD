import customCss from "./Card.module.css";
import { useNavigate } from 'react-router-dom';

export const Card = ({ producto }) => {
  const { imagen, nombre, precio, id } = producto;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details/${producto.id}`, { state: { producto } }); // Pasando el producto en el estado
  };

  return (
    <article className={customCss.card} key={id} onClick={handleClick}>
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