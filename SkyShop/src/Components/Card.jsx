import { useContext, useEffect, useState } from "react";
import { BotonContext } from "../Context/Context";
import customCss from "./Card.module.css";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

export const Card = ({ producto }) => {
  const { images, name, price, id } = producto;
  const { toggleFavorito, favoritos, loggedUser} = useContext(BotonContext);
  const [isFavorito, setIsFavorito] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details/${producto.id}`, { state: { producto } });
  };

  const handleFavoritoClick = (e) => {
    e.stopPropagation();
    toggleFavorito(producto);
  };

  useEffect(() => {
    const isInFavoritos = favoritos.some(fav => fav.id === id);
    setIsFavorito(isInFavoritos);
  }, [favoritos, id]);

  return (
    <article className={customCss.card} key={id} onClick={handleClick}>
      <div className={customCss.divImg}>
        <img src={images[0]} alt={name} />
      </div>
      <div className={customCss.divNombreYPrecio}>
        <h3>{name}</h3>
        <p id="precio">${price}</p>
      </div>
      {loggedUser !== null &&
        <div className={customCss.btnCorazon}>
        <button onClick={handleFavoritoClick} className={`${customCss.favButton} ${isFavorito ? customCss.filled : ''}`}>
          <FontAwesomeIcon 
            icon={isFavorito ? solidHeart : regularHeart}
            className={isFavorito ? customCss.filledIcon : ''}
            style={{ fontSize: '30px', transition: 'transform 0.3s ease, color 0.3s ease', color: isFavorito ? 'red' : 'green' }} 
          />
        </button>
      </div>
      }
    </article>
  );
};
