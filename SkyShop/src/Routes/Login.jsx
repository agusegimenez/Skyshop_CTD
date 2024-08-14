import React, { useState, useContext, useEffect } from 'react';
import customCss from "./Login.module.css";
import ErrorMessage from '../Components/ErrorMessage';
import { BotonContext } from '../Context/Context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { setShowButtons } = useContext(BotonContext);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('Dirección de correo inválida');
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Contraseña inválida');
    } else {
      setPasswordError('');
    }

    if (validateEmail(email) && validatePassword(password)) {
      console.log('Email:', email);
      console.log('Password:', password);
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
    <div className={customCss.btns}>
    <button className={customCss.login} type="submit">Iniciar sesión</button>
    </div>
  </form>
  </div>
);
};

export default Login