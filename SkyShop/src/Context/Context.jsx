import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const BotonContext = createContext();

const ifUserInStorage = JSON.parse(localStorage.getItem("loggedUser"));
const carritoFromStorage = JSON.parse(localStorage.getItem("carrito")) || [];

const loggingInitialState = ifUserInStorage === null ? null : ifUserInStorage;

export const BotonProvider = ({ children }) => {
    const [showButtons, setShowButtons] = useState(true);
    const [products, setProducts] = useState(carritoFromStorage);
    const [loading, setLoading] = useState(true);
    const [loggedUser, setLoggedUser] = useState(loggingInitialState); //estado de usuario logueado
    const [users, setUsers] = useState([]);
    const [prods, setProds] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const url = "http://localhost:8080/api"; // endpoint general de api back end
    const token = "33667bff-5135-46ec-b4f3-f69202b28da6"; // token que hay que actualizar cada vez que se levanta el back end
    const navigate = useNavigate();
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date()); // Nueva fecha seleccionada
    const [horaSeleccionada, setHoraSeleccionada] = useState(""); 

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

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/users', {
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
        getProds();
        fetchUsers();
      }, [showButtons])

    const cerrarSesion = () => {
        setLoggedUser(null);
        localStorage.removeItem("loggedUser");
    }

    const agregarProductoAlCarrito = (producto, fecha, hora) => {
      setProducts(prevProducts => {
        const nuevoProducto = { 
          ...producto, 
          cantidad: 1, 
          fechaReserva: fecha,  // Agregar la fecha seleccionada
          horaReserva: hora     // Agregar la hora seleccionada
        };

        // Si ya hay productos en el carrito, reemplaza el producto existente
        const nuevoCarrito = prevProducts.length > 0
        ? [{ ...nuevoProducto }]
        : [{ ...nuevoProducto }];
  
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
      return nuevoCarrito;
    });
    };

  // Funcion para vaciar el carrito al finalizar el pedido
  const finalizarPedido = () => {
      setProducts([]);
      localStorage.removeItem("carrito");
  }


  // Función para alternar el estado de favorito
  const toggleFavorito = (producto) => {
    setFavoritos((prevFavoritos) => {
      const isFavorito = prevFavoritos.some((item) => item.id === producto.id);
      const nuevosFavoritos = isFavorito
        ? prevFavoritos.filter((item) => item.id !== producto.id)
        : [...prevFavoritos, producto];
  
      // Actualizar localStorage después de modificar los favoritos
      localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
      return nuevosFavoritos;
    });
  };

  useEffect(() => {
    const storedFavoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    setFavoritos(storedFavoritos);
  }, []);

    return (
        <BotonContext.Provider value={{ showButtons, setShowButtons, products, setProducts, agregarProductoAlCarrito, finalizarPedido, loading, loggedUser, setLoggedUser, cerrarSesion, users, fetchUsers, fetchChangeUserRole, setUsers, token, prods, updateProd, deleteProd, searchProdsByName, toggleFavorito, favoritos, fechaSeleccionada, setFechaSeleccionada, horaSeleccionada, setHoraSeleccionada}}>
            {children}
        </BotonContext.Provider>
    );
};