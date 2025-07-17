// TextArea component for React Native
import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';

export interface TextAreaProps extends Omit<TextInputProps, 'style'> {
  variant?: 'default' | 'error';
  style?: ViewStyle;
}

export const TextArea: React.FC<TextAreaProps> = ({
  variant = 'default',
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={[
          styles.textarea,
          variant === 'error' && styles.textareaError,
        ]}
        placeholderTextColor="#9ca3af"
        multiline
        textAlignVertical="top"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textarea: {
    minHeight: 96, // 12 × 8px
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8, // 1 × 8px
    paddingHorizontal: 16, // 2 × 8px
    paddingVertical: 12, // 1.5 × 8px
    fontSize: 16, // 2 × 8px
    color: '#1f2937',
    backgroundColor: 'white',
    lineHeight: 24, // 3 × 8px
  },
  textareaError: {
    borderColor: '#ef4444',
  },
}); 