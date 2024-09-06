import customCss from "./Card.module.css";
import { useNavigate } from 'react-router-dom';

export const Card = ({ producto }) => {
  const { images, name, price, id } = producto;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details/${producto.id}`, { state: { producto } }); // Pasando el producto en el estado
  };

  return (
    <article className={customCss.card} key={id} onClick={handleClick}>
      <div className={customCss.divImg}>
        <img src={images[0]} alt={name} />
      </div>
      <div className={customCss.divNombreYPrecio}>
        <h3>{name}</h3>
        <p id="precio">${price}</p>
      </div>
    </article>
  );
};