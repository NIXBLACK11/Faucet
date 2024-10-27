import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './fonts.css'
import './theme.css'
import App from './App.tsx'
import { ThemeProvider } from './components/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)