import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import { AuthContextProvider } from './context/authContext.jsx'
import { AlbumContextProvider } from './context/albumContext.jsx'
import { NotificationContextProvider } from './context/notificationContext.jsx'
import { SocketContextProvider } from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <SocketContextProvider>
          <AlbumContextProvider>
            <NotificationContextProvider>
              <App />
            </NotificationContextProvider>
          </AlbumContextProvider>
        </SocketContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
)
