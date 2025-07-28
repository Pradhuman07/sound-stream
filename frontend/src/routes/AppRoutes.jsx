import { Routes, Route } from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Search from '../pages/Search'
import UploadMusic from '../pages/UploadMusic'
import Welcome from '../pages/Welcome'
import PrivateRoute from '../components/PrivateRoute'

// Public Routes - Accessible without authentication
const publicRoutes = [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    }
]

// Protected Routes - Require authentication
const protectedRoutes = [
    {
        path: '/welcome',
        element: <Welcome />
    },
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/search',
        element: <Search />
    },
    {
        path: '/upload-music',
        element: <UploadMusic />
    }
]

const AppRoutes = () => {
    return (
        <Routes>
            {/* Render Public Routes */}
            {publicRoutes.map((route) => (
                <Route 
                    key={route.path}
                    path={route.path}
                    element={route.element}
                />
            ))}

            {/* Render Protected Routes */}
            {protectedRoutes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <PrivateRoute>
                            {route.element}
                        </PrivateRoute>
                    }
                />
            ))}
        </Routes>
    )
}

export default AppRoutes
