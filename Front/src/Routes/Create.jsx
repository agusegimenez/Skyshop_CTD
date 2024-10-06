import React, { useContext, useEffect, useState } from 'react';
import ErrorMessage from '../Components/ErrorMessage';
import customCss from './Create.module.css';
import { BotonContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Create = () => {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [nombreError, setNombreError] = useState('');
    const [apellidoError, setApellidoError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [direccionError, setDireccionError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const { setShowButtons } = useContext(BotonContext);

    useEffect(() => {
        setShowButtons(false);

        return () => {
            setShowButtons(true);
        };
    }, [setShowButtons]);

    const handleNombreChange = (e) => setNombre(e.target.value);
    const handleApellidoChange = (e) => setApellido(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleDireccionChange = (e) => setDireccion(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => {
        if (password.length < 5 || /^[a-z]/.test(password)) {
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de campos
        let hasErrors = false;
        if (!nombre) {
            setNombreError('Nombre es obligatorio');
            hasErrors = true;
        } else {
            setNombreError('');
        }

        if (!apellido) {
            setApellidoError('Apellido es obligatorio');
            hasErrors = true;
        } else {
            setApellidoError('');
        }

        if (!validateEmail(email)) {
            setEmailError('Dirección de correo inválida');
            hasErrors = true;
        } else {
            setEmailError('');
        }

        if (!direccion) {
            setDireccionError('Dirección es obligatoria');
            hasErrors = true;
        } else {
            setDireccionError('');
        }

        if (!validatePassword(password)) {
            setPasswordError('La contraseña debe iniciar con Mayúscula y debe contener al menos 5 caracteres');
            hasErrors = true;
        } else {
            setPasswordError('');
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Las contraseñas no coinciden');
            hasErrors = true;
        } else {
            setConfirmPasswordError('');
        }

        if (hasErrors) return;

        // Si no hay errores, se hace la petición al backend
        try {
            const username = nombre + " " + apellido;
            const response = await fetch('https://vivacious-encouragement.up.railway.app/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    direccion,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al registrar el usuario');
            }

            const data = await response.json();
            console.log('Usuario registrado:', data);
            navigate("/login");

            // Puedes limpiar el formulario si el registro fue exitoso
            setNombre('');
            setApellido('');
            setEmail('');
            setDireccion('');
            setPassword('');
            setConfirmPassword('');
            Swal.fire({
                title: 'Usuario registrado con exíto',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
        } catch (error) {
            console.error('Error en la petición:', error);
            console.error('Hubo un error al registrar el usuario.')
            alert('Ya hay un usuario registrado con el mismo email. Cambialo por otro email.');
        }
    };

    return (
        <div className={customCss.padreForm}>
            <form className={customCss.formCreate} onSubmit={handleSubmit}>
                <div className={customCss.nombre}>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Ingrese su Nombre"
                        value={nombre}
                        onChange={handleNombreChange}
                        className={`${customCss.inpForm} ${nombreError ? customCss.errorInput : ''}`}
                    />
                    {nombreError && <ErrorMessage message={nombreError} />}
                </div>
                <div className={customCss.apellido}>
                    <label>Apellido:</label>
                    <input
                        type="text"
                        placeholder="Ingrese su Apellido"
                        value={apellido}
                        onChange={handleApellidoChange}
                        className={`${customCss.inpForm} ${apellidoError ? customCss.errorInput : ''}`}
                    />
                    {apellidoError && <ErrorMessage message={apellidoError} />}
                </div>
                <div className={customCss.email}>
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Ingrese su Email"
                        value={email}
                        onChange={handleEmailChange}
                        className={`${customCss.inpForm} ${emailError ? customCss.errorInput : ''}`}
                    />
                    {emailError && <ErrorMessage message={emailError} />}
                </div>
                <div className={customCss.direccion}>
                    <label>Dirección:</label>
                    <input
                        type="text"
                        placeholder="Ingrese su dirección (ciudad-calle-esq.)"
                        value={direccion}
                        onChange={handleDireccionChange}
                        className={`${customCss.inpForm} ${direccionError ? customCss.errorInput : ''}`}
                    />
                    {direccionError && <ErrorMessage message={direccionError} />}
                </div>
                <div className={customCss.password}>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        placeholder="Ingrese su contraseña"
                        value={password}
                        onChange={handlePasswordChange}
                        className={`${customCss.inpForm} ${passwordError ? customCss.errorInput : ''}`}
                    />
                    {passwordError && <ErrorMessage message={passwordError} />}
                </div>
                <div className={customCss.confirmPassword}>
                    <label>Verificar contraseña:</label>
                    <input
                        type="password"
                        placeholder="Ingrese su contraseña"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className={`${customCss.inpForm} ${confirmPasswordError ? customCss.errorInput : ''}`}
                    />
                    {confirmPasswordError && <ErrorMessage message={confirmPasswordError} />}
                </div>
                <div className={customCss.btns}>
                    <button className={customCss.login} type="submit">Crear</button>
                </div>
            </form>
        </div>
    );
};

export default Create;