// Button component for React Native
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'link';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  disabled = false,
  loading = false,
  onPress,
  style,
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];
    
    if (disabled) {
      return [...baseStyle, styles.disabled];
    }
    
    if (variant === 'default') {
      return baseStyle; // default styles are already in size styles
    }
    
    return [...baseStyle, styles[variant]];
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${size}Text`]];
    
    if (disabled) {
      return [...baseStyle, styles.disabledText];
    }
    
    if (variant === 'default') {
      return baseStyle; // defaultText is already included in size styles
    }
    
    return [...baseStyle, styles[`${variant}Text`]];
  };

  return (
    <Pressable
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'ghost' ? '#3b82f6' : 'white'} 
        />
      ) : (
        <Text style={getTextStyle()}>{children}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8, // 1 × 8px
    borderWidth: 1,
    borderColor: 'transparent',
  },
  
  // Size variants
  sm: {
    paddingHorizontal: 16, // 2 × 8px
    paddingVertical: 8, // 1 × 8px
    minHeight: 32, // 4 × 8px
  },
  default: {
    paddingHorizontal: 24, // 3 × 8px
    paddingVertical: 12, // 1.5 × 8px
    minHeight: 40, // 5 × 8px
    backgroundColor: '#f97316', // Orange primary
  },
  lg: {
    paddingHorizontal: 32, // 4 × 8px
    paddingVertical: 16, // 2 × 8px
    minHeight: 48, // 6 × 8px
  },
  icon: {
    width: 40, // 5 × 8px
    height: 40, // 5 × 8px
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  
  // Variant styles
  secondary: {
    backgroundColor: '#14b8a6', // Teal secondary
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: '#3b82f6',
  },
  destructive: {
    backgroundColor: '#ef4444',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  link: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  
  // Text styles
  text: {
    fontSize: 16, // 2 × 8px
    fontWeight: '500',
    textAlign: 'center',
  },
  smText: {
    fontSize: 14, // 1.75 × 8px
  },
  defaultText: {
    fontSize: 16, // 2 × 8px
    color: 'white',
  },
  lgText: {
    fontSize: 18, // 2.25 × 8px
  },
  iconText: {
    fontSize: 16, // 2 × 8px
  },
  
  // Variant text colors
  secondaryText: {
    color: 'white',
  },
  outlineText: {
    color: '#3b82f6',
  },
  destructiveText: {
    color: 'white',
  },
  ghostText: {
    color: '#3b82f6',
  },
  linkText: {
    color: '#3b82f6',
    textDecorationLine: 'underline',
  },
  
  // Disabled state
  disabled: {
    backgroundColor: '#f3f4f6',
    borderColor: '#e5e7eb',
  },
  disabledText: {
    color: '#9ca3af',
  },
});
