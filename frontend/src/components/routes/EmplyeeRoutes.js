import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const EmployeeRoutes = ({ auth }) => {
	if (auth && auth.role === 'employee') {
		return <Outlet />
	} else if (auth && auth.role === 'admin') {
		return <Navigate to="/admin" replace={true} />
	} else {
		return <Navigate to="/" replace={true} />
	}
}

export default EmployeeRoutes
