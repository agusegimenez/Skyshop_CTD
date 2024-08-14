import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { BotonProvider } from "./Context/Context"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <BotonProvider>
    <App />
    </BotonProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
