import api from '../../../../lib/axios'

export function useRestaurantsApi() {
  const getAll = () => 
    api.get('/admin/restaurants/all')

  const approve = (restaurantId) => 
    api.post(`/admin/restaurants/${restaurantId}/approve`)

  const reject = (restaurantId, reason) => 
    api.post(`/admin/restaurants/${restaurantId}/reject`, { reason })

  return { getAll, approve, reject }
}
