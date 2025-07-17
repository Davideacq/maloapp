// Converted from malohr-platform/app/psychologist/guides/page.tsx
// Psychologist guides management page with content creation and assignment features for React Native
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge } from '../../../src/components/badge';
import { Breadcrumb } from '../../../src/components/breadcrumb';
import { Button } from '../../../src/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../src/components/card';

export default function PsychologistGuidesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tutte le categorie' },
    { id: 'stress', label: 'Gestione Stress' },
    { id: 'mindfulness', label: 'Mindfulness' },
    { id: 'communication', label: 'Comunicazione' },
    { id: 'productivity', label: 'Produttività' },
  ];

  const guides = [
    {
      id: 1,
      title: 'Tecniche di Respirazione per Ridurre lo Stress',
      category: 'stress',
      type: 'video',
      duration: '15 min',
      difficulty: 'Principiante',
      status: 'published',
      assignedPatients: 12,
      completions: 89,
      lastUpdated: '2 giorni fa',
      canEdit: true,
    },
    {
      id: 2,
      title: 'Mindfulness per la Concentrazione',
      category: 'mindfulness',
      type: 'audio',
      duration: '20 min',
      difficulty: 'Intermedio',
      status: 'published',
      assignedPatients: 8,
      completions: 67,
      lastUpdated: '1 settimana fa',
      canEdit: true,
    },
    {
      id: 3,
      title: 'Comunicazione Assertiva',
      category: 'communication',
      type: 'article',
      duration: '25 min',
      difficulty: 'Intermedio',
      status: 'draft',
      assignedPatients: 0,
      completions: 0,
      lastUpdated: '3 giorni fa',
      canEdit: true,
    },
  ];

  const stats = {
    totalGuides: guides.length,
    publishedGuides: guides.filter(g => g.status === 'published').length,
    draftGuides: guides.filter(g => g.status === 'draft').length,
    assignedGuides: guides.filter(g => g.assignedPatients > 0).length,
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
        <Breadcrumb
          items={[
            { label: 'Dashboard', onPress: handleBackToDashboard },
            { label: 'Gestione Guide' },
          ]}
        />
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
            {guides.map((guide) => (
              <Card key={guide.id} style={styles.guideCard}>
                <CardHeader style={styles.guideCardHeader}>
                  <View style={styles.guideHeaderTop}>
                    <Badge 
                      variant={guide.category === 'stress' ? 'default' : 'default'}
                    >
                      {guide.category === 'stress' ? 'Stress' : guide.category}
                    </Badge>
                    <Badge variant={getStatusVariant(guide.status)}>
                      {getStatusLabel(guide.status)}
                    </Badge>
                  </View>
                  <CardTitle style={styles.guideTitle}>{guide.title}</CardTitle>
                  <View style={styles.guideMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="time" size={14} color="#6b7280" />
                      <Text style={styles.metaText}>{guide.duration}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="trending-up" size={14} color="#6b7280" />
                      <Text style={styles.metaText}>{guide.difficulty}</Text>
                    </View>
                  </View>
                </CardHeader>

                <CardContent style={styles.guideCardContent}>
                  <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                      <Text style={styles.statItemNumber}>{guide.assignedPatients}</Text>
                      <Text style={styles.statItemLabel}>Assegnata a</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statItemNumber}>{guide.completions}</Text>
                      <Text style={styles.statItemLabel}>Completamenti</Text>
                    </View>
                  </View>

                  <Text style={styles.lastUpdated}>
                    Ultimo aggiornamento: {guide.lastUpdated}
                  </Text>

                  <View style={styles.guideActions}>
                    <Button 
                      onPress={() => {}}
                      style={styles.actionButton}
                    >
                      <Ionicons name="eye" size={14} color="#374151" />
                      <Text style={styles.actionButtonText}>Anteprima</Text>
                    </Button>
                    
                    {guide.canEdit ? (
                      <Button 
                        onPress={() => {}}
                        style={styles.editButton}
                      >
                        <Ionicons name="create" size={14} color="white" />
                        <Text style={styles.editButtonText}>Modifica</Text>
                      </Button>
                    ) : (
                      <Button 
                        onPress={() => {}}
                        style={styles.disabledButton}
                        disabled
                      >
                        <Ionicons name="create" size={14} color="#9ca3af" />
                        <Text style={styles.disabledButtonText}>Sola Lettura</Text>
                      </Button>
                    )}
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