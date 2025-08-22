import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Avatar } from './avatar';

type WebAppHeaderProps = {
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  userName: string;
  avatar: string;
  unreadCount: number;
  onLogoPress: () => void;
  onPressBooking: () => void;
  onPressNotifications: () => void;
  onPressProfile: () => void;
  onLogout: () => void;
};

export function WebAppHeader(props: WebAppHeaderProps) {
  const {
    isSmallScreen,
    isMediumScreen,
    userName,
    avatar,
    unreadCount,
    onLogoPress,
    onPressBooking,
    onPressNotifications,
    onPressProfile,
    onLogout,
  } = props;

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const closeProfileMenu = () => setShowProfileMenu(false);

  return (
    <View style={[
      styles.header,
      isSmallScreen && styles.headerSmall,
      isMediumScreen && styles.headerMedium
    ]}>
      <View style={styles.headerLeft}>
        <Pressable 
          style={styles.logoContainer}
          onPress={onLogoPress}
        >
          <Image 
            source={require('../../assets/images/malo-logo-dark.png')}
            style={[
              styles.logo,
              isSmallScreen && styles.logoSmall
            ]}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      <View style={styles.headerRight}>
        <Pressable 
          style={[
            styles.outlinedButton,
            isSmallScreen && styles.outlinedButtonSmall
          ]}
          onPress={onPressBooking}
        >
          <View style={styles.bookingContainer}>
            <Ionicons name="add" size={isSmallScreen ? 16 : 16} color="#374151" />
            {!isSmallScreen && (
              <Text style={styles.bookingText}>Prenota</Text>
            )}
          </View>
        </Pressable>

        <Pressable 
          style={[
            styles.notificationButton,
            isSmallScreen && styles.notificationButtonSmall
          ]}
          onPress={onPressNotifications}
        >
          <Ionicons name="notifications" size={isSmallScreen ? 18 : 20} color="#1e40af" />
          {unreadCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </Text>
            </View>
          )}
        </Pressable>

        <View style={styles.profileContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.profileButton,
              pressed && styles.profileButtonPressed
            ]}
            onPress={() => setShowProfileMenu(!showProfileMenu)}
          >
            <View style={[
              styles.profileInfo,
              isSmallScreen && styles.profileInfoSmall
            ]}>
              <View style={styles.profileAvatar}>
                <Avatar src={avatar} alt={userName} size={isSmallScreen ? 'sm' : 'md'} />
              </View>
              {!isSmallScreen && (
                <Text style={styles.userName}>{userName}</Text>
              )}
            </View>
          </Pressable>

          {showProfileMenu && (
            <TouchableWithoutFeedback onPress={closeProfileMenu}>
              <View style={styles.dropdownOverlay}>
                <TouchableWithoutFeedback onPress={() => {}}>
                  <View style={styles.dropdownMenu}>
                    <Pressable
                      style={styles.dropdownItem}
                      onPress={() => {
                        closeProfileMenu();
                        onPressProfile();
                      }}
                    >
                      <Ionicons name="person" size={16} color="#374151" />
                      <Text style={styles.dropdownText}>Il tuo profilo</Text>
                    </Pressable>
                    <Pressable
                      style={styles.dropdownItem}
                      onPress={() => {
                        closeProfileMenu();
                        onLogout();
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
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    minHeight: 80,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  headerSmall: {
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 16,
    minHeight: 72,
  },
  headerMedium: {
    paddingTop: 18,
    paddingBottom: 14,
    paddingHorizontal: 18,
    minHeight: 88,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  logo: {
    width: 120,
    height: 32,
  },
  logoSmall: {
    width: 100,
    height: 26,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9fafb',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  outlinedButtonSmall: {
    paddingHorizontal: 8,
    height: 36,
  },
  bookingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bookingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  profileContainer: {
    position: 'relative',
    zIndex: 1001,
  },
  profileButton: {
    cursor: 'pointer',
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  profileButtonPressed: {
    opacity: 0.7,
    backgroundColor: '#f3f4f6',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 40,
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'center',
    borderRadius: 8,
  },
  profileInfoSmall: {
    height: 36,
    paddingHorizontal: 8,
    paddingVertical: 6,
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
  dropdownOverlay: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
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
});


