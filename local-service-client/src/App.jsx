import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ClientInfoForm from './components/ClientInfoForm';
import './App.css'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Client Information Form</h1>
        <ClientInfoForm />
      </div>
      <Footer />
    </>
  )
}

export default App
