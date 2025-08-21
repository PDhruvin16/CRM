// Re-export Redux auth hooks
// export { useAuthState, useUser, useIsAuthenticated, useIsLoading, useError } from './useRedux';

import { useAuthState, useAppDispatch } from "./useRedux";
import { loginUser, checkAuthStatus, logoutUser, refreshUserProfile } from "../store/slices/authSlice";

// Legacy hook for backward compatibility
export const useAuth = () => {
  const dispatch = useAppDispatch(); 
  const authState = useAuthState();
  
  const loginFunction = async (formValues: { email: string; password: string }) => {
    console.log('🔐 useAuth: Starting login dispatch');
    try {
      const result = await dispatch(loginUser(formValues)).unwrap();
      console.log('✅ useAuth: Login dispatch successful:', result);
      return result;
    } catch (error) {
      console.error('❌ useAuth: Login dispatch failed:', error);
      throw error;
    }
  };
  
  return {
    ...authState,
    login: loginFunction,
    checkAuthStatus: () => dispatch(checkAuthStatus()).unwrap(),
    logout: () => dispatch(logoutUser()).unwrap(),
    refreshProfile: () => dispatch(refreshUserProfile()).unwrap(),
    // Placeholders for future
    register: () => {},
    updateUser: () => {},
    clearError: () => {},
  };
};

// Additional authentication-related hooks
export const useAuthStatus = () => {
  const { isAuthenticated, isLoading } = useAuthState();
  return { isAuthenticated, isLoading };
}; 