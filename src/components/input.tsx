// Input component for React Native
import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  variant?: 'default' | 'error';
  style?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  variant = 'default',
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={[
          styles.input,
          variant === 'error' && styles.inputError,
        ]}
        placeholderTextColor="#9ca3af"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    height: 48, // 6 × 8px
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8, // 1 × 8px
    paddingHorizontal: 16, // 2 × 8px
    paddingVertical: 12, // 1.5 × 8px
    fontSize: 16, // 2 × 8px
    color: '#1f2937',
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: '#ef4444',
  },
});
