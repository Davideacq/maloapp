import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
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
    View,
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

export default function ForgotPasswordPage() {
  const { typography, fontsLoaded } = useTypography();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email) {
      Alert.alert('Errore', 'Inserisci la tua email');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Errore', 'Inserisci un\'email valida');
      return;
    }

    // Handle password reset logic here
    console.log('Password reset requested for:', email);
    setSubmitted(true);
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

          {/* Reset Password Card */}
          <View style={[styles.card, { width: cardWidth, alignSelf: 'center' }]}>
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, typography.h2]}>Password Dimenticata?</Text>
              <Text style={[styles.cardDescription, typography.bodySmall]}>
                {submitted
                  ? "Se l'email è corretta, riceverai un link per reimpostare la password."
                  : "Inserisci la tua email e ti invieremo le istruzioni per reimpostare la password."}
              </Text>
            </View>

            {/* Card Content */}
            <View style={styles.cardContent}>
              {submitted ? (
                /* Success State */
                <View style={styles.successContainer}>
                  <View style={styles.successIcon}>
                    <Ionicons name="mail-outline" size={48} color="#f97316" />
                  </View>
                  <Text style={[styles.successTitle, typography.h3]}>Email Inviata!</Text>
                  <Text style={[styles.successMessage, typography.bodySmall]}>
                    Controlla la tua casella di posta elettronica per le istruzioni 
                    su come reimpostare la password.
                  </Text>
                  <Button
                    title="Torna al Login"
                    onPress={() => router.replace('/login')}
                    backgroundColor="#f97316"
                  />
                </View>
              ) : (
                /* Form State */
                <View style={styles.formContainer}>
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
                      autoFocus={true}
                    />
                  </View>

                  <Button
                    title="Invia Istruzioni"
                    onPress={handleSubmit}
                    backgroundColor="#f97316" // orange-500
                  />
                </View>
              )}
            </View>
          </View>

          {/* Back to Login - Only visible in form state, not in success state */}
          {!submitted && (
            <Pressable 
              style={styles.backContainer}
              onPress={() => router.push('/login')}
            >
              <View style={styles.backContent}>
                <Ionicons name="arrow-back" size={16} color="#3b82f6" />
                <Text style={[styles.backText, typography.bodySmall]}>Torna al Login</Text>
              </View>
            </Pressable>
          )}
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
  formContainer: {
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
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
  },
  successContainer: {
    alignItems: 'center',
    gap: 16,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff7ed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  successTitle: {
    textAlign: 'center',
    color: '#111827',
  },
  successMessage: {
    textAlign: 'center',
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  backContainer: {
    alignItems: 'center',
  },
  backContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backText: {
    color: '#3b82f6', // blue-500 for accessibility
  },
}); 