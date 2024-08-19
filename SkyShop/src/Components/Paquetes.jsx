import React, { useState } from 'react';
import { productos } from '../utils/products'; 
import customCss from "./Paquetes.module.css";
const Paquetes = () => {
  const [visibleMenu, setVisibleMenu] = useState(null);

  const toggleMenu = (productId) => {
    setVisibleMenu(visibleMenu === productId ? null : productId);
  };

  return (
    <div className={customCss.padreProds}>
      <div className={customCss.headerProds}>
        <h2>Productos</h2>
        <button className={customCss.añadirProd}>Agregar Producto</button>
      </div>
      <table className={customCss.tableHeader}>
        <thead>
          <tr className={customCss.headerTitles}>
            <th>PRODUCTO</th>
            <th>PRECIO</th>
            <th>CATEGORÍA</th>
            <th>VENTAS</th>
            <th>FECHA LISTADO</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id} className={customCss.trListado}>
              <td>
                <img src={producto.imagen} alt={producto.nombre} style={{ width: '60px', marginRight: '10px' }} />
              </td>
              <td>{producto.nombre}</td>
              <td className={customCss.letraVer}>${producto.precio.toLocaleString('es-AR')}</td>
              <td>{producto.categoria}</td>
              <td>{producto.stock}</td>
              <td>{producto.fecha}</td>
              <td>
                <div className={customCss.actionMenu} onClick={() => toggleMenu(producto.id)}>
                  &#9776;
                  {visibleMenu === producto.id && (
                    <div className={customCss.actionDropdown}>
                      <a href="#" className={customCss.editar}><img src="./iEdit.png" alt="icon-edit" />Editar</a>
                      <a href="#" className={customCss.eliminar}><img src="./iDelete.png" alt="icon-Delete" />Eliminar</a>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
          <button className={customCss.btnVer}>Ver más</button>
        </tbody>
      </table>
    </div>
  );
};

export default Paquetes;