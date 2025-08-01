import React from 'react'
import { IoSunny, IoMoon } from "react-icons/io5"
import { useTheme } from '../context/ThemeContext'

const ThemeToggle = () => {
    const { isDark, toggleTheme, isInitialized } = useTheme()

    const handleToggle = () => {
        toggleTheme()
    }

    // Don't render until theme is initialized to prevent flashing
    if (!isInitialized) {
        return (
            <div className="w-5 h-5 animate-pulse bg-gray-300 theme-bg-tertiary rounded"></div>
        )
    }

    return (
        <button
            onClick={handleToggle}
            className="transition-all duration-300 hover:scale-105 hover:shadow-lg p-1 rounded-full"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            {isDark ? (
                <IoSunny className="text-yellow-400 hover:text-yellow-300" size={20} />
            ) : (
                <IoMoon className="theme-text-secondary hover:text-gray-600" size={18} />
            )}
        </button>
    )
}

export default ThemeToggle
