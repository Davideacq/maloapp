// Converted from malohr-platform/app/psychologist/notes/page.tsx
// Psychologist notes management page with clinical notes and patient tracking for React Native
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge } from '../../../src/components/badge';
import { Breadcrumb } from '../../../src/components/breadcrumb';
import { Button } from '../../../src/components/button';
import { Card, CardContent } from '../../../src/components/card';
import { Image } from 'react-native';

export default function PsychologistNotesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('all');

  const patients = [
    { id: 'all', name: 'Tutti i pazienti' },
    { id: 'mario-rossi', name: 'Mario Rossi' },
    { id: 'laura-bianchi', name: 'Laura Bianchi' },
    { id: 'giuseppe-verdi', name: 'Giuseppe Verdi' },
    { id: 'anna-moretti', name: 'Anna Moretti' },
  ];

  const notes = [
    {
      id: 1,
      patient: 'Mario Rossi',
      company: 'Azienda SpA',
      sessionDate: '12 Gen 2024',
      sessionNumber: 4,
      duration: '50 min',
      type: 'Sessione Individuale',
      status: 'completed',
      title: 'Progressi nella gestione dello stress',
      content: 'Ottimi progressi nell\'applicazione delle tecniche di respirazione. Il paziente riferisce una riduzione significativa dei livelli di stress lavorativo. Continua a praticare regolarmente gli esercizi assegnati.',
      objectives: ['Consolidare tecniche apprese', 'Lavorare sulla comunicazione assertiva'],
      nextSession: '15 Gen 2024',
    },
    {
      id: 2,
      patient: 'Laura Bianchi',
      company: 'Tech Solutions',
      sessionDate: '11 Gen 2024',
      sessionNumber: 2,
      duration: '50 min',
      type: 'Sessione Individuale',
      status: 'completed',
      title: 'Work-life balance e gestione del tempo',
      content: 'Lavoro sui confini tra vita lavorativa e personale. Identificate strategie pratiche per migliorare l\'organizzazione della giornata. Discussione sulle priorità e delegazione.',
      objectives: ['Implementare strategie time management', 'Stabilire routine serale'],
      nextSession: '16 Gen 2024',
    },
  ];

  const stats = {
    totalNotes: notes.length,
    completedNotes: notes.filter(n => n.status === 'completed').length,
    draftNotes: notes.filter(n => n.status === 'draft').length,
    pendingNotes: notes.filter(n => n.status === 'pending').length,
  };

  const handleNavigation = (path: string) => {
    router.push(path as any);
  };

  const handleBackToDashboard = () => {
    router.push('/psychologist/dashboard' as any);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'draft':
        return 'warning';
      case 'pending':
        return 'info';
      default:
        return 'info';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completata';
      case 'draft':
        return 'Bozza';
      case 'pending':
        return 'In attesa';
      default:
        return 'In attesa';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('../../../assets/images/malo-logo-dark.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.headerCenter}>
          <Breadcrumb
            items={[
              { label: 'Dashboard', onPress: handleBackToDashboard },
              { label: 'Note Cliniche' },
            ]}
          />
        </View>
        <View style={styles.headerRight}>
          <Button onPress={() => {}} variant="outline" size="sm">
            <Ionicons name="add" size={16} color="#666" style={styles.buttonIcon} />
            <Text style={styles.outlineButtonText}>Nuova Nota</Text>
          </Button>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Stats Cards */}
          <View style={styles.statsGrid}>
            <Card style={[styles.statCard, styles.tealCard]}>
              <CardContent style={styles.statCardContent}>
                <View style={[styles.statIcon, styles.tealIcon]}>
                  <Ionicons name="document-text" size={24} color="white" />
                </View>
                <Text style={[styles.statNumber, styles.tealText]}>{stats.totalNotes}</Text>
                <Text style={[styles.statLabel, styles.tealLabel]}>Note Totali</Text>
              </CardContent>
            </Card>

            <Card style={[styles.statCard, styles.successCard]}>
              <CardContent style={styles.statCardContent}>
                <View style={[styles.statIcon, styles.successIcon]}>
                  <Ionicons name="checkmark-done" size={24} color="white" />
                </View>
                <Text style={[styles.statNumber, styles.successText]}>{stats.completedNotes}</Text>
                <Text style={[styles.statLabel, styles.successLabel]}>Completate</Text>
              </CardContent>
            </Card>
          </View>

          {/* Search and Filters */}
          <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#6b7280" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Cerca note..."
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
            </View>
          </View>

          {/* Notes List */}
          <View style={styles.notesList}>
            {notes.map((note) => (
              <Card key={note.id} style={styles.noteCard}>
                <CardContent style={styles.noteCardContent}>
                  <View style={styles.noteHeader}>
                    <View style={styles.noteHeaderLeft}>
                      <Text style={styles.noteTitle}>{note.title}</Text>
                      <View style={styles.noteMetadata}>
                        <View style={styles.metadataItem}>
                          <Ionicons name="person" size={14} color="#6b7280" />
                          <Text style={styles.metadataText}>{note.patient}</Text>
                        </View>
                        <View style={styles.metadataItem}>
                          <Ionicons name="business" size={14} color="#6b7280" />
                          <Text style={styles.metadataText}>{note.company}</Text>
                        </View>
                        <View style={styles.metadataItem}>
                          <Ionicons name="calendar" size={14} color="#6b7280" />
                          <Text style={styles.metadataText}>{note.sessionDate}</Text>
                        </View>
                      </View>
                    </View>
                    <Badge variant={getStatusVariant(note.status)}>
                      {getStatusLabel(note.status)}
                    </Badge>
                  </View>

                  <Text style={styles.noteContent}>{note.content}</Text>

                  <View style={styles.noteFooter}>
                    <View style={styles.sessionInfo}>
                      <Text style={styles.sessionInfoText}>
                        Sessione #{note.sessionNumber} • {note.duration} • {note.type}
                      </Text>
                    </View>
                    <View style={styles.noteActions}>
                      <Button 
                        onPress={() => {}} 
                        style={styles.actionButton}
                      >
                        <Text style={styles.actionButtonText}>Visualizza</Text>
                      </Button>
                      <Button 
                        onPress={() => {}} 
                        style={[styles.actionButton, styles.editButton]}
                      >
                        <Text style={styles.editButtonText}>Modifica</Text>
                      </Button>
                    </View>
                  </View>
                </CardContent>
              </Card>
            ))}
          </View>
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
    marginBottom: 8,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#374151',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#134e4a',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
  },
  tealCard: {
    backgroundColor: '#ccfbf1',
    borderColor: '#5eead4',
    borderWidth: 1,
  },
  successCard: {
    backgroundColor: '#dcfce7',
    borderColor: '#86efac',
    borderWidth: 1,
  },
  statCardContent: {
    padding: 24,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  tealIcon: {
    backgroundColor: '#14b8a6',
  },
  successIcon: {
    backgroundColor: '#22c55e',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tealText: {
    color: '#134e4a',
  },
  successText: {
    color: '#14532d',
  },
  statLabel: {
    fontSize: 14,
  },
  tealLabel: {
    color: '#0f766e',
  },
  successLabel: {
    color: '#166534',
  },
  searchSection: {
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  notesList: {
    gap: 16,
  },
  noteCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  noteCardContent: {
    padding: 20,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  noteHeaderLeft: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  noteMetadata: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metadataText: {
    fontSize: 14,
    color: '#6b7280',
  },
  noteContent: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 16,
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionInfo: {
    flex: 1,
  },
  sessionInfoText: {
    fontSize: 12,
    color: '#6b7280',
  },
  noteActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#374151',
  },
  editButton: {
    backgroundColor: '#14b8a6',
    borderColor: '#14b8a6',
  },
  editButtonText: {
    color: 'white',
  },
}); 