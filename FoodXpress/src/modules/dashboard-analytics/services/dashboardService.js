import apiService from '../../../services/apiService.js';
import { API_CONFIG } from '../../../config/api.js';

export const dashboardService = {
  async getAnalytics() {
    return await apiService.get(API_CONFIG.ENDPOINTS.DASHBOARD.ANALYTICS);
  },

  async getReports(dateRange) {
    const params = dateRange ? `?from=${dateRange.from}&to=${dateRange.to}` : '';
    return await apiService.get(`${API_CONFIG.ENDPOINTS.DASHBOARD.REPORTS}${params}`);
  },

  async getSalesData() {
    return await apiService.get(`${API_CONFIG.ENDPOINTS.DASHBOARD.ANALYTICS}/sales`);
  },

  async getUserMetrics() {
    return await apiService.get(`${API_CONFIG.ENDPOINTS.DASHBOARD.ANALYTICS}/users`);
  }
};