// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Alert,
// } from 'react-native';
// import {
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
// } from '@react-navigation/drawer';
// import { useAuth } from '../../context/AuthContext';
// import { COLORS } from '../../constants/colors';

// interface MainDrawerContentProps {
//   navigation: any;
//   state: any;
//   descriptors: any;
// }

// const MainDrawerContent: React.FC<MainDrawerContentProps> = (props) => {
//   const { user, logout } = useAuth() as any; // temporary typing

//   const handleLogout = () => {
//     Alert.alert(
//       'Logout',
//       'Are you sure you want to logout?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Logout',
//           style: 'destructive',
//           onPress: () => logout(),
//         },
//       ]
//     );
//   };

//   return (
//       <DrawerContentScrollView {...props}>
//         {/* User Profile Section */}
//         <View style={styles.drawerContent}>
//         <View style={styles.userSection}>
//           <View style={styles.avatarContainer}>
//             {user?.avatar ? (
//               <Image source={{ uri: user.avatar }} style={styles.avatar} />
//             ) : (
//               <View style={styles.avatarPlaceholder}>
//                 <Text style={styles.avatarText}>
//                   {user?.name?.charAt(0)?.toUpperCase() || 'U'}
//                 </Text>
//               </View>
//             )}
//           </View>
//           <View style={styles.userInfo}>
//             <Text style={styles.userName}>{user?.name || 'User'}</Text>
//             <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
//           </View>
//         </View>

//         {/* Divider */}
//         <View style={styles.divider} />

//         {/* Navigation Items */}
//         <View style={styles.navigationSection}>
//           <DrawerItemList {...props} />
//             <DrawerItem
//               label="Logout"
//               onPress={handleLogout}
//               labelStyle={{ color: COLORS.error, fontWeight: '600' }}
//             />
//         </View>
//            </View>
//       </DrawerContentScrollView>
//   )
//       {/* Footer Section */}
//       {/* <View style={styles.footer}> */}
//         {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <Text style={styles.logoutIcon}></Text>
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>

//         <View style={styles.versionInfo}>
//           <Text style={styles.versionText}>Version 1.0.0</Text> */}
//         {/* </View> */}
//       {/* </View> */}
 
  
// };

// const styles = StyleSheet.create({
//   drawerContent: {
//     flex: 1,
//     // backgroundColor: COLORS.white,
//   },
//   scrollView: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     // flexGrow: 1,
//   },
//   userSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: COLORS.primary,
//     marginBottom: 0,
//   },
//   avatarContainer: {
//     marginRight: 15,
//   },
//   avatar: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     borderWidth: 2,
//     borderColor: COLORS.white,
//   },
//   avatarPlaceholder: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: COLORS.white,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: COLORS.white,
//   },
//   avatarText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: COLORS.primary,
//   },
//   userInfo: {
//     flex: 1,
//   },
//   userName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: COLORS.white,
//     marginBottom: 4,
//   },
//   userEmail: {
//     fontSize: 14,
//     color: COLORS.white,
//     opacity: 0.8,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: COLORS.border,
//     marginVertical: 10,
//   },
//   navigationSection: {
//     flex: 1,
//     paddingTop: 10,
//   },
//   footer: {
//     borderTopWidth: 1,
//     borderTopColor: COLORS.border,
//     padding: 20,
//   },
//   logoutButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     backgroundColor: COLORS.error + '10',
//     borderRadius: 8,
//     marginBottom: 15,
//   },
//   logoutIcon: {
//     fontSize: 20,
//     marginRight: 12,
//   },
//   logoutText: {
//     fontSize: 16,
//     color: COLORS.error,
//     fontWeight: '500',
//   },
//   versionInfo: {
//     alignItems: 'center',
//   },
//   versionText: {
//     fontSize: 12,
//     color: COLORS.gray,
//   },
// });

// export default MainDrawerContent;
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
    { label: 'Edit Profile', icon: 'user', screen: 'EditProfile' },
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
