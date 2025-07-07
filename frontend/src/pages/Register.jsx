import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    setName('')
    setEmail('')
    setPassword('')
    console.log('Register form submitted', 'name:', name, 'email:', email, 'password:', password)
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white py-2">

      {/* Logo */}
      <Logo />


      {/* Register Form */}
      <div className="w-full max-w-md px-4">

        <h1 className='text-xl font-bold text-center mb-4'>Create new Account</h1>

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
            className="w-full p-3 bg-gray-100 rounded-md outline-none"
          />

          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            required
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-100 rounded-md outline-none"
          />

          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-100 rounded-md outline-none"
          />

          <button
            type="submit"
            className="w-full p-3 text-white bg-black rounded-md hover:bg-gray-900 cursor-pointer"
          >
            Register
          </button>

        </form>
      </div>

      {/* Login link */}
      <div>
        <p className="mt-6 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-700 hover:underline cursor-pointer">Login</Link>
        </p>
      </div>
      
    </div>
  )
}

export default Register