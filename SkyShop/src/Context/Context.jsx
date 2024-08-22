import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const BotonContext = createContext();

const ifUserInStorage = JSON.parse(localStorage.getItem("loggedUser"));
const loggingInitialState = ifUserInStorage === null ? null : ifUserInStorage;

export const BotonProvider = ({ children }) => {
    const [showButtons, setShowButtons] = useState(true);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loggedUser, setLoggedUser] = useState(loggingInitialState); //estado de usuario logueado
    const url = "http://localhost:8080/api"; // endpoint general de api back end
    const token = "694244ac-63ff-434d-a33a-c37a459677f3"; // token que hay que actualizar cada vez que se levanta el back end
    const navigate = useNavigate();
/*
    const fetchUsers = async () => {

        const username = 'admin1'; // Reemplaza con el nombre de usuario real
        const email = "admin1@example.com";
        const password = 'adminpassword'; // Reemplaza con la contraseña real
        const credentials = btoa(`${username}:${email}:${password}`); // Codifica las credenciales en Base64


        try {
            const response = await fetch('http://localhost:8080/api/users', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Basic ${credentials}`, // Añade el encabezado Authorization
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
          console.log(data);
        } catch (error) {
          console.error('Error en la petición:', error);
        }
      };
      */

      useEffect(() => {
        if(loggedUser !== null){
            setShowButtons(false);
        }
        //fetchUsers();
      }, [showButtons])

    const cerrarSesion = () => {
        setLoggedUser(null);
        localStorage.removeItem("loggedUser");
    }

    return (
        <BotonContext.Provider value={{ showButtons, setShowButtons, products, loading, loggedUser, setLoggedUser, cerrarSesion}}>
            {children}
        </BotonContext.Provider>
    );
};