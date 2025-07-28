import React from 'react'

const Logo = () => {
    return (
        <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-indigo-300 transform rotate-45 shadow-md"></div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">SoundStream</h1>
        </div>
    )
}

export default Logo