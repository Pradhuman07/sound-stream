import { useState } from 'react'
import { IoSunny, IoMoon } from "react-icons/io5"

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false)

    const toggleTheme = () => {
        setIsDark(!isDark)
        // Theme functionality will be implemented later
        console.log('Theme toggled:', !isDark ? 'dark' : 'light')
    }

    return (
        <button
            onClick={toggleTheme}
            className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
            aria-label="Toggle theme"
        >
            {isDark ? (
                <IoSunny className="text-yellow-300" size={20} />
            ) : (
                <IoMoon className="text-black" size={18} />
            )}
        </button>
    )
}

export default ThemeToggle
