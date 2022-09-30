import React from 'react'

import UserTemplate from '../../components/templates/UserTemplate'

import { useAuthContext } from '../../hooks/useAuthContext'

const Home = () => {
	const { auth } = useAuthContext()

	return (
		<UserTemplate>
			<h4>{auth.email}</h4>
		</UserTemplate>
	)
}

export default Home
