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
		<HomeTemplate page="register">
			<div className="container">
				<form className="register card" onSubmit={handleRegister}>
					<div className="card-body">
						<h3 className="mb-3">Register</h3>

						{error && <div class="alert alert-danger">{error}</div>}

						<div className="mb-3">
							<label>Email Address</label>
							<input
								className="form-control"
								type="text"
								placeholder="email"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value)
								}}
							/>
						</div>
						<div className="mb-3">
							<label>Password</label>
							<input
								className="form-control"
								type="password"
								placeholder="password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value)
								}}
							/>
						</div>
						<div className="mb-3">
							<label>Confirm Password</label>
							<input
								className="form-control"
								type="password"
								placeholder="confirm password"
								value={confirmPassword}
								onChange={(e) => {
									setConfirmPassword(e.target.value)
								}}
							/>
						</div>

						<div className="text-center">
							<button
								className="btn btn-dark"
								type="submit"
								disabled={isLoading}
							>
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		</HomeTemplate>
	)
}

export default Register
