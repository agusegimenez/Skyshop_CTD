import React, { createContext, useState, useEffect } from 'react';

export const BotonContext = createContext();

export const BotonProvider = ({ children }) => {
    const [showButtons, setShowButtons] = useState(true);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Función para registrar un usuario
    const registerUser = async (userData) => {
        try {
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData), // Convierte el objeto a JSON
            });

            if (!response.ok) {
                throw new Error('Error al registrar el usuario');
            }

            const data = await response.json();
            console.log('Usuario registrado:', data);

            return data;
        } catch (error) {
            console.error('Error en la petición de registro:', error);
            return null;
        }
    };

    // Ejemplo de datos de usuario que puedes enviar
    const user = {
        username: "testuser777",
        email: "testuser777@example.com",
        password: "testpassword777"
    };

    useEffect(() => {
        // Llamada para registrar un usuario cuando el componente se monte
        registerUser(user);

        // Fetch de productos desde el backend
        fetch('http://localhost:8080/api/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data); 
                setLoading(false);
            })
            .catch(error => console.error('Error al obtener productos:', error));
    }, []);

    return (
        <BotonContext.Provider value={{ showButtons, setShowButtons, products, loading }}>
            {children}
        </BotonContext.Provider>
    );
};