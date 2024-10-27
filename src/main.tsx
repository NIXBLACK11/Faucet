import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './fonts.css'
import './theme.css'
import App from './App.tsx'
import { ThemeProvider } from './components/ThemeContext.tsx'
import ErrorToast from './components/ErrorToast.tsx'
import { RecoilRoot } from 'recoil'
import SuccessToast from './components/SuccessToast.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RecoilRoot>
        <App />
        <ErrorToast />
        <SuccessToast/>
      </RecoilRoot>
    </ThemeProvider>
  </StrictMode>,
)
