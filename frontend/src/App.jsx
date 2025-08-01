import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { AudioProvider } from './context/AudioContext'
import { ThemeProvider } from './context/ThemeContext'
import AppRoutes from './routes/AppRoutes'

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AudioProvider>
          <Router>
            <AppRoutes />
          </Router>
        </AudioProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App