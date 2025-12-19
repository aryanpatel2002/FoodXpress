import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderApi } from '../services/orderService.jsx';
import OrderDetailsModal from '../components/OrderDetailsModal.jsx';
import '../styles/shared.css';
import '../styles/OrdersPage.css';

const OrdersHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    setLoading(true);
    try {
      const response = await orderApi.getMyOrders();
      setOrders(Array.isArray(response) ? response : response.data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'status-confirmed';
      case 'preparing': return 'status-preparing';
      case 'ready': return 'status-ready';
      case 'out for delivery': return 'status-out-for-delivery';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      case 'pending': return 'status-pending';
      default: return 'status-pending';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="orders-history-page">
        <div className="orders-container">
          <div className="orders-loading">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading your orders...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-history-page">
      <div className="orders-container">
        <div className="orders-page-header">
          <h1 className="orders-title">Your Orders</h1>
          <p className="orders-subtitle">Track and manage all your food orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="no-orders">
            <div className="no-orders-icon">📋</div>
            <h2 className="no-orders-title">No orders yet</h2>
            <p className="no-orders-subtitle">Start ordering your favorite food and they'll appear here!</p>
            <button onClick={() => navigate('/menu')} className="order-now-btn">
              🍽️ Order Now
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.orderId} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <div className="order-number">#{order.orderNumber || order.orderId}</div>
                    <div className="order-date">{formatDate(order.orderDate || order.createdAt)}</div>
                  </div>
                  <div className={`order-status ${getStatusClass(order.status)}`}>
                    {order.status}
                  </div>
                </div>

                <div className="order-restaurants">
                  {order.restaurants?.map((restaurant) => (
                    <div key={restaurant.restaurantId} className="restaurant-info">
                      <div className="restaurant-name">{restaurant.restaurantName}</div>
                      <div className="restaurant-items">
                        {restaurant.items?.map((item, index) => (
                          <span key={index} className="item-summary">
                            {item.quantity}x {item.menuItemName}
                          </span>
                        ))}
                      </div>
                    </div>
                  )) || (order.items?.length > 0 && (
                    <div className="restaurant-info">
                      <div className="restaurant-name">Order Items</div>
                      <div className="restaurant-items">
                        {order.items.map((item, index) => (
                          <span key={index} className="item-summary">
                            {item.quantity}x {item.menuItemName || item.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-total">
                    Total: ₹{order.totalAmount}
                    {order.discountAmount > 0 && (
                      <span className="discount"> (Saved ₹{order.discountAmount})</span>
                    )}
                  </div>
                  <div className="order-actions">
                    <button 
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsModalOpen(true);
                      }}
                      className="order-btn order-btn-secondary"
                    >
                      📄 View Details
                    </button>
                    {['confirmed', 'preparing', 'ready', 'out for delivery'].includes(order.status.toLowerCase()) && (
                      <button 
                        onClick={() => navigate(`/order-tracking/${order.orderId}`)}
                        className="order-btn order-btn-primary"
                      >
                        📍 Track Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {isModalOpen && selectedOrder && (
          <OrderDetailsModal 
            order={selectedOrder}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedOrder(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default OrdersHistoryPage;