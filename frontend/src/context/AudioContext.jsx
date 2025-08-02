import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePlayPause, playNext, playPrevious, setPlaying } from '../store/musicSlice';
import { setupMediaSession, updateMediaSessionState, clearMediaSession } from '../utils/mediaSession';
import { backgroundAudioService } from '../services/backgroundAudio';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying, currentIndex, playlist } = useSelector(state => state.music);
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Initialize background audio service
  useEffect(() => {
    backgroundAudioService.setupAudioContext();
    return () => {
      clearMediaSession();
      backgroundAudioService.destroy();
    };
  }, []);

  // Setup media session when song changes
  useEffect(() => {
    if (currentSong && audioRef.current) {
      setupMediaSession(
        currentSong,
        audioRef,             // Pass audio ref directly
        isPlaying,            // Current playing state
        (playing) => dispatch(setPlaying(playing)), // Toggle play state
        handleNext,           // onNext
        handlePrevious        // onPrevious
      );
      
      // Enable background audio
      backgroundAudioService.enableBackgroundAudio(audioRef.current);
    }
  }, [currentSong, isPlaying]); // Add isPlaying to deps

  // Update media session state when play/pause changes
  useEffect(() => {
    updateMediaSessionState(isPlaying);
    
    // Sync audio element with Redux state
    if (audioRef.current) {
      if (isPlaying && audioRef.current.paused) {
        audioRef.current.play().catch(console.log);
      } else if (!isPlaying && !audioRef.current.paused) {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

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

  // Handle play/pause from UI
  const handlePlayPause = () => {
    dispatch(togglePlayPause());
  };

  // Handle next song
  const handleNext = () => {
    dispatch(playNext());
  };

  // Handle previous song  
  const handlePrevious = () => {
    dispatch(playPrevious());
  };

  // Handle audio events for background playback
  const handleCanPlay = () => {
    if (isPlaying) {
      audioRef.current.play().catch(console.log);
    }
  };

  const value = {
    audioRef,
    currentTime,
    duration,
    formatTime,
    handleTimeUpdate,
    handleDurationChange,
    handleSeek,
    handlePlayPause,
    handleNext,
    handlePrevious
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
          onCanPlay={handleCanPlay}
          preload="metadata"
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
