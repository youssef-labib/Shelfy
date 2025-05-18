import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import AdminDashboard from './partials/adminDashboard'

const Admin = () => {
    const { currentUser } = useAuth()

    if (!currentUser || !currentUser.isAdmin) {
        return <Navigate to="/" replace />
    }

    return <AdminDashboard />
}

export default Admin