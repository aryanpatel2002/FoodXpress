import { useState, useEffect, useContext } from 'react'
import { useRestaurantsApi } from './api/useRestaurantsApi.js'
import { mockRestaurants } from '../../../lib/mockData.js'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card.jsx'
import Table from '../../../components/ui/Table.jsx'
import { CacheContext } from '../../../context/CacheContext.jsx'

function AdminRestaurants() {
  const { getAll } = useRestaurantsApi()
  const { getCache, setCache } = useContext(CacheContext)
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const cached = getCache('restaurants')
    if (cached) {
      setRestaurants(cached)
      setLoading(false)
    } else {
      loadRestaurants()
    }
  }, [])

  const loadRestaurants = async () => {
    try {
      setLoading(true)
      const response = await getAll()
      const data = response.data?.data || response.data || []
      const restaurantData = Array.isArray(data) ? data : []
      setRestaurants(restaurantData)
      setCache('restaurants', restaurantData)
    } catch (error) {
      console.error('Failed to load restaurants:', error)
      setRestaurants(mockRestaurants)
    } finally {
      setLoading(false)
    }
  }

  const filteredRestaurants = filter === 'all' 
    ? restaurants 
    : restaurants.filter(r => r.status?.toLowerCase() === filter.toLowerCase())

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">Restaurants</h1>
        <p className="text-slate-400">Manage all restaurants and their status</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Restaurants ({restaurants.length})</CardTitle>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="active">Active</option>
          </select>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12 text-slate-400">Loading restaurants...</div>
          ) : (
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Restaurant Name</Table.Head>
                  <Table.Head>Email</Table.Head>
                  <Table.Head>Phone</Table.Head>
                  <Table.Head>Status</Table.Head>
                  <Table.Head>Created</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredRestaurants.length === 0 ? (
                  <Table.Row>
                    <Table.Cell colSpan={5} className="text-center py-8">No restaurants found</Table.Cell>
                  </Table.Row>
                ) : (
                  filteredRestaurants.map((restaurant) => (
                    <Table.Row key={restaurant.restaurantId || restaurant.id}>
                      <Table.Cell className="font-medium">{restaurant.name}</Table.Cell>
                      <Table.Cell>{restaurant.ownerEmail || restaurant.email || '-'}</Table.Cell>
                      <Table.Cell>{restaurant.phone || '-'}</Table.Cell>
                      <Table.Cell>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          restaurant.status?.toLowerCase() === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          restaurant.status?.toLowerCase() === 'rejected' ? 'bg-red-500/20 text-red-400' :
                          restaurant.status?.toLowerCase() === 'active' ? 'bg-green-500/20 text-green-400' :
                          'bg-slate-500/20 text-slate-400'
                        }`}>
                          {restaurant.status || 'pending'}
                        </span>
                      </Table.Cell>
                      <Table.Cell>{restaurant.registeredAt ? new Date(restaurant.registeredAt).toLocaleDateString() : new Date().toLocaleDateString()}</Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminRestaurants
