# YourCRM - React Native Project Structure

This document outlines the organized folder structure for the YourCRM React Native application.

## 📁 Project Structure

```
YourCRM/
├── android/                    # Android native code
├── ios/                       # iOS native code
├── assets/                    # Static assets
│   ├── fonts/                # Custom fonts
│   ├── images/               # Images and graphics
│   └── icons/                # App icons
│
├── src/                       # Source code
│   ├── api/                  # API layer
│   │   ├── axiosClient.js    # Axios configuration
│   │   ├── endpoints.js      # API endpoints
│   │   ├── authApi.js        # Authentication API
│   │   └── customerApi.js    # Customer API
│   │
│   ├── components/           # Reusable components
│   │   ├── common/           # Common UI components
│   │   │   ├── CustomButton.js
│   │   │   ├── CustomInput.js
│   │   │   ├── Loader.js
│   │   │   └── NetworkStatus.js
│   │   └── CustomerCard.js   # Customer-specific component
│   │
│   ├── constants/            # App constants
│   │   ├── colors.js         # Color definitions
│   │   ├── fonts.js          # Font definitions
│   │   └── strings.js        # String constants
│   │
│   ├── context/              # React Context providers
│   │   ├── AuthContext.js    # Authentication context
│   │   └── NotificationContext.js # Notification context
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.js        # Authentication hook
│   │   ├── useNotification.js # Notification hook
│   │   ├── useFetch.js       # Data fetching hook
│   │   ├── useForm.js        # Form management hook
│   │   ├── useRedux.js       # Redux hooks
│   │   └── useReactQuery.js  # React Query hooks
│   │
│   ├── navigation/           # Navigation configuration
│   │   ├── AppNavigator.js   # Main app navigation
│   │   └── AuthNavigator.js  # Authentication navigation
│   │
│   ├── screens/              # Screen components
│   │   ├── Auth/             # Authentication screens
│   │   │   ├── LoginScreen.js
│   │   │   └── SignupScreen.js
│   │   ├── Dashboard/        # Dashboard screens
│   │   │   └── DashboardScreen.js
│   │   ├── Customers/        # Customer management screens
│   │   │   ├── CustomerListScreen.js
│   │   │   └── CustomerDetailScreen.js
│   │   ├── Leads/            # Lead management screens
│   │   │   └── LeadListScreen.js
│   │   └── Profile/          # Profile screens
│   │       └── ProfileScreen.js
│   │
│   ├── services/             # Business logic services
│   │   ├── notificationService.js
│   │   ├── authService.js
│   │   ├── networkService.js # Network connectivity
│   │   └── queryClient.js    # React Query configuration
│   │
│   ├── store/                # Redux store
│   │   ├── index.js          # Store configuration
│   │   └── slices/           # Redux slices
│   │       ├── authSlice.js
│   │       ├── customerSlice.js
│   │       ├── leadSlice.js
│   │       ├── notificationSlice.js
│   │       └── networkSlice.js
│   │
│   ├── utils/                # Utility functions
│   │   ├── validators.js     # Form validation
│   │   ├── formatters.js     # Data formatting
│   │   └── permissions.js    # Permission handling
│   │
│   ├── App.js                # Main App component
│   └── theme/                # Theming
│       └── ThemeProvider.js  # Theme context provider
│
├── .env                      # Environment variables
├── babel.config.js           # Babel configuration
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```

## 🏗️ Architecture Overview

### **API Layer (`src/api/`)**
- **axiosClient.js**: Centralized HTTP client with interceptors
- **endpoints.js**: API endpoint definitions
- **authApi.js**: Authentication-related API calls
- **customerApi.js**: Customer management API calls

### **Components (`src/components/`)**
- **common/**: Reusable UI components (buttons, inputs, loaders)
- **CustomerCard.js**: Customer-specific component for displaying customer info

### **Constants (`src/constants/`)**
- **colors.js**: Color palette and theme colors
- **fonts.js**: Typography definitions
- **strings.js**: Localized string constants

### **Context (`src/context/`)**
- **AuthContext.js**: Global authentication state management
- **NotificationContext.js**: Notification state management

### **Hooks (`src/hooks/`)**
- **useAuth.js**: Authentication hook wrapper
- **useNotification.js**: Notification hook wrapper
- **useFetch.js**: Data fetching with loading/error states
- **useForm.js**: Form state management with validation

### **Navigation (`src/navigation/`)**
- **AppNavigator.js**: Main app navigation (tab-based)
- **AuthNavigator.js**: Authentication flow navigation

### **Screens (`src/screens/`)**
Organized by feature:
- **Auth/**: Login and signup screens
- **Dashboard/**: Main dashboard screen
- **Customers/**: Customer list and detail screens
- **Leads/**: Lead management screens
- **Profile/**: User profile and settings

### **Services (`src/services/`)**
- **notificationService.js**: Push notification handling
- **authService.js**: Authentication business logic

### **Utils (`src/utils/`)**
- **validators.js**: Form validation functions
- **formatters.js**: Data formatting utilities
- **permissions.js**: Permission request handling

## 🎨 Design System

The app uses a consistent design system with:
- **Colors**: Defined in `src/constants/colors.js`
- **Typography**: Defined in `src/constants/fonts.js`
- **Components**: Reusable UI components in `src/components/common/`
- **Theme**: Theme provider in `src/theme/ThemeProvider.js`

## 🌐 Network & State Management

### **Redux Store (`src/store/`)**
- **Global State**: Centralized state management with Redux Toolkit
- **Persistence**: Redux Persist with AsyncStorage for offline data
- **Slices**: Modular state slices for auth, customers, leads, notifications, and network

### **React Query (`src/services/queryClient.js`)**
- **API Caching**: Intelligent caching and background updates
- **Optimistic Updates**: Immediate UI updates with rollback on error
- **Query Keys**: Consistent cache invalidation and management

### **Network Monitoring (`src/services/networkService.js`)**
- **Connectivity**: Real-time internet connection tracking with NetInfo
- **Status Display**: Visual network status indicator
- **Offline Support**: Graceful handling of network interruptions

## 🔐 Authentication Flow

1. **Redux Auth Slice**: Manages authentication state globally
2. **AuthNavigator**: Handles login/signup flow
3. **AppNavigator**: Main app navigation for authenticated users
4. **Token Management**: Automatic token refresh and storage with Redux Persist
5. **React Query**: Caches user data and handles API calls efficiently

## 📱 Navigation Structure

```
App Navigator (Tab-based)
├── Dashboard
├── Customers
│   ├── Customer List
│   └── Customer Detail
├── Leads
└── Profile

Auth Navigator (Stack-based)
├── Login
└── Signup
```

## 🚀 Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables in `.env`
3. Run the app: `npx react-native run-android` or `npx react-native run-ios`

## 📦 Key Dependencies

- **React Navigation**: Navigation between screens
- **Axios**: HTTP client for API calls
- **AsyncStorage**: Local data persistence
- **Redux Toolkit**: Global state management
- **Redux Persist**: State persistence across app reloads
- **TanStack React Query**: API caching, fetching, and syncing
- **NetInfo**: Internet connectivity tracking
- **React Context**: Legacy state management (being phased out)

## 🔧 Configuration

- **API Base URL**: Configure in `.env` file
- **Theme**: Customize in `src/constants/colors.js`
- **Navigation**: Modify in `src/navigation/` files
- **API Endpoints**: Update in `src/api/endpoints.js`

This structure provides a scalable, maintainable foundation for the YourCRM React Native application. 