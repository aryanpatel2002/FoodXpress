// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://fxbackend.onrender.com',
  ENDPOINTS: {
    // Auth endpoints
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      LOGOUT: '/api/auth/logout',
      REFRESH: '/api/auth/refresh',
      PROFILE: '/api/auth/profile'
    },
    // User management endpoints
    USERS: {
      BASE: '/api/users',
      PROFILE: '/api/users/profile',
      UPDATE: '/api/users/update'
    },
    // Restaurant endpoints
    RESTAURANTS: {
      BASE: '/api/restaurants',
      SEARCH: '/api/restaurants/search',
      DETAILS: '/api/restaurants'
    },
    // Menu endpoints
    MENU: {
      BASE: '/api/menu',
      ITEMS: '/api/menu/items',
      CATEGORIES: '/api/menu/categories'
    },
    // Order endpoints
    ORDERS: {
      BASE: '/api/orders',
      CREATE: '/api/orders/create',
      TRACK: '/api/orders/track',
      HISTORY: '/api/orders/history'
    },
    // Dashboard endpoints
    DASHBOARD: {
      ANALYTICS: '/api/dashboard/analytics',
      REPORTS: '/api/dashboard/reports'
    }
  }
};

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
};

// Request headers
export const getHeaders = (token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
};