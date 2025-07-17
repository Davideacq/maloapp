// Landing page that redirects to login
// This makes /login the main entry point for the web app
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTypography } from '../src/hooks/use-typography';

export default function LandingPage() {
  const { typography, fontsLoaded } = useTypography();

  useEffect(() => {
    if (fontsLoaded) {
      // Redirect to login after a brief moment
      const timer = setTimeout(() => {
        router.replace('/login');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color="#f97316" />
          <Text style={styles.loadingText}>Caricamento font...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.title, typography.h1]}>MaloHR</Text>
        <Text style={[styles.subtitle, typography.body]}>
          Piattaforma per il benessere psicologico
        </Text>
        <ActivityIndicator size="large" color="#f97316" style={styles.loader} />
        <Text style={[styles.redirectText, typography.bodySmall]}>
          Reindirizzamento al login...
        </Text>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff6ff', // ui-blue-50
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    color: '#1e3a8a', // ui-blue-900
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  loader: {
    marginBottom: 16,
  },
  redirectText: {
    color: '#9ca3af',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 16,
  },
});
