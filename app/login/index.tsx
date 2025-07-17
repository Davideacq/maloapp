import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { useTypography } from '../../src/hooks/use-typography';

interface ButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, backgroundColor, disabled = false }) => {
  const { typography } = useTypography();
  
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor: disabled ? '#9ca3af' : backgroundColor },
      ]}
    >
      <Text style={[styles.buttonText, typography.button]}>{title}</Text>
    </Pressable>
  );
};

export default function LoginPage() {
  const { typography, fontsLoaded } = useTypography();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getUserTypeFromEmail = (email: string): 'user' | 'admin' | 'psychologist' | null => {
    const emailLower = email.toLowerCase();
    
    if (emailLower === 'admin@test') {
      return 'admin';
    } else if (emailLower === 'psi@test') {
      return 'psychologist';
    } else if (emailLower === 'user@test') {
      return 'user';
    }
    
    // Default logic for other emails
    if (emailLower.includes('admin')) {
      return 'admin';
    } else if (emailLower.includes('psi') || emailLower.includes('psychologist')) {
      return 'psychologist';
    } else {
      return 'user';
    }
  };

  const handleLogin = () => {
    // Clear any previous error
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Inserisci email e password');
      return;
    }

    // Check test credentials
    const emailLower = email.toLowerCase();
    const testCredentials: Record<string, string> = {
      'admin@test': 'test',
      'psi@test': 'test',
      'user@test': 'test'
    };

    if (testCredentials[emailLower] && password === testCredentials[emailLower]) {
      // Valid test credentials
      const userType = getUserTypeFromEmail(email);
      console.log('Login successful:', { email, userType });
      
      // Navigate based on user type
      if (userType === 'user') {
        router.replace('/user/dashboard');
      } else if (userType === 'admin') {
        router.replace('/admin/dashboard');
      } else if (userType === 'psychologist') {
        router.replace('/psychologist/dashboard');
      }
    } else {
      // Show error for incorrect credentials
      setErrorMessage('Le credenziali inserite non sono corrette. Verifica email e password e riprova.');
    }
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Caricamento...</Text>
      </SafeAreaView>
    );
  }

  const windowWidth = Dimensions.get('window').width;
  const isWeb = Platform.OS === 'web';
  const cardWidth = isWeb ? (windowWidth > 700 ? 700 : '100%') : '100%';

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header with Logo */}
          <View style={styles.header}>
            <Image 
              source={require('../../assets/images/malo-logo-dark.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Login Card */}
          <View style={[styles.card, { width: cardWidth, alignSelf: 'center' }]}>
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, typography.h2]}>Accedi</Text>
              <Text style={[styles.cardDescription, typography.bodySmall]}>
                Inserisci le tue credenziali per continuare
              </Text>
            </View>

            {/* Card Content */}
            <View style={styles.cardContent}>
              {/* Email Field */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, typography.label]}>Email</Text>
                <TextInput
                  style={[styles.input, typography.input]}
                  placeholder="nome@azienda.com"
                  placeholderTextColor="#9ca3af"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Password Field */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, typography.label]}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.passwordInput, typography.input]}
                    placeholder="••••••••"
                    placeholderTextColor="#9ca3af"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <Pressable
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.passwordToggle}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#6b7280"
                    />
                  </Pressable>
                </View>
              </View>

              {/* Remember Me & Forgot Password */}
              <View style={styles.optionsRow}>
                <Pressable
                  style={styles.rememberMeContainer}
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                    {rememberMe && (
                      <Ionicons name="checkmark" size={12} color="white" />
                    )}
                  </View>
                  <Text style={[styles.rememberMeText, typography.bodySmall]}>Ricordami</Text>
                </Pressable>

                <Pressable onPress={() => router.push('/forgot-password')}>
                  <Text style={[styles.forgotPasswordText, typography.bodySmall]}>Password dimenticata?</Text>
                </Pressable>
              </View>

              {/* Login Button */}
              <Button
                title="Accedi"
                onPress={handleLogin}
                backgroundColor="#f97316" // orange-500
              />

              {/* Error Message */}
              {errorMessage ? (
                <View style={styles.errorContainer}>
                  <Ionicons name="alert-circle" size={16} color="#ef4444" />
                  <Text style={[styles.errorText, typography.bodySmall]}>{errorMessage}</Text>
                </View>
              ) : null}

            </View>
          </View>

          {/* Back to Home */}
          <Pressable 
            style={styles.backContainer}
            onPress={() => router.push('/home')}
          >
            <Text style={[styles.backText, typography.bodySmall]}>← Altre aree di accesso</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7ed', // orange-50
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 200,
    height: 80,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 24,
  },
  cardHeader: {
    padding: 24,
    paddingBottom: 0,
  },
  cardTitle: {
    textAlign: 'center',
    color: '#111827',
    marginBottom: 8,
  },
  cardDescription: {
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 24,
  },
  cardContent: {
    padding: 24,
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    backgroundColor: 'white',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  passwordToggle: {
    paddingHorizontal: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  rememberMeText: {
    color: '#6b7280',
  },
  forgotPasswordText: {
    color: '#3b82f6',
  },
  button: {
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 6,
    padding: 12,
    gap: 8,
  },
  errorText: {
    color: '#dc2626',
    flex: 1,
  },

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  registerText: {
    color: '#6b7280',
  },
  registerLink: {
    color: '#3b82f6',
    fontWeight: '500',
  },
  registerLinkDisabled: {
    color: '#9ca3af',
    fontWeight: '500',
  },
  backContainer: {
    alignItems: 'center',
  },
  backText: {
    color: '#9ca3af',
  },
}); 