// Converted from malohr-platform/app/user/payment/[packageId]/page.tsx
// User payment page for session packages
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { Breadcrumb } from '../../../../src/components/breadcrumb';
import { Button } from '../../../../src/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../src/components/card';
import { Input } from '../../../../src/components/input';

const packages = {
  1: { name: 'Pacchetto Base', sessions: 5, price: 250 },
  2: { name: 'Pacchetto Standard', sessions: 10, price: 450 },
  3: { name: 'Pacchetto Premium', sessions: 20, price: 800 },
};

export default function PaymentPage() {
  const { packageId } = useLocalSearchParams();
  const id = Array.isArray(packageId) ? packageId[0] : packageId;
  const pkg = packages[Number(id) as keyof typeof packages] || packages[2];

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: '',
    phone: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleBackToSessions = () => {
    router.push('/user/sessions' as any);
  };

  const handlePayment = async () => {
    if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.cardName) {
      Alert.alert('Errore', 'Compila tutti i campi obbligatori');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'Pagamento Completato!',
        `Hai acquistato il ${pkg.name} con successo. Le tue sessioni sono ora disponibili.`,
        [
          {
            text: 'Continua',
            onPress: () => router.push('/user/sessions' as any),
          },
        ]
      );
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const cleanValue = value.replace(/\D/g, '');
    // Add spaces every 4 digits
    const formattedValue = cleanValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formattedValue.slice(0, 19); // Max 16 digits + 3 spaces
  };

  const formatExpiryDate = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length >= 2) {
      return cleanValue.slice(0, 2) + '/' + cleanValue.slice(2, 4);
    }
    return cleanValue;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Breadcrumb - Removed for mobile app */}
        {/* <Breadcrumb
          items={[
            { label: 'Sessioni', onPress: handleBackToSessions },
            { label: 'Pagamento Sicuro' },
          ]}
        /> */}
        <View style={styles.securityIcon}>
          <Ionicons name="shield-checkmark" size={20} color="#10b981" />
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Package Summary */}
        <Card style={styles.packageCard}>
          <CardHeader>
            <CardTitle style={styles.packageTitle}>{pkg.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.packageDetails}>
              <View style={styles.packageRow}>
                <Text style={styles.packageLabel}>Sessioni incluse:</Text>
                <Text style={styles.packageValue}>{pkg.sessions}</Text>
              </View>
              <View style={styles.packageRow}>
                <Text style={styles.packageLabel}>Prezzo per sessione:</Text>
                <Text style={styles.packageValue}>€{Math.round(pkg.price / pkg.sessions)}</Text>
              </View>
              <View style={[styles.packageRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Totale:</Text>
                <Text style={styles.totalPrice}>€{pkg.price}</Text>
              </View>
            </View>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card style={styles.paymentCard}>
          <CardHeader>
            <View style={styles.paymentHeader}>
              <CardTitle style={styles.paymentTitle}>Dati di Pagamento</CardTitle>
              <View style={styles.cardIcons}>
                <Ionicons name="card" size={24} color="#6b7280" />
              </View>
            </View>
          </CardHeader>
          <CardContent>
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Carta di Credito</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Numero Carta *</Text>
                <Input
                  placeholder="1234 5678 9012 3456"
                  value={paymentData.cardNumber}
                  onChangeText={(text) => setPaymentData({
                    ...paymentData,
                    cardNumber: formatCardNumber(text)
                  })}
                  keyboardType="numeric"
                  maxLength={19}
                  style={styles.input}
                />
              </View>

              <View style={styles.cardRow}>
                <View style={styles.cardRowItem}>
                  <Text style={styles.inputLabel}>Scadenza *</Text>
                  <Input
                    placeholder="MM/AA"
                    value={paymentData.expiryDate}
                    onChangeText={(text) => setPaymentData({
                      ...paymentData,
                      expiryDate: formatExpiryDate(text)
                    })}
                    keyboardType="numeric"
                    maxLength={5}
                    style={styles.input}
                  />
                </View>
                <View style={styles.cardRowItem}>
                  <Text style={styles.inputLabel}>CVV *</Text>
                  <Input
                    placeholder="123"
                    value={paymentData.cvv}
                    onChangeText={(text) => setPaymentData({
                      ...paymentData,
                      cvv: text.replace(/\D/g, '').slice(0, 3)
                    })}
                    keyboardType="numeric"
                    maxLength={3}
                    secureTextEntry
                    style={styles.input}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nome sulla Carta *</Text>
                <Input
                  placeholder="Mario Rossi"
                  value={paymentData.cardName}
                  onChangeText={(text) => setPaymentData({
                    ...paymentData,
                    cardName: text
                  })}
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Dati di Contatto</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <Input
                  placeholder="mario.rossi@example.com"
                  value={paymentData.email}
                  onChangeText={(text) => setPaymentData({
                    ...paymentData,
                    email: text
                  })}
                  keyboardType="email-address"
                  style={styles.input}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Telefono</Text>
                <Input
                  placeholder="+39 123 456 7890"
                  value={paymentData.phone}
                  onChangeText={(text) => setPaymentData({
                    ...paymentData,
                    phone: text
                  })}
                  keyboardType="phone-pad"
                  style={styles.input}
                />
              </View>
            </View>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <View style={styles.securityNotice}>
          <View style={styles.securityHeader}>
            <Ionicons name="shield-checkmark" size={20} color="#10b981" />
            <Text style={styles.securityTitle}>Pagamento Sicuro</Text>
          </View>
          <Text style={styles.securityText}>
            I tuoi dati di pagamento sono protetti con crittografia SSL a 256 bit. 
            Non conserviamo le informazioni della tua carta di credito.
          </Text>
        </View>

        {/* Payment Button */}
        <View style={styles.paymentButtonContainer}>
          <Button
            onPress={handlePayment}
            disabled={isProcessing}
            style={styles.paymentButton}
          >
            {isProcessing ? (
              <Text style={styles.paymentButtonText}>Elaborazione...</Text>
            ) : (
              <>
                <Ionicons name="card" size={20} color="white" />
                <Text style={styles.paymentButtonText}>
                  Paga €{pkg.price}
                </Text>
              </>
            )}
          </Button>
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 8,
    color: '#3b82f6',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  securityIcon: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  packageCard: {
    marginBottom: 24,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  packageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  packageDetails: {
    gap: 12,
  },
  packageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  packageLabel: {
    fontSize: 16,
    color: '#6b7280',
  },
  packageValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  totalRow: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  paymentCard: {
    marginBottom: 24,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  cardIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  formSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  cardRowItem: {
    flex: 1,
  },
  securityNotice: {
    backgroundColor: '#f0fdf4',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dcfce7',
    marginBottom: 24,
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  securityTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#166534',
  },
  securityText: {
    fontSize: 14,
    color: '#15803d',
    lineHeight: 20,
  },
  paymentButtonContainer: {
    marginBottom: 32,
  },
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 8,
  },
  paymentButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 