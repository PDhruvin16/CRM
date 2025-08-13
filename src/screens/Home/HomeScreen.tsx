import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';
import CustomButton from '../../components/common/CustomButton';
import CustomHeader from '../../components/common/CustomHeader';
import { DrawerActions, useNavigation } from '@react-navigation/native';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const drawerNavigation = useNavigation();

  const handleLogout = () => {
    logout();
  };

  const navigateToCustomerConsole = () => {
    navigation.navigate('CustomerConsole');
  };

  const navigateToLeads = () => {
    navigation.navigate('Leads');
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const openDrawer = () => {
    // Try to get the closest drawer parent (works when HomeScreen is inside a Drawer)
    const parent = navigation.getParent?.() ?? drawerNavigation.getParent?.();

    // If there is a parent navigator and it supports drawer actions, toggle it
    if (parent) {
      parent.dispatch(DrawerActions.toggleDrawer());
      return;
    }

    // Fallback: if the passed navigation has openDrawer (rare when nested in stacks), call it
    // @ts-ignore - openDrawer may not exist on typed navigation
    if (typeof navigation.openDrawer === 'function') {
      // @ts-ignore
      navigation.openDrawer();
    }
  };


  return (
    <View style={styles.container}>
      <CustomHeader
        title="Home"
        onDrawerOpen={() => openDrawer()}
        showDrawerIcon={true}
      />
      <ScrollView style={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.title}>Welcome to CRM</Text>
          <Text style={styles.subtitle}>
            {STRINGS.WELCOME_BACK} {user?.name || 'User'}!
          </Text>
        </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>150</Text>
          <Text style={styles.statLabel}>{STRINGS.TOTAL_CUSTOMERS}</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>25</Text>
          <Text style={styles.statLabel}>{STRINGS.TOTAL_LEADS}</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Quick Navigation</Text>
        
        <CustomButton
          title="Customer Console"
          onPress={navigateToCustomerConsole}
          style={styles.actionButton}
        />
        
        <CustomButton
          title="Leads Management"
          onPress={navigateToLeads}
          variant="secondary"
          style={styles.actionButton}
        />
        
        <CustomButton
          title="My Profile"
          onPress={navigateToProfile}
          variant="outline"
          style={styles.actionButton}
        />
      </View>

        <View style={styles.logoutContainer}>
          <CustomButton
            title={STRINGS.LOGOUT}
            onPress={handleLogout}
            variant="outline"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
  },
  actionsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 16,
  },
  actionButton: {
    marginBottom: 12,
  },
  logoutContainer: {
    padding: 20,
    marginTop: 20,
  },
});

export default HomeScreen;
