import React, { useContext } from 'react';
import { BotonContext } from '../Context/Context';
import customCss from "./Favoritos.module.css";

const Favoritos = () => {
    const { favoritos, toggleFavorito } = useContext(BotonContext);

    return (
        <div>
            {favoritos.length === 0 ? (
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
                        {favoritos.map((producto) => (
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
                                    <button onClick={() => toggleFavorito(producto)} className={customCss.deleteButton}>
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