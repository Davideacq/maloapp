// Converted from malohr-platform/app/psychologist/guides/page.tsx
// Psychologist guides management page with content creation and assignment features for React Native
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Breadcrumb } from '../../../src/components/breadcrumb';
import { Button } from '../../../src/components/button';
import { Card, CardContent } from '../../../src/components/card';

export default function PsychologistGuidesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tutte le categorie' },
  ];

  const guides: any[] = [];

  const stats = {
    totalGuides: guides.length,
    publishedGuides: 0,
    draftGuides: 0,
    assignedGuides: 0,
  };

  const handleNavigation = (path: string) => {
    router.push(path as any);
  };

  const handleBackToDashboard = () => {
    router.push('/psychologist/dashboard' as any);
  };

  const getStatusVariant = (status: string) => {
    if (status === 'published') return 'success';
    if (status === 'draft') return 'warning';
    return 'default';
  };

  const getStatusLabel = (status: string) => {
    if (status === 'published') return 'Pubblicata';
    if (status === 'draft') return 'Bozza';
    return 'Sola Lettura';
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
              { label: 'Gestione Guide' },
            ]}
          />
        </View>
        <View style={styles.headerRight}>
          <Pressable onPress={() => {}} style={styles.calendarButton}>
            <Ionicons name="add" size={20} color="#1e40af" />
            <Text style={styles.calendarButtonText}>Nuova Guida</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Stats Cards */}
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <CardContent style={styles.statCardContent}>
                <View style={styles.statIcon}>
                  <Ionicons name="library" size={24} color="white" />
                </View>
                <Text style={styles.statNumber}>{stats.totalGuides}</Text>
                <Text style={styles.statLabel}>Guide Totali</Text>
              </CardContent>
            </Card>

            <Card style={styles.statCard}>
              <CardContent style={styles.statCardContent}>
                <View style={styles.statIcon}>
                  <Ionicons name="eye" size={24} color="white" />
                </View>
                <Text style={styles.statNumber}>{stats.publishedGuides}</Text>
                <Text style={styles.statLabel}>Pubblicate</Text>
              </CardContent>
            </Card>
          </View>

          {/* Search Section */}
          <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#6b7280" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Cerca guide..."
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
            </View>
            
            <Button 
              onPress={() => {}}
              style={styles.createButton}
            >
              <Ionicons name="add" size={16} color="white" />
              <Text style={styles.createButtonText}>Nuova Guida</Text>
            </Button>
          </View>

          {/* Guides Grid */}
          <View style={styles.guidesGrid}>
            {guides.length === 0 && (
              <Card style={styles.guideCard}>
                <CardContent style={styles.guideCardContent}>
                  <Text style={styles.lastUpdated}>Nessuna guida disponibile</Text>
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
    backgroundColor: '#ccfbf1',
    borderColor: '#5eead4',
    borderWidth: 1,
  },
  statCardContent: {
    padding: 24,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#14b8a6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#134e4a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#0f766e',
  },
  searchSection: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  searchContainer: {
    flex: 1,
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
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#14b8a6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
    gap: 8,
  },
  createButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  guidesGrid: {
    gap: 16,
  },
  guideCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  guideCardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  guideHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  guideMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#6b7280',
  },
  guideCardContent: {
    padding: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  statItemNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 4,
  },
  statItemLabel: {
    fontSize: 12,
    color: '#1e40af',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  guideActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingVertical: 8,
    borderRadius: 4,
    gap: 4,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#374151',
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#14b8a6',
    paddingVertical: 8,
    borderRadius: 4,
    gap: 4,
  },
  editButtonText: {
    fontSize: 14,
    color: 'white',
  },
  disabledButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingVertical: 8,
    borderRadius: 4,
    gap: 4,
  },
  disabledButtonText: {
    fontSize: 14,
    color: '#9ca3af',
  },
}); 