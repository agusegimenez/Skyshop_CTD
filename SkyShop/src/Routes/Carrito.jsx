import React, { useContext, useState } from 'react';
import { BotonContext } from "../Context/Context";
import customCss from "./Carrito.module.css";
import DatePicker from "react-datepicker"; 
import { es } from 'date-fns/locale';
import "/node_modules/react-datepicker/dist/react-datepicker.css"; 
import "./CustomDatePicker.css"

const Carrito = () => {
  const { products, setProducts, finalizarPedido } = useContext(BotonContext);
  const [showConfirmModal, setShowConfirmModal] = useState(null); // Producto que se va a eliminar
  const [selectedDate, setSelectedDate] = useState(new Date()); // Estado para la fecha seleccionada
  const [isHorarioVisible, setIsHorarioVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(""); // Estado para la hora seleccionada

  const toggleHorario = () => {
    setIsHorarioVisible(!isHorarioVisible);
  };

  const handleCantidadChange = (id, cantidad) => {
    const nuevosProductos = products.map(producto => 
      producto.id === id ? { ...producto, cantidad: Number(cantidad) } : producto
    );
    setProducts(nuevosProductos);
    localStorage.setItem("carrito", JSON.stringify(nuevosProductos));
  };

  const handleEliminar = (id) => {
    const nuevosProductos = products.filter(producto => producto.id !== id);
    setProducts(nuevosProductos);
    localStorage.setItem("carrito", JSON.stringify(nuevosProductos));
  };

  const totalCarrito = products.reduce((total, producto) => 
    total + producto.precio * producto.cantidad, 0);

  return (
    <>
    <h3 className={customCss.carritoTittle}>Carrito</h3>
    <div className={customCss.carritoContainer}>
      <div className={customCss.fechaHoraSelector}>
        <div>
        <h3>Seleccione el día y hora en el que se </h3>
        <h3>encontrará disponible para recibir su pedido.</h3>
        </div>
        <div className={customCss.calendarioPadre}>
        <div className={customCss.calendario}>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            inline
            locale={es} 
            dateFormat="dd/MM/yyyy"
            className={customCss.customCalendar}
          />
        </div>
        <div className={customCss.horarioContainer}>
        <span>Horario:</span>
        <button onClick={toggleHorario} className={customCss.dropdownButton}>
          &#9660; 
        </button>
      </div>
      {isHorarioVisible && (
            <div className={customCss.horarioDropdown}>
              <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                <option>07:00 - 08:00</option>
                <option>08:00 - 09:00</option>
                <option>09:00 - 10:00</option>
                <option>10:00 - 11:00</option>
                <option>11:00 - 12:00</option>
                <option>12:00 - 13:00</option>
                <option>13:00 - 14:00</option>
                <option>14:00 - 15:00</option>
                <option>15:00 - 16:00</option>
                <option>16:00 - 17:00</option>
                <option>17:00 - 18:00</option>
                <option>18:00 - 19:00</option>
                <option>19:00 - 20:00</option>
                <option>20:00 - 21:00</option>
                <option>21:00 - 22:00</option>
              </select>
            </div>
          )}
      </div>
      </div>
      <div className={customCss.carritoPadre}>
        <div className={customCss.carritoProductos}>
        {products.map(producto => (
          <div className={customCss.productoItem} key={producto.id}>
            <img src={producto.imagen} alt={producto.nombre} />
            <span>{producto.nombre}</span>
            <input 
              type="number" 
              value={producto.cantidad} 
              min="1" 
              onChange={(e) => handleCantidadChange(producto.id, e.target.value)} 
            />
            <span className={customCss.precioVerd}>${(producto.precio * producto.cantidad).toLocaleString()}</span>
            <button onClick={() => setShowConfirmModal(producto.id)}>
              <img className={customCss.deleteImg} src="./delete.png" alt="delete-icon"/>
            </button>
          </div>
        ))}

        {showConfirmModal !== null && (
          <div className={customCss.modalConfirmacion}>
            <p>¿Seguro que desea eliminar este producto de su carrito?</p>
            <button onClick={() => handleEliminar(showConfirmModal)}>Eliminar</button>
            <button onClick={() => setShowConfirmModal(null)}>Cancelar</button>
          </div>
        )}

        <div className={customCss.total}>
          <h3>Total</h3>
          <span>${totalCarrito.toLocaleString()}</span>
        </div>
      </div>
      <button className={customCss.finalizarPedido} onClick={finalizarPedido}>Finalizar pedido</button>
      </div>
    </div>
    </>
  );
};

export default Carrito;