// Badge component for React Native
import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Badge({ children, variant = 'default', style, textStyle }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[variant], style]}>
      <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  // Variants
  default: {
    backgroundColor: '#3b82f6',
  },
  defaultText: {
    color: 'white',
  },
  secondary: {
    backgroundColor: '#f3f4f6',
  },
  secondaryText: {
    color: '#374151',
  },
  destructive: {
    backgroundColor: '#ef4444',
  },
  destructiveText: {
    color: 'white',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  outlineText: {
    color: '#374151',
  },
  success: {
    backgroundColor: '#10b981',
  },
  successText: {
    color: 'white',
  },
  warning: {
    backgroundColor: '#f59e0b',
  },
  warningText: {
    color: 'white',
  },
}); 