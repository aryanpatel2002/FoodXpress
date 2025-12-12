import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppRouter from './app/router/index.jsx'
import Layout from './app/layout/Layout.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { CacheProvider } from './context/CacheContext.jsx'
import './styles/globals.css'

function App() {
  return (
    <ThemeProvider>
      <CacheProvider>
        <BrowserRouter>
          <Layout>
            <AppRouter />
          </Layout>
        </BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
      </CacheProvider>
    </ThemeProvider>
  )
}

export default App
