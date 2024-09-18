import React, { useContext } from 'react';
import customCsss from './UserProfile.module.css';
import { BotonContext } from '../Context/Context';

const UserProfile = () => {
  const {loggedUser} = useContext(BotonContext);

  return (
    <table className={customCsss.table}>
      <thead>
        <tr>
          <th colSpan="2" className={customCsss.header}>Datos del Usuario</th>
        </tr>
      </thead>
      <tbody className={customCsss.tbodyGral}>
        <tr>
          <td className={customCsss.label}>Nombre:</td>
          <td>
            <div className={customCsss.inputContainer}>
              <input
                type="text"
                value={loggedUser.username}
                placeholder="Introduce tu nombre"
                className={customCsss.input}
              />
              <img src="/iEdit.png" alt="iconoEditar" className={customCsss.icon} />
            </div>
          </td>
        </tr>
        <tr>
          <td className={customCsss.label}>Email:</td>
          <td>
            <div className={customCsss.inputContainer}>
              <input
                type="email"
                value={loggedUser.email}
                placeholder="Introduce tu email"
                className={customCsss.input}
              />
            </div>
          </td>
        </tr>
        <tr>
          <td className={customCsss.label}>Dirección:</td>
          <td>
            <div className={customCsss.inputContainer}>
              <input
                type="text"
                value={loggedUser.direccion}
                placeholder="Introduce tu dirección"
                className={customCsss.input}
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default UserProfile;