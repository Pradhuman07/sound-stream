import { useState, useEffect } from 'react';

const PWABadge = () => {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [updateSW, setUpdateSW] = useState(null);

  useEffect(() => {
    // Register service worker for updates only
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

  const handleUpdate = () => {
    if (updateSW) {
      updateSW();
    } else {
      window.location.reload();
    }
  };

  const close = () => {
    setNeedRefresh(false);
  };

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
                onClick={close}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PWABadge;
