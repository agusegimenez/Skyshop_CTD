import React, { useContext, useState } from 'react';
import { BotonContext } from '../Context/Context.jsx'; // Importamos el contexto
import customCss from "./UsersList.module.css";
import { UserIcon } from './UserIcon.jsx';

export const UsersList = () => {
    const { users, loading, fetchChangeUserRole, setUsers} = useContext(BotonContext); // Obtenemos los usuarios del contexto

    const [selectedUserId, setSelectedUserId] = useState(null);

    const toggleDropdown = (index) => {
        setSelectedUserId(selectedUserId === index ? null : index);
    };

    const changeUserRole = (newRole, id) => {

        fetchChangeUserRole(newRole, id);

        const updatedUsers = users.map(user => 
            user.id === id ? { ...user, role: newRole } : user
        );
        setUsers(updatedUsers);
        setSelectedUserId(null);
    };

    if (loading) {
        return <p>Cargando usuarios...</p>; // Mostramos un mensaje mientras carga
    }
console.log(loading);

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
                    {users.map((user, index) => (
                        <>
                            <tr key={user.id} className={customCss.trListado}>
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
                                <td>{user.updatedAt || 'N/A'}</td>
                            </tr>
                            {selectedUserId === index && (
                                <tr className={customCss.dropdownRow}>
                                    <td colSpan="6">
                                        <div className={customCss.dropdownContent}>
                                            <td><button
                                                onClick={() => changeUserRole("ADMIN", user.id)}
                                                className={customCss.dropdownButton}
                                            >
                                                Admin
                                            </button>
                                            </td>
                                            <td><button
                                                onClick={() => changeUserRole("CLIENT", user.id)}
                                                className={customCss.dropdownButton}
                                            >
                                                Usuario
                                            </button>
                                            </td>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </>
                    ))}
                </tbody>
            </table>
            <button className={customCss.btnVer}>Ver más</button>
        </div>
    );
};