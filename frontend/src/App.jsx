import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Search from './pages/Search'
import UploadMusic from './pages/UploadMusic'
import Welcome from './pages/Welcome'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { AudioProvider } from './context/AudioContext'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    <Provider store={store}>
      <AudioProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route path="/welcome" element={
              <PrivateRoute>
                <Welcome />
              </PrivateRoute>
            } />
            <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route path="/home" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route path="/search" element={
              <PrivateRoute>
                <Search />
              </PrivateRoute>
            } />
            <Route path="/upload-music" element={
              <PrivateRoute>
                <UploadMusic />
              </PrivateRoute>
            } />
          </Routes>
        </Router>
      </AudioProvider>
    </Provider>
  )
}

export default App