// Switch component for React Native
import React from 'react';
import { Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  size?: 'sm' | 'md' | 'lg';
}

export const Switch: React.FC<SwitchProps> = ({
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
        return { width: 32, height: 18, thumbSize: 14 };
      case 'lg':
        return { width: 48, height: 26, thumbSize: 22 };
      default:
        return { width: 40, height: 22, thumbSize: 18 };
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
          styles.track,
          {
            width: sizeConfig.width,
            height: sizeConfig.height,
          },
          checked && styles.trackChecked,
          disabled && styles.disabled,
        ]}
        onPress={handlePress}
        disabled={disabled}
      >
        <View
          style={[
            styles.thumb,
            {
              width: sizeConfig.thumbSize,
              height: sizeConfig.thumbSize,
            },
            checked && styles.thumbChecked,
          ]}
        />
      </Pressable>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  track: {
    backgroundColor: '#d1d5db',
    borderRadius: 50,
    justifyContent: 'center',
    padding: 2,
  },
  trackChecked: {
    backgroundColor: '#3b82f6',
  },
  disabled: {
    opacity: 0.5,
  },
  thumb: {
    backgroundColor: 'white',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  thumbChecked: {
    transform: [{ translateX: 18 }], // Adjust based on track width
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