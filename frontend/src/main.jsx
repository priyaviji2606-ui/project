import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import Task2 from './Task2.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Task2/> */}
  </StrictMode>,
)
