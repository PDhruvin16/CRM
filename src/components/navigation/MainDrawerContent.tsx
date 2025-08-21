
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
// import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../constants/colors';
import Icon from 'react-native-vector-icons/Feather'; // Using Feather icons
import { useAuth } from '../../hooks/useAuth';

type Props = {
  navigation: any;
};

const MainDrawerContent = (props: Props) => {
  const { user, logout } = useAuth() as any;

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => logout() },
      ]
    );
  };

  const menuItems = [
    { label: 'Edit Profile', icon: 'user', screen: 'Profile' },
    { label: 'Change Password', icon: 'lock', screen: 'ChangePassword' },
    { label: 'Role & Module', icon: 'share-2', screen: 'RoleModule' },
    { label: 'About', icon: 'info', screen: 'About' },
    { label: 'Privacy & Cookies', icon: 'shield', screen: 'Privacy' },
    { label: 'Legal Terms', icon: 'git-branch', screen: 'Legal' },
  ];

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={
            user?.avatar
              ? { uri: user.avatar }
              : { uri: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff&rounded=true' }
          }
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.name || 'Support Admin'}</Text>
        <Text style={styles.email}>{user?.email || 'support.admin@gmail.com'}</Text>
        <TouchableOpacity>
          <Text style={styles.link}>Your Name</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => props.navigation.navigate(item.screen)}
          >
            <Icon name={item.icon} size={18} color={COLORS.primary} style={styles.menuIcon} />
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="log-out" size={18} color={COLORS.error} style={styles.menuIcon} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
  },
  email: {
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: 4,
  },
  link: {
    fontSize: 13,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
  },
  menuContainer: {
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 14,
    color: COLORS.dark,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.error + '15',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 'auto',
  },
  logoutText: {
    fontSize: 14,
    color: COLORS.error,
    fontWeight: '600',
  },
});

export default MainDrawerContent;
