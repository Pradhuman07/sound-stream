import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()

    return (
        <header className="fixed top-0 left-0 right-0 bg-white px-4 py-2 md:px-8 md:py-3 shadow-md z-10">
            <div className="flex items-center justify-between">
                {/* logo */}
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-black transform rotate-45"></div>
                    <h1 className="text-xl md:text-2xl font-semibold">Stream</h1>
                </div>

                {/* search bar */}
                <div className="flex items-center">
                    <button className="p-2 cursor-pointer" onClick={() => navigate('/search')}>

                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header