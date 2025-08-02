// Background audio service for PWA
export class BackgroundAudioService {
  constructor() {
    this.wakeLock = null;
    this.audioContext = null;
  }

  // Request wake lock to prevent screen sleep during audio
  async requestWakeLock() {
    try {
      if ('wakeLock' in navigator) {
        this.wakeLock = await navigator.wakeLock.request('screen');
        console.log('Wake lock acquired');
      }
    } catch (err) {
      console.log('Wake lock failed:', err);
    }
  }

  // Release wake lock
  releaseWakeLock() {
    if (this.wakeLock) {
      this.wakeLock.release();
      this.wakeLock = null;
      console.log('Wake lock released');
    }
  }

  // Setup audio context for background playback
  setupAudioContext() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext && !this.audioContext) {
        this.audioContext = new AudioContext();
        
        // Resume audio context on user interaction
        document.addEventListener('click', () => {
          if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
          }
        }, { once: true });
      }
    } catch (err) {
      console.log('Audio context setup failed:', err);
    }
  }

  // Enable background audio optimizations
  enableBackgroundAudio(audioElement) {
    if (!audioElement) return;

    // Prevent audio interruption - removed problematic logic
    audioElement.addEventListener('pause', (e) => {
      console.log('Audio paused, event trusted:', e.isTrusted);
    });

    audioElement.addEventListener('play', (e) => {
      console.log('Audio playing, event trusted:', e.isTrusted);
    });

    // Handle visibility change with better logic
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log('App went to background');
        // App went to background - try to maintain audio
        if (!audioElement.paused) {
          this.requestWakeLock();
        }
      } else {
        console.log('App came to foreground');
        // App came to foreground
        this.releaseWakeLock();
        if (this.audioContext && this.audioContext.state === 'suspended') {
          this.audioContext.resume();
        }
      }
    };

    // Remove any existing listener first
    document.removeEventListener('visibilitychange', this.visibilityHandler);
    this.visibilityHandler = handleVisibilityChange;
    document.addEventListener('visibilitychange', this.visibilityHandler);
  }

  // Cleanup
  destroy() {
    this.releaseWakeLock();
    if (this.visibilityHandler) {
      document.removeEventListener('visibilitychange', this.visibilityHandler);
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

export const backgroundAudioService = new BackgroundAudioService();
