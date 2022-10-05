import React, { useState, useEffect, useRef } from 'react'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useEmployeeContext } from '../../hooks/useEmployeeContext'

import AdminTemplate from '../../components/templates/AdminTemplate'

const Employees = () => {
	const { auth } = useAuthContext()
	const { employees, dispatch } = useEmployeeContext()

	const createEmployeeSubmitRef = useRef()

	const [error, setError] = useState(null)

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [company, setCompany] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	useEffect(() => {
		const fetchUsers = async () => {
			const res = await fetch('/api/employees', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${auth.accessToken}`,
				},
			})
			const data = await res.json()

			if (res.ok) {
				dispatch({ type: 'SET_EMPLOYEES', payload: data })
			}
		}

		fetchUsers()
	}, [auth.accessToken, dispatch])

	const handleDeleteTodo = async (e, id) => {
		e.target.disabled = true

		const res = await fetch(`/api/todos/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${auth.accessToken}`,
			},
		})

		const data = await res.json()

		if (res.ok) {
			dispatch({ type: 'DELETE_TODO', payload: data })
		}

		e.target.disabled = false
	}

	return (
		<AdminTemplate page="employees">
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h1 className="h3 mb-0">Employees</h1>

				<button
					type="button"
					className="btn btn-primary"
					data-bs-toggle="modal"
					data-bs-target="#addUserModal"
				>
					Add
				</button>
			</div>

			<div className="card">
				<div className="card-body">
					<div className="table-responsive">
						<table className="table table-striped mb-0">
							<thead>
								<tr>
									<th>Name</th>
									<th>Email</th>
									<th>Company</th>
									<th>Actions</th>
								</tr>
							</thead>

							<tbody>
								{employees ? (
									employees.length > 0 ? (
										employees.map((employee) => {
											return (
												<tr key={employee._id}>
													<td>{employee.name}</td>
													<td>{employee.email}</td>
													<td>{employee.company}</td>
													<td>
														<button
															className="btn btn-danger"
															onClick={async (e) => {
																e.target.disabled = true

																const res = await fetch(
																	`/api/employees/${employee.userId}`,
																	{
																		method: 'DELETE',
																		headers: {
																			Authorization: `Bearer ${auth.accessToken}`,
																		},
																	}
																)

																const data = await res.json()

																if (res.ok) {
																	dispatch({
																		type: 'DELETE_EMPLOYEE',
																		payload: data,
																	})
																}

																e.target.disabled = false
															}}
														>
															Delete
														</button>
													</td>
												</tr>
											)
										})
									) : (
										<tr>
											<td className="text-center" colSpan="100%">
												No items available
											</td>
										</tr>
									)
								) : (
									<tr>
										<td className="text-center" colSpan="100%">
											Loading...
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{/* MODALS */}
			{/* ADD USER MODAL */}
			<form
				className="modal fade"
				id="addUserModal"
				aria-hidden="true"
				onSubmit={async (e) => {
					e.preventDefault()

					createEmployeeSubmitRef.current.disabled = true

					const employee = { name, email, company, password, confirmPassword }

					const res = await fetch('/api/employees', {
						method: 'POST',
						body: JSON.stringify(employee),
						headers: {
							Authorization: `Bearer ${auth.accessToken}`,
							'Content-Type': 'application/json',
						},
					})

					const data = await res.json()

					if (!res.ok) {
						setError(data.error)
					}

					if (res.ok) {
						setName('')
						setEmail('')
						setCompany('')
						setPassword('')
						setConfirmPassword('')
						setError(null)
						dispatch({ type: 'CREATE_EMPLOYEE', payload: data })
					}

					createEmployeeSubmitRef.current.disabled = false
				}}
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Add Employee
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<div className="mb-3">
								<label>Name</label>
								<input
									className="form-control"
									type="text"
									value={name}
									onChange={(e) => {
										setName(e.target.value)
									}}
								/>
							</div>

							<div className="mb-3">
								<label>Email</label>
								<input
									className="form-control"
									type="text"
									value={email}
									onChange={(e) => {
										setEmail(e.target.value)
									}}
								/>
							</div>

							<div className="mb-3">
								<label>Company</label>
								<input
									className="form-control"
									type="text"
									value={company}
									onChange={(e) => {
										setCompany(e.target.value)
									}}
								/>
							</div>

							<div className="mb-3">
								<label>Password</label>
								<input
									className="form-control"
									type="password"
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
									value={confirmPassword}
									onChange={(e) => {
										setConfirmPassword(e.target.value)
									}}
								/>
							</div>

							{error && (
								<div className="alert alert-danger" role="alert">
									{error}
								</div>
							)}
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
							>
								Close
							</button>
							<button
								ref={createEmployeeSubmitRef}
								type="submit"
								className="btn btn-primary"
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			</form>
		</AdminTemplate>
	)
}

export default Employees
