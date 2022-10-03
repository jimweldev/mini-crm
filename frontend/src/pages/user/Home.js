import React from 'react'

import UserTemplate from '../../components/templates/UserTemplate'

const Home = () => {
	return (
		<UserTemplate page="dashboard">
			<h1 className="h3 mb-3">Dashboard</h1>

			<div className="card">
				<div className="card-body">Hello</div>
			</div>
		</UserTemplate>
	)
}

export default Home
