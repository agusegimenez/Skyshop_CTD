import React from 'react'
import { obtenerIniciales, obtenerNombreAvatar} from '../utils/usuarios'
import customCss from "./UserIcon.module.css"

// recibe por props el username del cual muestra las iniciales y nombre
export const UserIcon = ({username}) => {
  const iniciales = obtenerIniciales(username);
  const nombre = obtenerNombreAvatar(username);

  return (
    <div className={customCss.divIconGral}>
        <div className={customCss.divIniciales}>
            <span>{iniciales}</span>
        </div>
        <p className={customCss.pIcon}>{nombre}</p>
    </div>
  )
}