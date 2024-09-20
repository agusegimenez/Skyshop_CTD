import React, { useContext, useEffect, useState } from 'react';
import { BotonContext } from '../Context/Context';
import customCss from "./Historial.module.css"

const Historial = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {loggedUser} = useContext(BotonContext);

  const url = `http://localhost:8080/api/orders/user/${loggedUser.id}`;

  

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/orders/user/${loggedUser.id}`);
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
      <h1>Historial</h1>
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
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Fecha Orden</th>
                            <th></th> {/* Columna para el botón de eliminar */}
                        </tr>
                    </thead>
                    <tbody>
                    {ordenes.map((producto) => (
                      <tr key={producto.id}>
                        <td className={customCss.cards}>
                          <div className={customCss.nombre}>
                          {/* Si quieres mostrar el nombre del primer item (asumiendo que siempre hay uno) */}
                      {producto.items.length > 0 && (
                        <p>{producto.items[0].itemName}</p>
                      )}
                      {/* Alternativamente, puedes recorrer todos los items si hay más de uno */}
                      {producto.items.map((item) => (
                        <p key={item.itemId}>{item.itemName}</p>
                      ))}
                      </div>
                      </td>
                      <td className={customCss.order}>
                        <p>{producto.deliveryTime}</p>
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