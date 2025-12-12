import { useState, useContext } from 'react'
import Sidebar from './Sidebar.jsx'
import Navbar from './Navbar.jsx'
import { ThemeContext } from '../../context/ThemeContext.jsx'

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { isDark } = useContext(ThemeContext)

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }} className="min-h-screen transition-all duration-300">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <main style={{ backgroundColor: 'var(--bg-primary)' }} className={`transition-all duration-300 mt-16 p-4 md:p-8 min-h-screen ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout
