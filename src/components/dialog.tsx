// Dialog component for React Native
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  showCloseButton?: boolean;
}

export const Dialog: React.FC<DialogProps> = ({
  open = false,
  onOpenChange,
  title,
  description,
  children,
  style,
  showCloseButton = true,
}) => {
  const handleClose = () => {
    onOpenChange?.(false);
  };

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={handleClose} />
        <View style={[styles.content, style]}>
          {showCloseButton && (
            <Pressable style={styles.closeButton} onPress={handleClose}>
              <Ionicons name="close" size={24} color="#6b7280" />
            </Pressable>
          )}
          
          {title && (
            <Text style={[styles.title, showCloseButton && styles.titleWithClose]}>
              {title}
            </Text>
          )}
          
          {description && (
            <Text style={styles.description}>{description}</Text>
          )}
          
          {children && (
            <View style={styles.children}>
              {children}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  titleWithClose: {
    paddingRight: 40,
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 16,
  },
  children: {
    marginTop: 8,
  },
}); 