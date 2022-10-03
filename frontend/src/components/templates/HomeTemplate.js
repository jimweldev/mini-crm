import React from 'react'
import { Link } from 'react-router-dom'

const HomeTemplate = ({ page, children }) => {
	return (
		<>
			<nav class="navbar navbar-expand-lg navbar-light bg-light shadow-none mb-3">
				<div class="container">
					<Link class="navbar-brand text-dark" to="/">
						Navbar
					</Link>
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav me-auto mb-2 mb-lg-0">
							<li class="nav-item">
								<Link class={`nav-link ${page === 'home' && 'active'}`} to="/">
									Home
								</Link>
							</li>
						</ul>
						<div class="d-flex">
							<Link className="btn btn-outline-dark me-2" to="/login">
								Login
							</Link>
							<Link className="btn btn-dark" to="/register">
								Register
							</Link>
						</div>
					</div>
				</div>
			</nav>

			{children}
		</>
	)
}

export default HomeTemplate
