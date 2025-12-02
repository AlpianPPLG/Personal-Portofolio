import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SEOProvider } from './providers/SEOProvider'
import './index.css'
import App from './App.tsx'
import ResumeLayout from './layouts/ResumeLayout.tsx'
import HomePage from './pages/HomePage.tsx'
import ResumePage from './pages/ResumePage.tsx'
import DemoPage from './pages/DemoPage.tsx'
import NotFound from './components/NotFound.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SEOProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="demo" element={<DemoPage />} />
          </Route>
          <Route element={<ResumeLayout />}>
            <Route path="resume" element={<ResumePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </SEOProvider>
  </StrictMode>,
)
