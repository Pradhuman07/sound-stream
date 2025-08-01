import React, { useState } from 'react'

const SimpleThemeTest = () => {
  const [isDark, setIsDark] = useState(false)

  const handleToggle = () => {
    const html = document.documentElement
    console.log('Before toggle - HTML classes:', html.className)
    console.log('Before toggle - Has dark class:', html.classList.contains('dark'))
    
    if (isDark) {
      html.classList.remove('dark')
      html.style.backgroundColor = '#ffffff'
      html.style.color = '#000000'
    } else {
      html.classList.add('dark')
      html.style.backgroundColor = '#111827'
      html.style.color = '#ffffff'
    }
    
    setIsDark(!isDark)
    
    console.log('After toggle - HTML classes:', html.className)
    console.log('After toggle - Has dark class:', html.classList.contains('dark'))
    console.log('After toggle - Background color:', html.style.backgroundColor)
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      padding: '20px',
      backgroundColor: isDark ? '#374151' : '#f3f4f6',
      color: isDark ? '#ffffff' : '#000000',
      border: '2px solid',
      borderColor: isDark ? '#6b7280' : '#d1d5db',
      borderRadius: '8px',
      zIndex: 9999
    }}>
      <h3>Simple Theme Test</h3>
      <p>Current state: {isDark ? 'DARK' : 'LIGHT'}</p>
      <button 
        onClick={handleToggle}
        style={{
          padding: '10px 20px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        Toggle Theme (Direct DOM)
      </button>
      
      <div style={{
        marginTop: '10px',
        padding: '10px',
        backgroundColor: isDark ? '#1f2937' : '#e5e7eb',
        borderRadius: '4px'
      }}>
        This box should change color when toggling
      </div>
    </div>
  )
}

export default SimpleThemeTest
