import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const BotonContext = createContext();

const ifUserInStorage = JSON.parse(localStorage.getItem("loggedUser"));
// const favsInStorage = JSON.parse(localStorage.getItem("userFavs")) || [];
const carritoFromStorage = JSON.parse(localStorage.getItem("carrito")) || [];
const fechaSeleccionadaFromStorage = JSON.parse(localStorage.getItem("fecha")) || new Date();
const horaSeleccionadaFromStorage = JSON.parse(localStorage.getItem("hora")) || "";

const loggingInitialState = ifUserInStorage === null ? null : ifUserInStorage;

export const BotonProvider = ({ children }) => {
    const [showButtons, setShowButtons] = useState(true);
    const [products, setProducts] = useState(carritoFromStorage);
    const [loading, setLoading] = useState(true);
    const [loggedUser, setLoggedUser] = useState(loggingInitialState); //estado de usuario logueado
    const [users, setUsers] = useState([]);
    const [prods, setProds] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    // const [favoritos, setFavoritos] = useState(favsInStorage);
    const url = "https://vivacious-encouragement.up.railway.app/api"; // endpoint general de api back end
    const token = "8443f471-f78c-4895-98e6-8fd2edafebb1"; // token que hay que actualizar cada vez que se levanta el back end
    const navigate = useNavigate();
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date(fechaSeleccionadaFromStorage)); // Nueva fecha seleccionada
    const [horaSeleccionada, setHoraSeleccionada] = useState(horaSeleccionadaFromStorage);


    const getProds = async () => {

      const settings = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      }

      try{
        const response = await fetch(`${url}/items`, settings);

        if(!response.ok){
          throw new Error('Error al hacer peticion GET de productos');
        }else{
          const data = await response.json();
          console.log("GET Productos: ", data);
          setProds(data);
        }
      }catch(error){
        console.error('Error en la petición GET de productos: ', err);
      }
    }

    const getAllOrders = async () => {
      const settings = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      }

      try{
        const response = await fetch(`${url}/orders`, settings);

        if(!response.ok){
          throw new Error('Error al hacer peticion GET de productos');
        }else{
          const data = await response.json();
          console.log("GET All Orders: ", data);
          setAllOrders(data);
        }
      }catch(error){
        console.error('Error en la petición GET de productos: ', err);
      }
    }

    const updateProd = async (prod) => {
      const settings = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(prod),
      }

      try{
        const response = await fetch(`${url}/items/${prod.id}`, settings);

        if(!response.ok){
          throw new Error('Error al hacer peticion PUT de producto');
        }else{
          const data = await response.json();
          console.log("PUT Productos: ", data);
          getProds();
          Swal.fire({
            title: 'OK',
            text: "El producto se ha actualizado con éxito",
            icon: 'success',
            confirmButtonText: 'OK'
                 });
          return data;
        }
      }catch(error){
        console.error('Error en la petición PUT de producto: ', error);
      }
    }

    const deleteProd = async (id) => {
      const settings = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      }

      try{
        const response = await fetch(`${url}/items/${id}`, settings);

        if(!response.ok){
          throw new Error('Error al hacer peticion DELETE de producto');
        }else{
          console.log("DELETE Producto: ", data);
          getProds();
        }
      }catch(error){
        console.error('Error en la petición DELETE de producto: ', error);
      }
    }

    const searchProdsByName = (searchString) => {
      const lowercasedSearchValue = searchString.toLowerCase();
      return prods.filter(product =>
        product.name.toLowerCase().includes(lowercasedSearchValue)
      );
    }
    

    const fetchChangeUserRole = async (rol, id) => {

      const settings = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ role: rol }),
      }

      try{
        const response = await fetch(`${url}/users/${id}/role`, settings);

        if(!response.ok){
          throw new Error('Error al hacer peticion de update/patch de role de user');
        }

        if(id === loggedUser.id){
          setLoggedUser({...loggedUser, role: rol});
          localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
        }

      }catch(err){
        console.error('Error en la petición:', err);
      }
    }

    const fetchToggleUserFav = async (userId, itemId) => {

      const settings = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      }

      try{
        const response = await fetch(`${url}/users/${userId}/toggleFav/${itemId}`, settings);

        if(!response.ok){
          throw new Error('Error al hacer peticion de update/patch toggle del fav del user');
          return;
        }
        const updatedUser = {
          ...loggedUser,
          favorites: [...prev, itemId],
        }
        setLoggedUser(updatedUser);
        localStorage.setItem("loggedUser", JSON.stringify(updatedUser));

      }catch(err){
        console.error('Error en la petición patch de update/patch toggle del fav del user:', err);
      }
    }

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://vivacious-encouragement.up.railway.app/api/users', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`, // Añade el encabezado Authorization
                },
                credentials: 'include',
            });
  
          if (!response.ok) {
            if (response.status === 403) {
              throw new Error('No tienes permiso para acceder a esta información.');
            }
            throw new Error('Error al obtener la lista de usuarios.');
          }
  
          const data = await response.json();
          const loggedUserFromBackend = data.find(user => user.id === loggedUser.id);
          console.log(data);
          setUsers(data);
          setLoading(false);
          if (loggedUserFromBackend) {
            setLoggedUser({
              ...loggedUserFromBackend,
              isAdmin: loggedUserFromBackend.role === "ADMIN" // Chequea si es admin
            });
            setLoggedUser(updatedUser);
            localStorage.setItem("loggedUser", JSON.stringify({
              ...loggedUserFromBackend,
              isAdmin: loggedUserFromBackend.role === "ADMIN"
            }));
          }
          setLoading(false);
        } catch (error) {
          console.error('Error en la petición:', error);
          setLoading(false);
        }
      };

      useEffect(() => {
        if(loggedUser !== null){
            setShowButtons(false);
        }
        //getProds();
        //fetchUsers();
      }, [showButtons])

    const cerrarSesion = () => {
        setLoggedUser(null);
        localStorage.removeItem("loggedUser");
    }

    const agregarProductoAlCarrito = (producto, fechaa, horaa) => {
      setProducts(prevProducts => {
        const nuevoProducto = { 
          ...producto, 
          cantidad: 1,
          fecha: fechaa,
          hora: horaa,
        };

        // Si ya hay productos en el carrito, reemplaza el producto existente
        const nuevoCarrito = prevProducts.length > 0
        ? [{ ...nuevoProducto }]
        : [{ ...nuevoProducto }];

      localStorage.setItem("hora", JSON.stringify(horaa));
      localStorage.setItem("fecha", JSON.stringify(fechaa));
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
      return nuevoCarrito;
    });
    };

  // Funcion para vaciar el carrito al finalizar el pedido
  const finalizarPedido = () => {

      // esto convierte la fecha y hora al tipo de dato que se maneja en el back
      // (LocalDateTime)
  
      const [startHour] = horaSeleccionada.split(' - ');
      const selectedDateTime = new Date(fechaSeleccionada);
    
      const [hours, minutes] = startHour.split(':');
      selectedDateTime.setHours(hours, minutes, 0, 0);
  
      const orderedAt = selectedDateTime.toISOString(); // "2024-09-19T08:00:00.000Z"

      //aca se deberia hacer el post de la orden
  
      console.log("Fecha y hora en formato ISO:", orderedAt);

      // aca tiene que redirigir tambien a una pagina de "exito"?
      // segun el 1er requerimiento de la historia de usuario 32

      setProducts([]);
      localStorage.removeItem("fecha");
      localStorage.removeItem("hora");
      localStorage.removeItem("carrito");
      navigate("/");
  }


  // Función para alternar el estado de favorito
  const toggleFavorito = async (producto) => {
    try {
      await fetchToggleUserFav(loggedUser.id, producto.id);
      let updatedFavoritos;

      if (loggedUser.favorites.some(favId => favId === producto.id)) {
        updatedFavoritos = loggedUser.favorites.filter(favId => favId !== producto.id);
      } else {
        updatedFavoritos = [...loggedUser.favorites, producto.id];
      }

      const updatedUser = {
        ...loggedUser,
        favorites: updatedFavoritos
      };
      setLoggedUser(updatedUser);
      localStorage.setItem('loggedUser', JSON.stringify(updatedUser));

    } catch (error) {
      console.error('Error al alternar favorito:', error);
    }
  };

  useEffect(() => {
    if (loggedUser === null) {
      localStorage.removeItem("userFavs");
    }
    // Puedes hacer una llamada al backend para obtener los favoritos del usuario al iniciar sesión
  }, [loggedUser]);
  

  // Esto lo reemplace con la inicializacion del estado con el valor del localStorage en la linea 7
  /* useEffect(() => {
    const storedFavoritos = JSON.parse(localStorage.getItem('userFavs')) || [];
    setFavoritos(storedFavoritos);
  }, []); */

    return (
        <BotonContext.Provider value={{allOrders, showButtons, setShowButtons, products, setProducts, agregarProductoAlCarrito, finalizarPedido, loading, loggedUser, setLoggedUser, cerrarSesion, users, fetchUsers, fetchChangeUserRole, setUsers, token, prods, updateProd, deleteProd, searchProdsByName, toggleFavorito, fechaSeleccionada, setFechaSeleccionada, horaSeleccionada, setHoraSeleccionada, getProds, getAllOrders}}>
            {children}
        </BotonContext.Provider>
    );
};