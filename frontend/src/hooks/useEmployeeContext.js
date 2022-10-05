import { useContext } from 'react'

import { EmployeeContext } from '../context/EmployeeContext'

export const useEmployeeContext = () => {
	const context = useContext(EmployeeContext)

	if (!context) {
		throw Error('useEmployeeContext must be inside an EmployeeContextProvider')
	}

	return context
}
