import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentSong, togglePlayPause } from '../store/musicSlice'
import { useAudio } from '../context/AudioContext'

const Search = () => {
  const dispatch = useDispatch()
  const { songs, currentSong, isPlaying } = useSelector(state => state.music)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef(null)
  const { 
    audioRef,
    currentTime,
    duration,
    formatTime,
    handleSeek,
    handlePlayPause
  } = useAudio()

  // Define filteredSongs early
  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Focus search input on component mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  // Add event listener for song end
  useEffect(() => {
    const handleSongEnd = () => {
      if (filteredSongs.length === 0) return;

      const currentIndex = filteredSongs.findIndex(song => song._id === currentSong._id);
      // If current song isn't in filtered list, start from beginning
      if (currentIndex === -1) {
        const nextSong = filteredSongs[0];
        dispatch(setCurrentSong(nextSong));
      } else {
        const nextIndex = currentIndex + 1 >= filteredSongs.length ? 0 : currentIndex + 1;
        const nextSong = filteredSongs[nextIndex];
        dispatch(setCurrentSong(nextSong));
      }
      
      // Ensure we're in playing state
      if (!isPlaying) {
        dispatch(togglePlayPause());
      }
      
      // Play the next song after a small delay
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(error => {
            console.error('Error auto-playing next song:', error);
          });
        }
      }, 0);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleSongEnd);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleSongEnd);
      }
    };
  }, [audioRef, currentSong, filteredSongs, isPlaying, dispatch]);

  // Handle track navigation
  const handleTrackChange = (direction) => {
    if (filteredSongs.length === 0) return;

    const currentIndex = filteredSongs.findIndex(song => song._id === currentSong._id);
    let nextIndex;
    
    // If current song isn't in filtered list, start from beginning
    if (currentIndex === -1) {
      nextIndex = 0;
    } else {
      if (direction === 'next') {
        nextIndex = currentIndex + 1 >= filteredSongs.length ? 0 : currentIndex + 1;
      } else {
        nextIndex = currentIndex - 1 < 0 ? filteredSongs.length - 1 : currentIndex - 1;
      }
    }

    const nextSong = filteredSongs[nextIndex];
    
    // Update the song in store
    dispatch(setCurrentSong(nextSong));
    
    // Ensure we're in playing state
    if (!isPlaying) {
      dispatch(togglePlayPause());
    }
    
    // Play the next song after a small delay
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.error('Error playing next track:', error);
        });
      }
    }, 0);
  }

  const handleSongClick = (song) => {
    // If it's the same song that's currently selected
    if (currentSong && currentSong._id === song._id) {
      handlePlayPause();
    } else {
      // If it's a different song
      if (currentSong && isPlaying) {
        audioRef.current.pause();
      }
      dispatch(setCurrentSong(song));
      setTimeout(() => {
        if (!isPlaying) dispatch(togglePlayPause());
        audioRef.current.play();
      }, 0);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <main className="pt-17 md:pt-19 md:pb-34 pb-40 px-4">
        <div className="mb-6">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Find in music"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Search results */}
        <div className="grid gap-4 -mt-1">
          {filteredSongs.map((song, index) => (
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

      </main>
      
      {/* Current song playing */}
      {currentSong && (
        <div className="fixed bottom-14 md:bottom-14 left-0 right-0 bg-indigo-100 border-t border-gray-300 py-2 px-4 rounded-t-2xl lg:rounded-t-3xl">
          <div className="flex flex-col max-w-screen-xl mx-auto">
            {/* Song info and controls */}
            <div className="flex items-center mb-2">
              <img src={currentSong.poster} alt="now-playing" className="w-12 h-12 object-cover rounded-md mr-4" />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-600 truncate max-w-[200px]">{currentSong.title}</h3>
                <p className="text-sm text-gray-500 truncate max-w-[200px]">{currentSong.artist}</p>
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
                  onClick={handlePlayPause}
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
                    background: `linear-gradient(to right, #93c5fd ${(currentTime / duration) * 100}%, #d1d5db  0%)`
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

            {/* Audio element is now managed by AudioContext */}
          </div>
        </div>
      )}
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Search