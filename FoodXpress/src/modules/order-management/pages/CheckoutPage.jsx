import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkoutApi, locationApi } from '../services/orderService.jsx';
import '../styles/shared.css';
import '../styles/CheckoutPage.css';

const CheckoutPage = () => {
  const [checkout, setCheckout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [addressesWithNames, setAddressesWithNames] = useState([]);
  const [newAddress, setNewAddress] = useState({
    addressLine: '',
    state: '',
    city: '',
    pinCode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('CashOnDelivery');
  const [placingOrder, setPlacingOrder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCheckoutSummary();
    fetchStates();
  }, []);

  useEffect(() => {
    if (newAddress.state) {
      fetchCities(newAddress.state);
      setNewAddress(prev => ({...prev, city: ''}));
    }
  }, [newAddress.state]);

  const getStateName = (stateId) => {
    const state = states.find(s => s.stateId === parseInt(stateId));
    return state ? state.stateName : '';
  };

  const getCityName = (cityId) => {
    const city = cities.find(c => c.cityId === parseInt(cityId));
    return city ? city.cityName : '';
  };

  const formatAddress = (address) => {
    console.log('Raw address object:', JSON.stringify(address, null, 2));
    
    // Map city and state IDs to names
    const cityNames = { '1': 'Pune', '2': 'Mumbai', '3': 'Delhi', '4': 'Bangalore' };
    const stateNames = { '1': 'Maharashtra', '2': 'Karnataka', '3': 'Delhi' };
    
    const parts = [];
    if (address.addressLine) parts.push(address.addressLine);
    if (address.city) parts.push(cityNames[address.city] || address.city);
    if (address.state) parts.push(stateNames[address.state] || address.state);
    if (address.pinCode) parts.push(address.pinCode);
    
    const result = parts.join(', ') || address.addressLine || 'No address available';
    console.log('Formatted result:', result);
    return result;
  };

  const fetchCheckoutSummary = async () => {
    setLoading(true);
    try {
      // Add cache-busting parameter to force fresh data
      const response = await checkoutApi.getSummary();
      console.log('Fresh API Response:', response?.savedAddresses); // Debug
      setCheckout(response);
      if (response?.defaultAddress?.addressId) {
        setSelectedAddress(response.defaultAddress.addressId);
      }
      
      if (response?.savedAddresses?.length > 0) {
        setAddressesWithNames(response.savedAddresses);
      }
    } catch (err) {
      console.error('Error fetching checkout summary:', err);
    } finally {
      setLoading(false);
    }
  };



  const fetchStates = async () => {
    try {
      const response = await locationApi.getStates();
      setStates(response);
    } catch (err) {
      console.error('Error fetching states:', err);
    }
  };

  const fetchCities = async (stateId) => {
    try {
      const response = await locationApi.getCitiesByState(stateId);
      setCities(response);
    } catch (err) {
      console.error('Error fetching cities:', err);
      setCities([]);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress && !showNewAddress) {
      alert('Please select an address');
      return;
    }

    if (showNewAddress) {
      if (!newAddress.addressLine || !newAddress.state || !newAddress.city || !newAddress.pinCode) {
        alert('Please fill all address fields');
        return;
      }
    }

    const orderData = {
      addressId: selectedAddress,
      newAddress: showNewAddress ? newAddress : undefined,
      paymentMethod
    };
    console.log('Sending order data:', orderData);

    setPlacingOrder(true);
    try {
      const response = await checkoutApi.placeOrder(orderData);
      console.log('Order response:', response);
      navigate('/orders');
    } catch (err) {
      console.error('Error placing order:', err);
      alert(`Failed to place order: ${err.message}`);
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-loading">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading checkout...</div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!checkout) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-error">
            <div className="error-icon">⚠</div>
            <div className="error-text">Error loading checkout. Please try again.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1 className="checkout-title">Checkout</h1>
          <p className="checkout-subtitle">Review your order and complete your purchase</p>
        </div>

        {/* Delivery Address Section */}
        <div className="checkout-section">
          <div className="section-header">
            <div className="section-icon">📍</div>
            <h2 className="section-title">Delivery Address</h2>
          </div>
          
          <div className="address-options">
            {addressesWithNames?.length > 0 ? (
              addressesWithNames.map((addr) => (
                <div 
                  key={addr.addressId} 
                  className={`address-option ${selectedAddress === addr.addressId ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedAddress(addr.addressId);
                    setShowNewAddress(false);
                  }}
                >
                  <input
                    type="radio"
                    name="address"
                    className="address-radio"
                    checked={selectedAddress === addr.addressId}
                    onChange={() => {
                      setSelectedAddress(addr.addressId);
                      setShowNewAddress(false);
                    }}
                  />
                  <div className="address-content">
                    <p className="address-text">
                      {formatAddress(addr)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">No saved addresses found</p>
            )}
            
            <div 
              className={`new-address-option ${showNewAddress ? 'selected' : ''}`}
              onClick={() => setShowNewAddress(true)}
            >
              <input
                type="radio"
                name="address"
                className="address-radio"
                checked={showNewAddress}
                onChange={() => setShowNewAddress(true)}
              />
              <div className="add-icon">+</div>
              <span className="text-base font-medium">Add New Address</span>
            </div>

            {showNewAddress && (
              <div className="new-address-form">
                {newAddress.addressLine && (
                  <div className="address-preview">
                    <p className="preview-label">Address Preview:</p>
                    <p className="preview-text">
                      {newAddress.addressLine}
                      {newAddress.city && `, ${getCityName(newAddress.city)}`}
                      {newAddress.state && `, ${getStateName(newAddress.state)}`}
                      {newAddress.pinCode && ` - ${newAddress.pinCode}`}
                    </p>
                  </div>
                )}
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label className="form-label">Address Line</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter your full address"
                      value={newAddress.addressLine}
                      onChange={(e) => setNewAddress({...newAddress, addressLine: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State</label>
                    <select
                      className="form-select"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state.stateId} value={state.stateId}>
                          {state.stateName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <select
                      className="form-select"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                      disabled={!newAddress.state}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.cityId} value={city.cityId}>
                          {city.cityName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Pin Code</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter pin code"
                      value={newAddress.pinCode}
                      onChange={(e) => setNewAddress({...newAddress, pinCode: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Payment Method Section */}
        <div className="checkout-section">
          <div className="section-header">
            <div className="section-icon">💳</div>
            <h2 className="section-title">Payment Method</h2>
          </div>
          
          <div className="payment-options">
            {checkout.paymentOptions?.map((option) => (
              <div 
                key={option.method} 
                className={`payment-option ${paymentMethod === option.method ? 'selected' : ''}`}
                onClick={() => setPaymentMethod(option.method)}
              >
                <input
                  type="radio"
                  name="payment"
                  className="payment-radio"
                  value={option.method}
                  checked={paymentMethod === option.method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="payment-icon">{option.icon}</span>
                <span className="payment-text">{option.displayName}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="checkout-section order-summary">
          <div className="section-header">
            <div className="section-icon">📋</div>
            <h2 className="section-title">Order Summary</h2>
          </div>
          
          <div className="summary-items">
            <div className="summary-item">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">₹{checkout.subTotal?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Delivery Fee</span>
              <span className="summary-value">₹{checkout.deliveryFee?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Tax</span>
              <span className="summary-value">₹{checkout.taxAmount?.toFixed(2) || '0.00'}</span>
            </div>
            {checkout.discountAmount > 0 && (
              <div className="summary-item summary-discount">
                <span className="summary-label">Discount</span>
                <span className="summary-value">-₹{checkout.discountAmount?.toFixed(2)}</span>
              </div>
            )}
          </div>
          
          <div className="summary-total">
            <span className="total-label">Total</span>
            <span className="total-value">₹{checkout.totalAmount?.toFixed(2) || '0.00'}</span>
          </div>
          
          <button onClick={handlePlaceOrder} className="place-order-btn" disabled={placingOrder}>
            {placingOrder ? (
              <>
                <div className="loading-spinner"></div>
                Placing Order...
              </>
            ) : (
              '🛒 Place Order'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
