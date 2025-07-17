// Converted from app/user/guides/[id]/index.tsx
// Single guide page with cover image and placeholder content
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Breadcrumb } from '../../../../src/components/breadcrumb';
import { Card, CardContent } from '../../../../src/components/card';

const travelImage = require('../../../../assets/images/travel.jpg');

export default function GuidePage() {
  const { id } = useLocalSearchParams();

  // Dati mock per la guida - in futuro verranno dal database
  const guide = {
    id: Number(id),
    title: 'Tecniche di Respirazione per Ridurre lo Stress',
    description: 'Impara tecniche di respirazione efficaci per gestire momenti di stress acuto',
    category: 'stress',
    duration: '15 min',
    difficulty: 'Principiante',
    author: 'Dr.ssa Maria Rossi',
    content: `
# Introduzione

Questa guida ti accompagnerà nell'apprendimento di tecniche di respirazione efficaci per la gestione dello stress quotidiano.

## Tecnica 1: Respirazione Diaframmatica

La respirazione diaframmatica è una delle tecniche più efficaci per ridurre rapidamente i livelli di stress e ansia.

### Come praticarla:

1. Siediti comodamente o sdraiati
2. Posiziona una mano sul petto e una sull'addome
3. Inspira lentamente dal naso, facendo espandere l'addome
4. Espira lentamente dalla bocca, contraendo l'addome
5. Ripeti per 5-10 minuti

## Tecnica 2: Respirazione 4-7-8

Questa tecnica è particolarmente utile per calmare il sistema nervoso.

### Passaggi:

- Inspira per 4 secondi
- Trattieni il respiro per 7 secondi  
- Espira per 8 secondi
- Ripeti per 4 cicli

## Benefici

Le tecniche di respirazione offrono numerosi benefici:

- Riduzione immediata dello stress
- Miglioramento della concentrazione
- Regolazione del sistema nervoso
- Aumento del senso di calma e benessere

## Conclusioni

Pratica queste tecniche regolarmente per ottenere i migliori risultati. Ricorda che la costanza è la chiave del successo.
    `,
  };

  const handleBackToGuides = () => {
    router.push('/user/guides' as any);
  };

  const handleBackToDashboard = () => {
    router.push('/user/dashboard' as any);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Principiante': return '#10b981';
      case 'Intermedio': return '#f59e0b';
      case 'Avanzato': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Breadcrumb
        items={[
          { label: 'Home', onPress: handleBackToDashboard },
          { label: 'Guide Personalizzate', onPress: handleBackToGuides },
          { label: guide.title },
        ]}
      />

      <ScrollView style={styles.scrollView}>
        {/* Cover Image */}
        <View style={styles.coverContainer}>
          <Image source={travelImage} style={styles.coverImage} resizeMode="cover" />
          <View style={styles.coverOverlay}>
            <Pressable style={styles.backButton} onPress={handleBackToGuides}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
          </View>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {/* Guide Header */}
          <View style={styles.guideHeader}>
            <Text style={styles.guideTitle}>{guide.title}</Text>
            <Text style={styles.guideDescription}>{guide.description}</Text>
            
            <View style={styles.guideMetadata}>
              <View style={styles.metadataItem}>
                <Ionicons name="time" size={16} color="#6b7280" />
                <Text style={styles.metadataText}>{guide.duration}</Text>
              </View>
              
              <View style={styles.metadataItem}>
                <Ionicons name="person" size={16} color="#6b7280" />
                <Text style={styles.metadataText}>{guide.author}</Text>
              </View>
              
              <View style={styles.difficultyBadge}>
                <View 
                  style={[
                    styles.difficultyDot, 
                    { backgroundColor: getDifficultyColor(guide.difficulty) }
                  ]} 
                />
                <Text style={styles.difficultyText}>{guide.difficulty}</Text>
              </View>
            </View>
          </View>

          {/* Guide Content */}
          <Card style={styles.contentCard}>
            <CardContent style={styles.cardContent}>
              <Text style={styles.contentText}>{guide.content}</Text>
            </CardContent>
          </Card>
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
  breadcrumbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  breadcrumbLink: {
    color: '#3b82f6',
    fontWeight: 'bold',
    fontSize: 15,
  },
  breadcrumbSeparator: {
    color: '#6b7280',
    fontSize: 15,
  },
  breadcrumbCurrent: {
    color: '#111827',
    fontWeight: '500',
    fontSize: 15,
    flexShrink: 1,
  },
  scrollView: {
    flex: 1,
  },
  coverContainer: {
    position: 'relative',
    height: 240,
    backgroundColor: '#000',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    padding: 16,
  },
  guideHeader: {
    marginBottom: 24,
  },
  guideTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  guideDescription: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 16,
  },
  guideMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metadataText: {
    fontSize: 14,
    color: '#6b7280',
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  difficultyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  difficultyText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  contentCard: {
    backgroundColor: 'white',
  },
  cardContent: {
    padding: 24,
  },
  contentText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
}); 