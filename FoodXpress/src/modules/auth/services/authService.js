import apiService from '../../../services/apiService.js';
import { API_CONFIG } from '../../../config/api.js';

export const authService = {
  async login(credentials) {
    const response = await apiService.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }
    return response;
  },

  async register(userData) {
    return await apiService.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, userData);
  },

  async logout() {
    localStorage.removeItem('authToken');
    return await apiService.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
  },

  async getProfile() {
    return await apiService.get(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
  },

  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },

  getToken() {
    return localStorage.getItem('authToken');
  }
};