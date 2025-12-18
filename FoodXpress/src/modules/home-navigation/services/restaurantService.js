import apiService from '@services/apiService.js';
import { API_CONFIG } from '@config/api.js';

export const restaurantService = {
  async getRestaurants() {
    return await apiService.get(API_CONFIG.ENDPOINTS.RESTAURANTS.BASE);
  },

  async searchRestaurants(query) {
    return await apiService.get(`${API_CONFIG.ENDPOINTS.RESTAURANTS.SEARCH}?q=${query}`);
  },

  async getRestaurantDetails(id) {
    return await apiService.get(`${API_CONFIG.ENDPOINTS.RESTAURANTS.DETAILS}/${id}`);
  },

  async getMenu(restaurantId) {
    return await apiService.get(`${API_CONFIG.ENDPOINTS.MENU.BASE}/${restaurantId}`);
  },

  async getMenuItems(restaurantId) {
    return await apiService.get(`${API_CONFIG.ENDPOINTS.MENU.ITEMS}/${restaurantId}`);
  }
};