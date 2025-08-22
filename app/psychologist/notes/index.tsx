// Converted from malohr-platform/app/psychologist/notes/page.tsx
// Psychologist notes management page with clinical notes and patient tracking for React Native
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { Breadcrumb } from '../../../src/components/breadcrumb';
import { Card, CardContent } from '../../../src/components/card';

export default function PsychologistNotesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const notes: any[] = [];

  const stats = {
    totalNotes: notes.length,
    completedNotes: 0,
    draftNotes: 0,
    pendingNotes: 0,
  };

  const handleBackToDashboard = () => {
    router.push('/psychologist/dashboard' as any);
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
          {/* Breadcrumb - Removed for mobile app */}
          {/* <Breadcrumb
            items={[
              { label: 'Dashboard', onPress: handleBackToDashboard },
              { label: 'Note Cliniche' },
            ]}
          /> */}
        </View>
        <View style={styles.headerRight}>
          <Pressable onPress={() => {}} style={styles.calendarButton}>
            <Ionicons name="add" size={20} color="#1e40af" />
            <Text style={styles.calendarButtonText}>Nuova Nota</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Stats Cards */}
          <View style={styles.statsGrid}>
            <Card style={StyleSheet.flatten([styles.statCard, styles.tealCard])}>
              <CardContent style={styles.statCardContent}>
                <View style={[styles.statIcon, styles.tealIcon]}>
                  <Ionicons name="document-text" size={24} color="white" />
                </View>
                <Text style={[styles.statNumber, styles.tealText]}>{stats.totalNotes}</Text>
                <Text style={[styles.statLabel, styles.tealLabel]}>Note Totali</Text>
              </CardContent>
            </Card>

            <Card style={StyleSheet.flatten([styles.statCard, styles.successCard])}>
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
            {notes.length === 0 && (
              <Card style={styles.noteCard}>
                <CardContent style={styles.noteCardContent}>
                  <Text style={styles.noteContent}>Nessuna nota disponibile</Text>
                </CardContent>
              </Card>
            )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logo: {
    width: 120,
    height: 32,
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
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#dbeafe',
    position: 'relative',
  },
  calendarButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
    marginLeft: 8,
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