import { QueryClient } from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global query options
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      // Global mutation options
      retry: 1,
      retryDelay: 1000,
      
    },
  },
});

// Query keys for consistent caching
export const queryKeys = {
  // Auth queries
  auth: {
    user: ['auth', 'user'],
    profile: ['auth', 'profile'],
  },
  
  // Customer queries
  customers: {
    all: ['customers'],
    lists: () => [...queryKeys.customers.all, 'list'],
    list: (filters) => [...queryKeys.customers.lists(), { filters }],
    details: () => [...queryKeys.customers.all, 'detail'],
    detail: (id) => [...queryKeys.customers.details(), id],
  },
  
  // Lead queries
  leads: {
    all: ['leads'],
    lists: () => [...queryKeys.leads.all, 'list'],
    list: (filters) => [...queryKeys.leads.lists(), { filters }],
    details: () => [...queryKeys.leads.all, 'detail'],
    detail: (id) => [...queryKeys.leads.details(), id],
  },
  
  // Dashboard queries
  dashboard: {
    stats: ['dashboard', 'stats'],
    recentActivities: ['dashboard', 'recent-activities'],
    charts: ['dashboard', 'charts'],
  },
  
  // Notification queries
  notifications: {
    all: ['notifications'],
    list: (filters) => [...queryKeys.notifications.all, 'list', { filters }],
    unreadCount: ['notifications', 'unread-count'],
  },
};

export default queryClient; 