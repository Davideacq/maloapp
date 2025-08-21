// User layout with consistent navigation for all user pages
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slot, router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebAppHeader } from '../../src/components/web-app-header';
import { Notification, NotificationMenu } from '../../src/components/notification-menu';
import { useScreenSize } from '../../src/hooks/use-screen-size';
import { logoutUser } from '../../src/utils/auth';

// Context per avatar globale
export const UserAvatarContext = createContext<{
  avatar: string;
  setAvatar: (src: string) => void;
}>({ avatar: '', setAvatar: () => {} });

export function useUserAvatar() {
  return useContext(UserAvatarContext);
}

export default function UserLayout() {
  const { isSmallScreen, isMediumScreen } = useScreenSize();
  const [user] = useState({
    name: 'Mario Rossi',
    company: 'Azienda SpA',
  });
  const [avatar, setAvatarState] = useState('');

  // Carica avatar da storage all'avvio
  useEffect(() => {
    AsyncStorage.getItem('userAvatar').then((uri) => {
      if (uri) setAvatarState(uri);
    });
  }, []);

  // Salva avatar su storage ogni volta che cambia
  const setAvatar = (src: string) => {
    setAvatarState(src);
    AsyncStorage.setItem('userAvatar', src);
  };

  const [showNotifications, setShowNotifications] = useState(false);
  const [useBottomNavigation, setUseBottomNavigation] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Sessione Confermata',
      message: 'La tua sessione con Dr.ssa Maria Bianchi è stata confermata per domani alle 14:30',
      timestamp: '2 ore fa',
      isRead: false,
      type: 'session'
    },
    {
      id: '2',
      title: 'Promemoria Sessione',
      message: 'Ricorda: hai una sessione programmata tra 1 ora',
      timestamp: '1 ora fa',
      isRead: false,
      type: 'reminder'
    },
    {
      id: '3',
      title: 'Nuova Guida Disponibile',
      message: 'È disponibile una nuova guida: "Gestione dello Stress in Ufficio"',
      timestamp: '3 ore fa',
      isRead: true,
      type: 'guide'
    },
    {
      id: '4',
      title: 'Aggiornamento Sistema',
      message: 'Il sistema è stato aggiornato con nuove funzionalità per il benessere',
      timestamp: '1 giorno fa',
      isRead: true,
      type: 'system'
    },
    {
      id: '5',
      title: 'Sessione Completata',
      message: 'Ottimo lavoro! Hai completato la sessione "Gestione dell\'Ansia"',
      timestamp: '2 giorni fa',
      isRead: true,
      type: 'session'
    }
  ]);

  // Calculate if we should use bottom navigation based on screen width
  useEffect(() => {
    // Use bottom navigation only on native apps. On web, always show header.
    setUseBottomNavigation(Platform.OS !== 'web');
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path as any);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Sei sicuro di voler effettuare il logout?',
      [
        {
          text: 'Annulla',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logoutUser();
            router.replace('/login');
          },
        },
      ]
    );
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // const getUserInitial = () => {
  //   return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
  // };

  

  return (
    <UserAvatarContext.Provider value={{ avatar, setAvatar }}>
    <SafeAreaView style={styles.container}>
      {/* Top Header - Hidden on mobile (bottom navigation) */}
      {!useBottomNavigation && (
        <WebAppHeader
          isSmallScreen={isSmallScreen}
          isMediumScreen={isMediumScreen}
          userName={user.name}
          avatar={avatar}
          unreadCount={unreadCount}
          onLogoPress={() => handleNavigation('/user/dashboard')}
          onPressBooking={() => handleNavigation('/user/booking')}
          onPressNotifications={() => setShowNotifications(true)}
          onPressProfile={() => handleNavigation('/user/profile')}
          onLogout={handleLogout}
        />
      )}

      {/* Main Content */}
      <View style={styles.content}>
        <Slot />
      </View>

      {/* Bottom Tab Navigation - For Mobile, Web App, and small web screens */}
      {useBottomNavigation && (
        <View style={styles.bottomTabBar}>
          <Pressable 
            style={styles.tabItem}
            onPress={() => handleNavigation('/user/dashboard')}
          >
            <Ionicons name="home" size={24} color="#1e3a8a" />
            <Text style={styles.tabText}>Home</Text>
          </Pressable>
          
          <Pressable 
            style={styles.tabItem}
            onPress={() => setShowNotifications(true)}
          >
            <View style={styles.notificationTabContainer}>
              <Ionicons name="notifications" size={24} color="#1e3a8a" />
              {unreadCount > 0 && (
                <View style={styles.mobileNotificationBadge}>
                  <Text style={styles.mobileNotificationBadgeText}>
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.tabText}>Notifiche</Text>
          </Pressable>
          
          <Pressable 
            style={styles.tabItem}
            onPress={() => handleNavigation('/user/guides')}
          >
            <Ionicons name="book" size={24} color="#1e3a8a" />
            <Text style={styles.tabText}>Guide</Text>
          </Pressable>
          
          <Pressable 
            style={styles.tabItem}
            onPress={() => handleNavigation('/user/profile')}
          >
            <Ionicons name="person" size={24} color="#1e3a8a" />
            <Text style={styles.tabText}>Profilo</Text>
          </Pressable>
        </View>
      )}

      {/* Notification Menu */}
      <NotificationMenu
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onDelete={handleDeleteNotification}
      />
    </SafeAreaView>
    </UserAvatarContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
  },
  // Bottom Tab Bar Styles
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    flexDirection: 'row',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1e3a8a', // blue-900
    marginTop: 4,
  },
  notificationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#dbeafe',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  notificationButtonSmall: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  notificationBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: 'white',
  },
  notificationTabContainer: {
    position: 'relative',
  },
  mobileNotificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  mobileNotificationBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
}); 