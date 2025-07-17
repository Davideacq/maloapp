import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { IconButton } from './icon-button';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'session' | 'reminder' | 'system' | 'guide';
}

interface NotificationMenuProps {
  visible: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationMenu: React.FC<NotificationMenuProps> = ({
  visible,
  onClose,
  notifications,
  onMarkAsRead,
  onDelete,
}) => {
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'session':
        return 'calendar';
      case 'reminder':
        return 'time';
      case 'system':
        return 'settings';
      case 'guide':
        return 'book';
      default:
        return 'notifications';
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'session':
        return '#3b82f6'; // blue-500
      case 'reminder':
        return '#f97316'; // orange-500
      case 'system':
        return '#6b7280'; // gray-500
      case 'guide':
        return '#14b8a6'; // teal-500
      default:
        return '#6b7280';
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Notifiche</Text>
            <IconButton
              icon="close"
              onPress={onClose}
              variant="ghost"
              size="sm"
            />
          </View>
          
          <ScrollView style={styles.notificationsList}>
            {notifications.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="notifications-off" size={48} color="#9ca3af" />
                <Text style={styles.emptyText}>Nessuna notifica</Text>
              </View>
            ) : (
              notifications.map((notification) => (
                <View
                  key={notification.id}
                  style={[
                    styles.notificationItem,
                    !notification.isRead && styles.unreadNotification
                  ]}
                >
                  <View style={styles.notificationContent}>
                    <View style={[
                      styles.notificationIcon,
                      { backgroundColor: getNotificationColor(notification.type) }
                    ]}>
                      <Ionicons
                        name={getNotificationIcon(notification.type) as any}
                        size={20}
                        color="white"
                      />
                    </View>
                    <View style={styles.notificationText}>
                      <Text style={styles.notificationTitle}>{notification.title}</Text>
                      <Text style={styles.notificationMessage}>{notification.message}</Text>
                      <Text style={styles.notificationTime}>{notification.timestamp}</Text>
                    </View>
                  </View>
                  <View style={styles.notificationActions}>
                    <IconButton
                      icon="eye"
                      onPress={() => onMarkAsRead(notification.id)}
                      variant="ghost"
                      size="sm"
                      style={styles.actionButton}
                    />
                    <IconButton
                      icon="close"
                      onPress={() => onDelete(notification.id)}
                      variant="destructive"
                      size="sm"
                      style={styles.actionButton}
                    />
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  container: {
    width: 350,
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 16,
    marginTop: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  notificationsList: {
    maxHeight: 400,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
    marginTop: 8,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    alignItems: 'center',
  },
  unreadNotification: {
    backgroundColor: '#fef3c7', // yellow-50
  },
  notificationContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 4,
    lineHeight: 18,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  notificationActions: {
    flexDirection: 'row',
    gap: 4,
  },
  actionButton: {
    marginLeft: 4,
  },
});

export { NotificationMenu };
