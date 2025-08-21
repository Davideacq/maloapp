import { Slot, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { WebAppHeader } from '../../src/components/web-app-header';
import { useScreenSize } from '../../src/hooks/use-screen-size';

export default function AdminLayout() {
  const { isSmallScreen, isMediumScreen } = useScreenSize();
  const [useNativeUI, setUseNativeUI] = useState(false);

  useEffect(() => {
    // On native apps, hide web header; on web, always show header
    setUseNativeUI(Platform.OS !== 'web');
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      {!useNativeUI && (
        <WebAppHeader
          isSmallScreen={isSmallScreen}
          isMediumScreen={isMediumScreen}
          userName={'Admin'}
          avatar={''}
          unreadCount={0}
          onLogoPress={() => handleNavigation('/admin/dashboard')}
          onPressBooking={() => handleNavigation('/admin/dashboard')}
          onPressNotifications={() => handleNavigation('/admin/dashboard')}
          onPressProfile={() => handleNavigation('/admin/settings')}
          onLogout={() => handleNavigation('/login')}
        />
      )}

      <View style={styles.content}>
        <Slot />
      </View>
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
});


