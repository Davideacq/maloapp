import { Slot, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { useScreenSize } from '../../src/hooks/use-screen-size';

export default function AdminLayout() {
  const { isSmallScreen, isMediumScreen } = useScreenSize();

  const handleNavigation = (path: string) => {
    router.push(path as any);
  };

  return (
    <SafeAreaView style={styles.container}>
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


