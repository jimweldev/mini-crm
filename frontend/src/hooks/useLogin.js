import { useState } from 'react'

import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
	const { dispatch } = useAuthContext()

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	const login = async (email, password) => {
		setIsLoading(true)
		setError(null)

		const res = await fetch('api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		})

		const data = await res.json()

		if (!res.ok) {
			setIsLoading(false)
			setError(data.error)
		}

		if (res.ok) {
			localStorage.setItem('auth', JSON.stringify(data))

			dispatch({ type: 'LOGIN', payload: data })

			setIsLoading(false)
		}
	}

	return { login, isLoading, error }
}
