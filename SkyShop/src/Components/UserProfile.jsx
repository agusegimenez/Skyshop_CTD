import React, { useContext } from 'react';
import customCss from './UserProfile.module.css';
import { BotonContext } from '../Context/Context';

const UserProfile = () => {
  const {loggedUser} = useContext(BotonContext);

  return (
    <table className={customCss.table}>
      <thead>
        <tr>
          <th colSpan="2" className={customCss.header}>Datos del Usuario</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={customCss.label}>Nombre:</td>
          <td>
            <div className={customCss.inputContainer}>
              <input
                type="text"
                value={loggedUser.username}
                placeholder="Introduce tu nombre"
                className={customCss.input}
              />
              <img src="/iEdit.png" alt="iconoEditar" className={customCss.icon} />
            </div>
          </td>
        </tr>
        <tr>
          <td className={customCss.label}>Email:</td>
          <td>
            <div className={customCss.inputContainer}>
              <input
                type="email"
                value={loggedUser.email}
                placeholder="Introduce tu email"
                className={customCss.input}
              />
            </div>
          </td>
        </tr>
        <tr>
          <td className={customCss.label}>Dirección:</td>
          <td>
            <div className={customCss.inputContainer}>
              <input
                type="text"
                value={loggedUser.direccion}
                placeholder="Introduce tu dirección"
                className={customCss.input}
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default UserProfile;