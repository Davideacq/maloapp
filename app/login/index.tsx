// Converted from malohr-platform/app/login/page.tsx
// Login page with simplified authentication for React Native
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSimpleAuth } from '../../src/hooks/use-simple-auth';

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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useSimpleAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Errore', 'Inserisci email e password');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await login(email.trim(), password);
      
      if (result.success && result.user) {
        // Login riuscito - reindirizza in base al ruolo
        switch (result.user.role) {
          case 'admin':
            router.push('/admin/dashboard');
            break;
          case 'psychologist':
            router.push('/psychologist/dashboard');
            break;
          case 'user':
            router.push('/user/dashboard');
            break;
          default:
            router.push('/home');
        }
      } else {
        Alert.alert('Login Fallito', result.message || 'Credenziali non valide');
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
    router.push('/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBackToHome} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
          <Text style={styles.backButtonText}>Torna alla Home</Text>
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
        <Text style={styles.title}>Accedi alla tua area</Text>
        <Text style={styles.subtitle}>
          Inserisci le tue credenziali per accedere alla piattaforma
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail" size={20} color="#9ca3af" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Inserisci la tua email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed" size={20} color="#9ca3af" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Inserisci la tua password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#9ca3af"
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={styles.passwordToggle}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#9ca3af"
              />
            </Pressable>
          </View>
        </View>

        <Button
          title={isLoading ? "Accesso in corso..." : "Accedi"}
          onPress={handleLogin}
          backgroundColor="#3b82f6"
          disabled={isLoading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  inputIcon: {
    marginLeft: 12,
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#111827',
  },
  passwordToggle: {
    padding: 8,
    marginRight: 8,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    alignItems: 'center',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#9ca3af',
    fontSize: 14,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footerText: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
  },
  footerLink: {
    color: '#3b82f6',
    fontWeight: '500',
  },
}); 