import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoutes = ({ auth }) => {
	if (auth && auth.role === 'admin') {
		return <Outlet />
	} else if (auth && auth.role === 'employee') {
		return <Navigate to="/employee" replace={true} />
	} else {
		return <Navigate to="/" replace={true} />
	}
}

export default AdminRoutes
