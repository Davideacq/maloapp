// Converted from malohr-platform/app/login/page.tsx
// Login page with simplified authentication for React Native
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSimpleAuth } from '../../src/hooks/use-simple-auth';
import { useBackdoor } from '../../src/hooks/use-backdoor';

interface ButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, backgroundColor, disabled = false }) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    style={[
      styles.button,
      { backgroundColor },
      disabled && styles.buttonDisabled
    ]}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </Pressable>
);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useSimpleAuth();
  const { showBackdoorCredentials, isEnabled: backdoorEnabled } = useBackdoor();

  // Debug log per verificare l'hook
  console.log('🔍 Debug useBackdoor:', { 
    showBackdoorCredentials: typeof showBackdoorCredentials, 
    backdoorEnabled,
    isFunction: typeof showBackdoorCredentials === 'function'
  });

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Errore', 'Inserisci email e password');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await login(email.trim(), password.trim());
      
      if (result.success && result.user) {
        // Login riuscito - reindirizza direttamente
        console.log('🔓 Login backdoor riuscito, redirect a:', result.user.role);
        console.log('🔓 Dettagli utente:', result.user);
        
        // Reindirizza in base al ruolo
        if (result.user) {
          const targetRoute = (() => {
            switch (result.user.role) {
              case 'admin':
                return '/admin/dashboard';
              case 'psychologist':
                return '/psychologist/dashboard';
              case 'user':
                return '/user/dashboard';
              default:
                return '/home';
            }
          })();
          
          console.log('🔓 Tentativo redirect a:', targetRoute);
          router.push(targetRoute);
        }
      } else {
        Alert.alert('Errore', result.message || 'Login fallito');
      }
    } catch (error) {
      Alert.alert('Errore', 'Errore durante il login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    router.push('/register');
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleShowBackdoorCredentials = () => {
    showBackdoorCredentials();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBackToHome} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
          <Text style={styles.backButtonText}>Indietro</Text>
        </Pressable>
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/malo-logo-dark.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Accedi</Text>
        <Text style={styles.subtitle}>Inserisci le tue credenziali per accedere</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Inserisci la tua email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Inserisci la tua password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <Button
          title={isLoading ? "Accesso in corso..." : "Accedi"}
          onPress={handleLogin}
          backgroundColor="#3b82f6"
          disabled={isLoading}
        />

        {/* Backdoor Button - Solo in sviluppo */}
        {backdoorEnabled && (
          <Pressable 
            onPress={handleShowBackdoorCredentials} 
            style={styles.backdoorButton}
          >
            <Ionicons name="key" size={16} color="#dc2626" />
            <Text style={styles.backdoorButtonText}>🔓 Credenziali Sviluppo</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    marginLeft: 8,
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    width: 200,
    height: 60,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    maxWidth: 1000,
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  backdoorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#dc2626',
    borderRadius: 8,
    backgroundColor: '#fef2f2',
    marginTop: 16,
  },
  backdoorButtonText: {
    marginLeft: 8,
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '500',
  },
}); 