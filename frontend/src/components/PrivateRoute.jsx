import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
    // Try to get user from Redux first, then fallback to localStorage
    const { user, isAuthenticated } = useSelector(state => state.auth)
    const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    
    // If user is not authenticated and there's no user in localStorage, redirect to login
    if (!isAuthenticated && !storedUser) {
        return <Navigate to="/login" replace />
    }

    // If authenticated or has stored user, render the protected route
    return children
}

export default PrivateRoute
