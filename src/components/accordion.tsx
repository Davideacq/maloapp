// Accordion component for React Native
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

export interface AccordionItem {
  id: string;
  title: string;
  content: string | React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  style?: ViewStyle;
  allowMultiple?: boolean;
  defaultOpen?: string[];
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  style,
  allowMultiple = false,
  defaultOpen = [],
}) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (itemId: string) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(itemId)
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setOpenItems(prev =>
        prev.includes(itemId) ? [] : [itemId]
      );
    }
  };

  return (
    <View style={[styles.container, style]}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        
        return (
          <View key={item.id} style={styles.item}>
            <Pressable
              style={[
                styles.header,
                item.disabled && styles.disabledHeader,
              ]}
              onPress={() => !item.disabled && toggleItem(item.id)}
              disabled={item.disabled}
            >
              <Text
                style={[
                  styles.title,
                  item.disabled && styles.disabledTitle,
                ]}
              >
                {item.title}
              </Text>
              <Ionicons
                name={isOpen ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={item.disabled ? '#9ca3af' : '#6b7280'}
              />
            </Pressable>
            {isOpen && (
              <View style={styles.content}>
                {typeof item.content === 'string' ? (
                  <Text style={styles.contentText}>{item.content}</Text>
                ) : (
                  item.content
                )}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
  },
  disabledHeader: {
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    flex: 1,
  },
  disabledTitle: {
    color: '#9ca3af',
  },
  content: {
    padding: 16,
    backgroundColor: '#f9fafb',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  contentText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
}); 