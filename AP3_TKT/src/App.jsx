import { useState } from 'react'
import { Nav, Footer } from './components/includes'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const user = { auth: 'user' }

  return (
    <>
      <Nav user={user} />
      
      <Footer />
    </>
  )
}

export default App
