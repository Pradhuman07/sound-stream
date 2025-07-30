import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authStart, authSuccess, authFailure } from '../store/authSlice'
import api from '../config/api'
import Logo from '../components/Logo'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')
    dispatch(authStart())

    try {
      const response = await api.post('/auth/login', {
        email,
        password
      })
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      dispatch(authSuccess(response.data.user))
      navigate('/welcome')
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed'
      setError(errorMessage)
      dispatch(authFailure(errorMessage))
      setPassword('') // Clear password on error
    }
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-white to-indigo-50/50 py-4">

      {/* Logo */}
      <Logo />


      {/* Login Form */}
      <div className="w-full max-w-md px-4">

        <h1 className='text-xl font-medium text-center mb-4 bg-gradient-to-r from-indigo-500 to-blue-300 bg-clip-text text-transparent'>Sign in to feel the beats!</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-5"
          onSubmit={submitHandler}>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-lg outline-none focus:from-blue-100 focus:to-indigo-100/50 transition-all shadow-sm"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-lg outline-none focus:from-blue-100 focus:to-indigo-100/50 transition-all shadow-sm"
          />

          <button
            type="submit"
            className="w-full p-3 text-white bg-gradient-to-r from-blue-400 to-indigo-300 rounded-lg hover:from-blue-500 hover:to-indigo-600 active:scale-95 cursor-pointer transition-all shadow-md"
          >
            Log In
          </button>

        </form>

      </div>

      {/* Sign up link */}
      <div>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:underline cursor-pointer">Sign up</Link>
        </p>
      </div>

    </div>
  )
}

export default Login