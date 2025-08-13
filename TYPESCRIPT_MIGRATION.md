# TypeScript Migration Guide for CRM App

## 📋 Overview

This guide provides a comprehensive overview of the TypeScript setup for your CRM application, including type definitions, migration steps, and best practices.

## 🏗️ Type System Architecture

### Directory Structure
```
src/types/
├── index.ts          # Main type exports
├── api.ts            # API-related types
├── navigation.ts     # Navigation types
├── store.ts          # Redux store types
├── components.ts     # Component prop types
└── common.ts         # Common utility types
```

### Type Categories

#### 1. **API Types** (`src/types/api.ts`)
- **Entities**: User, Customer, Lead, Notification
- **Requests**: LoginRequest, RegisterRequest, CustomerFilters
- **Responses**: ApiResponse, PaginatedResponse
- **Enums**: UserRole, CustomerStatus, LeadStatus

#### 2. **Navigation Types** (`src/types/navigation.ts`)
- **Stack Param Lists**: RootStackParamList, AuthStackParamList
- **Screen Props**: ScreenProps, NavigationProps
- **Route Types**: CustomerListParams, LeadListParams

#### 3. **Store Types** (`src/types/store.ts`)
- **State Interfaces**: RootState, AuthState, CustomerState
- **Action Types**: AuthAction, CustomerAction
- **Async Thunk Types**: AsyncThunkConfig

#### 4. **Component Types** (`src/types/components.ts`)
- **Base Props**: BaseComponentProps
- **UI Components**: ButtonProps, InputProps, CardProps
- **Form Components**: FormProps, FormFieldProps

#### 5. **Common Types** (`src/types/common.ts`)
- **Utilities**: Dimensions, Point, Size
- **Events**: TouchEvent, GestureEvent
- **Permissions**: Permission, PermissionStatus

## 🔧 Configuration

### TypeScript Config (`tsconfig.json`)
```json
{
  "extends": "@react-native/typescript-config",
  "compilerOptions": {
    "target": "es2020",
    "strict": true,
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@/types/*": ["src/types/*"]
    }
  }
}
```

### Path Aliases
- `@/` → `src/`
- `@/types/` → `src/types/`
- `@/components/` → `src/components/`
- `@/screens/` → `src/screens/`

## 📝 Migration Steps

### Step 1: Convert JavaScript Files to TypeScript

#### Before (JavaScript)
```javascript
// src/components/CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, disabled, loading }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, disabled && styles.disabled]} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
```

#### After (TypeScript)
```typescript
// src/components/CustomButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ButtonProps } from '@/types/components';

const CustomButton: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  disabled = false, 
  loading = false,
  style,
  testID 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, disabled && styles.disabled, style]} 
      onPress={onPress}
      disabled={disabled || loading}
      testID={testID}
    >
      <Text style={styles.text}>
        {loading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
```

### Step 2: Add Type Annotations to Hooks

#### Before
```javascript
// src/hooks/useAuth.js
import { useAuth as useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  return useAuthContext();
};
```

#### After
```typescript
// src/hooks/useAuth.ts
import { useAuthState, useAppDispatch } from './useRedux';
import { loginUser, registerUser, logoutUser } from '@/store/slices/authSlice';
import { AuthState } from '@/types/store';

export const useAuth = (): AuthState & {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
} => {
  const authState = useAuthState();
  const dispatch = useAppDispatch();

  const login = async (credentials: LoginRequest) => {
    await dispatch(loginUser(credentials));
  };

  const register = async (userData: RegisterRequest) => {
    await dispatch(registerUser(userData));
  };

  const logout = async () => {
    await dispatch(logoutUser());
  };

  return {
    ...authState,
    login,
    register,
    logout,
  };
};
```

### Step 3: Type Redux Store

#### Before
```javascript
// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    const response = await authApi.login(credentials);
    return response;
  }
);
```

#### After
```typescript
// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AsyncThunkConfig } from '@/types/store';
import { LoginRequest, RegisterRequest, User } from '@/types/api';
import authApi from '@/api/authApi';

export const loginUser = createAsyncThunk<
  { user: User; token: string },
  LoginRequest,
  AsyncThunkConfig
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await authApi.login(credentials);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

const authSlice = createSlice<AuthState>({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    // Type-safe async thunk handling
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
      });
  },
});
```

### Step 4: Type Navigation

#### Before
```javascript
// src/screens/CustomerListScreen.js
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const CustomerListScreen = () => {
  const navigation = useNavigation();
  
  const handleCustomerPress = (customerId) => {
    navigation.navigate('CustomerDetail', { customerId });
  };
};
```

#### After
```typescript
// src/screens/CustomerListScreen.tsx
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomerStackParamList } from '@/types/navigation';
import { Customer } from '@/types/api';

type CustomerListNavigationProp = StackNavigationProp<
  CustomerStackParamList,
  'CustomerList'
>;

const CustomerListScreen: React.FC = () => {
  const navigation = useNavigation<CustomerListNavigationProp>();
  
  const handleCustomerPress = (customerId: string) => {
    navigation.navigate('CustomerDetail', { customerId });
  };
};
```

## 🎯 Best Practices

### 1. **Type Safety**
- Always define interfaces for component props
- Use strict TypeScript configuration
- Avoid `any` type - use proper types instead

### 2. **Component Typing**
```typescript
// ✅ Good
interface UserCardProps {
  user: User;
  onPress: (userId: string) => void;
  showActions?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, onPress, showActions = false }) => {
  // Component implementation
};

// ❌ Avoid
const UserCard = ({ user, onPress, showActions }) => {
  // No type safety
};
```

### 3. **Hook Typing**
```typescript
// ✅ Good
export const useCustomers = (filters?: CustomerFilters) => {
  return useQuery({
    queryKey: ['customers', filters],
    queryFn: () => customerApi.getCustomers(filters),
  });
};

// ❌ Avoid
export const useCustomers = (filters) => {
  return useQuery({
    queryKey: ['customers', filters],
    queryFn: () => customerApi.getCustomers(filters),
  });
};
```

### 4. **API Response Typing**
```typescript
// ✅ Good
interface CustomerResponse {
  data: Customer;
  message: string;
  success: boolean;
}

const getCustomer = async (id: string): Promise<CustomerResponse> => {
  const response = await api.get(`/customers/${id}`);
  return response.data;
};

// ❌ Avoid
const getCustomer = async (id) => {
  const response = await api.get(`/customers/${id}`);
  return response.data;
};
```

## 🔍 Type Checking

### Running Type Check
```bash
# Check for type errors
npx tsc --noEmit

# Check specific files
npx tsc --noEmit src/components/CustomButton.tsx

# Watch mode for development
npx tsc --noEmit --watch
```

### ESLint with TypeScript
```bash
# Install TypeScript ESLint
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser

# Run ESLint with TypeScript rules
npx eslint src/**/*.{ts,tsx} --ext .ts,.tsx
```

## 📚 Common Type Patterns

### 1. **Optional Properties**
```typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string; // Optional
  bio?: string;    // Optional
}
```

### 2. **Union Types**
```typescript
type UserRole = 'admin' | 'manager' | 'sales' | 'support';
type CustomerStatus = 'active' | 'inactive' | 'prospect';
```

### 3. **Generic Types**
```typescript
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    total: number;
    hasMore: boolean;
  };
}
```

### 4. **Utility Types**
```typescript
// Make all properties optional
type PartialUser = Partial<User>;

// Make specific properties required
type RequiredUser = Required<Pick<User, 'id' | 'email'>>;

// Omit specific properties
type UserWithoutPassword = Omit<User, 'password'>;

// Pick specific properties
type UserBasicInfo = Pick<User, 'id' | 'name' | 'email'>;
```

## 🚀 Migration Checklist

- [ ] Convert `.js` files to `.tsx` for React components
- [ ] Convert `.js` files to `.ts` for utilities and services
- [ ] Add type annotations to all function parameters
- [ ] Define interfaces for all component props
- [ ] Type Redux store and actions
- [ ] Type navigation parameters
- [ ] Add proper error handling with typed errors
- [ ] Configure ESLint for TypeScript
- [ ] Set up path aliases for clean imports
- [ ] Add JSDoc comments for complex types
- [ ] Test type checking with `npx tsc --noEmit`

## 🛠️ Tools and Extensions

### VS Code Extensions
- TypeScript Importer
- Auto Rename Tag
- Bracket Pair Colorizer
- Error Lens
- TypeScript Hero

### Development Tools
- TypeScript Compiler (`tsc`)
- ESLint with TypeScript rules
- Prettier for code formatting
- React DevTools for component inspection

This TypeScript setup provides comprehensive type safety, better developer experience, and improved code maintainability for your CRM application. 