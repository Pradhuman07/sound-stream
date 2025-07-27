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
      
      dispatch(authSuccess(response.data.user))
      navigate('/')
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed'
      setError(errorMessage)
      dispatch(authFailure(errorMessage))
      setPassword('') // Clear password on error
    }
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white py-4">

      {/* Logo */}
      <Logo />


      {/* Login Form */}
      <div className="w-full max-w-md px-4">
        
        <h1 className='text-xl font-bold text-center mb-4'>Welcome Back</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-4"
          onSubmit={submitHandler}>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-100 rounded-md outline-none"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-100 rounded-md outline-none"
          />

          <button
            type="submit"
            className="w-full p-3 text-white bg-black rounded-md hover:bg-gray-900 cursor-pointer"
          >
            Log In
          </button>

        </form>

      </div>

      {/* Sign up link */}
      <div>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account? <Link to="/register" className="text-blue-700 hover:underline cursor-pointer">Sign up</Link>
        </p>
      </div>

    </div>
  )
}

export default Login