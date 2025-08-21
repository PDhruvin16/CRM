// API Endpoints configuration
export const ENDPOINTS: Record<string, any> = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/api/token/', // Matching your curl command exactly
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH_TOKEN: '/api/auth/refresh',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
  },

  // User endpoints
  USER: {
    PROFILE: '/api/user/profile',
    UPDATE_PROFILE: '/api/user/profile',
    CHANGE_PASSWORD: '/api/user/change-password',
  },

  // Customer endpoints
  CUSTOMERS: {
    LIST: '/customers',
    CREATE: '/customers',
    DETAIL: (id: string) => `/customers/${id}`,
    UPDATE: (id: string) => `/customers/${id}`,
    DELETE: (id: string) => `/customers/${id}`,
    SEARCH: '/customers/search',
  },

  // Lead endpoints
  LEADS: {
    LIST: '/leads',
    CREATE: '/leads',
    DETAIL: (id: string) => `/leads/${id}`,
    UPDATE: (id: string) => `/leads/${id}`,
    DELETE: (id: string) => `/leads/${id}`,
    CONVERT: (id: string) => `/leads/${id}/convert`,
  },

  // Dashboard endpoints
  DASHBOARD: {
    STATS: '/dashboard/stats',
    RECENT_ACTIVITIES: '/dashboard/recent-activities',
    CHARTS: '/dashboard/charts',
  },

  // Notification endpoints
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/mark-all-read',
  },
};

export default ENDPOINTS; 