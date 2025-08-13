import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { COLORS } from '../../constants/colors';

interface CustomHeaderProps {
  title: string;
  onDrawerOpen?: () => void;
  showDrawerIcon?: boolean;
  backgroundColor?: string;
  titleColor?: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  onDrawerOpen,
  showDrawerIcon = true,
  backgroundColor = COLORS.primary,
  titleColor = '#fff',
}) => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={backgroundColor}
      />
      <View style={[styles.header, { backgroundColor }]}>
        {showDrawerIcon && (
          <TouchableOpacity
            onPress={onDrawerOpen}
            style={styles.drawerButton}
          >
            <Text style={[styles.drawerIcon, { color: titleColor }]}>☰</Text>
          </TouchableOpacity>
        )}
        <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
        <View style={styles.rightSpace} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  drawerButton: {
    padding: 8,
    borderRadius: 5,
    marginRight: 12,
  },
  drawerIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  rightSpace: {
    width: 40, // Balance the drawer button space
  },
});

export default CustomHeader;
