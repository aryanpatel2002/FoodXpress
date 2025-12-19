import React from 'react';
import '../styles/CartItem.css';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      onRemove(item.cartItemId);
    } else {
      onUpdateQuantity(item.cartItemId, newQuantity);
    }
  };

  const price = item.unitPrice || item.price || 0;
  const lineTotal = item.lineTotal || item.total || 0;

  return (
    <div className="cart-item">
      <div className="item-info">
        <h4 className="item-name">{item.menuItemName}</h4>
        <p className="item-price">{price.toFixed(2)}</p>
      </div>
      
      <div className="item-controls">
        <div className="quantity-controls">
          <button 
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="quantity-btn"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="quantity-display">{item.quantity}</span>
          <button 
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="quantity-btn"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        
        <div className="item-total">
          <span className="total-label">Total</span>
          <span className="total-value">₹{lineTotal.toFixed(2)}</span>
        </div>
        
        <button 
          onClick={() => onRemove(item.cartItemId)}
          className="remove-btn"
          aria-label="Remove item from cart"
        >
          <span className="remove-icon">🗑️</span>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
