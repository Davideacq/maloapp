import { Ionicons } from '@expo/vector-icons';
import { Slot, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { WebAppHeader } from '../../src/components/web-app-header';
import { useScreenSize } from '../../src/hooks/use-screen-size';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '../../src/utils/api';

export default function PsychologistLayout() {
  const { isSmallScreen, isMediumScreen } = useScreenSize();
  const [useBottomNavigation, setUseBottomNavigation] = useState(false);
  const [headerName, setHeaderName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [unreadCount] = useState(0);

  useEffect(() => {
    // Use bottom navigation only on native apps. On web, always show header.
    setUseBottomNavigation(Platform.OS !== 'web');
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const res = await api.get('/psychologists/me');
      if (res.ok && res.data && isMounted) {
        const d: any = res.data;
        const fullName = d?.user?.full_name
          || `${d?.user?.first_name ?? ''} ${d?.user?.last_name ?? ''}`.trim();
        setHeaderName(fullName || d?.user?.email || '');
        setAvatar(d?.avatar_url ?? '');
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header - Web only (hidden on native where bottom navigation is used) */}
      {!useBottomNavigation && (
        <WebAppHeader
          isSmallScreen={isSmallScreen}
          isMediumScreen={isMediumScreen}
          userName={headerName}
          avatar={avatar}
          unreadCount={unreadCount}
          onLogoPress={() => handleNavigation('/psychologist/dashboard')}
          onPressBooking={() => handleNavigation('/psychologist/calendar')}
          onPressNotifications={() => handleNavigation('/psychologist/dashboard')}
          onPressProfile={() => handleNavigation('/psychologist/profile')}
          onLogout={() => handleNavigation('/login')}
        />
      )}

      <View style={styles.content}>
        <Slot />
      </View>

      {useBottomNavigation && (
        <View style={styles.bottomTabBar}>
          <Pressable 
            style={styles.tabItem}
            onPress={() => handleNavigation('/psychologist/dashboard')}
          >
            <Ionicons name="home" size={24} color="#1e3a8a" />
            <Text style={styles.tabText}>Home</Text>
          </Pressable>

          <Pressable 
            style={styles.tabItem}
            onPress={() => handleNavigation('/psychologist/patients')}
          >
            <Ionicons name="people" size={24} color="#1e3a8a" />
            <Text style={styles.tabText}>Pazienti</Text>
          </Pressable>

          <Pressable 
            style={styles.tabItem}
            onPress={() => handleNavigation('/psychologist/calendar')}
          >
            <Ionicons name="calendar" size={24} color="#1e3a8a" />
            <Text style={styles.tabText}>Calendario</Text>
          </Pressable>

          <Pressable 
            style={styles.tabItem}
            onPress={() => handleNavigation('/psychologist/profile')}
          >
            <Ionicons name="person" size={24} color="#1e3a8a" />
            <Text style={styles.tabText}>Profilo</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
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
    color: '#1e3a8a',
    marginTop: 4,
  },
});


