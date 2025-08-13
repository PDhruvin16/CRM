import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import axiosClient from './axiosClient';
import { ENDPOINTS } from './endpoints';
import { LoginRequest, RegisterRequest, LoginResponse, User } from '@/types/api';

export const authApi = {
  // Login user
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axiosClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Register user
  register: async (userData: RegisterRequest): Promise<LoginResponse> => {
    try {
      const response = await axiosClient.post(ENDPOINTS.AUTH.REGISTER, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await axiosClient.post(ENDPOINTS.AUTH.LOGOUT);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Refresh token
  refreshToken: async (refreshToken: string) => {
    try {
      const response = await axiosClient.post(ENDPOINTS.AUTH.REFRESH_TOKEN, {
        refreshToken,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Forgot password
  forgotPassword: async (email: string) => {
    try {
      const response = await axiosClient.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, {
        email,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Reset password
  resetPassword: async (token: string, newPassword: string) => {
    try {
      const response = await axiosClient.post(ENDPOINTS.AUTH.RESET_PASSWORD, {
        token,
        newPassword,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

getProfile: async (): Promise<User> => {
    try {
      const response = await axiosClient.get(ENDPOINTS.AUTH.PROFILE);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
export default authApi; 