// Toggle component for React Native
import React from 'react';
import { Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

export interface ToggleProps {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
  label?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline';
}

export const Toggle: React.FC<ToggleProps> = ({
  pressed = false,
  onPressedChange,
  disabled = false,
  label,
  style,
  labelStyle,
  size = 'md',
  variant = 'default',
}) => {
  const handlePress = () => {
    if (!disabled && onPressedChange) {
      onPressedChange(!pressed);
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { paddingHorizontal: 12, paddingVertical: 6, fontSize: 12 };
      case 'lg':
        return { paddingHorizontal: 20, paddingVertical: 12, fontSize: 16 };
      default:
        return { paddingHorizontal: 16, paddingVertical: 8, fontSize: 14 };
    }
  };

  const sizeConfig = getSizeStyles();

  return (
    <View
      style={[
        styles.container,
        style,
      ]}
    >
      <Pressable
        style={[
          styles.toggle,
          {
            paddingHorizontal: sizeConfig.paddingHorizontal,
            paddingVertical: sizeConfig.paddingVertical,
          },
          variant === 'outline' && styles.toggleOutline,
          pressed && styles.togglePressed,
          pressed && variant === 'outline' && styles.toggleOutlinePressed,
          disabled && styles.disabled,
        ]}
        onPress={handlePress}
        disabled={disabled}
      >
        <Text
          style={[
            styles.toggleText,
            {
              fontSize: sizeConfig.fontSize,
            },
            pressed && styles.toggleTextPressed,
            pressed && variant === 'outline' && styles.toggleTextOutlinePressed,
            disabled && styles.disabledText,
          ]}
        >
          {label}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  toggle: {
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  togglePressed: {
    backgroundColor: '#3b82f6',
  },
  toggleOutlinePressed: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  disabled: {
    opacity: 0.5,
  },
  toggleText: {
    color: '#374151',
    fontWeight: '500',
  },
  toggleTextPressed: {
    color: 'white',
  },
  toggleTextOutlinePressed: {
    color: 'white',
  },
  disabledText: {
    color: '#9ca3af',
  },
}); 