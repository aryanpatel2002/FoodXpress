import { Link, useLocation } from 'react-router-dom'

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation()
  const isAdmin = location.pathname.includes('/admin')

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/restaurants', label: 'Restaurants', icon: '🏪' },
    { path: '/admin/users', label: 'Users', icon: '👥' },
    { path: '/admin/menu', label: 'Menu Items', icon: '🍽️' },
    { path: '/admin/categories', label: 'Categories', icon: '📂' },
    { path: '/admin/orders', label: 'Orders', icon: '📦' },
    { path: '/admin/analytics', label: 'Analytics', icon: '📈' },
  ]

  const restaurantLinks = [
    { path: '/restaurant/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/restaurant/orders', label: 'Orders', icon: '📦' },
    { path: '/restaurant/menu', label: 'Menu', icon: '🍽️' },
    { path: '/restaurant/categories', label: 'Categories', icon: '📂' },
    { path: '/restaurant/profile', label: 'Profile', icon: '👤' },
  ]

  const links = isAdmin ? adminLinks : restaurantLinks

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div style={{
        background: 'var(--sidebar-bg)',
        borderColor: 'var(--sidebar-border)',
        color: 'var(--sidebar-text)'
      }} className={`fixed left-0 top-16 h-screen border-r p-4 space-y-4 overflow-y-auto z-30 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      } hidden md:flex md:flex-col`}>
        
        <div className={`flex items-center justify-between ${isOpen ? 'px-2' : 'px-1'}`}>
          <div className={`space-y-1 ${!isOpen && 'hidden'}`}>
            <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">DASHBOARD</h1>
            <p className="text-xs font-semibold tracking-widest" style={{ color: 'var(--sidebar-text)', opacity: 0.6 }}>FOOD DELIVERY</p>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg transition-colors flex-shrink-0"
            style={{ color: 'var(--sidebar-text)' }}
            title={isOpen ? 'Collapse' : 'Expand'}
          >
            <span className="text-xl">{isOpen ? '◀' : '▶'}</span>
          </button>
        </div>

        <nav className="space-y-2 flex-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={location.pathname === link.path ? {
                backgroundColor: 'var(--sidebar-active-bg)',
                borderColor: 'var(--sidebar-active-border)',
                color: 'var(--sidebar-active-text)'
              } : {
                color: 'var(--sidebar-text)'
              }}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 border ${
                location.pathname === link.path
                  ? 'border-current shadow-lg'
                  : 'border-transparent hover:bg-opacity-30'
              }`}
              title={!isOpen ? link.label : ''}
            >
              <span className="text-xl flex-shrink-0">{link.icon}</span>
              {isOpen && <span className="font-medium text-sm truncate">{link.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div style={{
        background: 'var(--sidebar-bg)',
        borderColor: 'var(--sidebar-border)',
        color: 'var(--sidebar-text)'
      }} className={`fixed left-0 top-0 h-screen w-64 border-r p-6 space-y-8 overflow-y-auto z-40 transition-transform duration-300 md:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="space-y-1 mt-16">
          <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">DASHBOARD</h1>
          <p className="text-xs font-semibold tracking-widest" style={{ color: 'var(--sidebar-text)', opacity: 0.6 }}>FOOD DELIVERY</p>
        </div>

        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={location.pathname === link.path ? {
                backgroundColor: 'var(--sidebar-active-bg)',
                borderColor: 'var(--sidebar-active-border)',
                color: 'var(--sidebar-active-text)'
              } : {
                color: 'var(--sidebar-text)'
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 border ${
                location.pathname === link.path
                  ? 'border-current shadow-lg'
                  : 'border-transparent hover:bg-opacity-30'
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="font-medium text-sm">{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default Sidebar
