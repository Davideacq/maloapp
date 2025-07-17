import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
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

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  password: string;
  confirmPassword: string;
}

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
      { backgroundColor: disabled ? '#9ca3af' : backgroundColor },
    ]}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </Pressable>
);

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const companies = [
    { label: 'Seleziona la tua azienda', value: '' },
    { label: 'Azienda SpA', value: 'azienda-spa' },
    { label: 'Tech Solutions', value: 'tech-solutions' },
    { label: 'Marketing Pro', value: 'marketing-pro' },
    { label: 'Finance Corp', value: 'finance-corp' },
  ];

  const handleSubmit = () => {
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.company || !formData.password || !formData.confirmPassword) {
      Alert.alert('Errore', 'Tutti i campi sono obbligatori');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Errore', 'Le password non coincidono');
      return;
    }

    if (!acceptTerms) {
      Alert.alert('Errore', 'Devi accettare i termini e condizioni');
      return;
    }

    // Simulate registration logic
    console.log('Registration data:', formData);
    
    // Navigate to onboarding
    router.replace('/user/onboarding');
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>MaloHR</Text>
            <Text style={styles.subtitle}>Crea il tuo account</Text>
          </View>

          {/* Register Card */}
          <View style={styles.card}>
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Registrazione</Text>
              <Text style={styles.cardDescription}>
                Inserisci i tuoi dati per creare un account
              </Text>
            </View>

            {/* Card Content */}
            <View style={styles.cardContent}>
              {/* Name Fields */}
              <View style={styles.nameRow}>
                <View style={styles.nameField}>
                  <Text style={styles.label}>Nome</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Mario"
                    value={formData.firstName}
                    onChangeText={(value) => handleChange('firstName', value)}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
                <View style={styles.nameField}>
                  <Text style={styles.label}>Cognome</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Rossi"
                    value={formData.lastName}
                    onChangeText={(value) => handleChange('lastName', value)}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Email Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="mario.rossi@azienda.com"
                  value={formData.email}
                  onChangeText={(value) => handleChange('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Company Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Azienda</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={formData.company}
                    onValueChange={(value: string) => handleChange('company', value)}
                    style={styles.picker}
                  >
                    {companies.map((company) => (
                      <Picker.Item
                        key={company.value}
                        label={company.label}
                        value={company.value}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              {/* Password Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="••••••••"
                    value={formData.password}
                    onChangeText={(value) => handleChange('password', value)}
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

              {/* Confirm Password Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Conferma Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChangeText={(value) => handleChange('confirmPassword', value)}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <Pressable
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.passwordToggle}
                  >
                    <Ionicons
                      name={showConfirmPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#6b7280"
                    />
                  </Pressable>
                </View>
              </View>

              {/* Terms and Conditions */}
              <Pressable
                style={styles.termsContainer}
                onPress={() => setAcceptTerms(!acceptTerms)}
              >
                <View style={[styles.checkbox, acceptTerms && styles.checkboxChecked]}>
                  {acceptTerms && (
                    <Ionicons name="checkmark" size={12} color="white" />
                  )}
                </View>
                <View style={styles.termsTextContainer}>
                  <Text style={styles.termsText}>
                    Accetto i{' '}
                    <Text style={styles.termsLink}>termini e condizioni</Text>
                    {' '}e la{' '}
                    <Text style={styles.termsLink}>privacy policy</Text>
                  </Text>
                </View>
              </Pressable>

              {/* Register Button */}
              <Button
                title="Crea Account"
                onPress={handleSubmit}
                backgroundColor="#3b82f6"
              />

              {/* Login Link */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Hai già un account? </Text>
                <Pressable onPress={() => router.push('/login')}>
                  <Text style={styles.loginLink}>Accedi</Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Back to Home */}
          <Pressable 
            style={styles.backContainer}
            onPress={() => router.push('/')}
          >
            <Text style={styles.backText}>← Torna alla home</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbeafe', // Gradient simulation with light blue
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111827',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 24,
  },
  cardContent: {
    padding: 24,
    gap: 16,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 16,
  },
  nameField: {
    flex: 1,
    gap: 8,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    backgroundColor: 'white',
  },
  picker: {
    height: 40,
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
    fontSize: 16,
  },
  passwordToggle: {
    paddingHorizontal: 12,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  termsTextContainer: {
    flex: 1,
  },
  termsText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  termsLink: {
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
    fontSize: 16,
    fontWeight: '500',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  loginText: {
    fontSize: 14,
    color: '#6b7280',
  },
  loginLink: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  backContainer: {
    alignItems: 'center',
  },
  backText: {
    fontSize: 14,
    color: '#9ca3af',
  },
}); 