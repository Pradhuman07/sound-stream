import React from 'react'

const Logo = () => {
    return (
        <div className="flex items-center gap-2">
            <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer">
                <div className="w-3.5 h-3.5 bg-gradient-to-r from-indigo-500 to-blue-300 transform rotate-45 transition-transform hover:rotate-90"></div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-blue-300 bg-clip-text text-transparent">SoundStream</h1>
            </div>
        </div>
    )
}

export default Logo