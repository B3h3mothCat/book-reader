import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import NavigationMain from './Router/NavigationMain'
import AuthProvider from './Context/AuthContext.jsx'

import './App.css'

// const pathsWithThemeToggle = [
//   '/',
//   '/login',
//   '/library',
// ]

export default function App() {

  // const [isDark, setIsDark] = useState(true)
  // const location = useLocation()

  // const showThemeToggle = pathsWithThemeToggle.includes(location.pathname)

  return (
    <AuthProvider>
      <div
        className='app'
      >
        <NavigationMain></NavigationMain>
      </div>
    </AuthProvider>
  )
}




