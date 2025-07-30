import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IoMdMusicalNote } from "react-icons/io";

const Header = () => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    // Try to get user from Redux first, then fallback to localStorage
    const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    const activeUser = user || storedUser
    const firstName = activeUser?.name?.split(' ')[0] || 'Guest'

    return (
        <header className="fixed inset-x-0 top-0 px-5 lg:px-0 py-2.5 md:py-4 shadow-lg z-10 rounded-b-2xl bg-gray-100 backdrop-blur-sm">
            <div className="flex items-center justify-between max-w-7xl mx-auto">

                {/* logo */}
                <div onClick={() => navigate('/')} className="flex items-center gap-1.5 lg:gap-2.5 cursor-pointer">
                    <div className="w-7.5 h-7.5 lg:w-8 lg:h-8 bg-gradient-to-r from-blue-300 to-indigo-400  transform rotate-45 transition-transform flex items-center justify-center rounded-full">
                        <IoMdMusicalNote className="text-white transform -rotate-45" size={20} />
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-blue-300 bg-clip-text text-transparent">Stream</h1>
                </div>

                {/* User avatar */}
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-r from-blue-200 to-indigo-300 flex items-center justify-center text-white border-2 border-blue-100 border-solid">
                    {firstName.charAt(0)}
                </div>

            </div>

        </header>
    )
}

export default Header