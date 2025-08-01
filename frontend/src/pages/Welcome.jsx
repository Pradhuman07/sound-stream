import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IoMdMusicalNote } from "react-icons/io";
import Logo from '../components/Logo'

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
        <div className="min-h-screen theme-bg-primary theme-text-secondary flex flex-col items-center justify-between py-4 ">

            {/* APP LOGO */}

            <Logo />

            {/*Beech wla material*/}

            <div className="text-center animate-fade-in">

                {/* Welcome Text and Name */}

                <h1 className="text-2xl font-bold mb-2  animate-slide-up">
                    {isNewUser ? 'Welcome, ' : 'Welcome back, '}
                    <span className="bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">{user?.name?.split(' ')[0]}!</span>
                </h1>

                {/* Quote */}

                <div className="my-4 animate-scale-in">
                    <p className="theme-text-secondary text-sm">Your Personal Music Haven</p>
                </div>

                {/* Loading Animation */}
                <div className="flex justify-center space-x-2 my-6">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-300 rounded-full animate-bounce delay-0 shadow-md"></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-300 rounded-full animate-bounce delay-150 shadow-md"></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-300 rounded-full animate-bounce delay-300 shadow-md"></div>
                </div>

            </div>

            {/* Creator Credit */}
            <div className=" left-0 right-0 text-center animate-fade-in-delayed">
                <div className="space-y-1">
                    <p className="text-sm theme-text-secondary">Created by Pradhuman</p>
                    <p className="text-xs theme-text-tertiary">© {new Date().getFullYear()} SoundStream • All rights reserved</p>
                </div>
            </div>

        </div>
    )
}

export default Welcome
