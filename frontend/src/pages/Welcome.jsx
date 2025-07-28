import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Welcome = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const isNewUser = location.state?.isNewUser
    const { user } = useSelector(state => state.auth)
    const { songs } = useSelector(state => state.music)
    const [minTimeElapsed, setMinTimeElapsed] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {        // Set minimum display time of 3 seconds
            setMinTimeElapsed(true)
        }, 3000)
        return () => clearTimeout(timer)
    }, [])

    // Navigate when both conditions are met:
    // 1. Minimum display time has elapsed (3s)         // i.e minTimeElapsed is true
    // 2. Data is loaded (we have user and songs data)

    useEffect(() => {
        if (minTimeElapsed) {   // && user && songs.length > 0
            navigate('/')
        }
    }, [minTimeElapsed, user, songs, navigate])

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-400 flex flex-col items-center justify-center ">

            <div className="flex items-center justify-center gap-3 mb-2 top-4 absolute ">
                <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer">
                    <div className="w-3.5 h-3.5 bg-gradient-to-r from-indigo-500 to-blue-300 transform rotate-45 transition-transform hover:rotate-90"></div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-blue-300 bg-clip-text text-transparent">SoundStream</h1>
                </div>
            </div>

            {/* Welcome Text with Animation */}
            <div className="text-center animate-fade-in">
                <h1 className="text-2xl font-bold mb-2 -mt-12 animate-slide-up">
                    {isNewUser ? 'Welcome, ' : 'Welcome back, '}
                    <span className="bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">{user?.name?.split(' ')[0]}!</span>
                </h1>

                {/* App Logo and Name */}
                <div className="my-4 animate-scale-in">
                    <p className="text-gray-600 text-sm">Your Personal Music Haven</p>
                </div>

                {/* Loading Animation */}
                <div className="flex justify-center space-x-2 my-6">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-300 rounded-full animate-bounce delay-0 shadow-md"></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-300 rounded-full animate-bounce delay-150 shadow-md"></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-300 rounded-full animate-bounce delay-300 shadow-md"></div>
                </div>

                {/* Creator Credit */}
                <div className="bottom-3 absolute left-0 right-0 text-center animate-fade-in-delayed">
                    <div className="space-y-1">
                        <p className="text-sm text-gray-600">Created by Pradhuman</p>
                        <p className="text-xs text-gray-500">© {new Date().getFullYear()} SoundStream • All rights reserved</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome
