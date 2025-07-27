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
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
            {/* Welcome Text with Animation */}
            <div className="text-center animate-fade-in">
                <h1 className="text-4xl font-bold mb-2 animate-slide-up">
                    {isNewUser ? 'Welcome, ' : 'Welcome back, '}
                    <span className="text-blue-400">{user?.name?.split(' ')[0]}!</span>
                </h1>

                {/* App Logo and Name */}
                <div className="my-8 animate-scale-in">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="w-5 h-5 bg-white transform rotate-45"></div>
                        <h2 className="text-2xl font-semibold">Sound Stream</h2>
                    </div>
                    <p className="text-gray-400 text-sm">Your Personal Music Haven</p>
                </div>

                {/* Loading Animation */}
                <div className="flex justify-center space-x-2 my-6">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-0"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
                </div>

                {/* Creator Credit */}
                <div className="mt-8 text-sm text-gray-400 animate-fade-in-delayed">
                    Created with ❤️ by Pradhuman
                </div>
            </div>
        </div>
    )
}

export default Welcome
