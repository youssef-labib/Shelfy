import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser'))
        if (user) {
            setCurrentUser(user)
        }
    }, [])

    const login = (userData) => {
        localStorage.setItem('currentUser', JSON.stringify(userData))
        setCurrentUser(userData)
    }

    const logout = () => {
        localStorage.removeItem('currentUser')
        setCurrentUser()
    }

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        console.warn('Warning: useAuth must be used within an AuthProvider')
        return {
            currentUser: null,
            login: () => console.warn('Auth Provider not found'),
            logout: () => console.warn('Auth Provider not found')
        }
    }
    return context
}; 