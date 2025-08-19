// Re-export Redux auth hooks
// export { useAuthState, useUser, useIsAuthenticated, useIsLoading, useError } from './useRedux';

import { useAuthState, useAppDispatch } from "./useRedux";
import { loginUser, checkAuthStatus, logoutUser } from "../store/slices/authSlice";

// Legacy hook for backward compatibility
export const useAuth = () => {
  const dispatch = useAppDispatch(); 
  const authState = useAuthState();
  return {
    ...authState,
    login: (formValues: { email: string; password: string }) =>
      dispatch(loginUser(formValues)).unwrap(),
    checkAuthStatus: () => dispatch(checkAuthStatus()).unwrap(),
    logout: () => dispatch(logoutUser()).unwrap(),
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