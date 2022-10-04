import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'

import { AuthContextProvider } from './context/AuthContext'
import { UserContextProvider } from './context/UserContext'

import './index.css'
import App from './App'

import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<AuthContextProvider>
			<UserContextProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</UserContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
)

reportWebVitals()
