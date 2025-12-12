import { useState, useEffect, useRef } from 'react'
import { useOrdersApi } from './api/useOrdersApi.js'
import OrderRow from './components/OrderRow.jsx'

function RestaurantOrders() {
  const { getByRestaurant, accept, reject, updateStatus } = useOrdersApi()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('date-recent')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const restaurantId = 2
  const hasLoaded = useRef(false)

  useEffect(() => {
    if (hasLoaded.current) return
    hasLoaded.current = true
    
    loadOrders()
    const interval = setInterval(loadOrders, 10000)
    return () => clearInterval(interval)
  }, [])

  const sortOrders = (ordersToSort, sort) => {
    const sorted = [...ordersToSort]
    switch (sort) {
      case 'date-recent':
        return sorted.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
      case 'date-oldest':
        return sorted.sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate))
      case 'amount-high':
        return sorted.sort((a, b) => b.totalAmount - a.totalAmount)
      case 'amount-low':
        return sorted.sort((a, b) => a.totalAmount - b.totalAmount)
      default:
        return sorted
    }
  }

  const filterOrders = (ordersToFilter) => {
    let filtered = ordersToFilter
    
    if (selectedDate) {
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.orderDate).toISOString().split('T')[0]
        return orderDate === selectedDate
      })
    }
    
    if (selectedStatus) {
      filtered = filtered.filter(order => order.status?.toLowerCase() === selectedStatus.toLowerCase())
    }
    
    return filtered
  }

  const loadOrders = async () => {
    try {
      const response = await getByRestaurant(restaurantId)
      let data = response.data?.data || response.data || []
      data = Array.isArray(data) ? data : []
      data = sortOrders(data, sortBy)
      setOrders(data)
      setCurrentPage(1)
    } catch (error) {
      console.error('Failed to load orders:', error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const handleSortChange = (newSort) => {
    setSortBy(newSort)
    setOrders(sortOrders(orders, newSort))
    setCurrentPage(1)
  }

  const handleAccept = async (orderId) => {
    try {
      await accept(orderId)
      await loadOrders()
    } catch (error) {
      console.error('Failed to accept order:', error)
      alert('Failed to accept order')
    }
  }

  const handleReject = async (orderId) => {
    if (!window.confirm('Are you sure you want to reject this order?')) {
      return
    }
    try {
      await reject(orderId)
      await loadOrders()
    } catch (error) {
      console.error('Failed to reject order:', error)
      alert('Failed to reject order')
    }
  }

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await updateStatus(orderId, status)
      await loadOrders()
    } catch (error) {
      console.error('Failed to update order status:', error)
      alert('Failed to update order status')
    }
  }

  const filteredOrders = filterOrders(orders)
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>Orders</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage and track all restaurant orders</p>
      </div>

      <div className="flex gap-4 flex-wrap items-center">
        <div className="flex items-center gap-2">
          <label style={{ color: 'var(--text-primary)' }} className="font-semibold">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)'
            }}
            className="px-4 py-2 rounded-lg font-semibold border"
          >
            <optgroup label="Date">
              <option value="date-recent">Most Recent</option>
              <option value="date-oldest">Oldest</option>
            </optgroup>
            <optgroup label="Amount">
              <option value="amount-high">Highest Amount</option>
              <option value="amount-low">Lowest Amount</option>
            </optgroup>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label style={{ color: 'var(--text-primary)' }} className="font-semibold">Status:</label>
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value)
              setCurrentPage(1)
            }}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)'
            }}
            className="px-4 py-2 rounded-lg font-semibold border"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Preparing">Preparing</option>
            <option value="OutForDelivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label style={{ color: 'var(--text-primary)' }} className="font-semibold">Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value)
              setCurrentPage(1)
            }}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)'
            }}
            className="px-4 py-2 rounded-lg font-semibold border"
          />
          {selectedDate && (
            <button
              onClick={() => {
                setSelectedDate('')
                setCurrentPage(1)
              }}
              style={{
                backgroundColor: 'var(--primary-red)',
                color: 'white'
              }}
              className="px-3 py-2 rounded-lg font-semibold text-sm"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label style={{ color: 'var(--text-primary)' }} className="font-semibold">Show:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value))
              setCurrentPage(1)
            }}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)'
            }}
            className="px-4 py-2 rounded-lg font-semibold border"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>Loading orders...</div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-12 rounded-lg border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
          No orders found
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {paginatedOrders.map((order) => (
              <OrderRow
                key={order.orderId}
                order={order}
                onAccept={handleAccept}
                onReject={handleReject}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <div style={{ color: 'var(--text-secondary)' }} className="text-sm">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  style={{
                    backgroundColor: currentPage === 1 ? 'var(--bg-secondary)' : 'var(--primary-red)',
                    color: 'white',
                    opacity: currentPage === 1 ? 0.5 : 1
                  }}
                  className="px-4 py-2 rounded-lg font-semibold transition disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    style={{
                      backgroundColor: currentPage === page ? 'var(--primary-red)' : 'var(--bg-secondary)',
                      color: 'white'
                    }}
                    className="px-3 py-2 rounded-lg font-semibold transition"
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    backgroundColor: currentPage === totalPages ? 'var(--bg-secondary)' : 'var(--primary-red)',
                    color: 'white',
                    opacity: currentPage === totalPages ? 0.5 : 1
                  }}
                  className="px-4 py-2 rounded-lg font-semibold transition disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default RestaurantOrders
