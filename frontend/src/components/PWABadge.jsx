import { useState, useEffect } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import PWAInstallModal from './PWAInstallModal';
import { IoMdMusicalNote } from "react-icons/io";

const PWABadge = () => {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [updateSW, setUpdateSW] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  
  const { isInstallable, isInstalled, install } = usePWAInstall();

  useEffect(() => {
    // Register service worker for updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered:', registration);
          
          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker?.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setNeedRefresh(true);
                setUpdateSW(() => () => {
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                  window.location.reload();
                });
              }
            });
          });
        })
        .catch((error) => {
          console.log('SW registration failed:', error);
        });
    }
  }, []);

  useEffect(() => {
    // Show install banner after 5 seconds if app is installable and not installed
    let timer;
    if (isInstallable && !isInstalled) {
      timer = setTimeout(() => {
        setShowInstallBanner(true);
      }, 5000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isInstallable, isInstalled]);

  const handleQuickInstall = async () => {
    const result = await install();
    if (result.outcome === 'not-available') {
      setShowInstallModal(true);
    }
    setShowInstallBanner(false);
  };

  const handleUpdate = () => {
    if (updateSW) {
      updateSW();
    } else {
      window.location.reload();
    }
  };

  const closeUpdate = () => {
    setNeedRefresh(false);
  };

  const closeBanner = () => {
    setShowInstallBanner(false);
  };

  // Don't show anything if app is already installed
  if (isInstalled) {
    return (
      <div className="pwa-toast">
        {/* Update Available Toast */}
        {needRefresh && (
          <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">New content available!</p>
                <p className="text-sm opacity-90">Click reload to update</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100"
                  onClick={handleUpdate}
                >
                  Reload
                </button>
                <button
                  className="text-white hover:text-gray-200"
                  onClick={closeUpdate}
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="pwa-toast">
      {/* Install App Banner */}
      {showInstallBanner && isInstallable && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg shadow-lg z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg flex-shrink-0">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-300 to-indigo-400 transform rotate-45 transition-transform flex items-center justify-center rounded-full">
                  <IoMdMusicalNote className="text-white transform -rotate-45" size={16} />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm">Install SoundStream</p>
                <p className="text-xs opacity-90">Get the full app experience</p>
              </div>
            </div>
            <div className="flex gap-2 ml-4 flex-shrink-0">
              <button
                className="bg-white text-purple-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
                onClick={handleQuickInstall}
              >
                Install
              </button>
              <button
                className="text-white hover:text-gray-200 p-1 text-lg leading-none"
                onClick={closeBanner}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Available Toast */}
      {needRefresh && (
        <div className={`fixed right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm ${showInstallBanner ? 'bottom-24' : 'bottom-4'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">New content available!</p>
              <p className="text-sm opacity-90">Click reload to update</p>
            </div>
            <div className="flex gap-2 ml-4">
              <button
                className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100"
                onClick={handleUpdate}
              >
                Reload
              </button>
              <button
                className="text-white hover:text-gray-200"
                onClick={closeUpdate}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Install Modal */}
      <PWAInstallModal 
        isOpen={showInstallModal} 
        onClose={() => setShowInstallModal(false)} 
      />
    </div>
  );
};

export default PWABadge;
