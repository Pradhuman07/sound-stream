import React from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';

const PWAInstallModal = ({ isOpen, onClose }) => {
  const { install, getInstallInstructions, isInstallable, installPrompt } = usePWAInstall();
  
  if (!isOpen) return null;

  const instructions = getInstallInstructions();
  const hasNativePrompt = installPrompt && isInstallable;

  const handleInstall = async () => {
    if (hasNativePrompt) {
      const result = await install();
      if (result.outcome === 'accepted') {
        onClose();
      }
    } else {
      // Show instructions for manual installation
      console.log('Manual installation required');
    }
  };

  const handleManualInstall = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-xl">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Install SoundStream
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Get quick access and enhanced features by installing our app
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-600 dark:text-green-400">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
            </div>
            <span className="text-gray-700 dark:text-gray-300">Faster loading times</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-600 dark:text-green-400">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
            </div>
            <span className="text-gray-700 dark:text-gray-300">Works offline</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-600 dark:text-green-400">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
            </div>
            <span className="text-gray-700 dark:text-gray-300">Home screen access</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-600 dark:text-green-400">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
            </div>
            <span className="text-gray-700 dark:text-gray-300">Full screen experience</span>
          </div>
        </div>

        {hasNativePrompt ? (
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Maybe Later
            </button>
            <button
              onClick={handleInstall}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-colors font-medium"
            >
              Install Now
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                How to install on {instructions.platform === 'ios' ? 'iPhone/iPad' : instructions.platform === 'android' ? 'Android' : 'Desktop'}:
              </h3>
              <ol className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                {instructions.steps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 font-medium">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <button
              onClick={handleManualInstall}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Got it!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PWAInstallModal;
