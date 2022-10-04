import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'

import {
	Users,
	MessageSquare,
	Bell,
	User,
	LogOut,
	Settings,
} from 'react-feather'

import image from '@adminkit/core/dist/img/avatars/avatar.jpg'

const AdminTemplate = ({ page, children }) => {
	const { auth } = useAuthContext()
	const { logout } = useLogout()

	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

	return (
		<div className="wrapper">
			<nav
				id="sidebar"
				className={`sidebar js-sidebar ${isSidebarCollapsed && 'collapsed'}`}
			>
				<div className="sidebar-content js-simplebar">
					<Link className="sidebar-brand" to="/admin">
						<span className="align-middle">Mini CRM</span>
					</Link>
					<ul className="sidebar-nav">
						<li className={`sidebar-item ${page === 'employees' && 'active'}`}>
							<Link className="sidebar-link" to="/admin">
								<Users className="align-middle" />
								<span className="align-middle">Employees</span>
							</Link>
						</li>
					</ul>
				</div>
			</nav>
			<div className="main">
				<nav className="navbar navbar-expand navbar-light navbar-bg">
					<div
						className="sidebar-toggle js-sidebar-toggle "
						onClick={() => {
							setIsSidebarCollapsed(!isSidebarCollapsed)
						}}
					>
						<i className="hamburger align-self-center" />
					</div>
					<div className="navbar-collapse collapse">
						<ul className="navbar-nav navbar-align">
							<li className="nav-item dropdown pointer">
								<div
									className="nav-icon dropdown-toggle"
									id="alertsDropdown"
									data-bs-toggle="dropdown"
								>
									<div className="position-relative">
										<Bell className="align-middle" />
										<span className="indicator">4</span>
									</div>
								</div>
								<div
									className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0"
									aria-labelledby="alertsDropdown"
								>
									<div className="dropdown-menu-header">
										4 New Notifications
									</div>
									<div className="list-group">
										<a href="/" className="list-group-item">
											<div className="row g-0 align-items-center">
												<div className="col-2">
													<Bell className="text-warning" />
												</div>
												<div className="col-10">
													<div className="text-dark">Update completed</div>
													<div className="text-muted small mt-1">
														Restart server 12 to complete the update.
													</div>
													<div className="text-muted small mt-1">30m ago</div>
												</div>
											</div>
										</a>
									</div>
									<div className="dropdown-menu-footer">
										<Link className="text-muted" to="/">
											Show all notifications
										</Link>
									</div>
								</div>
							</li>
							<li className="nav-item dropdown pointer">
								<div
									className="nav-icon dropdown-toggle"
									id="messagesDropdown"
									data-bs-toggle="dropdown"
								>
									<div className="position-relative">
										<MessageSquare className="align-middle" />
									</div>
								</div>
								<div
									className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0"
									aria-labelledby="messagesDropdown"
								>
									<div className="dropdown-menu-header">
										<div className="position-relative">4 New Messages</div>
									</div>
									<div className="list-group">
										<Link className="list-group-item" to="/">
											<div className="row g-0 align-items-center">
												<div className="col-2">
													<img
														src={image}
														className="avatar img-fluid rounded-circle"
														alt="Sharon Lessman"
													/>
												</div>
												<div className="col-10 ps-2">
													<div className="text-dark">Sharon Lessman</div>
													<div className="text-muted small mt-1">
														Aenean tellus metus, bibendum sed, posuere ac,
														mattis non.
													</div>
													<div className="text-muted small mt-1">5h ago</div>
												</div>
											</div>
										</Link>
									</div>
									<div className="dropdown-menu-footer">
										<Link className="text-muted" to="/">
											Show all messages
										</Link>
									</div>
								</div>
							</li>
							<li className="nav-item dropdown pointer">
								<div
									className="nav-icon dropdown-toggle d-inline-block d-sm-none"
									data-bs-toggle="dropdown"
								>
									<Settings className="align-middle" />
								</div>
								<div
									className="nav-link dropdown-toggle d-none d-sm-inline-block"
									data-bs-toggle="dropdown"
								>
									<img
										src={image}
										className="avatar img-fluid rounded me-2"
										alt={auth.email}
									/>
									<span className="text-dark me-1">{auth.email}</span>
								</div>
								<div className="dropdown-menu dropdown-menu-end">
									<Link className="dropdown-item" to="/profile">
										<User className="align-middle me-2" />
										Profile
									</Link>
									<button className="dropdown-item" onClick={logout}>
										<LogOut className="align-middle me-2" />
										Logout
									</button>
								</div>
							</li>
						</ul>
					</div>
				</nav>
				<main className="content">
					<div className="container-fluid p-0">{children}</div>
				</main>
			</div>
		</div>
	)
}

export default AdminTemplate
