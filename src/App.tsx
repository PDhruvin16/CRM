import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { NotificationProvider } from './context/NotificationContext';
import { ThemeProvider } from './theme/ThemeProvider';
import { store, persistor } from './store';
import { queryClient } from './services/queryClient';
import networkService from './services/networkService';
import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import Loader from './components/common/Loader';
import NetworkStatus from './components/common/NetworkStatus';
import { COLORS } from './constants/colors';
import { useAuthState, useAppDispatch } from './hooks/useRedux';
import { checkAuthStatus } from './store/slices/authSlice';

const AppContent = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAuthState();

  // Initialize network monitoring
  useEffect(() => {
    networkService.initialize();
    dispatch(checkAuthStatus());
    
    return () => {
      networkService.cleanup();
    };
  }, [dispatch]);

  if (isLoading) {
    return <Loader visible={true} text="Loading..." />;
  }

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.gray}
      />
      <NetworkStatus />
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader visible={true} text="Loading..." />} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <NotificationProvider>
              <AppContent />
            </NotificationProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App; 