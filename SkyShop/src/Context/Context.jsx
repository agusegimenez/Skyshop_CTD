import React, { createContext, useState } from 'react';

export const BotonContext = createContext();

export const BotonProvider = ({ children }) => {
    const [showButtons, setShowButtons] = useState(true);

    return (
        <BotonContext.Provider value={{ showButtons, setShowButtons }}>
            {children}
        </BotonContext.Provider>
    );
};