import React, { useState, useEffect } from "react";
import "./Restaurants.css";
import { ApiService } from "../../modules/home-navigation";
import { Loader } from "../../shared";

const Restaurants = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await ApiService.fetchRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error loading restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleRestaurantClick = async (restaurant) => {
    try {
      const fullRestaurant = await ApiService.fetchRestaurant(restaurant.id);
      setSelectedRestaurant(fullRestaurant);
    } catch (error) {
      console.error('Error loading restaurant details:', error);
    }
  };

  const handleBackClick = () => {
    setSelectedRestaurant(null);
  };

  if (selectedRestaurant) {
    return (
      <div className="restaurant-menu">
        <button className="back-btn" onClick={handleBackClick}>
          ← Back to Restaurants
        </button>
        <div className="restaurant-header">
          <div className="restaurant-icon">
            <img src={selectedRestaurant.image || '/NavLogo.png'} alt={selectedRestaurant.name} />
          </div>
          <div className="restaurant-details">
            <h1>{selectedRestaurant.name}</h1>
            <p>⭐ {selectedRestaurant.rating} • 📍 {selectedRestaurant.address}</p>
            <p>{selectedRestaurant.description}</p>
          </div>
        </div>
        
        <div className="menu-items">
          <h2>Menu Items</h2>
          <div className="menu-grid">
            {selectedRestaurant.menuItems?.map(item => (
              <div key={item.id} className="menu-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  <p className="item-category">{item.category}</p>
                  <div className="item-details">
                    <span className="rating">⭐ {item.rating}</span>
                    <span className="price">${item.price}</span>
                  </div>
                  <button className="add-btn">Add to Cart</button>
                </div>
              </div>
            )) || <p>No menu items available</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurants-page">
      <div className="restaurants-header">
        <h1>Restaurants Near You</h1>
        <p>Choose from our partner restaurants</p>
      </div>

      <div className="restaurants-grid">
        {loading ? (
          <Loader message="Loading restaurants..." />
        ) : (
          restaurants.map(restaurant => (
            <div 
              key={restaurant.id} 
              className="restaurant-card"
              onClick={() => handleRestaurantClick(restaurant)}
            >
              <div className="restaurant-image">
                <img src={restaurant.image || '/NavLogo.png'} alt={restaurant.name} />
              </div>
              <div className="restaurant-info">
                <h3>{restaurant.name}</h3>
                <p className="description">{restaurant.description}</p>
                <div className="restaurant-meta">
                  <span className="rating">⭐ {restaurant.rating}</span>
                  <span className="phone">📞 {restaurant.phone}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Restaurants;