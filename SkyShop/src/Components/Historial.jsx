import React, { useContext, useEffect, useState } from 'react';
import { BotonContext } from '../Context/Context';

const Historial = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {loggedUser} = useContext(BotonContext);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/orders');
        if (!response.ok) {
          throw new Error('Error al obtener las órdenes');
        }
        const data = await response.json();
        setOrdenes(data); // Asumiendo que la respuesta es un array de órdenes
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdenes();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
            {
                loggedUser === null && (
                    <div>
                        <h1>¡Usted no esta logueado!</h1>
                    </div>
                )
            }
            {ordenes.length === 0 ? (
                <p>No tienes reservas realizadas.</p>
            ) : (
              <table className={customCss.table}>
                  <h1>Historíal</h1>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Contenido</th>
                            <th>Precio</th>
                            <th></th> {/* Columna para el botón de eliminar */}
                        </tr>
                    </thead>
                    <tbody>
                        {ordenes.map((producto) => (
                            <tr key={producto.cartId}>
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
                                <td className={customCss.order}>
                                    <p>producto.deliveryTime</p>
                                </td>
                                <td className={customCss.eliminar}>
                                    <button onClick={() => handleRemoveFavorito(producto)} className={customCss.deleteButton}>
                                        <img src="/iDelete.png" alt="Eliminar" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
  );
};

export default Historial;