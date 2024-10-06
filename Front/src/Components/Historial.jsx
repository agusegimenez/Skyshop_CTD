import React, { useContext, useEffect, useState } from 'react';
import { BotonContext } from '../Context/Context';
import customCss from "./Historial.module.css";

const Historial = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loggedUser } = useContext(BotonContext);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const response = await fetch(`https://vivacious-encouragement.up.railway.app/api/orders/user/${loggedUser.id}`);
        if (!response.ok) {
          throw new Error('Error al obtener las órdenes');
        }
        const data = await response.json();

        // Ordenar las órdenes por la fecha de deliveryTime (más recientes primero)
        const ordenesOrdenadas = data.sort((b, a) => new Date(b.deliveryTime) - new Date(a.deliveryTime));

        setOrdenes(ordenesOrdenadas);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdenes();
  }, [loggedUser.id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Historial</h1>
      {loggedUser === null && (
        <div>
          <h1>¡Usted no está logueado!</h1>
        </div>
      )}
      {ordenes.length === 0 ? (
        <p>No tienes reservas realizadas.</p>
      ) : (
        <table className={customCss.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th style={{textAlign: "left"}}>Fecha y Hora de Llegada</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((producto) => (
              <tr key={producto.id}>
                <td className={customCss.cards}>
                  <div className={customCss.nombre}>
                    {producto.items.length > 0 && (
                      <p>{producto.items[0].itemName}</p>
                    )}
                  </div>
                </td>
                <td className={customCss.order} style={{borderBottom: "2px solid #01ac5c"}}>
                  <p>{new Date(producto.deliveryTime).toLocaleString()}</p>
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