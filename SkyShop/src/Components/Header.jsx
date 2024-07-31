import React from 'react'

const Header = () => {
  return (
    <header>
        <div className='header-divs'>
            <div className='logo'>
                <h2>logo</h2>
                <h2 className='slogan'>Del cielo a tu heladera</h2>
            </div>
            <div className='botones-header'>
                <button className="button">Crear cuenta</button>
                <button className="button">Iniciar sesión</button>
            </div>
        </div>
    </header>
  )
}

export default Header