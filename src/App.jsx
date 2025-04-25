import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AdmitCardGenerator from './components/AdmitCardGenerator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AdmitCardGenerator></AdmitCardGenerator>
    </>
  )
}

export default App
