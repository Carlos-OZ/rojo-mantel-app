import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { ReservationProvider } from './context/ReservationProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReservationProvider> {/* Envolvemos aquí */}
        <App />
      </ReservationProvider>
    </BrowserRouter>
  </React.StrictMode>,
)