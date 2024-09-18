import React, { useContext, useState } from 'react';
import { BotonContext } from '../Context/Context';
import customCss from "./PanelFavoritos.module.css";
import Favoritos from '../Components/Favoritos';
import Historial from '../Components/Historial';
import UserProfile from '../Components/UserProfile';

const PanelFavoritos = () => {
  const { loggedUser, favoritos } = useContext(BotonContext);
  const [selectedOption, setSelectedOption] = useState("Favoritos");

  if (loggedUser === null) {
    return (
      <div className={customCss.ifNotAdminDiv}>
        <h3>Usted ni siquiera está logueado como usuario. ¡Fuera!</h3>
      </div>
    );
  }

  const handleButtonClick = (option) => {
    setSelectedOption(option); // Actualiza el estado con la opción seleccionada
  };

  return (
    <div className={customCss.divPadre}>
      <div className={customCss.panelUser}>
        <h3>Panel de Usuario</h3>
        <div className={customCss.divUserBtns}>
          <button
            className={customCss.userBtn}
            style={{
              backgroundColor: selectedOption === "Historial" ? 'white' : '#01ac5c',
              color: selectedOption === "Historial" ? '#01ac5c' : 'white',
            }}
            onClick={() => handleButtonClick("Historial")}
          >
            <img src={`/user_historial_icon_${selectedOption === "Historial" ? "green" : "white"}.png`} />
            <p>Historial</p>
          </button>
          <button
            className={customCss.userBtn}
            style={{
              backgroundColor: selectedOption === "Usuario" ? 'white' : '#01ac5c',
              color: selectedOption === "Usuario" ? '#01ac5c' : 'white',
            }}
            onClick={() => handleButtonClick("Usuario")}
          >
            <img src={`/admin_users_icon_${selectedOption === "Usuario" ? "green" : "white"}.png`} />
            <p>Usuario</p>
          </button>
          <button
            className={customCss.userBtn}
            style={{
              backgroundColor: selectedOption === "Favoritos" ? 'white' : '#01ac5c',
              color: selectedOption === "Favoritos" ? '#01ac5c' : 'white',
            }}
            onClick={() => handleButtonClick("Favoritos")}
          >
            <img src={`/user_favoritos_icon_${selectedOption === "Favoritos" ? "green" : "white"}.png`} />
            <p>Favoritos</p>
          </button>
        </div>
      </div>
      <div className={customCss.divUserRoutes}>
        {selectedOption === "Historial" && <Historial />}
        {selectedOption === "Usuario" && <UserProfile />}
        {selectedOption === "Favoritos" && <Favoritos productos={favoritos} />}
      </div>
    </div>
  );
};

export default PanelFavoritos;