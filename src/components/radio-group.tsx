// RadioGroup component for React Native
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Radio } from './radio';

export interface RadioGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioGroupOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  style?: ViewStyle;
  orientation?: 'horizontal' | 'vertical';
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onValueChange,
  disabled = false,
  style,
  orientation = 'vertical',
}) => {
  const handleOptionChange = (optionValue: string) => {
    if (!disabled && onValueChange) {
      onValueChange(optionValue);
    }
  };

  return (
    <View
      style={[
        styles.container,
        orientation === 'horizontal' && styles.horizontal,
        style,
      ]}
    >
      {options.map((option) => (
        <Radio
          key={option.value}
          checked={value === option.value}
          onCheckedChange={() => handleOptionChange(option.value)}
          disabled={disabled || option.disabled}
          label={option.label}
          style={styles.radioItem}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  radioItem: {
    marginBottom: 4,
  },
}); 