import React, { useState } from 'react'
import customCss from "./UsersList.module.css"
import { usuarios } from '../utils/usuarios.js'; 
import { UserIcon } from './UserIcon.jsx';


export const UsersList = () => {

    const [selectedUserId, setSelectedUserId] = useState(null);
    const [updatedUsers, setUpdatedUsers] = useState(usuarios);

    const toggleDropdown = (index) => {
        setSelectedUserId(selectedUserId === index ? null : index);
    };

    const changeUserRole = (index, newRole) => {
        const updated = updatedUsers.map((user, i) =>
            i === index ? { ...user, role: newRole } : user
        );
        setUpdatedUsers(updated);
        setSelectedUserId(null);
    };

  return (
    <div className={customCss.padreProds}>
      <div className={customCss.headerProds}>
        <h2>Usuarios</h2>
      </div>
      <table className={customCss.tableHeader}>
        <thead>
          <tr className={customCss.headerTitles}>
            <th></th>
            <th className={customCss.thName}>NOMBRE</th>
            <th>ROL</th>
            <th>CREADO</th>
            <th>ÚLTIMA SESIÓN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {updatedUsers.map((user, index) => (
            <>
            <tr key={index} className={customCss.trListado}>
              <td className={customCss.iconUser}>
                <UserIcon username={user.username} />
              </td>
              <td className={customCss.tdName}>{user.username}</td>
              <td className={customCss.letraVer}>
                {user.role === "ADMIN" ? "Admin" : "Usuario"}
                <img
                    src='/desplegable_abajo.png'
                    alt="Desplegable"
                    onClick={() => toggleDropdown(index)}
                    ClassName={customCss.iconDropdown}
                />
              </td>
              <td>{user.createdAt}</td>
              <td>{user.updatedAt}</td>
            </tr>
            {selectedUserId === index && (
                <tr className={customCss.dropdownRow}>
                  <td colSpan="6">
                    <div className={customCss.dropdownContent}>
                      <button
                        onClick={() => changeUserRole(index, "ADMIN")}
                        className={customCss.dropdownButton}
                      >
                        Admin
                      </button>
                      <button
                        onClick={() => changeUserRole(index, "CLIENT")}
                        className={customCss.dropdownButton}
                      >
                        Usuario
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
          <button className={customCss.btnVer}>Ver más</button>
        </tbody>
      </table>
    </div>
  )
}