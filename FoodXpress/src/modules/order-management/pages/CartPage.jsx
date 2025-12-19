import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem.jsx';
import { cartApi } from '../services/orderService.jsx';
import '../styles/shared.css';
import '../styles/CartPage.css';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const getUsernameFromToken = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Token payload:', payload); // Debug log
        const tokenUsername = payload.unique_name || payload.name || payload.username || payload.sub || payload.email || payload.user_name || payload.userName;
        if (tokenUsername) {
          return tokenUsername;
        }
        return 'User';
      } catch (error) {
        console.error('Error parsing token:', error);
        return 'User';
      }
    }
    return 'User';
  };

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const response = await cartApi.get();
      const cartData = response?.data || response;
      
      setCart({
        items: cartData?.items || [],
        subTotal: cartData?.subTotal || 0,
        deliveryFee: cartData?.deliveryFee || 0,
        taxAmount: cartData?.taxAmount || 0,
        totalAmount: cartData?.totalAmount || 0,
        totalItems: cartData?.totalItems || 0
      });
    } catch (err) {
      console.error('Error fetching cart:', err);
      setCart({
        items: [],
        subTotal: 0,
        deliveryFee: 0,
        taxAmount: 0,
        totalAmount: 0,
        totalItems: 0
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadUsername = async () => {
      const user = await getUsernameFromToken();
      setUsername(user);
      document.title = `Welcome ${user} to cart`;
    };
    
    loadUsername();
    fetchCart();
  }, [fetchCart]);

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    try {
      const response = await cartApi.updateItem(cartItemId, { quantity: newQuantity });
      const cartData = response?.data || response;
      setCart(prev => ({
        ...prev,
        items: cartData?.items || [],
        totalAmount: cartData?.totalAmount || 0,
        subTotal: cartData?.subTotal || 0,
        totalItems: cartData?.totalItems || 0
      }));
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      const response = await cartApi.removeItem(cartItemId);
      const cartData = response?.data || response;
      setCart(prev => ({
        ...prev,
        items: cartData?.items || [],
        totalAmount: cartData?.totalAmount || 0,
        subTotal: cartData?.subTotal || 0,
        totalItems: cartData?.totalItems || 0
      }));
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  if (loading) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-loading">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading your cart...</div>
          </div>
        </div>
      </div>
    );
  }

  const isEmpty = !cart || (cart.items || []).length === 0;

  if (isEmpty) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-page-header">
            <h1 className="cart-welcome-title">Welcome to Cart</h1>
            <button 
              onClick={() => navigate('/orders')} 
              className="order-history-btn"
            >
              📋 Order History
            </button>
          </div>
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2 className="empty-cart-title">Your cart is empty</h2>
            <p className="empty-cart-subtitle">Discover delicious food items and add them to your cart to get started</p>
            <button 
              onClick={() => navigate('/menu')} 
              className="browse-menu-btn"
            >
              🍽️ Browse Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-page-header">
          <h1 className="cart-welcome-title">Welcome to Cart</h1>
          <button 
            onClick={() => navigate('/orders')} 
            className="order-history-btn"
          >
            📋 Order History
          </button>
        </div>

        <div className="items-section">
          <div className="items-header">
            <h2 className="items-title">Your Items</h2>
          </div>
          {(cart.items || []).map((item) => (
            <CartItem 
              key={item.cartItemId} 
              item={item} 
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveItem} 
            />
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-header">
            <div className="summary-icon">📋</div>
            <h2 className="summary-title">Order Summary</h2>
          </div>
          
          <div className="summary-items">
            <div className="summary-line">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">₹{cart.subTotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span className="summary-label">Delivery Fee</span>
              <span className="summary-value">₹{cart.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span className="summary-label">Tax</span>
              <span className="summary-value">₹{cart.taxAmount.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="summary-total">
            <span className="total-label">Total</span>
            <span className="total-value">₹{cart.totalAmount.toFixed(2)}</span>
          </div>
          
          <button onClick={() => navigate('/checkout')} className="checkout-btn">
            🚀 Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
