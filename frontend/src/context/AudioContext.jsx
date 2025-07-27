import React, { createContext, useContext, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePlayPause } from '../store/musicSlice';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector(state => state.music);
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Format time in MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle time update
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Handle duration change
  const handleDurationChange = () => {
    setDuration(audioRef.current.duration);
  };

  // Handle seeking
  const handleSeek = (e) => {
    const time = e.target.value;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // Handle play/pause
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    dispatch(togglePlayPause());
  };

  const value = {
    audioRef,
    currentTime,
    duration,
    formatTime,
    handleTimeUpdate,
    handleDurationChange,
    handleSeek,
    handlePlayPause
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
      {currentSong && (
        <audio 
          ref={audioRef}
          src={currentSong.audio}
          className="hidden"
          onTimeUpdate={handleTimeUpdate}
          onDurationChange={handleDurationChange}
          onEnded={() => dispatch(togglePlayPause())}
        />
      )}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
