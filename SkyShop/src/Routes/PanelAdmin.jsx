import React, { useState, useEffect, useContext } from 'react';
import customCss from "./PanelAdmin.module.css";
import Paquetes from '../Components/Paquetes';
import { UsersList } from '../Components/UsersList';
import { BotonContext } from '../Context/Context';

export const PanelAdmin = () => {
    const [selectedOption, setSelectedOption] = useState("Usuarios");
    const [isMobile, setIsMobile] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const {loggedUser} = useContext(BotonContext);
    
    const isAdmin = () => {
        let response;
        if(loggedUser.role == "ADMIN"){
            response = true;
        }else{
            response = false;
        }
        return response;
    }

    if(loggedUser === null){
        return <div className={customCss.ifNotAdminDiv}>
        <h3>Usted ni siquiera está logueado como usuario. ¡Fuera!</h3>
        {isMobile && showPopup && (
            <div className={customCss.popupOverlay}>
                <div className={customCss.popup}>
                    <p className={customCss.warning}>No puede acceder a esta función desde este dispositivo</p>
                    <p>Ingrese desde un ordenador para acceder al Panel de Admin.</p>
                    <button className={customCss.acceptButton} onClick={closePopup}>Aceptar</button>
                </div>
            </div>
        )}
    </div>
    }

    //Usado para saber si es mobil o desktop 
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsMobile(true);
                setShowPopup(true); 
            } else {
                setIsMobile(false);
                setShowPopup(false); 
            }
        };

        //Ejecutar devuelta si se detecta un recargo o un redimensionar
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [loggedUser]);

    const handleButtonClick = (option) => {
        if (isMobile) {
            setShowPopup(true); 
        } else {
            setSelectedOption(option); 
        }
    };

    const closePopup = () => {
        window.location.reload(); 
    };
    if(isAdmin()){
        return (
            <div className={customCss.divPadre}>
                <div className={`${customCss.panelAdmin} ${showPopup ? customCss.blur : ''}`}>
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
                            <img src={`/admin_prod_icon_${selectedOption === "Productos" ? "green" : "white"}.png`} />
                            <p>Productos</p>
                        </button>
                        <button
                            className={customCss.adminBtn}
                            style={{
                                backgroundColor: selectedOption === "Usuarios" ? 'white' : '#01ac5c',
                                color: selectedOption === "Usuarios" ? '#01ac5c' : 'white',
                            }}
                            onClick={() => handleButtonClick("Usuarios")}
                        >
                            <img src={`/admin_users_icon_${selectedOption === "Usuarios" ? "green" : "white"}.png`} />
                            <p>Usuarios</p>
                        </button>
                        <button
                            className={customCss.adminBtn}
                            style={{
                                backgroundColor: selectedOption === "Categorías" ? 'white' : '#01ac5c',
                                color: selectedOption === "Categorías" ? '#01ac5c' : 'white',
                            }}
                            onClick={() => handleButtonClick("Categorías")}
                        >
                            <img src={`/admin_categories_icon_${selectedOption === "Categorías" ? "green" : "white"}.png`} />
                            <p>Categorías</p>
                        </button>
                    </div>
                </div>
                <div className={`${customCss.divAdminRoutes} ${showPopup ? customCss.blur : ''}`}>
                    {selectedOption === "Productos" && <Paquetes />}
                    {selectedOption === "Usuarios" && <UsersList />}
                    {selectedOption === "Categorías" && <p style={{
                        textAlign: "center", marginTop: "400px",
                    }}>Esta funcionalidad aún no se ha desarrollado</p>}
                </div>

                {showPopup && (
                    <div className={customCss.popupOverlay}>
                        <div className={customCss.popup}>
                            <p className={customCss.warning}>No puede acceder a esta función desde este dispositivo</p>
                            <p>Ingrese desde un ordenador para acceder al Panel de Admin.</p>
                            <button className={customCss.acceptButton} onClick={closePopup}>Aceptar</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }else{
        return (
            <div className={customCss.ifNotAdminDiv}>
                <h3>¡Para tener acceso a a la funcionalidad admin debes estar logeado con un usuario que cuente con el rol ADMIN!</h3>
                {isMobile && showPopup && (
                    <div className={customCss.popupOverlay}>
                        <div className={customCss.popup}>
                            <p className={customCss.warning}>No puede acceder a esta función desde este dispositivo</p>
                            <p>Ingrese desde un ordenador para acceder al Panel de Admin.</p>
                            <button className={customCss.acceptButton} onClick={closePopup}>Aceptar</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
};

export default PanelAdmin;