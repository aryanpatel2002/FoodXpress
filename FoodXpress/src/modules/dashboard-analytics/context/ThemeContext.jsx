import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const darkMode = saved ? saved === 'dark' : true
    setIsDark(darkMode)
    applyTheme(darkMode)
  }, [])

  const applyTheme = (dark) => {
    const root = document.documentElement
    
    if (dark) {
      root.style.setProperty('--bg-primary', '#1a1a1a')
      root.style.setProperty('--bg-secondary', '#2d2d2d')
      root.style.setProperty('--text-primary', '#ffffff')
      root.style.setProperty('--text-secondary', '#b0b0b0')
      root.style.setProperty('--border-color', '#404040')
      root.style.setProperty('--navbar-bg', 'linear-gradient(to right, #1a1a1a, #2d2d2d)')
      root.style.setProperty('--navbar-border', '#404040')
      root.style.setProperty('--navbar-text', '#ffffff')
      root.style.setProperty('--navbar-icon', '#b0b0b0')
      root.style.setProperty('--sidebar-bg', 'linear-gradient(to bottom, #0f0f0f, #1a1a1a)')
      root.style.setProperty('--sidebar-border', '#404040')
      root.style.setProperty('--sidebar-text', '#b0b0b0')
      document.body.style.background = 'linear-gradient(135deg, hsl(10 15 30) 0%, hsl(220 20% 15%) 100%)'
      document.body.style.color = '#ffffff'
    } else {
      root.style.setProperty('--bg-primary', '#f5f5f5')
      root.style.setProperty('--bg-secondary', '#ffffff')
      root.style.setProperty('--text-primary', '#111111')
      root.style.setProperty('--text-secondary', '#666666')
      root.style.setProperty('--border-color', '#ddd')
      root.style.setProperty('--navbar-bg', 'linear-gradient(to right, #ffffff, #f8f9fa)')
      root.style.setProperty('--navbar-border', '#ddd')
      root.style.setProperty('--navbar-text', '#111111')
      root.style.setProperty('--navbar-icon', '#666666')
      root.style.setProperty('--sidebar-bg', 'linear-gradient(to bottom, #ffffff, #f8f9fa)')
      root.style.setProperty('--sidebar-border', '#ddd')
      root.style.setProperty('--sidebar-text', '#666666')
      document.body.style.background = '#f5f5f5'
      document.body.style.color = '#111111'
    }
  }

  const toggleTheme = () => {
    setIsDark(prev => {
      const newValue = !prev
      localStorage.setItem('theme', newValue ? 'dark' : 'light')
      applyTheme(newValue)
      return newValue
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
