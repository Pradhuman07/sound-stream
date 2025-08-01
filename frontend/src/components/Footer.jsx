import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'     // for handling logout action
import { resetMusicState } from '../store/musicSlice'  // for resetting music state
import api from '../config/api'                 // for making API calls
import { useAudio } from '../context/AudioContext'  // for accessing audio controls

const Footer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { audioRef } = useAudio()

  return (
    <footer className="fixed bottom-0 left-0 right-0 theme-bg-secondary px-4 py-2 md:px-4 md:py-2 border-t theme-border">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">

        <button 
          className="p-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" 
               stroke={location.pathname === '/' ? '#60A5FA' : 'currentColor'}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>

        <button 
          className="p-2 cursor-pointer"
          onClick={() => navigate('/search')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" 
               stroke={location.pathname === '/search' ? '#60A5FA' : 'currentColor'}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        <button 
          className="p-2 cursor-pointer"
          onClick={() => navigate('/upload-music')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" 
               stroke={location.pathname === '/upload-music' ? '#60A5FA' : 'currentColor'}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>

        <button className="p-2 cursor-pointer" onClick={async () => {
          if (window.confirm('Do you want to log out?')) {
            try {
              await api.post('/auth/logout');         // This calls the backend's logout endpoint which clears the cookie
              localStorage.removeItem('user');        // Clear user data from localStorage
              
              // Stop audio playback if any
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
              }
              
              // Reset music state in Redux
              dispatch(resetMusicState());
              
              // Logout and redirect
              dispatch(logout());
              navigate('/login');                     // Finally redirects to the login page
            }
            catch (error) {
              console.error('Logout failed:', error);
            }
          }
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>

      </div>
    </footer>
  )
}

export default Footer;