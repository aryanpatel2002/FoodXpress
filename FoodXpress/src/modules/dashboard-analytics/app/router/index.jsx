import { Routes, Route, Navigate } from 'react-router-dom'

// Restaurant Pages
import RestaurantDashboard from '../../features/restaurant/dashboard/page.jsx'
import RestaurantOrders from '../../features/restaurant/orders/page.jsx'
import RestaurantMenu from '../../features/restaurant/menu/page.jsx'
import RestaurantCategories from '../../features/restaurant/categories/page.jsx'
import RestaurantProfile from '../../features/restaurant/profile/page.jsx'

// Admin Pages
import AdminDashboard from '../../features/admin/dashboard/page.jsx'
import AdminPending from '../../features/admin/pending/page.jsx'
import AdminRestaurantDetail from '../../features/admin/detail/page.jsx'
import AdminActive from '../../features/admin/active/page.jsx'
import AdminRejected from '../../features/admin/rejected/page.jsx'
import AdminRestaurants from '../../features/admin/restaurants/page.jsx'
import AdminUsers from '../../features/admin/users/page.jsx'
import AdminMenu from '../../features/admin/menu/page.jsx'
import AdminCategories from '../../features/admin/categories/page.jsx'
import AdminOrders from '../../features/admin/orders/page.jsx'
import AdminAnalytics from '../../features/admin/analytics/page.jsx'

function AppRouter() {
  return (
    <Routes>
      {/* Restaurant Routes */}
      <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
      <Route path="/restaurant/orders" element={<RestaurantOrders />} />
      <Route path="/restaurant/menu" element={<RestaurantMenu />} />
      <Route path="/restaurant/categories" element={<RestaurantCategories />} />
      <Route path="/restaurant/profile" element={<RestaurantProfile />} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/pending" element={<AdminPending />} />
      <Route path="/admin/restaurant/:id" element={<AdminRestaurantDetail />} />
      <Route path="/admin/active" element={<AdminActive />} />
      <Route path="/admin/rejected" element={<AdminRejected />} />
      <Route path="/admin/restaurants" element={<AdminRestaurants />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/menu" element={<AdminMenu />} />
      <Route path="/admin/categories" element={<AdminCategories />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/analytics" element={<AdminAnalytics />} />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/restaurant/dashboard" replace />} />
    </Routes>
  )
}

export default AppRouter


