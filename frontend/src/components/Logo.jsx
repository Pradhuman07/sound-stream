import React from 'react'
import { IoMdMusicalNote } from "react-icons/io";

const Logo = () => {
    return (
        <div className="flex items-center gap-2 md:gap-2.5 cursor-pointer">
            <div className="w-7.5 h-7.5 lg:w-9 lg:h-9 bg-gradient-to-r from-blue-300 to-indigo-400  transform rotate-45 transition-transform flex items-center justify-center rounded-full">
                <IoMdMusicalNote className="text-white transform -rotate-45" size={20} />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-blue-300 bg-clip-text text-transparent">SoundStream</h1>
        </div>
    )
}

export default Logo