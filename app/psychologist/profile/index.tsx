// Psychologist profile page with editable information and professional details
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '../../../src/components/avatar';
import { Badge } from '../../../src/components/badge';
import { Breadcrumb } from '../../../src/components/breadcrumb';
import { Button } from '../../../src/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../src/components/card';
import { Dialog } from '../../../src/components/dialog';
import { Input } from '../../../src/components/input';
import { getUser, logoutUser } from '../../../src/utils/auth';

export default function PsychologistProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '+39 123 456 7891',
    specialization: 'Stress e Ansia Lavorativa',
    experience: '8 anni',
    license: 'Albo Psicologi Lombardia - N. 12345',
    education: 'Laurea in Psicologia Clinica - Università Statale Milano',
    joinDate: '10 Gen 2022',
    avatar: '', // url o base64 dell'avatar
  });

  const [editData, setEditData] = useState(userData);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined);

  const sessionHistory = [
    { id: 1, date: '12 Gen 2024', patient: 'Mario Rossi', duration: '50 min', status: 'completed' },
    { id: 2, date: '11 Gen 2024', patient: 'Laura Bianchi', duration: '50 min', status: 'completed' },
    { id: 3, date: '10 Gen 2024', patient: 'Giuseppe Verdi', duration: '50 min', status: 'completed' },
    { id: 4, date: '8 Gen 2024', patient: 'Anna Moretti', duration: '50 min', status: 'completed' },
  ];

  const stats = {
    totalPatients: 24,
    completedSessions: 142,
    upcomingToday: 3,
    totalGuides: 12,
  };

  const handleBackToDashboard = () => {
    router.push('/psychologist/dashboard' as any);
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
    if (Platform.OS === 'web') {
      // Su web, Alert con più pulsanti non è supportato: esegui direttamente
      (async () => {
        await logoutUser();
        router.replace('/login');
      })();
      return;
    }

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
  };

  useEffect(() => {
    (async () => {
      const user = await getUser();
      if (user) {
        setUserData((prev) => ({
          ...prev,
          firstName: user.first_name || '',
          lastName: user.last_name || '',
          email: user.email || '',
        }));
        setEditData((prev) => ({
          ...prev,
          firstName: user.first_name || '',
          lastName: user.last_name || '',
          email: user.email || '',
        }));
      }
    })();
  }, []);

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
      setShowAvatarModal(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Breadcrumb
          items={[
            { label: 'Dashboard', onPress: handleBackToDashboard },
            { label: 'Profilo' },
          ]}
        />
        {/* Logout button */}
        <Button variant="destructive" onPress={handleLogout} style={{ marginLeft: 12 }}>
          Logout
        </Button>
      </View>

      <ScrollView style={styles.content}>
        {/* Professional Stats */}
        <View style={styles.statsOverview}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.totalPatients}</Text>
            <Text style={styles.statLabel}>Pazienti Totali</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.completedSessions}</Text>
            <Text style={styles.statLabel}>Sessioni Completate</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.upcomingToday}</Text>
            <Text style={styles.statLabel}>Oggi</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.totalGuides}</Text>
            <Text style={styles.statLabel}>Guide Create</Text>
          </View>
        </View>

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
                  Dr.ssa {userData.firstName} {userData.lastName}
                </CardTitle>
                <CardDescription>{userData.specialization}</CardDescription>
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
                <Text style={styles.fieldLabel}>Specializzazione</Text>
                {isEditing ? (
                  <Input
                    value={editData.specialization}
                    onChangeText={(text) => setEditData({...editData, specialization: text})}
                    style={styles.input}
                  />
                ) : (
                  <Text style={styles.fieldValue}>{userData.specialization}</Text>
                )}
              </View>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Esperienza</Text>
                <Text style={[styles.fieldValue, { color: '#6b7280' }]}>{userData.experience}</Text>
              </View>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Iscrizione Albo</Text>
                <Text style={[styles.fieldValue, { color: '#6b7280' }]}>{userData.license}</Text>
              </View>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Formazione</Text>
                <Text style={[styles.fieldValue, { color: '#6b7280' }]}>{userData.education}</Text>
              </View>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Membro dal</Text>
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

        {/* Recent Sessions */}
        <Card style={styles.historyCard}>
          <CardHeader>
            <CardTitle>Sessioni Recenti</CardTitle>
          </CardHeader>
          <CardContent>
            {sessionHistory.map((session) => (
              <View key={session.id} style={styles.sessionItem}>
                <View style={styles.sessionInfo}>
                  <Text style={styles.sessionDate}>{session.date}</Text>
                  <Text style={styles.sessionPatient}>{session.patient}</Text>
                </View>
                <View style={styles.sessionMeta}>
                  <Text style={styles.sessionDuration}>{session.duration}</Text>
                  <Badge variant="success">Completata</Badge>
                </View>
              </View>
            ))}
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
  content: {
    flex: 1,
    padding: 16,
  },
  statsOverview: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  profileCard: {
    backgroundColor: 'white',
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    position: 'relative',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  infoCard: {
    backgroundColor: 'white',
    marginBottom: 24,
  },
  formGrid: {
    gap: 16,
  },
  formField: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  fieldValue: {
    fontSize: 16,
    color: '#111827',
  },
  input: {
    backgroundColor: 'white',
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  cancelButton: {
    backgroundColor: 'white',
  },
  saveButton: {
    backgroundColor: '#3b82f6',
  },
  saveButtonText: {
    color: 'white',
    marginLeft: 4,
  },
  historyCard: {
    backgroundColor: 'white',
    marginBottom: 24,
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
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  sessionPatient: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  sessionMeta: {
    alignItems: 'flex-end',
    gap: 4,
  },
  sessionDuration: {
    fontSize: 14,
    color: '#6b7280',
  },
}); 