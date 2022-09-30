import React from 'react'
import { Route, Routes } from 'react-router-dom'

// HOOKS
import { useAuthContext } from './hooks/useAuthContext'

// ROUTES
import HomeRoutes from './components/routes/HomeRoutes'
import UserRoutes from './components/routes/UserRoutes'

// PAGES
// => HOME
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

// => USER
import UserHome from './pages/user/Home'

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

			{/* USER ROUTES  */}
			<Route element={<UserRoutes auth={auth} />}>
				<Route path="/user" element={<UserHome />} />
			</Route>
		</Routes>
	)
}

export default App
