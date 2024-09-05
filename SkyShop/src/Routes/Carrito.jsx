import React, { useContext, useState } from 'react';
import { BotonContext } from "../Context/Context";
import customCss from "./Carrito.module.css";
import DatePicker from "react-datepicker"; 
import { es } from 'date-fns/locale';
import "/node_modules/react-datepicker/dist/react-datepicker.css"; 
import "./CustomDatePicker.css"
import { useNavigate } from 'react-router-dom';

const Carrito = () => {
  const { products, setProducts, finalizarPedido, loggedUser } = useContext(BotonContext);
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
    setShowConfirmModal(null);
    localStorage.setItem("carrito", JSON.stringify(nuevosProductos));
  };

  const totalCarrito = products.reduce((total, producto) => 
    total + producto.precio * producto.cantidad, 0);

  return (
    <>
    <h3 className={customCss.carritoTittle}>Detalle de Reserva</h3>
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
        </div>
        <div className={customCss.horarioContainer}>
          <div className={customCss.horarioWrapper}>
            <span className={customCss.horarioLabel}>Horario:</span>
            <div className={customCss.horarioSelect}>
            <span>{selectedTime || "Selecciona una hora"}</span>
            <button onClick={toggleHorario} className={customCss.dropdownButton}>
              &#9660; 
            </button>
          </div>
          </div>
          {isHorarioVisible && (
        <div className={customCss.horarioDropdown}>
           <ul className={customCss.horarioLista}>
              {["07:00 - 08:00", "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00", "17:00 - 18:00", "18:00 - 19:00","19:00 - 20:00", "20:00 - 21:00", "21:00 - 22:00"].map((time) => (
             <li key={time} className={customCss.horarioItem} onClick={() => setSelectedTime(time)}>
              {time}
            </li>
            ))}
            </ul>
          </div>
          )}
        </div>
          <button className={customCss.finalizarCalendar} onClick={finalizarPedido}>Confirmar Reserva</button>
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
              className={customCss.cantidad} 
            />
            <span className={customCss.precioVerd}>${(producto.precio * producto.cantidad).toLocaleString()}</span>
            <button onClick={() => setShowConfirmModal(producto.id)}>
              <img className={customCss.deleteImg} src="./delete.png" alt="delete-icon"/>
            </button>
          </div>
        ))}

        {showConfirmModal !== null && (
          <div className={customCss.modalConfirmacion}>
            <p>¿Seguro qué desea eliminar este producto de su carrito?</p>
            <div className={customCss.botonesConfirmacion}>
                    <button onClick={() => handleEliminar(showConfirmModal)} className={customCss.botonEliminar}>
                        Eliminar
                    </button>
                    <button onClick={() => setShowConfirmModal(null)} className={customCss.botonCancelar}>
                        Cancelar
                    </button>
                </div>
          </div>
        )}

        <div className={customCss.total}>
          <h3>Total</h3>
          <span>${totalCarrito.toLocaleString()}</span>
        </div>
      </div>
      <button className={customCss.finalizarPedido} onClick={finalizarPedido}>Confirmar Reserva</button>
      </div>
    </div>
    </>
);
};

export default Carrito;