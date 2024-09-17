import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import customCss from "./Detail.module.css";
import { BotonContext } from '../Context/Context';
import { arrayToLowerCase } from '../utils/products';
import DatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import "/node_modules/react-datepicker/dist/react-datepicker.css"; 
import "./CustomDatePicker.css"
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const Detail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // id de producto
  const { loggedUser, token, finalizarPedido, favoritos, toggleFavorito } = useContext(BotonContext);
  const [producto, setProducto] = useState(null);
  const [mainImg, setMainImg] = useState(""); // estado que guarda la imagen que se muestra grande
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isHorarioVisible, setIsHorarioVisible] = useState(false);
  const [isFavorito, setIsFavorito] = useState(false); // Inicialmente en false
  const url = "http://localhost:8080/api/items/" + id;

  const handleAgregar = () => {
    if (!selectedTime) {
      Swal.fire({
        title: '¡Atención!',
        text: 'Debes seleccionar una hora antes de agregar tu reserva.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
  
    agregarProductoAlCarrito(producto, selectedDate, selectedTime);
  
    Swal.fire({
      title: '¡Éxito!',
      text: 'Se agregó tu reserva correctamente!',
      icon: 'success',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  
    setTimeout(() => {
      navigate('/carrito');
    }, 3000);
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
      console.error('Error en la petición GET de productos: ', error);
    }
  }

  useEffect(() => {
    getDetailProd();
  }, [id]);

  useEffect(() => {
    if (producto) {
      const isInFavoritos = favoritos.some(fav => fav.id === producto.id);
      setIsFavorito(isInFavoritos);
    }
  }, [favoritos, producto]);

  const handleMainImg = (newMainImg) => {
    if (newMainImg !== mainImg) setMainImg(newMainImg);
  }

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

  const isDisabledTime = (time) => {
    if (selectedDate?.getDate() === 11 && time === "14:00 - 15:00") {
      return true;
    }
    return false;
  };

  if (!producto) {
    return <div style={{ marginTop: "200px" }}>Producto no encontrado</div>;
  }

  const { name, images, description, price } = producto;

  const handleFavoritoClick = (e) => {
    e.stopPropagation();
    toggleFavorito(producto);
};

  return (
    <section className={customCss.detailSect}>
      <div className={customCss.divGral}>
        <div className={customCss.primerDiv}>
          <div className={customCss.divNombreYBoton}>
            <h3 className={customCss.nombreSt}>{name}</h3>
            <div>
              {loggedUser !== null &&
                <button onClick={handleFavoritoClick} className={`${customCss.favButton} ${isFavorito ? customCss.filled : ''}`}>
                <FontAwesomeIcon 
                  icon={isFavorito ? solidHeart : regularHeart}
                  className={isFavorito ? customCss.filledIcon : ''}
                  style={{ fontSize: '30px', transition: 'transform 0.3s ease, color 0.3s ease', color: isFavorito ? 'red' : 'green' }} 
                />
              </button>
              }
              <button
                className={customCss.btnCerrar}
                onClick={() => navigate(-1)}>
                <img src="/flechaizquierda.png" alt="flecha atras" />
              </button>
            </div>
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
                minDate={new Date()}
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