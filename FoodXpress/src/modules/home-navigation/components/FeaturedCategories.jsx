import React, { useState, useEffect } from "react";
import "../styles/FeaturedCategories.css";
import ApiService from "../services/apiService";
import { Loader } from "../../../shared";

const categoryEmojis = {
  "Starters": "🥟",
  "starters": "🥟",
  "Main Course": "🍽️",
  "Pizzas": "🍕",
  "Sides": "🍟",
  "Healthy Bowls": "🥗",
  "Burgers": "🍔",
  "Beverages": "🥤",
  "Desserts": "🍰",
  "Pasta": "🍝",
  "Noodles": "🍜",
  "Rice": "🍚",
  "Soup": "🍲",
  "Salads": "🥗",
  "Sandwiches": "🥪",
  "Wraps": "🌯",
  "Tacos": "🌮",
  "Sushi": "🍣",
  "Seafood": "🦐",
  "Chicken": "🍗",
  "Beef": "🥩",
  "Pork": "🥓",
  "Vegetarian": "🥕",
  "Vegan": "🌱",
  "Breakfast": "🥞",
  "Brunch": "🧇",
  "Lunch": "🍱",
  "Dinner": "🍽️",
  "Snacks": "🍿",
  "Appetizers": "🥨",
  "Coffee": "☕",
  "Tea": "🍵",
  "Juice": "🧃",
  "Smoothies": "🥤",
  "Milkshakes": "🥛",
  "Ice Cream": "🍦",
  "Frozen Yogurt": "🍧",
  "Cakes": "🎂",
  "Cookies": "🍪",
  "Pastries": "🥐",
  "Bread": "🍞",
  "Bakery": "🥖",
  "Chinese": "🥢",
  "Italian": "🍝",
  "Mexican": "🌮",
  "Indian": "🍛",
  "Thai": "🍜",
  "Japanese": "🍣",
  "Korean": "🍲",
  "Mediterranean": "🫒",
  "BBQ": "🍖",
  "Grilled": "🔥",
  "Fried": "🍟",
  "Steamed": "🥟",
  "Baked": "🥧"
};

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await ApiService.fetchCategories();
        const categoriesWithImages = data.map((category) => ({
          id: category.categoryId,
          name: category.name,
          emoji: categoryEmojis[category.name] || "🍽️",
          restaurantId: category.restaurantId
        }));
        setCategories(categoriesWithImages);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const duplicatedCategories = [...categories, ...categories];

  return (
    <section className="categories">
      <h2 className="categories-title">Featured Categories</h2>

      <div className="categories-slider">
        <div className="categories-track">
          {loading ? (
            <Loader message="Loading categories..." />
          ) : (
            duplicatedCategories.map((cat, index) => (
              <div key={`${cat.id}-${index}`} className="category-card">
                <div className="category-icon">
                  <span className="category-emoji">{cat.emoji}</span>
                </div>
                <p>{cat.name}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;