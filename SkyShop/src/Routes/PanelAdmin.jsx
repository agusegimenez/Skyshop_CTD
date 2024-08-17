import React, { useState } from 'react'
import customCss from "./PanelAdmin.module.css";

const adminPanelStateOptions = ["Usuarios", "Productos", "Categorías"];

export const PanelAdmin = () => {

    const [selectedOption, setSelectedOption] = useState("Usuarios");

    const handleButtonClick = (option) => {
        setSelectedOption(option);
    };

  return (
    <div className={customCss.divPadre}>
        <div className={customCss.panelAdmin}>
                <h3>Panel Administrador</h3>
                <div className={customCss.divAdminBtns}>
                    <button
                    className={customCss.adminBtn}
                    style={{
                    backgroundColor: selectedOption === "Productos" ? 'white' : '#01ac5c',
                    color: selectedOption === "Productos" ? '#01ac5c' : 'white',
                    }}
                    onClick={() => handleButtonClick("Productos")}
                    >
                        <img src={`/admin_prod_icon_${selectedOption === "Productos" ? "green" : "white"}.png`}/>
                        <p>Productos</p>
                    </button>
                    <button
                        style={{
                            backgroundColor: selectedOption === "Usuarios" ? 'white' : '#01ac5c',
                            color: selectedOption === "Usuarios" ? '#01ac5c' : 'white',
                        }}
                        onClick={() => handleButtonClick("Usuarios")}
                        className={customCss.adminBtn}>
                        <img src={`/admin_users_icon_${selectedOption === "Usuarios" ? "green" : "white"}.png`}/>
                        <p>Usuarios</p>
                    </button>
                    <button
                        style={{
                            backgroundColor: selectedOption === "Categorías" ? 'white' : '#01ac5c',
                            color: selectedOption === "Categorías" ? '#01ac5c' : 'white',
                        }}
                        onClick={() => handleButtonClick("Categorías")}
                        className={customCss.adminBtn}>
                        <img src={`/admin_categories_icon_${selectedOption === "Categorías" ? "green" : "white"}.png`}/>
                        <p>Categorías</p>
                    </button>
                </div>
        </div>
        <div>
            {/*
                aca tendria q aparecer un componente
                según el valor del estado selectedOption
            */}
        </div>
    </div>
  )
}