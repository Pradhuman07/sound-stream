import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

const Login = () => {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault();
    setemail('')
    setpassword('')
    console.log('Login form submitted', 'email:', email, 'password:', password);
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white py-4">

      {/* Logo */}
      <Logo />


      {/* Login Form */}
      <div className="w-full max-w-md px-4">

        <form className="flex flex-col gap-4"
          onSubmit={(e) => {
            submitHandler(e)
          }}>

          <input
            value={email}
            onChange={(e) => {
              setemail(e.target.value)
            }}
            required
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-100 rounded-md outline-none"
          />

          <input
            value={password}
            onChange={(e) => {
              setpassword(e.target.value)
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