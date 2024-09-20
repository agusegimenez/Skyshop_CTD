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
          <td className={customCsss.label}>Username:</td>
          <td>
            <div className={customCsss.inputContainer}>
              <input
                type="text"
                value={loggedUser.username}
                className={customCsss.input}
                disabled
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
                className={customCsss.input}
                disabled
              />
            </div>
          </td>
        </tr>
        <tr>
          <td className={customCsss.label}>Rol:</td>
          <td>
            <div className={customCsss.inputContainer}>
              <input
                type="text"
                value={loggedUser.role}
                className={customCsss.input}
                disabled
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default UserProfile;