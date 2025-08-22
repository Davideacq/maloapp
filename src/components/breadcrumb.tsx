// Breadcrumb universale e riutilizzabile per App, Web App e Web App Mobile
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

export interface BreadcrumbItem {
  label: string;
  onPress?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: 'default' | 'compact';
}

// Componente Breadcrumb riutilizzabile e responsivo
export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, variant = 'default' }) => {
  const isWebMobile = Platform.OS === 'web' && typeof window !== 'undefined' && window.innerWidth <= 600;
  return (
    <View
      style={[
        styles.container,
        variant === 'compact' && styles.compactContainer,
        isWebMobile && { paddingVertical: 8, minHeight: 32 },
      ]}
    >
      {items.map((item, idx) => (
        <React.Fragment key={item.label + idx}>
          {item.onPress ? (
            <Pressable onPress={item.onPress} style={styles.link}>
              <Text style={styles.linkText}>{item.label}</Text>
            </Pressable>
          ) : (
            <Text style={[styles.linkText, styles.current]}>{item.label}</Text>
          )}
          {idx < items.length - 1 && (
            <Text style={styles.separator}>{'>'}</Text>
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 48,
  },
  compactContainer: {
    marginBottom: 0,
    paddingVertical: 8,
    minHeight: 32,
  },
  link: {
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  linkText: {
    fontSize: 14,
    color: '#3b82f6',
  },
  separator: {
    fontSize: 14,
    color: '#6b7280',
    marginHorizontal: 4,
  },
  current: {
    color: '#111827',
    fontWeight: 'bold',
  },
}); 