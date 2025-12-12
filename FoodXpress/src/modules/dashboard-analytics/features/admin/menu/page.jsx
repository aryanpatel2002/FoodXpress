import { useState, useEffect, useContext } from 'react'
import { useMenuApi } from './api/useMenuApi.js'
import { mockMenuItems } from '../../../lib/mockData.js'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card.jsx'
import Table from '../../../components/ui/Table.jsx'
import { CacheContext } from '../../../context/CacheContext.jsx'

function AdminMenu() {
  const { getAll } = useMenuApi()
  const { getCache, setCache, isLoading, setLoading: setCacheLoading } = useContext(CacheContext)
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const cached = getCache('menu')
    if (cached) {
      setMenuItems(cached)
      setLoading(false)
    } else if (!isLoading('menu')) {
      setCacheLoading('menu', true)
      loadMenuItems()
    }
  }, [])

  const loadMenuItems = async () => {
    try {
      const response = await getAll()
      const data = response.data?.data || response.data || []
      const menuData = Array.isArray(data) ? data : []
      setMenuItems(menuData)
      setCache('menu', menuData)
    } catch (error) {
      console.error('Failed to load menu items:', error)
      setMenuItems(mockMenuItems)
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = filter === 'all'
    ? menuItems
    : menuItems.filter(item => item.isAvailable === (filter === 'active'))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">Menu Items</h1>
        <p className="text-slate-400">Manage all menu items across restaurants</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Menu Items ({menuItems.length})</CardTitle>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12 text-slate-400">Loading menu items...</div>
          ) : (
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Item Name</Table.Head>
                  <Table.Head>Restaurant</Table.Head>
                  <Table.Head>Category</Table.Head>
                  <Table.Head>Price</Table.Head>
                  <Table.Head>Status</Table.Head>
                  <Table.Head>Created</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredItems.length === 0 ? (
                  <Table.Row>
                    <Table.Cell colSpan={6} className="text-center py-8">No menu items found</Table.Cell>
                  </Table.Row>
                ) : (
                  filteredItems.map((item) => (
                    <Table.Row key={item.menuItemId || item.id}>
                      <Table.Cell className="font-medium">{item.name}</Table.Cell>
                      <Table.Cell>{item.restaurantName || '-'}</Table.Cell>
                      <Table.Cell>{item.categoryName || '-'}</Table.Cell>
                      <Table.Cell>${(item.price || 0).toFixed(2)}</Table.Cell>
                      <Table.Cell>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.isAvailable ? 'bg-green-500/20 text-green-400' :
                          'bg-slate-500/20 text-slate-400'
                        }`}>
                          {item.isAvailable ? 'active' : 'inactive'}
                        </span>
                      </Table.Cell>
                      <Table.Cell>{new Date().toLocaleDateString()}</Table.Cell>
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

export default AdminMenu
