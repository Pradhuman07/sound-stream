import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { AudioProvider } from './context/AudioContext'
import AppRoutes from './routes/AppRoutes'

const App = () => {
  return (
    <Provider store={store}>
      <AudioProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AudioProvider>
    </Provider>
  )
}

export default App