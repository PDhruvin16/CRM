// import React from 'react';
// import {
//   TouchableOpacity,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   ViewStyle,
//   TextStyle,
// } from 'react-native';
// import { COLORS } from '../../constants/colors';
// import { ButtonProps } from '../../types/components';

// const CustomButton: React.FC<ButtonProps> = ({
//   title,
//   onPress,
//   style,
//   textStyle,
//   disabled = false,
//   loading = false,
//   variant = 'primary',
//   size = 'medium',
// }) => {
//   const getButtonStyle = (): ViewStyle[] => {
//     const baseStyle: ViewStyle[] = [styles.button, styles[size] as ViewStyle];
    
//     switch (variant) {
//       case 'secondary':
//         baseStyle.push(styles.secondary as ViewStyle);
//         break;
//       case 'outline':
//         baseStyle.push(styles.outline as ViewStyle);
//         break;
//       default:
//         baseStyle.push(styles.primary as ViewStyle);
//     }
    
//     if (disabled) {
//       baseStyle.push(styles.disabled as ViewStyle);
//     }
    
//     return [baseStyle, style].filter(Boolean) as ViewStyle[];
//   };

//   const getTextStyle = (): TextStyle[] => {
//     const baseTextStyle: TextStyle[] = [styles.text, styles[`${size}Text`] as TextStyle];
    
//     switch (variant) {
//       case 'secondary':
//         baseTextStyle.push(styles.secondaryText as TextStyle);
//         break;
//       case 'outline':
//         baseTextStyle.push(styles.outlineText as TextStyle);
//         break;
//       default:
//         baseTextStyle.push(styles.primaryText as TextStyle);
//     }
    
//     if (disabled) {
//       baseTextStyle.push(styles.disabledText as TextStyle);
//     }
    
//     return [baseTextStyle, textStyle].filter(Boolean) as TextStyle[];
//   };

//   return (
//     <TouchableOpacity
//       style={getButtonStyle() as any}
//       onPress={onPress}
//       disabled={disabled || loading}
//       activeOpacity={0.8}
//     >
//       {loading ? (
//         <ActivityIndicator
//           color={variant === 'outline' ? COLORS.primary : COLORS.white}
//           size="small"
//         />
//       ) : (
//         <Text style={getTextStyle() as any}>{title}</Text>
//       )}
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
  
//   // Size variants
//   small: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     minHeight: 36,
//   },
//   medium: {
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     minHeight: 48,
//   },
//   large: {
//     paddingVertical: 16,
//     paddingHorizontal: 32,
//     minHeight: 56,
//   },
  
//   // Color variants
//   primary: {
//     backgroundColor: COLORS.primary,
//   },
//   secondary: {
//     backgroundColor: COLORS.secondary,
//   },
//   outline: {
//     backgroundColor: 'transparent',
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//   },
  
//   // Disabled state
//   disabled: {
//     backgroundColor: COLORS.gray,
//     opacity: 0.6,
//   },
  
//   // Text styles
//   text: {
//     fontWeight: '600',
//     textAlign: 'center',
//   },
  
//   smallText: {
//     fontSize: 14,
//   },
//   mediumText: {
//     fontSize: 16,
//   },
//   largeText: {
//     fontSize: 18,
//   },
  
//   primaryText: {
//     color: COLORS.white,
//   },
//   secondaryText: {
//     color: COLORS.white,
//   },
//   outlineText: {
//     color: COLORS.primary,
//   },
//   disabledText: {
//     color: COLORS.darkGray,
//   },
// });

// export default CustomButton; 
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../constants/colors';
import { ButtonProps } from '../../types/components';

const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'medium',
}) => {
  const getButtonSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return styles.small;
      case 'large':
        return styles.large;
      default:
        return styles.medium;
    }
  };

  const getTextStyle = (): TextStyle[] => {
    const baseTextStyle: TextStyle[] = [styles.text, styles[`${size}Text`] as TextStyle];

    switch (variant) {
      case 'secondary':
        baseTextStyle.push(styles.secondaryText as TextStyle);
        break;
      case 'outline':
        baseTextStyle.push(styles.outlineText as TextStyle);
        break;
      default:
        baseTextStyle.push(styles.primaryText as TextStyle);
    }

    if (disabled) {
      baseTextStyle.push(styles.disabledText as TextStyle);
    }

    return [baseTextStyle, textStyle].filter(Boolean) as TextStyle[];
  };

  const renderContent = () =>
    loading ? (
      <ActivityIndicator
        color={variant === 'outline' ? COLORS.primary : COLORS.white}
        size="small"
      />
    ) : (
      <Text style={getTextStyle() as any}>{title}</Text>
    );

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={[style]}
      >
        <LinearGradient
          colors={['#404698', '#882785']} // Purple to pink gradient like design
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.button, getButtonSizeStyle(), disabled && styles.disabled]}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonSizeStyle(),
        variant === 'secondary' && styles.secondary,
        variant === 'outline' && styles.outline,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minHeight: 48,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minHeight: 56,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.white,
  },
  outlineText: {
    color: COLORS.primary,
  },
  disabledText: {
    color: COLORS.darkGray,
  },
});

export default CustomButton;
