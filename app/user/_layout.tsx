// User layout with consistent navigation for all user pages
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slot, router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '../../src/components/avatar';
import { Notification, NotificationMenu } from '../../src/components/notification-menu';
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

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
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
    const updateLayout = () => {
      const width = Dimensions.get('window').width;
      setWindowWidth(width);
      
      // Use bottom navigation if:
      // 1. Not web platform, OR
      // 2. Web platform but screen width is too small for desktop navigation
      // Estimated minimum width needed for desktop navigation: ~800px
      const shouldUseBottomNav = Platform.OS !== 'web' || width < 800;
      setUseBottomNavigation(shouldUseBottomNav);
    };

    updateLayout();
    
    const subscription = Dimensions.addEventListener('change', updateLayout);
    return () => subscription?.remove();
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

  const getUserInitial = () => {
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const closeProfileMenu = () => {
    setShowProfileMenu(false);
  };

  return (
    <UserAvatarContext.Provider value={{ avatar, setAvatar }}>
    <SafeAreaView style={styles.container}>
      {/* Top Header - Only for Web with sufficient space */}
      {Platform.OS === 'web' && !useBottomNavigation && (
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {/* Logo - Only show on web */}
            <Pressable onPress={() => handleNavigation('/user/dashboard')}>
              <Image 
                source={require('../../assets/images/malo-logo-dark.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </Pressable>

            {/* Right side navigation */}
            <View style={styles.headerRight}>
              {/* Booking Button - Only show on web */}
              <Pressable 
                style={styles.outlinedButton}
                onPress={() => handleNavigation('/user/booking')}
              >
                <View style={styles.bookingContainer}>
                  <Ionicons name="add" size={16} color="#374151" />
                  <Text style={styles.bookingText}>Prenota</Text>
                </View>
              </Pressable>

              {/* Notification Badge */}
              <Pressable 
                style={styles.notificationButton}
                onPress={() => setShowNotifications(true)}
              >
                <Ionicons name="notifications" size={20} color="#6b7280" />
                {unreadCount > 0 && (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationBadgeText}>
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </Text>
                  </View>
                )}
              </Pressable>

              {/* Profile Avatar with Dropdown - Only on web */}
              <View style={styles.profileContainer}>
                <Pressable
                  onPress={() => setShowProfileMenu(!showProfileMenu)}
                  style={styles.profileButton}
                >
                  <View style={styles.profileInfo}>
                    <View style={styles.profileAvatar}>
                      <Avatar src={avatar} alt={user.name} size="md" />
                    </View>
                    <Text style={styles.userName}>{user.name}</Text>
                  </View>
                </Pressable>
                
                {/* Profile Dropdown Menu */}
                {showProfileMenu && (
                  <TouchableWithoutFeedback onPress={closeProfileMenu}>
                    <View style={styles.dropdownOverlay}>
                      <TouchableWithoutFeedback onPress={() => {}}>
                        <View style={styles.dropdownMenu}>
                          <Pressable
                            style={styles.dropdownItem}
                            onPress={() => {
                              closeProfileMenu();
                              handleNavigation('/user/profile');
                            }}
                          >
                            <Ionicons name="person" size={16} color="#374151" />
                            <Text style={styles.dropdownText}>Il tuo profilo</Text>
                          </Pressable>
                          <Pressable
                            style={styles.dropdownItem}
                            onPress={() => {
                              closeProfileMenu();
                              handleLogout();
                            }}
                          >
                            <Ionicons name="log-out" size={16} color="#ef4444" />
                            <Text style={[styles.dropdownText, styles.logoutText]}>Logout</Text>
                          </Pressable>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </TouchableWithoutFeedback>
                )}
              </View>
            </View>
          </View>
        </View>
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
  header: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    zIndex: 1000,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  logo: {
    width: 120,
    height: 40,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'white',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bookingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  profileContainer: {
    position: 'relative',
    zIndex: 1001,
  },
  profileButton: {
    cursor: 'pointer',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 40,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  avatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  dropdownOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    minWidth: 160,
    zIndex: 1002,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    cursor: 'pointer',
  },
  dropdownText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  logoutText: {
    color: '#ef4444',
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
    position: 'relative',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: 'white',
  },
  notificationBadge: {
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
  notificationBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
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