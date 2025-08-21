// Converted from malohr-platform/app/admin/content/page.tsx
// Admin content management with guides, filtering, and comprehensive content stats for React Native
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge } from '../../../src/components/badge';
import { Breadcrumb } from '../../../src/components/breadcrumb';
import { Button } from '../../../src/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../src/components/card';

export default function AdminContentPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tutti i contenuti' },
  ];

  const guides: any[] = [];

  const filteredGuides = guides.filter((guide) => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    totalGuides: guides.length,
    publishedGuides: guides.filter((g) => g.status === 'published').length,
    draftGuides: guides.filter((g) => g.status === 'draft').length,
    totalViews: guides.reduce((sum, g) => sum + g.views, 0),
  };

  const handleNavigation = (path: string) => {
    router.push(path as any);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'draft':
        return 'secondary';
      case 'review':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published':
        return 'Pubblicata';
      case 'draft':
        return 'Bozza';
      case 'review':
        return 'In Revisione';
      default:
        return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return 'videocam';
      case 'audio':
        return 'headset';
      case 'article':
        return 'document-text';
      case 'interactive':
        return 'play-circle';
      default:
        return 'document';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Navigation */}
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
              { label: 'Dashboard', onPress: () => handleNavigation('/admin/dashboard') },
              { label: 'Gestione Contenuti' },
            ]}
          />
        </View>
        <View style={styles.headerRight}>
          <Pressable 
            onPress={() => handleNavigation('/admin/content/create')} 
            style={styles.headerButton}
          >
            <Ionicons name="add-circle" size={20} color="white" />
            <Text style={styles.headerButtonText}>Nuova Guida</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <Card style={StyleSheet.flatten([styles.statCard, styles.orangeCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View style={[styles.statIcon, styles.orangeIcon]}>
                  <Ionicons name="document-text" size={24} color="white" />
                </View>
                <Text style={[styles.statValue, styles.orangeValue]}>{stats.totalGuides}</Text>
                <Text style={[styles.statLabel, styles.orangeLabel]}>Guide Totali</Text>
              </View>
            </CardContent>
          </Card>

          <Card style={StyleSheet.flatten([styles.statCard, styles.successCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View style={[styles.statIcon, styles.successIcon]}>
                  <Ionicons name="eye" size={24} color="white" />
                </View>
                <Text style={[styles.statValue, styles.successValue]}>{stats.publishedGuides}</Text>
                <Text style={[styles.statLabel, styles.successLabel]}>Pubblicate</Text>
              </View>
            </CardContent>
          </Card>

          <Card style={StyleSheet.flatten([styles.statCard, styles.grayCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View style={[styles.statIcon, styles.grayIcon]}>
                  <Ionicons name="create" size={24} color="white" />
                </View>
                <Text style={[styles.statValue, styles.grayValue]}>{stats.draftGuides}</Text>
                <Text style={[styles.statLabel, styles.grayLabel]}>Bozze</Text>
              </View>
            </CardContent>
          </Card>

          <Card style={StyleSheet.flatten([styles.statCard, styles.blueCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View style={[styles.statIcon, styles.blueIcon]}>
                  <Ionicons name="eye" size={24} color="white" />
                </View>
                <Text style={[styles.statValue, styles.blueValue]}>{stats.totalViews}</Text>
                <Text style={[styles.statLabel, styles.blueLabel]}>Visualizzazioni</Text>
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Actions Bar */}
        <View style={styles.actionsBar}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={16} color="#9ca3af" style={styles.searchIcon} />
            <TextInput
              placeholder="Cerca contenuti..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              style={styles.searchInput}
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.actionsRow}>
            <View style={styles.filterContainer}>
              <Text style={styles.filterLabel}>Tutti i contenuti</Text>
            </View>
            <Button onPress={() => handleNavigation('/admin/content/create')} variant="default">
              <Ionicons name="add" size={16} color="white" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Nuova Guida</Text>
            </Button>
            <Button onPress={() => {}} variant="outline">
              <Ionicons name="cloud-upload" size={16} color="#666" style={styles.buttonIcon} />
              <Text style={styles.outlineButtonText}>Carica File</Text>
            </Button>
          </View>
        </View>

        {/* Content Table */}
        <Card style={styles.contentCard}>
          <CardHeader>
            <CardTitle style={styles.cardTitle}>Guide e Contenuti</CardTitle>
            <Text style={styles.cardDescription}>
              {filteredGuides.length} di {guides.length} contenuti
            </Text>
          </CardHeader>
          <CardContent>
            <View style={styles.contentTable}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, styles.titleColumn]}>Titolo</Text>
                <Text style={[styles.tableHeaderText, styles.categoryColumn]}>Categoria</Text>
                <Text style={[styles.tableHeaderText, styles.typeColumn]}>Tipo</Text>
                <Text style={[styles.tableHeaderText, styles.statusColumn]}>Stato</Text>
                <Text style={[styles.tableHeaderText, styles.viewsColumn]}>Views</Text>
                <Text style={[styles.tableHeaderText, styles.actionsColumn]}>Azioni</Text>
              </View>
              
              {/* Table Body */}
              <View style={styles.tableBody}>
                {filteredGuides.map((guide) => (
                  <View key={guide.id} style={styles.tableRow}>
                    <View style={[styles.tableCell, styles.titleColumn]}>
                      <Text style={styles.guideTitle}>{guide.title}</Text>
                      <Text style={styles.guideDetails}>
                        {guide.duration} • {guide.difficulty} • {guide.author}
                      </Text>
                    </View>
                    
                    <View style={[styles.tableCell, styles.categoryColumn]}>
                      <Badge variant="default" style={styles.categoryBadge}>
                        <Text style={styles.badgeText}>{guide.category}</Text>
                      </Badge>
                    </View>
                    
                    <View style={[styles.tableCell, styles.typeColumn]}>
                      <View style={styles.typeContainer}>
                        <Ionicons name={getTypeIcon(guide.type) as any} size={16} color="#6b7280" />
                        <Text style={styles.typeText}>{guide.type}</Text>
                      </View>
                    </View>
                    
                    <View style={[styles.tableCell, styles.statusColumn]}>
                      <Badge variant={getStatusVariant(guide.status)}>
                        <Text style={styles.badgeText}>{getStatusLabel(guide.status)}</Text>
                      </Badge>
                    </View>
                    
                    <View style={[styles.tableCell, styles.viewsColumn]}>
                      <Text style={styles.viewsText}>{guide.views}</Text>
                    </View>
                    
                    <View style={[styles.tableCell, styles.actionsColumn]}>
                      <View style={styles.guideActions}>
                        <Button variant="outline" size="sm" onPress={() => handleNavigation(`/admin/content/${guide.id}`)}>
                          <Ionicons name="eye" size={16} color="#666" />
                        </Button>
                        <Button variant="outline" size="sm" onPress={() => handleNavigation(`/admin/content/${guide.id}/edit`)}>
                          <Ionicons name="create" size={16} color="#666" />
                        </Button>
                        <Button variant="outline" size="sm" onPress={() => {}}>
                          <Ionicons name="trash" size={16} color="#ef4444" />
                        </Button>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {filteredGuides.length === 0 && (
              <View style={styles.emptyState}>
                <Ionicons name="document-text" size={48} color="#9ca3af" style={styles.emptyIcon} />
                <Text style={styles.emptyTitle}>Nessun contenuto trovato</Text>
                <Text style={styles.emptyDescription}>Prova a modificare i filtri di ricerca</Text>
              </View>
            )}
          </CardContent>
        </Card>
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
  logo: {
    width: 120,
    height: 32,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
  },
  headerButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
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
  outlineButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    minWidth: 120,
    borderWidth: 1,
  },
  orangeCard: {
    borderColor: '#fed7aa', // ui-orange-200
    backgroundColor: '#fff7ed', // ui-orange-50
  },
  successCard: {
    borderColor: '#bbf7d0', // success-200
    backgroundColor: '#f0fdf4', // success-50
  },
  grayCard: {
    borderColor: '#e5e7eb', // gray-200
    backgroundColor: '#f9fafb', // gray-50
  },
  blueCard: {
    borderColor: '#bfdbfe', // ui-blue-200
    backgroundColor: '#eff6ff', // ui-blue-50
  },
  statCardContent: {
    padding: 24,
  },
  statCardInner: {
    alignItems: 'center',
    gap: 12,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orangeIcon: {
    backgroundColor: '#f97316', // ui-orange-500
  },
  successIcon: {
    backgroundColor: '#22c55e', // success-500
  },
  grayIcon: {
    backgroundColor: '#6b7280', // gray-500
  },
  blueIcon: {
    backgroundColor: '#3b82f6', // ui-blue-500
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  orangeValue: {
    color: '#9a3412', // ui-orange-900
  },
  successValue: {
    color: '#14532d', // success-900
  },
  grayValue: {
    color: '#374151', // gray-700
  },
  blueValue: {
    color: '#1e3a8a', // ui-blue-900
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  orangeLabel: {
    color: '#c2410c', // ui-orange-700
  },
  successLabel: {
    color: '#15803d', // success-700
  },
  grayLabel: {
    color: '#6b7280', // gray-500
  },
  blueLabel: {
    color: '#1d4ed8', // ui-blue-700
  },
  actionsBar: {
    gap: 16,
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
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  filterContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  filterLabel: {
    fontSize: 14,
    color: '#374151',
  },
  contentCard: {
    backgroundColor: 'white',
    marginBottom: 32,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  contentTable: {
    backgroundColor: 'white',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  tableBody: {
    backgroundColor: 'white',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    alignItems: 'center',
  },
  tableCell: {
    justifyContent: 'center',
  },
  titleColumn: {
    flex: 3,
  },
  categoryColumn: {
    flex: 1.5,
    alignItems: 'center',
  },
  typeColumn: {
    flex: 1.5,
  },
  statusColumn: {
    flex: 1.5,
    alignItems: 'center',
  },
  viewsColumn: {
    flex: 1,
    alignItems: 'center',
  },
  actionsColumn: {
    flex: 2,
  },
  guideTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  guideDetails: {
    fontSize: 14,
    color: '#6b7280',
  },
  categoryBadge: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typeText: {
    fontSize: 14,
    color: '#111827',
    textTransform: 'capitalize',
  },
  viewsText: {
    fontSize: 14,
    color: '#111827',
  },
  guideActions: {
    flexDirection: 'row',
    gap: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
}); 