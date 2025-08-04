import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authStart, authSuccess, authFailure } from '../store/authSlice'
import api from '../config/api'
import Logo from '../components/Logo'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    dispatch(authStart())
    
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password
      });
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      dispatch(authSuccess(response.data.user))
      navigate('/welcome', { state: { isNewUser: true } })
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed'
      setError(errorMessage)
      dispatch(authFailure(errorMessage))
      
      // Keep the form data in case user wants to try again
      // Only clear password for security
      setPassword('')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen theme-bg-primary py-4">

      {/* Logo */}
      <Logo />

      {/* Register Form */}
      <div className="w-full max-w-md px-4">

        <h1 className='text-xl font-medium text-center mb-4 bg-gradient-to-r from-indigo-500 to-blue-300 bg-clip-text text-transparent'>Create new Account</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            submitHandler(e)
          }}
        >

          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
            required
            type="text"
            placeholder="Name"
            className="w-full p-3 input-gradient-light rounded-lg outline-none focus:ring-2 focus:ring-blue-400 active:scale-[0.99] transition-all shadow-sm theme-text-primary"
          />

          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            required
            type="email"
            placeholder="Email"
            className="w-full p-3 input-gradient-light rounded-lg outline-none focus:ring-2 focus:ring-blue-400 active:scale-[0.99] transition-all shadow-sm theme-text-primary"
          />

          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required
            type="password"
            placeholder="Password"
            className="w-full p-3 input-gradient-light rounded-lg outline-none focus:ring-2 focus:ring-blue-400 active:scale-[0.99] transition-all shadow-sm theme-text-primary"
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-3 text-white rounded-lg transition-all shadow-md flex items-center justify-center gap-2 ${
              isLoading 
                ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-400 to-indigo-300 hover:from-blue-500 hover:to-indigo-600 active:scale-95 cursor-pointer'
            }`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Creating Account...
              </>
            ) : (
              'Register'
            )}
          </button>

        </form>
      </div>

      {/* Login link */}
      <div>
        <p className="mt-6 text-center theme-text-secondary">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline cursor-pointer">Login</Link>
        </p>
      </div>
      
    </div>
  )
}

export default Register