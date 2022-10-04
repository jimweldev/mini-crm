import React from 'react'

import EmployeeTemplate from '../../components/templates/EmployeeTemplate'

const Home = () => {
	return (
		<EmployeeTemplate page="dashboard">
			<h1 className="h3 mb-3">Dashboard</h1>

			<div className="card">
				<div className="card-body">
					<div className="table-responsive">
						<table className="table table-striped mb-0">
							<thead>
								<tr>
									<th>Column 1</th>
									<th>Column 2</th>
									<th>Column 3</th>
								</tr>
							</thead>

							<tbody>
								<tr>
									<td>Value 1</td>
									<td>Value 2</td>
									<td>Value 3</td>
								</tr>
								<tr>
									<td>Value 1</td>
									<td>Value 2</td>
									<td>Value 3</td>
								</tr>
								<tr>
									<td>Value 1</td>
									<td>Value 2</td>
									<td>Value 3</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</EmployeeTemplate>
	)
}

export default Home
