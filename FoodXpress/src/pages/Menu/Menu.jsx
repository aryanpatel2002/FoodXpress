import React, { useState, useEffect } from "react";
import "./Menu.css";
import { ApiService } from "../../modules/home-navigation";
import { Loader } from "../../shared";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, menuData] = await Promise.all([
          ApiService.fetchCategories(),
          ApiService.fetchMenuItems()
        ]);
        
        setCategories(["All", ...categoriesData]);
        setMenuItems(menuData);
      } catch (error) {
        console.error('Error loading menu data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredItems = selectedCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Our Menu</h1>
        <p>Discover delicious food from various cuisines</p>
      </div>

      <div className="menu-categories">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {loading ? (
          <Loader message="Loading menu items..." />
        ) : (
          filteredItems.map(item => (
            <div key={item.id} className="menu-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-info">
                <h3>{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <p className="restaurant-name">{item.restaurant?.name}</p>
                <div className="item-details">
                  <span className="rating">⭐ {item.rating}</span>
                  <span className="price">${item.price}</span>
                </div>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Menu;