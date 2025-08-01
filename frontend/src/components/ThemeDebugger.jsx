import React from 'react'
import { useTheme } from '../context/ThemeContext'

const ThemeDebugger = () => {
  const { isDark, isInitialized } = useTheme()
  
  // Only show in development
  if (import.meta.env.PROD) return null

  const htmlElement = document.documentElement
  const hasThemeClass = htmlElement.classList.contains('dark')
  const savedTheme = localStorage.getItem('theme')

  return (
    <div className="fixed bottom-4 right-4 theme-bg-secondary theme-border border p-3 rounded-lg shadow-lg text-xs z-50 max-w-xs">
      <h3 className="font-bold mb-2 theme-text-primary">Theme Debug Info</h3>
      <div className="space-y-1 theme-text-secondary">
        <div>Context isDark: <span className="font-mono">{isDark.toString()}</span></div>
        <div>Initialized: <span className="font-mono">{isInitialized.toString()}</span></div>
        <div>HTML has 'dark' class: <span className="font-mono">{hasThemeClass.toString()}</span></div>
        <div>localStorage theme: <span className="font-mono">"{savedTheme}"</span></div>
        <div>User Agent: <span className="font-mono">{navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'}</span></div>
      </div>
      
      {/* Test element using CSS variables */}
      <div className="mt-2 p-2 theme-bg-tertiary theme-text-primary rounded">
        <div className="text-xs">
          <strong>CSS Variables Test:</strong><br/>
          This should change background and text color when toggling
        </div>
      </div>
      
      {/* Current HTML classes */}
      <div className="mt-2">
        <div className="text-xs font-semibold theme-text-primary">HTML classes:</div>
        <div className="text-xs font-mono break-all theme-text-secondary">{htmlElement.className || 'none'}</div>
      </div>
      
      {/* Quick toggle button for testing */}
      <button 
        onClick={() => {
          htmlElement.classList.toggle('dark');
          console.log('Manual toggle - HTML now has dark class:', htmlElement.classList.contains('dark'));
        }}
        className="mt-2 px-2 py-1 bg-blue-500 text-white rounded text-xs"
      >
        Manual Toggle
      </button>
    </div>
  )
}

export default ThemeDebugger
