import React, { useContext, useEffect, useState } from 'react';
import { BotonContext } from '../Context/Context';
import customCss from "./Favoritos.module.css";
import { useLocation } from 'react-router-dom';

const Favoritos = () => {
    const { loggedUser, toggleFavorito, prods, getProds} = useContext(BotonContext);
    const [favoritosProds, setFavoritosProds] = useState([]);
    // const location = useLocation()

    useEffect(() => {
      if (loggedUser) {
        const productosFavoritos = prods.filter(prod => loggedUser.favorites.includes(prod.id));
        setFavoritosProds(productosFavoritos);
        console.log("productos favoritos: ", productosFavoritos);
      }
    }, [loggedUser, prods]);

    useEffect(() => {
        getProds();  // Asegúrate de llamar esta función cuando la página se cargue
      }, []);

    

    const handleRemoveFavorito = (producto) => {
      toggleFavorito(producto); 
    };

    return (
        <div>
            {
                loggedUser === null && (
                    <div>
                        <h1>¡Usted no esta logueado!</h1>
                    </div>
                )
            }
            {favoritosProds.length === 0 ? (
                <p>No tienes productos favoritos.</p>
            ) : (
                <table className={customCss.table}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Contenido</th>
                            <th>Precio</th>
                            <th></th> {/* Columna para el botón de eliminar */}
                        </tr>
                    </thead>
                    <tbody>
                        {favoritosProds.map((producto) => (
                            <tr key={producto.id}>
                                <td className={customCss.cards}>
                                    <div className={customCss.nombre}>
                                    <img src={producto.images} alt={producto.name} className={customCss.productImage} />
                                    <p>{producto.name}</p>
                                    </div>
                                </td>
                                <td className={customCss.contenido}>
                                    {producto.description.split(",").map((item, i) => (
                                        <span key={i}>{item} x1</span>
                                    ))}
                                </td>
                                <td className={customCss.price}>
                                    <p>${producto.price?.toLocaleString()}</p>
                                </td>
                                <td className={customCss.eliminar}>
                                    <button onClick={() => handleRemoveFavorito(producto)} className={customCss.deleteButton}>
                                        <img src="/iDelete.png" alt="Eliminar favorito" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {/* <button className={customCss.verMasBtn}>Ver más</button> */}
        </div>
    );
};

export default Favoritos;