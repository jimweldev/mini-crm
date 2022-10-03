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
		<HomeTemplate page="login">
			<div className="container">
				<form className="login card" onSubmit={handleLogin}>
					<div className="card-body">
						<h3 className="mb-3">Login</h3>

						{error && <div className="alert alert-danger">{error}</div>}

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

export default Login
