import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Index from './components/Index';
import CameraComponent from './components/TestCamera';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Index />
    </>
  )
}

export default App