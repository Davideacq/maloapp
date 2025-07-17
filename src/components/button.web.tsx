// Web-specific Button component
// Uses HTML button element for better web accessibility and performance
import React from 'react';
import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

export interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'tertiary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'default',
  disabled = false,
  onPress,
  children,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle[] => {
    const baseStyle: ViewStyle[] = [
      styles.button,
      variantStyles[variant].button,
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

  const getTextStyle = (): TextStyle[] => {
    const baseTextStyle: TextStyle[] = [
      styles.text,
      variantStyles[variant].text,
      sizeStyles[size].text,
    ];
    if (disabled) {
      baseTextStyle.push(styles.disabledText);
    }
    if (textStyle) {
      baseTextStyle.push(textStyle);
    }
    return baseTextStyle;
  };

  return (
    <Pressable
      style={({ pressed, hovered }) => [
        ...getButtonStyle(),
        hovered && !disabled && variantStyles[variant].hovered,
        pressed && !disabled && variantStyles[variant].pressed,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={getTextStyle()}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    gap: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.5,
  },
});

const variantStyles = {
  // Default button - Orange primary
  default: {
    button: {
      backgroundColor: '#f97316', // orange-500
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    } as ViewStyle,
    text: {
      color: 'white',
    } as TextStyle,
    hovered: {
      backgroundColor: '#ea580c', // orange-600 on hover
      shadowOpacity: 0.15,
    } as ViewStyle,
    pressed: {
      backgroundColor: '#ea580c', // orange-600 on press
      opacity: 0.95,
    } as ViewStyle,
  },
  
  // Destructive button - Red
  destructive: {
    button: {
      backgroundColor: '#ef4444', // red-500
    } as ViewStyle,
    text: {
      color: 'white',
    } as TextStyle,
    hovered: {
      backgroundColor: '#dc2626', // red-600 on hover
    } as ViewStyle,
    pressed: {
      backgroundColor: '#dc2626', // red-600 on press
      opacity: 0.95,
    } as ViewStyle,
  },
  
  // Outline button
  outline: {
    button: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#e5e7eb', // gray-200
    } as ViewStyle,
    text: {
      color: '#374151', // gray-700
    } as TextStyle,
    hovered: {
      backgroundColor: '#f9fafb', // gray-50 on hover
      borderColor: '#d1d5db', // gray-300
    } as ViewStyle,
    pressed: {
      backgroundColor: '#f3f4f6', // gray-100 on press
      opacity: 0.95,
    } as ViewStyle,
  },
  
  // Secondary button - Teal
  secondary: {
    button: {
      backgroundColor: '#0d9488', // teal-600
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    } as ViewStyle,
    text: {
      color: 'white',
    } as TextStyle,
    hovered: {
      backgroundColor: '#0f766e', // teal-700 on hover
      shadowOpacity: 0.15,
    } as ViewStyle,
    pressed: {
      backgroundColor: '#0f766e', // teal-700 on press
      opacity: 0.95,
    } as ViewStyle,
  },
  
  // Tertiary button - Gray (previous secondary colors)
  tertiary: {
    button: {
      backgroundColor: '#f3f4f6', // gray-100
    } as ViewStyle,
    text: {
      color: '#374151', // gray-700
    } as TextStyle,
    hovered: {
      backgroundColor: '#e5e7eb', // gray-200 on hover
    } as ViewStyle,
    pressed: {
      backgroundColor: '#d1d5db', // gray-300 on press
      opacity: 0.95,
    } as ViewStyle,
  },
  
  // Ghost button
  ghost: {
    button: {
      backgroundColor: 'transparent',
    } as ViewStyle,
    text: {
      color: '#374151', // gray-700
    } as TextStyle,
    hovered: {
      backgroundColor: '#f9fafb', // gray-50 on hover
    } as ViewStyle,
    pressed: {
      backgroundColor: '#f3f4f6', // gray-100 on press
      opacity: 0.95,
    } as ViewStyle,
  },
  
  // Link button
  link: {
    button: {
      backgroundColor: 'transparent',
    } as ViewStyle,
    text: {
      color: '#f97316', // orange-500 to match primary
      textDecorationLine: 'underline',
    } as TextStyle,
    hovered: {
      opacity: 0.8,
    } as ViewStyle,
    pressed: {
      opacity: 0.7,
    } as ViewStyle,
  },
};

const sizeStyles = {
  default: {
    button: {
      height: 40,
      paddingHorizontal: 16,
      paddingVertical: 8,
    } as ViewStyle,
    text: {
      fontSize: 14,
    } as TextStyle,
  },
  sm: {
    button: {
      height: 36,
      paddingHorizontal: 12,
      borderRadius: 6,
    } as ViewStyle,
    text: {
      fontSize: 13,
    } as TextStyle,
  },
  lg: {
    button: {
      height: 44,
      paddingHorizontal: 32,
      borderRadius: 6,
    } as ViewStyle,
    text: {
      fontSize: 16,
    } as TextStyle,
  },
  icon: {
    button: {
      height: 40,
      width: 40,
      paddingHorizontal: 0,
    } as ViewStyle,
    text: {
      fontSize: 14,
    } as TextStyle,
  },
};

export { Button };
