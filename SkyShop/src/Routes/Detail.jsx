import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import customCss from "./Detail.module.css";
import { BotonContext } from '../Context/Context';
import { arrayToLowerCase, productos } from '../utils/products';
import DatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import "/node_modules/react-datepicker/dist/react-datepicker.css"; 
import "./CustomDatePicker.css"
import Swal from 'sweetalert2';

const Detail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // id de producto
  const { loggedUser, token, finalizarPedido } = useContext(BotonContext);
  const [producto, setProducto] = useState(null);
  const { agregarProductoAlCarrito } = useContext(BotonContext);
  const [mainImg, setMainImg] = useState(""); // estado que guarda la imagen que se muestra grande
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isHorarioVisible, setIsHorarioVisible] = useState(false);
  const url = "http://localhost:8080/api/items/" + id;

  const handleAgregar = () => {
    // Verificar si se ha seleccionado una hora
    if (!selectedTime) {
      Swal.fire({
        title: '¡Atención!',
        text: 'Debes seleccionar una hora antes de agregar tu reserva.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return; // Salir de la función si no se ha seleccionado una hora
    }
  
    // Si hay una hora seleccionada, agregar el producto al carrito
    agregarProductoAlCarrito(producto);
  
    Swal.fire({
      title: '¡Éxito!',
      text: 'Se agregó tu reserva correctamente!',
      icon: 'success',
      timer: 3000, // Duración de la alerta en milisegundos
      timerProgressBar: true, // Muestra la barra de progreso
      showConfirmButton: false, // Oculta el botón de confirmación
    });
  
    // Redirige después de 3 segundos
    setTimeout(() => {
      navigate('/carrito');
    }, 3000); // Tiempo en milisegundos igual al temporizador de la alerta
  };
  const toggleHorario = () => {
    setIsHorarioVisible(!isHorarioVisible);
  };

  const getDetailProd = async () => {
    const settings = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    }

    try {
      const response = await fetch(url, settings);

      if (!response.ok) {
        throw new Error('Error al hacer peticion GET de productos');
      } else {
        const data = await response.json();
        console.log("GET Producto detalle: ", data);
        setMainImg(data.images[0]);
        setProducto(data);
      }
    } catch (error) {
      console.error('Error en la petición GET de productos: ', err);
    }
  }

  const handleMainImg = (newMainImg) => {
    if (newMainImg !== mainImg) setMainImg(newMainImg);
  }

  console.log("valor de producto: " + producto);

  // esta funcion recorre el array de strings y devuelve un array de strings en minusculas
 // es para que por cada carcateristica, suponiendo q las imagenes de iconos de las caracteristicas
 // son por ej: si la caracteristica es "Alimentos", la imagen/icono tendria q llamarse "caracteristica_alimentos.png"
 // esto sirve para implementar la busqueda dinamica de los iconos de las caracteristicas ya que
 // tampoco va a pasar que se puedan crear nuevas caracteristicas con nuevos iconos
 // sino que en el agregado de productos (si es q lo implementamos) seria ideal que
 // las caracteristicas se pudieran solo elegir tipo checkbox con un maximo de tildar de 5 opciones o algo asi
 // y en la carpeta "public" habria un icono por cada caracteristica
 
  useEffect(() => {
    getDetailProd();
  }, [id]);

  const mostrarCaracteristicas = () => {
    const caracteristicasLowerCase = arrayToLowerCase(producto.characteristics);
    return producto.characteristics.map((caracteristica, i) => {
      const caracteristicaUrlImg = `/caracteristica_${caracteristicasLowerCase[i]}.png`;
      return (
        <li key={i}>
          <img src={caracteristicaUrlImg} alt={caracteristicasLowerCase[i]} />
          <p>{caracteristica}</p>
        </li>
      );
    });
  };

  // Verifica si el día seleccionado es el 11 para deshabilitar ciertas horas
  const isDisabledTime = (time) => {
    if (selectedDate?.getDate() === 11 && time === "14:00 - 15:00") {
      return true; // Deshabilita este horario el día 11
    }
    return false;
  };

  if (!producto) {
    return <div style={{ marginTop: "200px" }}>Producto no encontrado</div>;
  }

  const { name, images, description, price } = producto;

  return (
    <section className={customCss.detailSect}>
      <div className={customCss.divGral}>
        <div className={customCss.primerDiv}>
          <div className={customCss.divNombreYBoton}>
            <h3 className={customCss.nombreSt}>{name}</h3>
            <button
              className={customCss.btnCerrar}
              onClick={() => navigate(-1)}>
              <img src="/flechaizquierda.png" alt="flecha atras" />
            </button>
          </div>
          <div className={customCss.imgDiv}>
            <img src={mainImg} alt={name} />
          </div>
          <div className={customCss.allImgsDiv}>
            {images.map(imagen => (
              <button
                className={customCss.imgOptionBtn}
                style={{ backgroundColor: imagen === mainImg && '#d0fdd7' }}
                onClick={() => handleMainImg(imagen)}>
                <img src={imagen} />
              </button>
            ))}
          </div>
          <div className={customCss.divCaracteristicas}>
            <h3>Características</h3>
            <ul className={customCss.listaCaracteristicas}>
              {mostrarCaracteristicas()}
            </ul>
          </div>
        </div>
        <div className={customCss.derechoDetail}>
          <div className={customCss.contenidoMod}>
            <ul>
              {description.split(',').map((item, index) => (
                <li key={index}>
                  {item}
                  <p>x1</p>
                </li>
              ))}
            </ul>
            <p className={customCss.precioP}><span>Precio </span>${price}</p>
          </div>
          <div className={customCss.calendarioPadre}>
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
                  {["07:00 - 08:00", "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00", "17:00 - 18:00", "18:00 - 19:00", "19:00 - 20:00", "20:00 - 21:00", "21:00 - 22:00"].map((time) => (
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
          <div className={customCss.divBtn}>
            {loggedUser ? (
              <button className={customCss.btnAgregar} onClick={handleAgregar}>
                <a>Agregar a mi pedido</a>
              </button>
            ) : (
              <button className={customCss.btnAgregarDisabled} disabled>
                Debes iniciar sesión para agregar al carrito
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;