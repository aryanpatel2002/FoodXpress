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
import RestaurantDetails from '../../features/admin/restaurants/details.jsx'
import AdminRestaurantOrders from '../../features/admin/restaurants/restaurant-orders.jsx'
import AdminRestaurantCategories from '../../features/admin/restaurants/restaurant-categories.jsx'
import AdminRestaurantMenu from '../../features/admin/restaurants/restaurant-menu.jsx'
import AdminUsers from '../../features/admin/users/page.jsx'
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
      <Route path="/admin/restaurants/:id" element={<RestaurantDetails />} />
      <Route path="/admin/restaurants/:id/orders" element={<AdminRestaurantOrders />} />
      <Route path="/admin/restaurants/:id/categories" element={<AdminRestaurantCategories />} />
      <Route path="/admin/restaurants/:id/menu" element={<AdminRestaurantMenu />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/analytics" element={<AdminAnalytics />} />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/restaurant/dashboard" replace />} />
    </Routes>
  )
}

export default AppRouter
