// Converted from malohr-platform/app/layout.tsx
// Main layout for Expo Router with SafeArea and font configuration
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useCustomFonts } from '../src/hooks/use-fonts';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { fontsLoaded, error } = useCustomFonts();

  // Load global CSS only on web
  if (Platform.OS === 'web') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('../global.css');
  }

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false, // Hide default header for custom layouts
          contentStyle: { backgroundColor: '#ffffff' },
        }}
      />
    </SafeAreaProvider>
  );
}
