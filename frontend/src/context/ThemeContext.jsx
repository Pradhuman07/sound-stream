import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false) // Start with default value
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const initializeTheme = () => {
      try {
        const savedTheme = localStorage.getItem('theme')
        
        if (savedTheme === 'dark') {
          setIsDark(true)
        } else {
          setIsDark(false) // Default to light theme
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error)
        setIsDark(false) // Fallback to light theme
      }
      setIsInitialized(true)
    }

    initializeTheme()
  }, [])

  // Apply theme changes to DOM and localStorage
  useEffect(() => {
    if (!isInitialized) return // Wait for initialization

    const htmlElement = document.documentElement
    
    if (isDark) {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }
    
    // Save to localStorage
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }, [isDark, isInitialized])

  const toggleTheme = () => {
    setIsDark(prev => !prev)
  }

  const value = {
    isDark,
    toggleTheme,
    isInitialized
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
