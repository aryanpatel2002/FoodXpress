import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import './styles/global.css';

// Module imports
import { Navbar, Header, HomePage } from './modules/home-navigation';
import { ErrorBoundary } from './shared';

// Page imports
import Menu from './pages/Menu/Menu';
import Restaurants from './pages/Restaurants/Restaurants';
import Offers from './pages/Offers/Offers';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <ErrorBoundary>
      <Navbar />
      {isHomePage && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/cart" element={<div>Cart Page - Coming Soon</div>} />
      </Routes>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
