import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Comunidade from './pages/Comunidade.jsx'
import { PostsProvider } from './context/PostsContext.jsx'
import { UserProvider } from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
    <PostsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="comunidade" element={<Comunidade />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PostsProvider>
    </UserProvider>
  </StrictMode>,
)
