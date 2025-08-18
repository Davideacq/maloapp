// Converted from malohr-platform/app/user/guides/page.tsx
// User guides page with filters and categories
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Breadcrumb } from '../../../src/components/breadcrumb';
import { ImageCardOverlay } from '../../../src/components/image-card-overlay';
import { Input } from '../../../src/components/input';
import { useScreenSize } from '../../../src/hooks/use-screen-size';
const travelImage = require('../../../assets/images/travel.jpg');

export default function GuidesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tutte', count: 0 },
  ];

  const guides: any[] = [];

  const filteredGuides = guides.filter((guide) => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBackToDashboard = () => {
    router.push('/user/dashboard' as any);
  };

  const handleGuidePress = (guideId: number) => {
    router.push(`/user/guides/${guideId}` as any);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return 'videocam';
      case 'audio': return 'headset';
      case 'article': return 'document-text';
      case 'interactive': return 'desktop';
      default: return 'document';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Principiante': return '#10b981';
      case 'Intermedio': return '#f59e0b';
      case 'Avanzato': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const renderCategory = ({ item }: { item: typeof categories[0] }) => (
    <Pressable
      onPress={() => setSelectedCategory(item.id)}
      style={[
        styles.categoryChip,
        selectedCategory === item.id && styles.selectedCategory
      ]}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === item.id && styles.selectedCategoryText
      ]}>
        {item.label} ({item.count})
      </Text>
    </Pressable>
  );

  const { isSmallScreen } = useScreenSize();

  return (
    <SafeAreaView style={styles.container}>
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Dashboard', onPress: handleBackToDashboard }, { label: 'Guide Personalizzate' }]} />

      <ScrollView style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Input
            placeholder="Cerca guide..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={styles.searchInput}
          />
          <Pressable style={styles.searchIcon}>
            <Ionicons name="search" size={20} color="#6b7280" />
          </Pressable>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categorie</Text>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Guides */}
        <View style={styles.guidesSection}>
          <Text style={styles.sectionTitle}>
            {filteredGuides.length} guide trovate
          </Text>
          <View style={isSmallScreen ? { gap: 20, marginBottom: 24 } : styles.gridContainer}>
            {filteredGuides.map((guide, idx) => {
              let desktopStyle = {};
              if (!isSmallScreen) {
                if (idx % 2 === 0) desktopStyle = { marginRight: 20 };
                const isLastRow = idx >= filteredGuides.length - 2;
                if (!isLastRow) desktopStyle = { ...desktopStyle, marginBottom: 20 };
              }
              return (
                <View
                  key={guide.id}
                  style={isSmallScreen ? { marginBottom: 20 } : [styles.gridItem, desktopStyle]}
                >
                  <ImageCardOverlay
                    image={travelImage}
                    title={guide.title}
                    subtitle={guide.description}
                    buttonText="Leggi guida"
                    onButtonPress={() => handleGuidePress(guide.id)}
                  />
                </View>
              );
            })}
          </View>
          {filteredGuides.length === 0 && (
            <Text style={styles.emptyText}>Nessuna guida disponibile</Text>
          )}
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
  content: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  searchInput: {
    paddingRight: 40,
  },
  searchIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  categoriesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  categoriesList: {
    paddingHorizontal: 4,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedCategory: {
    backgroundColor: '#f97316', // ui-orange-500
    borderColor: '#f97316', // ui-orange-500
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#f97316', // ui-orange-500
  },
  selectedCategoryText: {
    color: 'white',
  },
  guidesSection: {
    marginBottom: 24,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6b7280',
    fontStyle: 'italic',
    marginVertical: 32,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '48%',
  },
}); 