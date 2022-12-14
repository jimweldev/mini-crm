import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const HomeRoutes = ({ auth }) => {
	if (!auth) {
		return <Outlet />
	} else if (auth && auth.role === 'admin') {
		return <Navigate to="/admin" replace={true} />
	} else if (auth && auth.role === 'employee') {
		return <Navigate to="/employee" replace={true} />
	}
}

export default HomeRoutes
