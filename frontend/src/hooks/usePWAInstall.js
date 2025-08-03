import { useState, useEffect } from 'react';

export const usePWAInstall = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
        || window.navigator.standalone 
        || document.referrer.includes('android-app://');
      
      setIsInstalled(isStandalone);
    };

    checkInstalled();

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setIsInstallable(true);
    };

    // Listen for the appinstalled event
    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setIsInstallable(false);
      setIsInstalled(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // For iOS detection
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isInStandaloneMode = window.navigator.standalone;
    
    if (isIOS && !isInStandaloneMode && !isInstalled) {
      setIsInstallable(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isInstalled]);

  const install = async () => {
    if (!installPrompt) {
      return { outcome: 'not-available' };
    }

    const result = await installPrompt.prompt();
    setInstallPrompt(null);
    setIsInstallable(false);
    
    return result;
  };

  const getInstallInstructions = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);
    
    if (isIOS) {
      return {
        platform: 'ios',
        steps: [
          'Tap the Share button at the bottom of your screen',
          'Scroll down and tap "Add to Home Screen"',
          'Tap "Add" to install SoundStream'
        ]
      };
    } else if (isAndroid) {
      return {
        platform: 'android',
        steps: [
          'Tap the menu (⋮) in your browser',
          'Tap "Add to Home screen"',
          'Tap "Add" to install SoundStream'
        ]
      };
    } else {
      return {
        platform: 'desktop',
        steps: [
          'Click the install icon in your address bar',
          'Or use the browser menu to "Install SoundStream"'
        ]
      };
    }
  };

  return {
    installPrompt,
    isInstallable,
    isInstalled,
    install,
    getInstallInstructions
  };
};
