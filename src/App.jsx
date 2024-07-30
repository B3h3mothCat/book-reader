import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import NavigationMain from './Router/NavigationMain'
import ThemeToggle from './components/UI/ThemeToggle.jsx'
import AuthProvider from './Context/AuthContext.jsx'

import './App.css'

const pathsWithThemeToggle = [
  '/',
  '/login',
  '/library',
]

export default function App() {
  // STATES
  const [isDark, setIsDark] = useState(true)
  const location = useLocation()

  const showThemeToggle = pathsWithThemeToggle.includes(location.pathname)

  return (
    <AuthProvider>
      <div
        className='app'
        data-theme={isDark ? "dark" : "light"}>

        {showThemeToggle && (
          <ThemeToggle
            isChecked={isDark}
            handleChange={() => setIsDark(!isDark)}
          />
        )}

        <NavigationMain></NavigationMain>
      </div>
    </AuthProvider>
  )
}

// update theme toggle conditional render



