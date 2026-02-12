import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NavBarContext = createContext();

export const NavBarProvider = ({ children }) => {
    const [isTransparent, setIsTransparent] = useState(false);
    const location = useLocation();

    // Reset transparency on route change
    useEffect(() => {
        setIsTransparent(false);
    }, [location.pathname]);

    const setTransparent = useCallback((value) => {
        setIsTransparent(value);
    }, []);

    return (
        <NavBarContext.Provider value={{ isTransparent, setTransparent }}>
            {children}
        </NavBarContext.Provider>
    );
};

export const useNavBar = () => {
    const context = useContext(NavBarContext);
    if (!context) {
        throw new Error('useNavBar must be used within a NavBarProvider');
    }
    return context;
};
