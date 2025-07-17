// IconButton component for React Native with color variants and custom disabled states
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';

export interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  variant?: 'default' | 'secondary' | 'tertiary' | 'destructive' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  disabled?: boolean;
  disabledVariant?: 'default' | 'secondary' | 'tertiary' | 'destructive' | 'outline' | 'ghost';
  onPress?: () => void;
  style?: ViewStyle;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'default',
  size = 'default',
  disabled = false,
  disabledVariant,
  onPress,
  style,
}) => {
  // Use disabledVariant if provided, otherwise use the same variant for disabled state
  const effectiveVariant = disabled && disabledVariant ? disabledVariant : variant;
  
  const getButtonStyle = (): ViewStyle[] => {
    const baseStyle: ViewStyle[] = [
      styles.button,
      variantStyles[effectiveVariant].button,
      sizeStyles[size].button,
    ];
    
    if (disabled) {
      baseStyle.push(styles.disabled);
    }
    
    if (style) {
      baseStyle.push(style);
    }
    
    return baseStyle;
  };

  const getIconColor = (): string => {
    if (disabled) {
      return variantStyles[effectiveVariant].iconDisabled || variantStyles[effectiveVariant].icon;
    }
    return variantStyles[effectiveVariant].icon;
  };

  const getIconSize = (): number => {
    return sizeStyles[size].iconSize;
  };

  return (
    <Pressable
      style={({ pressed }) => [
        ...getButtonStyle(),
        pressed && !disabled && variantStyles[effectiveVariant].pressed,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Ionicons 
        name={icon} 
        size={getIconSize()} 
        color={getIconColor()} 
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  disabled: {
    opacity: 0.6,
  },
});

const variantStyles = {
  // Default - Orange-500
  default: {
    button: {
      backgroundColor: '#f97316', // orange-500
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    } as ViewStyle,
    icon: 'white',
    iconDisabled: '#fed7aa', // orange-200 for disabled state
    pressed: {
      backgroundColor: '#ea580c', // orange-600 on press
    } as ViewStyle,
  },
  
  // Secondary - Teal-600
  secondary: {
    button: {
      backgroundColor: '#0d9488', // teal-600
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    } as ViewStyle,
    icon: 'white',
    iconDisabled: '#99f6e4', // teal-200 for disabled state
    pressed: {
      backgroundColor: '#0f766e', // teal-700 on press
    } as ViewStyle,
  },
  
  // Tertiary - Gray-100
  tertiary: {
    button: {
      backgroundColor: '#f3f4f6', // gray-100
    } as ViewStyle,
    icon: '#374151', // gray-700
    iconDisabled: '#9ca3af', // gray-400 for disabled state
    pressed: {
      backgroundColor: '#e5e7eb', // gray-200 on press
    } as ViewStyle,
  },
  
  // Destructive - Red
  destructive: {
    button: {
      backgroundColor: '#ef4444', // red-500
    } as ViewStyle,
    icon: 'white',
    iconDisabled: '#fecaca', // red-200 for disabled state
    pressed: {
      backgroundColor: '#dc2626', // red-600 on press
    } as ViewStyle,
  },
  
  // Outline
  outline: {
    button: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#e5e7eb', // gray-200
    } as ViewStyle,
    icon: '#374151', // gray-700
    iconDisabled: '#d1d5db', // gray-300 for disabled state
    pressed: {
      backgroundColor: '#f9fafb', // gray-50 on press
    } as ViewStyle,
  },
  
  // Ghost
  ghost: {
    button: {
      backgroundColor: 'transparent',
    } as ViewStyle,
    icon: '#374151', // gray-700
    iconDisabled: '#d1d5db', // gray-300 for disabled state
    pressed: {
      backgroundColor: '#f9fafb', // gray-50 on press
    } as ViewStyle,
  },
};

const sizeStyles = {
  sm: {
    button: {
      width: 32,
      height: 32,
    } as ViewStyle,
    iconSize: 16,
  },
  default: {
    button: {
      width: 40,
      height: 40,
    } as ViewStyle,
    iconSize: 20,
  },
  lg: {
    button: {
      width: 48,
      height: 48,
    } as ViewStyle,
    iconSize: 24,
  },
};

export { IconButton };
