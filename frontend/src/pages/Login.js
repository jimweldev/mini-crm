import React, { useState } from 'react'

import HomeTemplate from '../components/templates/HomeTemplate'

import { useLogin } from '../hooks/useLogin'

const Login = () => {
	const { login, isLoading, error } = useLogin()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async (e) => {
		e.preventDefault()

		await login(email, password)
	}

	return (
		<HomeTemplate>
			<form onSubmit={handleLogin}>
				{error && error}
				<input
					placeholder="email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value)
					}}
				/>
				<input
					placeholder="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value)
					}}
				/>
				<button type="submit" disabled={isLoading}>
					Submit
				</button>
			</form>
		</HomeTemplate>
	)
}

export default Login
