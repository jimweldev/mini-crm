import { createContext, useReducer } from 'react'

export const EmployeeContext = createContext()

export const employeeReducer = (state, action) => {
	switch (action.type) {
		case 'SET_EMPLOYEES':
			return { employees: action.payload }
		case 'CREATE_EMPLOYEE':
			return { employees: [action.payload, ...state.employees] }
		case 'DELETE_EMPLOYEE':
			return {
				employees: state.employees.filter((employee) => {
					return employee._id !== action.payload._id
				}),
			}
		case 'UPDATE_EMPLOYEE':
			return {
				employees: state.employees.map((employee) => {
					if (employee._id === action.payload._id) {
						return {
							...employee,
							title: action.payload.title,
							isCompleted: action.payload.isCompleted,
						}
					}

					return employee
				}),
			}
		default:
			return state
	}
}

export const EmployeeContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(employeeReducer, {
		employees: [],
	})

	console.log('EmployeeContext state: ', state)

	return (
		<EmployeeContext.Provider value={{ ...state, dispatch }}>
			{children}
		</EmployeeContext.Provider>
	)
}
