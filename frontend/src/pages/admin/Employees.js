import React, { useEffect } from 'react'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useUserContext } from '../../hooks/useUserContext'

import AdminTemplate from '../../components/templates/AdminTemplate'

const Employees = () => {
	const { auth } = useAuthContext()
	const { users, dispatch } = useUserContext()

	useEffect(() => {
		const fetchUsers = async () => {
			const res = await fetch('/api/users', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${auth.accessToken}`,
				},
			})
			const data = await res.json()

			if (res.ok) {
				dispatch({ type: 'SET_USERS', payload: data })
			}
		}

		fetchUsers()
	}, [auth.accessToken, dispatch])

	return (
		<AdminTemplate page="employees">
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h1 className="h3 mb-0">Users</h1>

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
									<th>Role</th>
									<th>Name</th>
									<th>Email</th>
									<th>Actions</th>
								</tr>
							</thead>

							<tbody>
								{users ? (
									users.length > 0 ? (
										users.map((user) => {
											return (
												<tr key={user._id}>
													<td>{user.role}</td>
													<td>{user.name}</td>
													<td>{user.email}</td>
													<td>
														<button className="btn btn-danger">Delete</button>
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
			<div className="modal fade" id="addUserModal" aria-hidden="true">
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
								<input className="form-control" type="text" />
							</div>

							<div className="mb-3">
								<label>Email</label>
								<input className="form-control" type="text" />
							</div>

							<div className="mb-3">
								<label>Password</label>
								<input className="form-control" type="password" />
							</div>

							<div className="mb-3">
								<label>Confirm Password</label>
								<input className="form-control" type="password" />
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
							>
								Close
							</button>
							<button type="button" className="btn btn-primary">
								Confirm
							</button>
						</div>
					</div>
				</div>
			</div>
		</AdminTemplate>
	)
}

export default Employees
