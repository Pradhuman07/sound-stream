import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentSong, togglePlayPause, fetchSongs } from '../store/musicSlice'

// Define keyframes for the playing animation
const style = document.createElement('style');
style.textContent = `
  @keyframes musicBounce {
    0%, 100% { height: 8px; }
    50% { height: 16px; }
  }
`;
document.head.appendChild(style);

const Home = () => {
  const dispatch = useDispatch()
  const { songs, currentSong, isPlaying, loading, error } = useSelector(state => state.music)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  // Format time in MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  // Handle time update
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime)
  }

  // Handle duration change
  const handleDurationChange = () => {
    setDuration(audioRef.current.duration)
  }

  // Handle seeking
  const handleSeek = (e) => {
    const time = e.target.value
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }

  // Handle track navigation
  const handleTrackChange = (direction) => {
    const currentIndex = songs.findIndex(song => song._id === currentSong._id);
    let nextIndex;
    
    if (direction === 'next') {
      nextIndex = currentIndex + 1 >= songs.length ? 0 : currentIndex + 1;
    } else {
      nextIndex = currentIndex - 1 < 0 ? songs.length - 1 : currentIndex - 1;
    }

    const nextSong = songs[nextIndex];
    dispatch(setCurrentSong(nextSong));
    if (isPlaying) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
        }
      }, 0);
    }
  }

  useEffect(() => {
    dispatch(fetchSongs())
  }, [dispatch])

  const handleSongClick = (song) => {
    // If it's the same song that's currently selected
    if (currentSong && currentSong._id === song._id) {
      // Just toggle play/pause
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      dispatch(togglePlayPause());
    } else {
      // If it's a different song
      if (currentSong) {
        // Stop current song if one is playing
        audioRef.current.pause();
      }
      // Set new song and start playing
      dispatch(setCurrentSong(song));
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
          if (!isPlaying) dispatch(togglePlayPause());
        }
      }, 0);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* All songs */}
      <main className="pt-17 md:pt-19 md:pb-34 pb-34 px-4">
        <div className="max-w-screen-xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-0"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">
              {error}
            </div>
          ) : (
            <div className="grid gap-4">
              {songs.map((song, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between ${currentSong?._id === song._id ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100' : 'bg-white'} rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-all group`}
                  onClick={() => handleSongClick(song)}
                >
                  <div className="flex items-center flex-1">
                    <img
                      src={song.poster}
                      alt={song.title}
                      className="w-12 h-12 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h3 className={`font-medium ${currentSong?._id === song._id ? 'text-blue-400' : ''}`}>{song.title}</h3>
                      <p className="text-sm text-gray-500">{song.artist}</p>
                    </div>
                  </div>
                  
                  {currentSong?._id === song._id && isPlaying && (
                    <div className="flex items-end h-6 space-x-0.5 ml-4">
                      <div 
                        className="w-0.5 h-2 bg-gray-400 rounded-full"
                        style={{ animation: 'musicBounce 0.8s ease-in-out infinite', animationDelay: '0ms' }}
                      ></div>
                      <div 
                        className="w-0.5 h-3 bg-gray-400 rounded-full"
                        style={{ animation: 'musicBounce 0.8s ease-in-out infinite', animationDelay: '0.2s' }}
                      ></div>
                      <div 
                        className="w-0.5 h-1.5 bg-gray-400 rounded-full"
                        style={{ animation: 'musicBounce 0.8s ease-in-out infinite', animationDelay: '0.4s' }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Current song playing */}
      {currentSong && (
        <div className="fixed bottom-14 md:bottom-14 left-0 right-0 bg-indigo-100 border-t border-gray-300 py-2 px-4 rounded-t-2xl">
          <div className="flex flex-col max-w-screen-xl mx-auto">
            {/* Song info and controls */}
            <div className="flex items-center mb-2">
              <img src={currentSong.poster} alt="now-playing" className="w-12 h-12 object-cover rounded-md mr-4" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-600">{currentSong.title}</h3>
                <p className="text-sm text-gray-500">{currentSong.artist}</p>
              </div>

              {/* Control buttons */}
              <div className="flex items-center space-x-6">

                {/* Previous Track */}
                <button 
                  onClick={() => handleTrackChange('prev')} 
                  className="text-gray-600 cursor-pointer hover:text-blue-400  active:text-blue-300 active:scale-90 transition-all duration-150"
                  title="Previous track"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zm3.66 6.82l5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07c-.57.4-.57 1.24 0 1.64z"/>
                  </svg>
                </button>
                
                {/* Play/Pause */}
                <button 
                  onClick={() => {
                    if (isPlaying) {
                      audioRef.current.pause();
                    } else {
                      audioRef.current.play();
                    }
                    dispatch(togglePlayPause());
                  }} 
                  className="text-gray-600 cursor-pointer hover:text-blue-400  active:text-blue-300 active:scale-90 transition-all duration-150"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    // Pause Icon
                    <svg className="w-8 h-8 transform hover:scale-105 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                    </svg>
                  ) : (
                    // Play Icon
                    <svg className="w-8 h-8 transform hover:scale-105 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                    </svg>
                  )}
                </button>

                {/* Next Track */}
                <button 
                  onClick={() => handleTrackChange('next')} 
                  className="text-gray-600 cursor-pointer hover:text-blue-400  active:text-blue-300 active:scale-90 transition-all duration-150"
                  title="Next track"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zM5.58 16.89l5.77-4.07c.56-.4.56-1.24 0-1.63L5.58 7.11C4.91 6.65 4 7.12 4 7.93v8.14c0 .81.91 1.28 1.58.82z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{formatTime(currentTime)}</span>
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  style={{
                    background: `linear-gradient(to right, #93c5fd ${(currentTime / duration) * 100}%, #e5e7eb 0%)`
                  }}
                  className="w-full h-1 rounded-lg appearance-none cursor-pointer 
                  [&::-webkit-slider-thumb]:appearance-none 
                  [&::-webkit-slider-thumb]:h-3 
                  [&::-webkit-slider-thumb]:w-3 
                  [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:bg-blue-200
                  [&::-webkit-slider-thumb]:shadow-sm
                  [&::-moz-range-thumb]:appearance-none 
                  [&::-moz-range-thumb]:h-3 
                  [&::-moz-range-thumb]:w-3 
                  [&::-moz-range-thumb]:rounded-full 
                  [&::-moz-range-thumb]:bg-blue-300
                  [&::-moz-range-thumb]:border-0"
                />
              </div>
              <span>{formatTime(duration)}</span>
            </div>

            <audio 
              ref={audioRef}
              src={currentSong.audio}
              className="hidden"
              onTimeUpdate={handleTimeUpdate}
              onDurationChange={handleDurationChange}
              onEnded={() => dispatch(togglePlayPause())}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />

    </div>
  )
}

export default Home