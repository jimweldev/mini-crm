import React from 'react'
import { Route, Routes } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@adminkit/core/dist/css/app.css'
import 'bootstrap/dist/js/bootstrap.min.js'

// HOOKS
import { useAuthContext } from './hooks/useAuthContext'

// ROUTES
import HomeRoutes from './components/routes/HomeRoutes'
import AdminRoutes from './components/routes/AdminRoutes'
import EmployeeRoutes from './components/routes/EmplyeeRoutes'

// PAGES
// => HOME
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

// => ADMIN
import AdminEmployees from './pages/admin/Employees'

// => EMPLOYEE
import EmployeeHome from './pages/employee/Home'

const App = () => {
	const { auth } = useAuthContext()

	return (
		<Routes>
			{/* HOME ROUTES  */}
			<Route element={<HomeRoutes auth={auth} />}>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Route>

			{/* ADMIN ROUTES  */}
			<Route element={<AdminRoutes auth={auth} />}>
				<Route path="/admin" element={<AdminEmployees />} />
			</Route>

			{/* EMPLOYEE ROUTES  */}
			<Route element={<EmployeeRoutes auth={auth} />}>
				<Route path="/employee" element={<EmployeeHome />} />
			</Route>
		</Routes>
	)
}

export default App
