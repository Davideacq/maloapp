// Checkbox component for React Native
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

export interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  size?: 'sm' | 'md' | 'lg';
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onCheckedChange,
  disabled = false,
  label,
  style,
  labelStyle,
  size = 'md',
}) => {
  const handlePress = () => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { width: 16, height: 16, iconSize: 12 };
      case 'lg':
        return { width: 24, height: 24, iconSize: 18 };
      default:
        return { width: 20, height: 20, iconSize: 14 };
    }
  };

  const sizeConfig = getSizeStyles();

  return (
    <Pressable
      style={[
        styles.container,
        style,
      ]}
      onPress={handlePress}
      disabled={disabled}
    >
      <View
        style={[
          styles.checkbox,
          {
            width: sizeConfig.width,
            height: sizeConfig.height,
          },
          checked && styles.checked,
          disabled && styles.disabled,
        ]}
      >
        {checked && (
          <Ionicons
            name="checkmark"
            size={sizeConfig.iconSize}
            color="white"
          />
        )}
      </View>
      {label && (
        <Text
          style={[
            styles.label,
            labelStyle,
            disabled && styles.disabledLabel,
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  checked: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: '#f3f4f6',
  },
  label: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  disabledLabel: {
    color: '#9ca3af',
  },
}); 