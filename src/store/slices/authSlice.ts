import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authApi from '../../api/authApi';

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // Mock login for now
      if (
        credentials.email === 'test@test.com' &&
        credentials.password === 'test123'
      ) {
        const mockResponse = {
          token: 'mock-jwt-token-12345',
          user: {
            id: 1,
            name: 'Test User',
            email: 'test@test.com',
            role: 'admin',
          },
        };

        // Persist for checkAuthStatus
        await AsyncStorage.setItem('authToken', mockResponse.token);
        await AsyncStorage.setItem(
          'userData',
          JSON.stringify(mockResponse.user)
        );

        return mockResponse;
      }

      // Future: call real API
      // const response = await authApi.login(credentials);
      // await AsyncStorage.setItem('authToken', response.token);
      // await AsyncStorage.setItem('userData', JSON.stringify(response.user));
      // return response;

      return rejectWithValue('Invalid email or password');
    } catch (error: unknown) {
      return rejectWithValue(
        (error as any)?.response?.data?.message || 'Login failed'
      );
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userData = await AsyncStorage.getItem('userData');

      if (token && userData) {
        const user = JSON.parse(userData);
        return { user, token };
      }
      return rejectWithValue('Not authenticated');
    } catch (error: unknown) {
      return rejectWithValue('Failed to check auth status');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData:any, { rejectWithValue }) => {
    try {
      const response = await authApi.register(userData);
      return response;
    } catch (error: unknown) {
      return rejectWithValue((error as any)?.response?.data?.message || 'Registration failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Optional: await authApi.logout();
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
      return null;
    } catch (error : unknown) {
      return rejectWithValue((error as any)?.response?.data?.message || 'Logout failed');
    }
  }
);

// Initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state:any, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state:any, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state:any, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Check Auth Status
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state: any, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state: any) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state:any, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state:any, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state:any, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, updateUser, setCredentials } = authSlice.actions;
export default authSlice.reducer; 