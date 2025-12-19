import React from 'react';
import '../styles/OrderDetailsModal.css';

const OrderDetailsModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'status-confirmed';
      case 'preparing': return 'status-preparing';
      case 'ready': return 'status-ready';
      case 'out for delivery': return 'status-out-for-delivery';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Order Details</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="order-info">
            <div className="info-row">
              <span className="label">Order ID:</span>
              <span className="value">#{order.orderNumber || order.orderId}</span>
            </div>
            <div className="info-row">
              <span className="label">Status:</span>
              <span className={`status ${getStatusClass(order.status)}`}>{order.status}</span>
            </div>
            <div className="info-row">
              <span className="label">Date:</span>
              <span className="value">{formatDate(order.orderDate)}</span>
            </div>
            <div className="info-row">
              <span className="label">Total:</span>
              <span className="value total">₹{order.totalAmount}</span>
            </div>
          </div>

          <div className="order-items">
            <h3>Items Ordered</h3>
            {order.restaurants?.map((restaurant) => (
              <div key={restaurant.restaurantId} className="restaurant-section">
                <h4>{restaurant.restaurantName}</h4>
                {restaurant.items?.map((item, index) => (
                  <div key={index} className="item-row">
                    <span className="item-name">{item.quantity}x {item.menuItemName}</span>
                    <span className="item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;