import { Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import Nav from './components/Nav.jsx'

function App() {
  return (
    <>
      <Header />
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
