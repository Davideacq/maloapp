import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export interface BreadcrumbItem {
  label: string;
  onPress?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <View style={styles.container}>
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
    marginBottom: 24,
    gap: 8,
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