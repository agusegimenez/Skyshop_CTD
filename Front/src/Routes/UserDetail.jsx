import React, { useContext } from 'react'
import customCss from "./UserDetail.module.css"
import { BotonContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';

export const UserDetail = () => {

    const { loggedUser } = useContext(BotonContext);
    const navigate = useNavigate();

    const renderUpdatedDate = () => {
        if(loggedUser.updatedAt != null){
            return loggedUser.updatedAt;
        }else{
            return loggedUser.createdAt;
        }
    }

  return (
    <div className={customCss.padreForm}>
        {
            loggedUser === null && (
                <div>
                    <h1>¡Usted no esta logueado!</h1>
                </div>
            )
        }
        {
            loggedUser !== null && (
            <>
                <h1>Username: {loggedUser.username}</h1>
                <h2>Email: {loggedUser.email}</h2>
                <h3>Rol: {loggedUser.role}</h3>
                <h3>Fecha de creación: {loggedUser.createdAt}</h3>
                <h3>Fecha de actualización: {renderUpdatedDate()}</h3>
            </>)       
        }
    </div>
  )
}
