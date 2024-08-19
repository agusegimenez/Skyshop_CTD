import React from 'react'
import { obtenerIniciales, obtenerNombreAvatar, usuarios } from '../utils/usuarios'
import customCss from "./UserIcon.module.css"

export const UserIcon = () => {

    // cambiar "usuarios[0]" por el usuario logeado (cuando contemos con esa funcionalidad del back)
    const iniciales = obtenerIniciales(usuarios[0].username);
    const nombre = obtenerNombreAvatar(usuarios[0].username);

  return (
    <div className={customCss.dvIconGral}>
        <div className={customCss.divIniciales}>
            <text>{iniciales}</text>
        </div>
        <p className={customCss.pIcon}>{nombre}</p>
    </div>
  )
}