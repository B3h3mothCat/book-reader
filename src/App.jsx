import { useState } from 'react'
import NavigationMain from './Router/NavigationMain'
import ThemeToggle from './components/UI/ThemeToggle.jsx'

import AuthProvider from './Context/AuthContext.jsx'

import './App.css'
// MODULES IMPORT

// COMPONENTS IMPORT

// DATA IMPORT

export default function App() {
  // STATES
  const [isDark, setIsDark] = useState(true)


  return (
    <AuthProvider>
      <div
        className='app'
        data-theme={isDark ? "dark" : "light"}>
        <ThemeToggle
          isChecked={isDark}
          handleChange={() => setIsDark(!isDark)}
        ></ThemeToggle>
        <NavigationMain></NavigationMain>
      </div>
    </AuthProvider>


  )
}





