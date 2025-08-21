
import React, { FC } from 'react';
import { useAuth } from '../../hooks/useAuth';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import CustomHeader from '../../components/common/CustomHeader';
import { COLORS } from '../../constants/colors';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import images from '../../constants/images';
import { renderLogo } from '../../utils/renderlogo';
import SvgUri from 'react-native-svg-uri';
const hubs = [
  { id: 1, title: 'Marketing Hub', modified: '1 weeks ago' },
  { id: 2, title: 'Sales Hub', modified: '3 Days ago' },
  { id: 3, title: 'Customer Service Hub', modified: '1 weeks ago' },
];

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const drawerNavigation = useNavigation();
  const { user, logout } = useAuth();

  const openDrawer = () => {
    const parent = navigation.getParent?.() ?? drawerNavigation.getParent?.();
    if (parent) {
      parent.dispatch(DrawerActions.toggleDrawer());
      return;
    }
    if (typeof navigation.openDrawer === 'function') {
      navigation.openDrawer();
    }
  };
  const handleHubPress = (title: string) => {
    if (title === 'Customer Service Hub') {
      navigation.navigate('CustomerConsole');
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        variant={{
          type: 'home',
          title: 'Home',
          showProfile: true,
          profileImage: 'https://i.pravatar.cc/300',
        }}
        onSearch={() => console.log('Search pressed')}
        onAdd={() => console.log('Add pressed')}
        onSettings={() => console.log('Settings pressed')}
        onDrawerOpen={openDrawer}
      />

      <ScrollView style={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>
            Welcome to the future of work!
          </Text>
          <Text style={styles.welcomeSubtitle}>Powered by Ai sante</Text>
        </View>

        {/* Hub List */}
        {hubs.map((hub) => (
          <TouchableOpacity
            key={hub.id}
            style={styles.hubCard}
            onPress={() => handleHubPress(hub.title)}
          >
            <View style={styles.hubLeft}>
              <View style={styles.hubIcon} />
              <View>
                <Text style={styles.hubTitle}>{hub.title}</Text>
                <Text style={styles.hubSub}>System</Text>
              </View>
            </View>
            <Text style={styles.hubModified}>Modified: {hub.modified}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
     
      {/* Floating Button */}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => console.log('AI Action')}
      >
        <Image
          source={images.loggo}
          style={{ width: 50, height: 50, resizeMode: 'contain' }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FB' },
  content: { flex: 1 },
  welcomeSection: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#F5F7FB',
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5B2C83',
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#6B6B6B',
    marginTop: 4,
    textAlign: 'center',
  },
  hubCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
  },
  hubLeft: { flexDirection: 'row', alignItems: 'center' },
  hubIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    marginRight: 12,
  },
  hubTitle: { fontSize: 16, fontWeight: '600', color: COLORS.dark },
  hubSub: { fontSize: 12, color: COLORS.gray },
  hubModified: { fontSize: 12, color: COLORS.gray },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    // backgroundColor: COLORS.white,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // elevation: 4,
  },
 
});

export default HomeScreen;
