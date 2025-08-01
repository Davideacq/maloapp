// Converted from malohr-platform/app/admin/settings/page.tsx
// Admin settings page with tabs and configuration options for React Native
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppIcon } from '../../../src/components/app-icon';
import { Breadcrumb } from '../../../src/components/breadcrumb';
import { Button } from '../../../src/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../src/components/card';
import { logoutUser } from '../../../src/utils/auth';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [platformName, setPlatformName] = useState('MaloHR');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const tabs = [
    { id: 'general', label: 'Generali', icon: 'settings' },
    { id: 'notifications', label: 'Notifiche', icon: 'bell' },
    { id: 'security', label: 'Sicurezza', icon: 'eye' },
    { id: 'billing', label: 'Fatturazione', icon: 'book-open' },
  ];

  const handleNavigation = (path: string) => {
    router.push(path as any);
  };

  const handleSaveSettings = () => {
    // Logica per salvare le impostazioni
    console.log('Settings saved');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Breadcrumb
          items={[
            { label: 'Dashboard', onPress: () => handleNavigation('/admin/dashboard') },
            { label: 'Impostazioni' },
          ]}
        />
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Impostazioni</Text>
          </View>
          {/* Bottone Logout */}
          <Button
            onPress={() => {
              Alert.alert(
                'Logout',
                'Sei sicuro di voler uscire?',
                [
                  { text: 'Annulla', style: 'cancel' },
                  {
                    text: 'Esci',
                    style: 'destructive',
                    onPress: async () => {
                      await logoutUser();
                      router.replace('/login');
                    },
                  },
                ]
              );
            }}
            variant="destructive"
            size="sm"
            style={{ marginLeft: 12 }}
          >
            <Ionicons name="log-out-outline" size={16} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Logout</Text>
          </Button>
        </View>
      </View>

      <View style={styles.mainContent}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.contentGrid}>
            {/* Sidebar Navigation */}
            <View style={styles.sidebar}>
              <View style={styles.navigation}>
                {tabs.map((tab) => (
                  <Pressable
                    key={tab.id}
                    style={[styles.tabButton, activeTab === tab.id && styles.activeTabButton]}
                    onPress={() => setActiveTab(tab.id)}
                  >
                    <AppIcon name={tab.icon as any} size={20} style={{ marginRight: 8 }} />
                    <Text style={styles.tabLabel}>{tab.label}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Main Settings Content */}
            <View style={styles.settingsContent}>
              <Card style={styles.settingsCard}>
                <CardHeader>
                  <CardTitle style={styles.cardTitle}>Impostazioni Generali</CardTitle>
                  <Text style={styles.cardDescription}>
                    Gestisci le impostazioni di base della piattaforma.
                  </Text>
                </CardHeader>
                <CardContent style={styles.cardContent}>
                  <View style={styles.settingsForm}>
                    {/* Platform Name */}
                    <View style={styles.formGroup}>
                      <Text style={styles.label}>Nome Piattaforma</Text>
                      <TextInput
                        style={styles.textInput}
                        value={platformName}
                        onChangeText={setPlatformName}
                        placeholder="Nome della piattaforma"
                        placeholderTextColor="#9ca3af"
                      />
                    </View>

                    {/* Platform Logo */}
                    <View style={styles.formGroup}>
                      <Text style={styles.label}>Logo Piattaforma</Text>
                      <Pressable style={styles.fileInput} onPress={() => {}}>
                        <Ionicons name="cloud-upload" size={20} color="#6b7280" />
                        <Text style={styles.fileInputText}>Seleziona file</Text>
                      </Pressable>
                    </View>

                    {/* Maintenance Mode */}
                    <View style={styles.switchContainer}>
                      <View style={styles.switchInfo}>
                        <Text style={styles.switchLabel}>Modalità Manutenzione</Text>
                        <Text style={styles.switchDescription}>
                          Disabilita temporaneamente l'accesso per gli utenti.
                        </Text>
                      </View>
                      <Switch
                        value={maintenanceMode}
                        onValueChange={setMaintenanceMode}
                        trackColor={{ false: '#e5e7eb', true: '#fed7aa' }}
                        thumbColor={maintenanceMode ? '#f97316' : '#f3f4f6'}
                      />
                    </View>

                    {/* Save Button */}
                    <View style={styles.saveContainer}>
                      <Button onPress={handleSaveSettings} variant="default">
                        <Text style={styles.saveButtonText}>Salva Modifiche</Text>
                      </Button>
                    </View>
                  </View>
                </CardContent>
              </Card>

              {/* Additional Settings Sections */}
                             {activeTab === 'notifications' && (
                 <Card style={StyleSheet.flatten([styles.settingsCard, styles.notificationsCard])}>
                   <CardHeader>
                     <CardTitle style={styles.cardTitle}>Impostazioni Notifiche</CardTitle>
                     <Text style={styles.cardDescription}>
                       Configura le notifiche del sistema.
                     </Text>
                   </CardHeader>
                  <CardContent style={styles.cardContent}>
                    <View style={styles.settingsForm}>
                      <View style={styles.switchContainer}>
                        <View style={styles.switchInfo}>
                          <Text style={styles.switchLabel}>Email Notifications</Text>
                          <Text style={styles.switchDescription}>
                            Invia notifiche email agli utenti.
                          </Text>
                        </View>
                        <Switch
                          value={true}
                          onValueChange={() => {}}
                          trackColor={{ false: '#e5e7eb', true: '#fed7aa' }}
                          thumbColor="#f97316"
                        />
                      </View>
                      <View style={styles.switchContainer}>
                        <View style={styles.switchInfo}>
                          <Text style={styles.switchLabel}>Push Notifications</Text>
                          <Text style={styles.switchDescription}>
                            Invia notifiche push all'app mobile.
                          </Text>
                        </View>
                        <Switch
                          value={false}
                          onValueChange={() => {}}
                          trackColor={{ false: '#e5e7eb', true: '#fed7aa' }}
                          thumbColor="#f3f4f6"
                        />
                      </View>
                    </View>
                  </CardContent>
                </Card>
              )}

                             {activeTab === 'security' && (
                 <Card style={StyleSheet.flatten([styles.settingsCard, styles.securityCard])}>
                   <CardHeader>
                     <CardTitle style={styles.cardTitle}>Impostazioni Sicurezza</CardTitle>
                     <Text style={styles.cardDescription}>
                       Configura le opzioni di sicurezza della piattaforma.
                     </Text>
                   </CardHeader>
                  <CardContent style={styles.cardContent}>
                    <View style={styles.settingsForm}>
                      <View style={styles.switchContainer}>
                        <View style={styles.switchInfo}>
                          <Text style={styles.switchLabel}>Two-Factor Authentication</Text>
                          <Text style={styles.switchDescription}>
                            Richiedi autenticazione a due fattori.
                          </Text>
                        </View>
                        <Switch
                          value={true}
                          onValueChange={() => {}}
                          trackColor={{ false: '#e5e7eb', true: '#fed7aa' }}
                          thumbColor="#f97316"
                        />
                      </View>
                      <View style={styles.formGroup}>
                        <Text style={styles.label}>Session Timeout (minuti)</Text>
                        <TextInput
                          style={styles.textInput}
                          defaultValue="30"
                          placeholder="30"
                          placeholderTextColor="#9ca3af"
                          keyboardType="numeric"
                        />
                      </View>
                    </View>
                  </CardContent>
                </Card>
              )}

                             {activeTab === 'billing' && (
                 <Card style={StyleSheet.flatten([styles.settingsCard, styles.billingCard])}>
                   <CardHeader>
                     <CardTitle style={styles.cardTitle}>Impostazioni Fatturazione</CardTitle>
                     <Text style={styles.cardDescription}>
                       Gestisci le opzioni di fatturazione e pagamento.
                     </Text>
                   </CardHeader>
                  <CardContent style={styles.cardContent}>
                    <View style={styles.settingsForm}>
                      <View style={styles.formGroup}>
                        <Text style={styles.label}>Piano Attuale</Text>
                        <View style={styles.planInfo}>
                          <Text style={styles.planName}>Piano Pro</Text>
                          <Text style={styles.planPrice}>€99/mese</Text>
                        </View>
                      </View>
                      <View style={styles.formGroup}>
                        <Text style={styles.label}>Prossimo Pagamento</Text>
                        <Text style={styles.nextPayment}>15 Febbraio 2024</Text>
                      </View>
                    </View>
                  </CardContent>
                </Card>
              )}
            </View>
          </View>
        </ScrollView>
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
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9a3412', // ui-orange-900
  },
  buttonIcon: {
    marginRight: 4,
  },
  backButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  contentGrid: {
    flexDirection: 'row',
    gap: 32,
  },
  sidebar: {
    width: 200,
  },
  navigation: {
    gap: 4,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#fff7ed', // ui-orange-50
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  settingsContent: {
    flex: 1,
  },
  settingsCard: {
    backgroundColor: 'white',
    marginBottom: 24,
  },
  notificationsCard: {
    marginTop: 0,
  },
  securityCard: {
    marginTop: 0,
  },
  billingCard: {
    marginTop: 0,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  cardContent: {
    padding: 24,
  },
  settingsForm: {
    gap: 24,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#111827',
    backgroundColor: 'white',
  },
  fileInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  fileInputText: {
    fontSize: 14,
    color: '#6b7280',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: 'white',
  },
  switchInfo: {
    flex: 1,
    marginRight: 16,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  switchDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  saveContainer: {
    alignItems: 'flex-end',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  planInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  planName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  planPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f97316', // ui-orange-500
  },
  nextPayment: {
    fontSize: 14,
    color: '#111827',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 6,
  },
}); 