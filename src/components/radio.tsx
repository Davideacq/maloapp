// Radio component for React Native
import React from 'react';
import { Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

export interface RadioProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  size?: 'sm' | 'md' | 'lg';
}

export const Radio: React.FC<RadioProps> = ({
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
        return { width: 16, height: 16, dotSize: 6 };
      case 'lg':
        return { width: 24, height: 24, dotSize: 10 };
      default:
        return { width: 20, height: 20, dotSize: 8 };
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
          styles.radio,
          {
            width: sizeConfig.width,
            height: sizeConfig.height,
          },
          checked && styles.checked,
          disabled && styles.disabled,
        ]}
      >
        {checked && (
          <View
            style={[
              styles.dot,
              {
                width: sizeConfig.dotSize,
                height: sizeConfig.dotSize,
              },
            ]}
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
  radio: {
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  checked: {
    borderColor: '#3b82f6',
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: '#f3f4f6',
  },
  dot: {
    backgroundColor: '#3b82f6',
    borderRadius: 50,
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