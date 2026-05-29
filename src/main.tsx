import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 당근 Seed Design 디자인 토큰 + 컴포넌트 스타일 (테마 포함)
import '@seed-design/css/all.css'

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
