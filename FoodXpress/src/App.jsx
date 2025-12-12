import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from './modules/dashboard-analytics/context/ThemeContext'
import { CacheProvider } from './modules/dashboard-analytics/context/CacheContext'
import Layout from './modules/dashboard-analytics/app/layout/Layout'
import AppRouter from './modules/dashboard-analytics/app/router/index'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <CacheProvider>
        <Router>
          <Layout>
            <AppRouter />
          </Layout>
        </Router>
      </CacheProvider>
    </ThemeProvider>
  )
}

export default App
