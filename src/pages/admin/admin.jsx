import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import AdminDashboard from './partials/adminDashboard'

const Admin = ({ books }) => {
    const { activeUser } = useAppContext()

    if (!activeUser || activeUser.role !== 'admin') {
        return <Navigate to="/" replace />
    }

    return <AdminDashboard books={books} />
}

export default Admin