import { useNotification } from '../hooks/useNotification';

export const notificationService = {
  // Initialize push notifications
  initialize: async () => {
    try {
      // Request permission for push notifications
      const { status } = await useNotification.requestPermissionsAsync();
      
      if (status !== 'granted') {
        console.log('Notification permission not granted');
        return false;
      }

      // Get push token
      const token = await useNotification.getExpoPushTokenAsync();
      console.log('Push token:', token);
      
      return token;
    } catch (error) {
      console.error('Error initializing notifications:', error);
      return false;
    }
  },

  // Schedule local notification
  scheduleLocalNotification: async (title, body, data = {}, trigger = null) => {
    try {
      await useNotification.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
        },
        trigger: trigger || null, // null means immediate
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  },

  // Cancel all scheduled notifications
  cancelAllNotifications: async () => {
    try {
      await useNotification.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error canceling notifications:', error);
    }
  },

  // Cancel specific notification
  cancelNotification: async (notificationId) => {
    try {
      await useNotification.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
      console.error('Error canceling notification:', error);
    }
  },

  // Get all scheduled notifications
  getScheduledNotifications: async () => {
    try {
      const notifications = await useNotification.getAllScheduledNotificationsAsync();
      return notifications;
    } catch (error) {
      console.error('Error getting scheduled notifications:', error);
      return [];
    }
  },
};

export default notificationService; 