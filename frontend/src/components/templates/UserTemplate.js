import React from 'react'
import { Link } from 'react-router-dom'

import { useLogout } from '../../hooks/useLogout'

const UserTemplate = ({ children }) => {
	const { logout } = useLogout()

	return (
		<div>
			<Link to="/user">Home</Link>
			<button onClick={logout}>Logout</button>
			{children}
		</div>
	)
}

export default UserTemplate
