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

const App = () => {
  return (
    <Provider store={store}>
      <AudioProvider>
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/upload-music" element={<UploadMusic />} />
          </Routes>
        </Router>
      </AudioProvider>
    </Provider>
  )
}

export default App