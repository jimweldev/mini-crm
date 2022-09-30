import React, { useState } from 'react'

import HomeTemplate from '../components/templates/HomeTemplate'

import { useRegister } from '../hooks/useRegister'

const Register = () => {
	const { register, isLoading, error } = useRegister()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const handleRegister = async (e) => {
		e.preventDefault()

		await register(email, password, confirmPassword)
	}

	return (
		<HomeTemplate>
			<form onSubmit={handleRegister}>
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
				<input
					placeholder="confirm password"
					value={confirmPassword}
					onChange={(e) => {
						setConfirmPassword(e.target.value)
					}}
				/>
				<button type="submit" disabled={isLoading}>
					Submit
				</button>
			</form>
		</HomeTemplate>
	)
}

export default Register
