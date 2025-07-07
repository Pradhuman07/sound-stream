import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentSong, togglePlayPause } from '../store/musicSlice'

const Home = () => {
  const dispatch = useDispatch()
  const { songs, currentSong, isPlaying } = useSelector(state => state.music)

  const handleSongClick = (song) => {
    dispatch(setCurrentSong(song))
    if (!isPlaying) dispatch(togglePlayPause())
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <Header />

      {/* All songs */}
      <main className="pt-17 md:pt-19 md:pb-34 pb-34 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid gap-4">
            {songs.map((song, index) => (
              <div 
                key={index} 
                className="flex items-center bg-white rounded-lg p-4 shadow-sm cursor-pointer"
                onClick={() => handleSongClick(song)}
              >
                <img
                  src={song.image}
                  alt={song.title}
                  className="w-12 h-12 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="font-medium">{song.title}</h3>
                  <p className="text-sm text-gray-500">{song.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Current song playing */}
      {currentSong && (
        <div className="fixed bottom-14 md:bottom-14 left-0 right-0 bg-white border-t border-gray-300 py-2 px-4">
          <div className="flex items-center max-w-screen-xl mx-auto">
            <img src={currentSong.image} alt="now-playing" className="w-12 h-12 object-cover rounded-md mr-4" />
            <div className="flex-1">
              <h3 className="font-medium">{currentSong.title}</h3>
              <p className="text-sm text-gray-500">{currentSong.artist}</p>
            </div>
            <button onClick={() => dispatch(togglePlayPause())} className="p-2 cursor-pointer">
              {isPlaying ? (
                // Pause Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                // Play Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />

    </div>
  )
}

export default Home