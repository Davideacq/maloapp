// Converted from malohr-platform/app/user/profile/page.tsx
// User profile page with editable information and session history
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '../../../src/components/avatar';
import { Badge } from '../../../src/components/badge';
import { Breadcrumb } from '../../../src/components/breadcrumb';
import { Button } from '../../../src/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../src/components/card';
import { Dialog } from '../../../src/components/dialog';
import { Input } from '../../../src/components/input';
import { useUserAvatar } from '../_layout';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: 'Mario',
    lastName: 'Rossi',
    email: 'mario.rossi@azienda.com',
    company: 'Azienda SpA',
    phone: '+39 123 456 7890',
    department: 'Marketing',
    joinDate: '15 Gen 2024',
    avatar: '', // url o base64 dell'avatar
  });

  const [editData, setEditData] = useState(userData);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined);
  const { avatar, setAvatar } = useUserAvatar();

  const sessionHistory = [
    { id: 1, date: '12 Gen 2024', psychologist: 'Dr.ssa Maria Bianchi', duration: '50 min', status: 'completed' },
    { id: 2, date: '8 Gen 2024', psychologist: 'Dr.ssa Maria Bianchi', duration: '50 min', status: 'completed' },
    { id: 3, date: '3 Gen 2024', psychologist: 'Dr.ssa Maria Bianchi', duration: '50 min', status: 'completed' },
    { id: 4, date: '28 Dic 2023', psychologist: 'Dr.ssa Maria Bianchi', duration: '50 min', status: 'completed' },
  ];

  const handleBackToDashboard = () => {
    router.push('/user/dashboard' as any);
  };

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
    Alert.alert('Successo', 'Profilo aggiornato con successo');
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Sei sicuro di voler uscire?',
      [
        { text: 'Annulla', style: 'cancel' },
        { 
          text: 'Esci', 
          style: 'destructive',
          onPress: () => router.push('/' as any)
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Elimina Account',
      'Sei sicuro di voler eliminare il tuo account? Questa azione non può essere annullata.',
      [
        { text: 'Annulla', style: 'cancel' },
        { 
          text: 'Elimina', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Eliminato', 'Il tuo account è stato eliminato con successo');
            router.push('/' as any);
          }
        }
      ]
    );
  };

  const handleDownloadData = () => {
    Alert.alert('Download Dati', 'I tuoi dati personali saranno inviati via email');
  };

  const handlePickAvatar = async () => {
    // Su mobile: chiede permessi, su web non serve
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permesso negato', 'Per selezionare una foto profilo devi consentire l\'accesso alle immagini.');
        return;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: false,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setAvatarPreview(result.assets[0].uri);
    }
  };

  const handleSaveAvatar = () => {
    if (avatarPreview) {
      setEditData({ ...editData, avatar: avatarPreview });
      setAvatar(avatarPreview); // aggiorna avatar globale
      setShowAvatarModal(false);
    }
  };

  // Calcola se siamo su Web Mobile (viewport <= 600px)
  const isWebMobile = Platform.OS === 'web' && typeof window !== 'undefined' && window.innerWidth <= 600;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Breadcrumb
          items={[
            { label: 'Home', onPress: handleBackToDashboard },
            { label: 'Profilo' },
          ]}
        />
        {/* Logout button */}
        <Button variant="destructive" onPress={handleLogout} style={[styles.logoutButton, isWebMobile && { paddingVertical: 4 }]}>
          Logout
        </Button>
      </View>

      <ScrollView style={styles.content}>
        {/* User Info Card */}
        <Card style={styles.profileCard}>
          <CardHeader>
            <View style={styles.profileHeader}>
              <Pressable
                style={styles.avatar}
                disabled={!isEditing}
                onPress={() => {
                  if (!isEditing) return;
                  setShowAvatarModal(true);
                }}
              >
                <Avatar
                  src={isEditing ? (avatarPreview || editData.avatar) : userData.avatar}
                  alt={userData.firstName + ' ' + userData.lastName}
                  size="xl"
                />
                {isEditing && (
                  <View style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: '#3b82f6',
                    borderRadius: 12,
                    padding: 4,
                  }}>
                    <Ionicons name="camera" size={16} color="white" />
                  </View>
                )}
              </Pressable>
              <View style={styles.profileInfo}>
                <CardTitle style={styles.profileName}>
                  {userData.firstName} {userData.lastName}
                </CardTitle>
                <CardDescription>{userData.company}</CardDescription>
                <Badge variant="success" style={styles.statusBadge}>
                  Attivo
                </Badge>
              </View>
              <Pressable
                onPress={() => setIsEditing(!isEditing)}
                style={styles.editButton}
              >
                <Ionicons 
                  name={isEditing ? "close" : "pencil"} 
                  size={20} 
                  color={isEditing ? "#ef4444" : "#3b82f6"} 
                />
              </Pressable>
            </View>
          </CardHeader>
        </Card>

        {/* Personal Information */}
        <Card style={styles.infoCard}>
          <CardHeader>
            <CardTitle>Informazioni Personali</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.formGrid}>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Nome</Text>
                {isEditing ? (
                  <Input
                    value={editData.firstName}
                    onChangeText={(text) => setEditData({...editData, firstName: text})}
                    style={styles.input}
                  />
                ) : (
                  <Text style={styles.fieldValue}>{userData.firstName}</Text>
                )}
              </View>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Cognome</Text>
                {isEditing ? (
                  <Input
                    value={editData.lastName}
                    onChangeText={(text) => setEditData({...editData, lastName: text})}
                    style={styles.input}
                  />
                ) : (
                  <Text style={styles.fieldValue}>{userData.lastName}</Text>
                )}
              </View>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Email</Text>
                <Text style={[styles.fieldValue, { color: '#6b7280' }]}>{userData.email}</Text>
              </View>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Telefono</Text>
                {isEditing ? (
                  <Input
                    value={editData.phone}
                    onChangeText={(text) => setEditData({...editData, phone: text})}
                    style={styles.input}
                    keyboardType="phone-pad"
                  />
                ) : (
                  <Text style={styles.fieldValue}>{userData.phone}</Text>
                )}
              </View>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Azienda</Text>
                <Text style={[styles.fieldValue, { color: '#6b7280' }]}>{userData.company}</Text>
              </View>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Dipartimento</Text>
                {isEditing ? (
                  <Input
                    value={editData.department}
                    onChangeText={(text) => setEditData({...editData, department: text})}
                    style={styles.input}
                  />
                ) : (
                  <Text style={styles.fieldValue}>{userData.department}</Text>
                )}
              </View>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Data di Registrazione</Text>
                <Text style={[styles.fieldValue, { color: '#6b7280' }]}>{userData.joinDate}</Text>
              </View>
            </View>

            {isEditing && (
              <View style={styles.editActions}>
                <Button
                  onPress={handleCancel}
                  variant="outline"
                  style={styles.cancelButton}
                >
                  Annulla
                </Button>
                <Button onPress={handleSave} style={styles.saveButton}>
                  <Ionicons name="checkmark" size={16} color="white" />
                  <Text style={styles.saveButtonText}>Salva</Text>
                </Button>
              </View>
            )}
          </CardContent>
        </Card>

        {/* Session History */}
        <Card style={styles.historyCard}>
          <CardHeader>
            <CardTitle>Storico Sessioni</CardTitle>
          </CardHeader>
          <CardContent>
            {sessionHistory.map((session) => (
              <View key={session.id} style={styles.sessionItem}>
                <View style={styles.sessionInfo}>
                  <Text style={styles.sessionDate}>{session.date}</Text>
                  <Text style={styles.sessionPsychologist}>{session.psychologist}</Text>
                </View>
                <View style={styles.sessionMeta}>
                  <Text style={styles.sessionDuration}>{session.duration}</Text>
                  <Badge variant="success">Completata</Badge>
                </View>
              </View>
            ))}
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card style={[styles.privacyCard, isWebMobile && { marginBottom: 80 }]}>
          <CardHeader>
            <CardTitle>Privacy e Sicurezza</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.privacyActions}>
              <Pressable onPress={handleDownloadData} style={styles.actionItem}>
                <Ionicons name="download" size={20} color="#3b82f6" />
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>Scarica i tuoi dati</Text>
                  <Text style={styles.actionDescription}>
                    Ricevi una copia di tutti i tuoi dati personali
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
              </Pressable>

              <Pressable onPress={handleDeleteAccount} style={styles.actionItem}>
                <Ionicons name="trash" size={20} color="#ef4444" />
                <View style={styles.actionContent}>
                  <Text style={[styles.actionTitle, styles.dangerText]}>
                    Elimina account
                  </Text>
                  <Text style={styles.actionDescription}>
                    Elimina permanentemente il tuo account e tutti i dati
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
              </Pressable>
            </View>
          </CardContent>
        </Card>
      </ScrollView>
      {/* Modal upload avatar */}
      <Dialog
        open={showAvatarModal}
        onOpenChange={setShowAvatarModal}
        title="Carica nuova foto profilo"
        description="Scegli una nuova immagine per il tuo avatar."
      >
        <View style={{ alignItems: 'center', gap: 16 }}>
          <Avatar
            src={avatarPreview || editData.avatar || userData.avatar}
            alt={userData.firstName + ' ' + userData.lastName}
            size="xl"
          />
          <Button onPress={handlePickAvatar} variant="outline">
            Scegli immagine
          </Button>
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
            <Button variant="outline" onPress={() => { setShowAvatarModal(false); setAvatarPreview(undefined); }}>
              Annulla
            </Button>
            <Button onPress={handleSaveAvatar} disabled={!avatarPreview}>
              Salva
            </Button>
          </View>
        </View>
      </Dialog>
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
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    marginBottom: 16,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statusBadge: {
    marginTop: 8,
  },
  editButton: {
    padding: 8,
  },
  infoCard: {
    marginBottom: 16,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formGrid: {
    gap: 16,
  },
  formField: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 16,
    color: '#1f2937',
  },
  fieldNote: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  input: {
    marginTop: 4,
  },
  editActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: 'white',
    marginLeft: 8,
  },
  historyCard: {
    marginBottom: 16,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sessionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  sessionInfo: {
    flex: 1,
  },
  sessionDate: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  sessionPsychologist: {
    fontSize: 14,
    color: '#6b7280',
  },
  sessionMeta: {
    alignItems: 'flex-end',
  },
  sessionDuration: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  privacyCard: {
    marginBottom: 32,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  privacyActions: {
    gap: 16,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  dangerText: {
    color: '#ef4444',
  },
}); 