import React, { useContext, useState } from 'react';
import { BotonContext } from "../Context/Context";
import { useNavigate } from 'react-router-dom';  
import customCss from "./Carrito.module.css";
import DatePicker from "react-datepicker"; 
import { es } from 'date-fns/locale';
import "/node_modules/react-datepicker/dist/react-datepicker.css"; 
import "./CustomDatePicker.css"
import Swal from 'sweetalert2';

const Carrito = () => {
  const { products, setProducts, finalizarPedido, loggedUser } = useContext(BotonContext);
  const [showConfirmModal, setShowConfirmModal] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isHorarioVisible, setIsHorarioVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const navigate = useNavigate();  
 
  const toggleHorario = () => {
    setIsHorarioVisible(!isHorarioVisible);
  };

   // Alerta para cancelar pedido
   const cancelarPedido = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      html: "¡Tu pedido será cancelado y no podrás revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, continuar',
      customClass: {
        title: 'swal2-title-custom',     
        content: 'swal2-text-custom',   
        confirmButton: 'swal2-button-custom', 
        cancelButton: 'swal2-button-custom',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Cancelado',
          'Tu pedido ha sido cancelado.',
          'success'
        );
        finalizarPedido();
      }
    });
  };

  // Alerta para confirmar la reserva
  const confirmarReserva = () => {
    Swal.fire({
      title: '¡Reserva confirmada!',
      text: 'Tu pedido ha sido confirmado correctamente.',
      icon: 'success',
      confirmButtonText: 'OK',
      customClass: {
        title: 'swal2-title-custom',
        content: 'swal2-text-custom',
        confirmButton: 'swal2-button-custom'
      }
    });
    // Lógica para confirmar el pedido
    finalizarPedido();  // Aquí llamas la función que ya tienes implementada para finalizar el pedido
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
    total + producto.price * producto.cantidad, 0);

  if (!loggedUser) {
    navigate('/login');
    return null; 
  }

  // Verifica si el día seleccionado es el 11 para deshabilitar ciertas horas
  const isDisabledTime = (time) => {
    if (selectedDate?.getDate() === 11 && time === "14:00 - 15:00") {
      return true; // Deshabilita este horario el día 11
    }
    return false;
  };

  return (
    <>
      <h3 className={customCss.carritoTittle}>Reservas</h3>
      <div className={customCss.carritoContainer}>
        <div className={customCss.fechaHoraSelector}>
          <form className={customCss.datosUser}>
            <h2>Datos del usuario</h2>
            <div className={customCss.inpUser}>
            <label>Nombre:</label>
            <input type="text" value={loggedUser.username} placeholder='Ingrese su nombre'/>
            </div>
            <div className={customCss.inpUser}>
            <label>Apellido:</label>
            <input type="text" placeholder='Ingrese su apellido' />
            </div>
            <div className={customCss.inpUser}>
            <label>Email:</label>
            <input type="email" value={loggedUser.email} placeholder='Ingrese su email'/>
            </div>
            <div className={customCss.inpUser}>
            <label>Direccion:</label>
            <input type="text" placeholder='Ingrese su dirección' />
            </div>
          </form>
          <div>
            <h3>Seleccione el día y hora en el que se encontrará disponible para recibir su pedido.</h3>
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
                    <li
                    key={time}
                    className={`${isDisabledTime(time) ? 'disabled' : ''} ${customCss.horarioItem}`}
                    onClick={() => !isDisabledTime(time) && setSelectedTime(time)}
                  >
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
                <span>{producto.name}</span>
                <img src={producto.images[0]} alt={producto.name} />
                {producto.description.split(",").map(item => <span>{item}</span>)}
                <span className={customCss.precioVerd}>Precio ${(producto.price * producto.cantidad).toLocaleString()}</span>
              </div>
            ))}
            <div className={customCss.caracteristicas}>
              <h2>Caracteristicas</h2>
              {products.map(productos => (
            <span>{productos.characteristics}</span>
              ))}
            </div>
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
          <div className={customCss.btnsCart}>
          <button className={customCss.finalizarPedido} onClick={confirmarReserva}>Confirmar Reserva</button>
          <button className={customCss.cancelarPedido} onClick={cancelarPedido}>Cancelar Pedido</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carrito;