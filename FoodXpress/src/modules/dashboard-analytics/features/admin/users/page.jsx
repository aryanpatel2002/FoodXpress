import { useState, useEffect, useContext } from 'react'
import { useUsersApi } from './api/useUsersApi.js'
import { mockUsers } from '../../../lib/mockData.js'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card.jsx'
import Table from '../../../components/ui/Table.jsx'
import { CacheContext } from '../../../context/CacheContext.jsx'

function AdminUsers() {
  const { getAll } = useUsersApi()
  const { getCache, setCache } = useContext(CacheContext)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const cached = getCache('users')
    if (cached) {
      setUsers(cached)
      setLoading(false)
    } else {
      loadUsers()
    }
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const response = await getAll()
      const data = response.data?.data || response.data || []
      const userData = Array.isArray(data) ? data : []
      setUsers(userData)
      setCache('users', userData)
    } catch (error) {
      console.error('Failed to load users:', error)
      setUsers(mockUsers)
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = filter === 'all'
    ? users
    : users.filter(u => u.role?.toLowerCase() === filter.toLowerCase())

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">Users</h1>
        <p className="text-slate-400">Manage all users in the system</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Users</CardTitle>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="restaurant">Restaurant</option>
            <option value="customer">Customer</option>
          </select>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12 text-slate-400">Loading users...</div>
          ) : (
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Name</Table.Head>
                  <Table.Head>Email</Table.Head>
                  <Table.Head>Phone</Table.Head>
                  <Table.Head>Role</Table.Head>
                  <Table.Head>Joined</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredUsers.length === 0 ? (
                  <Table.Row>
                    <Table.Cell colSpan={5} className="text-center py-8">No users found</Table.Cell>
                  </Table.Row>
                ) : (
                  filteredUsers.map((user) => (
                    <Table.Row key={user.userId || user.id}>
                      <Table.Cell className="font-medium">{user.userName || user.name}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>{user.phone || '-'}</Table.Cell>
                      <Table.Cell>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' :
                          user.role === 'restaurant' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {user.role}
                        </span>
                      </Table.Cell>
                      <Table.Cell>{user.createdDate || new Date().toLocaleDateString()}</Table.Cell>
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

export default AdminUsers
