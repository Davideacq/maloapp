import { Ionicons } from '@expo/vector-icons';
import { Slot, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PsychologistLayout() {
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const [useBottomNavigation, setUseBottomNavigation] = useState(false);

  useEffect(() => {
    const updateLayout = () => {
      const width = Dimensions.get('window').width;
      setWindowWidth(width);
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

  return (
    <SafeAreaView style={styles.container}>
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


