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
    const url = "http://localhost:8080/api"; // endpoint general de api back end
    const token = "a4342962-b9f7-470f-a0ad-ac2555e3d314"; // token que hay que actualizar cada vez que se levanta el back end
    const navigate = useNavigate();

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

        const username = 'admin12'; // Reemplaza con el nombre de usuario real
        const email = "admin12@example.com";
        const password = 'Adminpassword'; // Reemplaza con la contraseña real
        const credentials = btoa(`${username}:${email}:${password}`); // Codifica las credenciales en Base64


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
        fetchUsers();
      }, [showButtons])

    const cerrarSesion = () => {
        setLoggedUser(null);
        localStorage.removeItem("loggedUser");
    }

    // Funcion para poder agregar productos al carrito
    const agregarProductoAlCarrito = (producto) => {
      setProducts(products => {
          const productoExistente = products.find(p => p.id === producto.id);
          if (productoExistente) {
              // Actualiza la cantidad si el producto ya esta en el carrito
              const productosActualizados = products.map(p =>
                  p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
              );
              localStorage.setItem("carrito", JSON.stringify(productosActualizados));
              return productosActualizados;
          } else {
              // Agrega el nuevo producto al carrito
              const nuevoCarrito = [...products, { ...producto, cantidad: 1 }];
              localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
              return nuevoCarrito;
          }
      });
  };

  // Funcion para vaciar el carrito al finalizar el pedido
  const finalizarPedido = () => {
      setProducts([]);
      localStorage.removeItem("carrito");
  }

    return (
        <BotonContext.Provider value={{ showButtons, setShowButtons, products, setProducts, agregarProductoAlCarrito, finalizarPedido, loading, loggedUser, setLoggedUser, cerrarSesion, users, fetchUsers, fetchChangeUserRole, setUsers}}>
            {children}
        </BotonContext.Provider>
    );
};