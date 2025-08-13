import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { useNetworkState } from '../../hooks/useRedux';
import { COLORS } from '../../constants/colors';

const NetworkStatus: React.FC = () => {
  const { isConnected, connectionType, isInternetReachable } = useNetworkState();

  if (isConnected && isInternetReachable) {
    return null; // Don't show anything when connected
  }

  return (
    <Animated.View style={[styles.container, { backgroundColor: COLORS.error }]}>
      <Text style={styles.text}>
        {!isConnected 
          ? 'No internet connection' 
          : !isInternetReachable 
            ? 'Internet not reachable' 
            : 'Connection issue'
        }
      </Text>
      {connectionType && (
        <Text style={styles.subText}>
          Connection: {connectionType}
        </Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    zIndex: 1000,
  },
  text: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  subText: {
    color: COLORS.white,
    fontSize: 12,
    opacity: 0.8,
    marginTop: 2,
  },
});

export default NetworkStatus; 