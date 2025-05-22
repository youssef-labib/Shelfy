import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [db, setDb] = useState([
        { userName: "Admin", email: "admin@shelfy.com", phone: "000000000", password: "admin123", role: "admin" }
    ]);
    const [activeUser, setActiveUser] = useState(null)

    const login = (email, password) => {
        const user = db.find(u => u.email.trim().toLowerCase() === email.trim().toLowerCase())
        if (user && user.password === password) {
            setActiveUser(user)
            return { success: true, user }
        }
        return { success: false, error: !user ? "Email doesn't exist" : "Incorrect password" }
    };

    const logout = () => {
        setActiveUser(null)
    };

    const createUser = (userData) => {
        const userExists = db.find(u => u.email.trim().toLowerCase() === userData.email.trim().toLowerCase())
        if (userExists) {
            return { success: false, error: "Email already registered" }
        }

        const newUser = {
            ...userData,
            role: "user"
        }

        setDb(prev => [...prev, newUser])
        return { success: true }
    };

    return (
        <AppContext.Provider value={{
            db,
            setDb,
            activeUser,
            setActiveUser,
            login,
            logout,
            createUser
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        alert(Error('useAppContext must be used within an AppProvider'))
    }
    return context
}; 