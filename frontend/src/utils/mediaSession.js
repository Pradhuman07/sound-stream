// Enhanced Media Session API with better sync and laptop support
let mediaSessionHandlers = {};
let isSetup = false;

// Additional keyboard event handler for laptop media keys
const handleKeyboardMediaKeys = (event) => {
  // Handle media keys that might not work through Media Session API
  switch(event.code) {
    case 'MediaPlayPause':
      console.log('🎹 Keyboard: Play/Pause pressed');
      event.preventDefault();
      if (mediaSessionHandlers.currentToggle) {
        const audio = document.querySelector('audio');
        if (audio) {
          if (audio.paused) {
            mediaSessionHandlers.play();
          } else {
            mediaSessionHandlers.pause();
          }
        }
      }
      break;
    case 'MediaTrackNext':
      console.log('🎹 Keyboard: Next pressed');
      event.preventDefault();
      if (mediaSessionHandlers.nexttrack) {
        mediaSessionHandlers.nexttrack();
      }
      break;
    case 'MediaTrackPrevious':
      console.log('🎹 Keyboard: Previous pressed');
      event.preventDefault();
      if (mediaSessionHandlers.previoustrack) {
        mediaSessionHandlers.previoustrack();
      }
      break;
  }
};

export const setupMediaSession = (currentSong, audioRef, isPlaying, onTogglePlay, onNext, onPrevious) => {
  if (!('mediaSession' in navigator)) {
    console.log('Media Session API not supported');
    return;
  }

  console.log('Setting up media session for:', currentSong?.title);

  // Set metadata
  navigator.mediaSession.metadata = new MediaMetadata({
    title: currentSong?.title || 'SoundStream',
    artist: currentSong?.artist || 'Unknown Artist',
    album: currentSong?.album || 'Unknown Album',
    artwork: [
      { src: currentSong?.cover || '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: currentSong?.cover || '/pwa-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  });

  // Store handlers to avoid conflicts
  mediaSessionHandlers = {
    play: () => {
      console.log('🎵 Media Session: Play pressed');
      try {
        if (audioRef.current && audioRef.current.paused) {
          audioRef.current.play()
            .then(() => {
              onTogglePlay(true);
              updateMediaSessionState(true);
            })
            .catch(err => console.log('Play failed:', err));
        }
      } catch (error) {
        console.log('Play handler error:', error);
      }
    },
    
    pause: () => {
      console.log('⏸️ Media Session: Pause pressed');
      try {
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          onTogglePlay(false);
          updateMediaSessionState(false);
        }
      } catch (error) {
        console.log('Pause handler error:', error);
      }
    },
    
    nexttrack: () => {
      console.log('⏭️ Media Session: Next pressed');
      try {
        onNext();
      } catch (error) {
        console.log('Next handler error:', error);
      }
    },
    
    previoustrack: () => {
      console.log('⏮️ Media Session: Previous pressed');
      try {
        onPrevious();
      } catch (error) {
        console.log('Previous handler error:', error);
      }
    },
    
    seekbackward: (details) => {
      console.log('⏪ Media Session: Seek backward');
      try {
        if (audioRef.current) {
          const seekOffset = details.seekOffset || 10;
          audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - seekOffset);
        }
      } catch (error) {
        console.log('Seek backward error:', error);
      }
    },
    
    seekforward: (details) => {
      console.log('⏩ Media Session: Seek forward');
      try {
        if (audioRef.current) {
          const seekOffset = details.seekOffset || 10;
          audioRef.current.currentTime = Math.min(
            audioRef.current.duration || 0, 
            audioRef.current.currentTime + seekOffset
          );
        }
      } catch (error) {
        console.log('Seek forward error:', error);
      }
    },
    
    // Store reference for keyboard handler
    currentToggle: onTogglePlay
  };

  // Set action handlers
  Object.keys(mediaSessionHandlers).forEach(action => {
    if (action === 'currentToggle') return; // Skip this internal property
    
    try {
      navigator.mediaSession.setActionHandler(action, mediaSessionHandlers[action]);
    } catch (error) {
      console.log(`Handler ${action} not supported:`, error);
    }
  });

  // Set up keyboard listener for laptop media keys (only once)
  if (!isSetup) {
    document.addEventListener('keydown', handleKeyboardMediaKeys, true);
    isSetup = true;
    console.log('🎹 Keyboard media key listener added');
  }

  // Set initial state
  navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
  console.log('✅ Media session setup complete');
};

export const updateMediaSessionState = (isPlaying) => {
  if ('mediaSession' in navigator) {
    const newState = isPlaying ? 'playing' : 'paused';
    navigator.mediaSession.playbackState = newState;
    console.log('📱 Media session state updated:', newState);
  }
};

export const clearMediaSession = () => {
  if ('mediaSession' in navigator) {
    // Clear all handlers
    Object.keys(mediaSessionHandlers).forEach(action => {
      if (action === 'currentToggle') return; // Skip internal property
      
      try {
        navigator.mediaSession.setActionHandler(action, null);
      } catch (error) {
        console.log(`Error clearing handler ${action}:`, error);
      }
    });
    
    navigator.mediaSession.metadata = null;
    navigator.mediaSession.playbackState = 'none';
    mediaSessionHandlers = {};
    
    // Remove keyboard listener
    if (isSetup) {
      document.removeEventListener('keydown', handleKeyboardMediaKeys, true);
      isSetup = false;
      console.log('🎹 Keyboard media key listener removed');
    }
    
    console.log('🧹 Media session cleared');
  }
};
