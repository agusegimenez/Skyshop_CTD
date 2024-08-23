import React, { useState, useContext, useEffect } from 'react';
import customCss from "./Login.module.css";
import ErrorMessage from '../Components/ErrorMessage';
import { BotonContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState(''); // Para manejar errores desde el servidor
  const navigate = useNavigate();
  const token = "8b996ff6-94da-428a-93ca-a92504eac237"; // token que hay que actualizar cada vez que se levanta el back end

  const { setShowButtons, setLoggedUser } = useContext(BotonContext);

  useEffect(() => {
    setShowButtons(false);

    return () => {
      setShowButtons(true);
    };
  }, [setShowButtons]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^[A-Z][A-Za-z]{5,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasErrors = false;

    if (!validateEmail(email)) {
      setEmailError('Dirección de correo inválida');
      hasErrors = true;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Contraseña inválida');
      hasErrors = true;
    } else {
      setPasswordError('');
    }

    if (!hasErrors) {
      try {
        const response = await fetch('http://localhost:8080/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (!response.ok) {
          throw new Error('Error al iniciar sesión');
        }

        const data = await response.json();
        console.log('Usuario autenticado:', data);
        setLoggedUser(data);
        localStorage.setItem("loggedUser", JSON.stringify(data));
        setShowButtons(false);
        navigate("/");

        // Redirigir al usuario a otra página o guardar el token, etc.
        alert('Inicio de sesión exitoso');
        setServerError('');  // Limpiar error del servidor si todo fue exitoso

      } catch (error) {
        console.error('Error en la petición:', error);
        setServerError('Error al iniciar sesión. Por favor, revisa tus credenciales.');
      }
    }
  };

  return (
    <div className={customCss.padreForm}>
      <form className={customCss.formCreate} onSubmit={handleSubmit}>
        <div className={customCss.email}>
          <label>Email:</label>
          <input 
            type="text"
            placeholder="Ingrese su Email"
            value={email}
            onChange={handleEmailChange}
            className={`${customCss.inpForm} ${emailError ? customCss.errorInput : ''}`}
          />
          {emailError && <ErrorMessage message={emailError} />}
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
        {serverError && <ErrorMessage message={serverError} />} {/* Error desde el servidor */}
        <div className={customCss.btns}>
          <button className={customCss.login} type="submit">Iniciar sesión</button>
        </div>
      </form>
    </div>
  );
};

export default Login;