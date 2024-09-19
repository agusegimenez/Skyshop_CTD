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
  const { products, setProducts, finalizarPedido, loggedUser, fechaSeleccionada, horaSeleccionada} = useContext(BotonContext);
  const [showConfirmModal, setShowConfirmModal] = useState(null);
  // const [selectedDateTime, setSelectedDateTime] = useState(null);
  // const [isHorarioVisible, setIsHorarioVisible] = useState(false);
  const [moreUserDetails, setMoreUserDetails] = useState(false);
  const [direction, setDirection] = useState("");
  const navigate = useNavigate();

  const toggleSeeMoreUserDetails = (e) => {
    e.preventDefault();
    setMoreUserDetails(!moreUserDetails);
  }

  /* Función para deshabilitar horarios
  const isDisabledTime = (time) => {
    if (selectedDate?.getDate() === 11 && time === "14:00 - 15:00") {
      return true;
    }
    return false;
  }; */

  // Ejemplo de alerta de confirmación
  const confirmarReserva = () => {
    if (horaSeleccionada && fechaSeleccionada && direction.trim() !== "") {
      Swal.fire({
        title: '¡Reserva confirmada!',
        text: `Tu pedido ha sido confirmado para el ${fechaSeleccionada.toLocaleDateString()} a las ${horaSeleccionada}.`,
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          title: 'swal2-title-custom',
          content: 'swal2-text-custom',
          confirmButton: 'swal2-button-custom'
        }
      });
      finalizarPedido();
    }else if(direction.trim() === ""){
      Swal.fire({
        title: 'Error',
        text: 'Por favor, indique una dirección para el delivery.',
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          title: 'swal2-title-custom',
          content: 'swal2-text-custom',
          confirmButton: 'swal2-button-custom'
        }
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, selecciona una fecha y un horario antes de confirmar la reserva.',
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          title: 'swal2-title-custom',
          content: 'swal2-text-custom',
          confirmButton: 'swal2-button-custom'
        }
      });
    }
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


  /*const handleCantidadChange = (id, cantidad) => {
    const nuevosProductos = products.map(producto => 
      producto.id === id ? { ...producto, cantidad: Number(cantidad) } : producto
    );
    setProducts(nuevosProductos);
    localStorage.setItem("carrito", JSON.stringify(nuevosProductos));
  };*/

  const onChangeDirection = (e) => {
    e.preventDefault();
    setDirection(e.target.value);
  }
  

  const handleEliminar = (id) => {
    const nuevosProductos = products.filter(producto => producto.id !== id);
    setProducts(nuevosProductos);
    setShowConfirmModal(null);
    localStorage.setItem("carrito", JSON.stringify(nuevosProductos));
  };

  /*const totalCarrito = products.reduce((total, producto) => 
    total + producto.price * producto.cantidad, 0);
  */
  if (!loggedUser) {
    navigate('/login');
    return null; 
  }

  if(products.length == 0){
    return <>
      <div style={{height: "80vh", display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center"}}>
        <h3 className={customCss.carritoTittle}>Aún no hay ninguna Reserva en curso</h3>
      </div>
    </>
  }

  return (
    <>
      <h3 className={customCss.carritoTittle}>Reservas</h3>
      <div className={customCss.carritoContainer}>
        <div className={customCss.fechaHoraSelector}>
          <form className={customCss.datosUser}>
            <h2>Datos del usuario</h2>
            <div className={customCss.inpUser}>
              <label>Nombre:</label>
              <input type="text" value={loggedUser.username} disabled/>
            </div>
            <div className={customCss.inpUser}>
              <label>Email:</label>
              <input type="email" value={loggedUser.email} disabled/>
            </div>
            {moreUserDetails && <>
              <div className={customCss.inpUser}>
                <label>Rol:</label>
                <input type="text" value={loggedUser.role} disabled/>
              </div>
              <div className={customCss.inpUser}>
                <label>Fecha de última actualización:</label>
                <input type="text" value={loggedUser.updatedAt || "N/A"} disabled/>
              </div>
            </>}
            <button className={customCss.finalizarPedido} style={{ margin: "0px"}}onClick={(e) => toggleSeeMoreUserDetails(e)}>{ !moreUserDetails ? "Ver más datos" : "Ver menos datos"}</button>
          </form>
          <form className={customCss.datosUser}>
            <h2>Datos de Envío</h2>
            <div className={customCss.inpUser}>
              <label>Direccion:</label>
              <input type="text" placeholder='Ingrese su dirección' onChange={(e) => onChangeDirection(e)} />
            </div>
            <div className={customCss.inpUser}>
              <label>Fecha:</label>
              <input type="text" value={fechaSeleccionada.toLocaleDateString()} disabled/>
            </div>
            <div className={customCss.inpUser}>
              <label>Hora:</label>
              <input type="text" value={horaSeleccionada} disabled/>
            </div>
          </form>
          <div className={customCss.btnsCartMobile}>
          <button className={customCss.finalizarPedido} onClick={confirmarReserva}>Confirmar Reserva</button>
          <button className={customCss.cancelarPedido} onClick={cancelarPedido}>Cancelar Pedido</button>
          </div>
        </div>
        <div className={customCss.carritoPadre}>
          <div className={customCss.carritoProductos}>
            {products.map(producto => (
              <div className={customCss.productoItem} key={producto.id}>
                <span className={customCss.nombreCart}>{producto.name}</span>
                <img src={producto.images[0]} alt={producto.name} />
                <div className={customCss.caracteristicasProd}>
                  {producto.description.split(",").map((item, i) => (
                    <span key={i}>{item} <p>x1</p></span>
                  ))}
                  <div className={customCss.precioCart}>
                    <span className={customCss.precioVerd}>Precio ${(producto.price * producto.cantidad).toLocaleString()}</span>
                  </div>
                </div>
                <div className={customCss.caracteristicas}>
                  <h2>Características</h2>
                  <ul className={customCss.boxCaracteristicas}>
                    {producto.characteristics.map((caracteristica, i) => (
                      <li key={i}>
                        <img src={`/caracteristica_${caracteristica.toLowerCase()}.png`} alt={caracteristica} />
                        <p>{caracteristica}</p>
                      </li>
                    ))}
                  </ul>
                </div>
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