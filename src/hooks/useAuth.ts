// Re-export Redux auth hooks
// export { useAuthState, useUser, useIsAuthenticated, useIsLoading, useError } from './useRedux';

import { useDispatch } from "react-redux";
import { useAuthState, useUser } from "./useRedux";
import { loginUser } from "../store/slices/authSlice";

// Legacy hook for backward compatibility
export const useAuth = () => {
  const dispatch = useDispatch(); 
  const authState = useAuthState();
  return {
    ...authState,
    // login: () => {useUser()},
      //  login: (formValues:any) => useDispatch(loginUser(formValues)),
         login: (formValues: { email: string; password: string }) =>
      dispatch(loginUser(formValues)),
        // These will be handled by Redux actions
    register: () => {},
    logout: () => {},
    updateUser: () => {},
    clearError: () => {},
  };
};

// Additional authentication-related hooks
export const useAuthStatus = () => {
  const { isAuthenticated, isLoading } = useAuthState();
  return { isAuthenticated, isLoading };
}; 