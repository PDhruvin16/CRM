import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import HomeScreen from '../screens/Home/HomeScreen';
import CustomerListScreen from '../screens/Customers/CustomerListScreen';
import CustomerDetailScreen from '../screens/Customers/CustomerDetailScreen';
import CustomerReportsScreen from '../screens/Customers/CustomerReportsScreen';
import CustomerAnalyticsScreen from '../screens/Customers/CustomerAnalyticsScreen';
import LeadListScreen from '../screens/Leads/LeadListScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import HelpScreen from '../screens/Help/HelpScreen';

// Import custom drawer content components
import MainDrawerContent from '../components/navigation/MainDrawerContent';
import CustomerConsoleDrawerContent from '../components/navigation/CustomerConsoleDrawerContent';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import EditProfileScreen from '../screens/Auth/EditProfile';
import ChangePasswordScreen from '../screens/Auth/ChangePassword';
import RoleModuleScreen from '../screens/Auth/RoleModule';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Drawer Toggle Button Component
const DrawerToggleButton = ({ navigation }: { navigation: any }) => (
  <TouchableOpacity
    onPress={() => navigation.openDrawer()}
    style={{
      marginLeft: 15,
      padding: 5,
      borderRadius: 5,
    }}
  >
    <Text style={{
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold'
    }}>☰</Text>
  </TouchableOpacity>
);

// Customer Stack Navigator
const CustomerStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown:false,
      headerStyle: {
        backgroundColor: '#007AFF',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{ title: 'Dashboard' }}
    />
    <Stack.Screen
      name="CustomerList"
      component={CustomerListScreen}
      options={{ title: 'Customers' }}
    />
    <Stack.Screen
      name="CustomerDetail"
      component={CustomerDetailScreen}
      options={{ title: 'Customer Details' }}
    />
  </Stack.Navigator>
);

// Lead Stack Navigator
const LeadStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#007AFF',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="LeadList"
      component={LeadListScreen}
      options={{ title: 'Leads' }}
    />
  </Stack.Navigator>
);

// Profile Stack Navigator
const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#007AFF',
      },
      headerShown:false,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="Profile"
      component={EditProfileScreen}
      options={{ title: 'Profile' }}
    />
     {/* <Stack.Screen
      name="ChangePassword"
      component={ChangePasswordScreen}
      options={{ title: 'Change Password' }}
    /> */}
  </Stack.Navigator>
);
const ChangePasswordStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      headerStyle: {
        backgroundColor: '#007AFF',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="ChangePassword"
      component={ChangePasswordScreen}
      options={{ title: 'Change Password' }}
    />
  </Stack.Navigator>
);
const RoleModuleStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#007AFF',
      },
      headerShown: false,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="RoleModule"
      component={RoleModuleScreen}
      options={{ title: 'Role Module' }}
    />
  </Stack.Navigator>
);

// Customer Console Drawer Navigator
const CustomerConsoleDrawer = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomerConsoleDrawerContent {...props} />}
    screenOptions={{
      headerShown: false,
      headerStyle: {
        backgroundColor: '#007AFF',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      drawerStyle: {
        backgroundColor: '#f8f9fa',
        width: 280,
      },
      drawerActiveTintColor: '#007AFF',
      drawerInactiveTintColor: '#666',
    }}
  >
    <Drawer.Screen
      name="CustomerList"
      component={CustomerStack}
      options={({ navigation }) => ({
        title: 'Customer Management',
        drawerLabel: 'Customers',
        headerLeft: () => <DrawerToggleButton navigation={navigation} />,
      })}
    />
    <Drawer.Screen
      name="CustomerReports"
      component={CustomerReportsScreen}
      options={({ navigation }) => ({
        title: 'Customer Reports',
        drawerLabel: 'Reports',
        headerLeft: () => <DrawerToggleButton navigation={navigation} />,
      })}
    />
    <Drawer.Screen
      name="CustomerAnalytics"
      component={CustomerAnalyticsScreen}
      options={({ navigation }) => ({
        title: 'Customer Analytics',
        drawerLabel: 'Analytics',
        headerLeft: () => <DrawerToggleButton navigation={navigation} />,
      })}
    />
  </Drawer.Navigator>
);

// Main Home Drawer Navigator
const AppNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <MainDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: '#f8f9fa',
          width: 280,
        },
        drawerActiveTintColor: '#007AFF',
        drawerInactiveTintColor: '#666',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Dashboard',
          drawerLabel: 'Home',
          headerShown: false, // Using custom header in HomeScreen
        }}
      />
      <Drawer.Screen
        name="CustomerConsole"
        component={CustomerConsoleDrawer}
        options={{
          title: 'Customer Console',
          drawerLabel: 'Customer Console',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Leads"
        component={LeadStack}
        options={({ navigation }) => ({
          title: 'Leads',
          drawerLabel: 'Leads',
          headerLeft: () => <DrawerToggleButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={({ navigation }) => ({
          title: 'Profile',
          drawerLabel: 'Profile',
          headerLeft: () => <DrawerToggleButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ navigation }) => ({
          title: 'Settings',
          drawerLabel: 'Settings',
          headerLeft: () => <DrawerToggleButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={({ navigation }) => ({
          title: 'Help & Support',
          drawerLabel: 'Help & Support',
          headerLeft: () => <DrawerToggleButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="ChangePassword"
        component={ChangePasswordStack}
        options={({ navigation }) => ({
          title: 'Change Password',
          drawerLabel: 'Change Password',
          headerLeft: () => <DrawerToggleButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="RoleModule"
        component={RoleModuleStack}
        options={({ navigation }) => ({
          title: 'Role Module',
          drawerLabel: 'Role Module',
          headerLeft: () => <DrawerToggleButton navigation={navigation} />,
        })}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator; 