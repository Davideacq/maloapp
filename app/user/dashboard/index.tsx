// Converted from malohr-platform/app/user/dashboard/page.tsx
// User dashboard with sessions, quick actions, and activity tracking for React Native
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Linking,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { AppIcon } from '../../../src/components/app-icon';
import { Badge } from '../../../src/components/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../src/components/card';
import { ImageCardCarousel } from '../../../src/components/image-card-carousel';
import { useScreenSize } from '../../../src/hooks/use-screen-size';

export default function UserDashboard() {
  const [user] = useState({
    name: 'Mario Rossi',
    company: 'Azienda SpA',
    sessionsRemaining: 8,
    nextSession: '15 Gen 2024, 14:30',
    completedSessions: 4,
  });

  const { isSmallScreen } = useScreenSize();

  const handleNavigation = (path: string) => {
    router.push(path as any);
  };

  const imageCards = [
    {
      image: require('../../../assets/images/suitetravel.jpg'),
      title: "Suite Travel x Malo",
      subtitle: "Al centro, le persone. Intorno, un mondo da rispettare",
      buttonText: "Vai al sito",
      onButtonPress: () => Linking.openURL('https://suitetravel.it/malotravel/'),
    },
    {
      image: require('../../../assets/images/hoover.png'),
      title: "Hoover & Haier",
      subtitle: "Persone al centro, anche a casa",
      buttonText: "Vai al sito",
      onButtonPress: () => Linking.openURL('https://www.haier-europe.com/it_IT/promozioni/malo-hr/?utm_source=malohr&utm_medium=referral&utm_campaign=malohr_livelug2025'),
    },
    {
      image: require('../../../assets/images/helkin.jpg'),
      title: "Helkin",
      subtitle: "Al centro, le persone. Intorno, un mondo da conoscere",
      buttonText: "Vai al sito",
      onButtonPress: () => Linking.openURL('https://www.helkin.it/maloviaggistudio/'),
    },
  ];

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      {/* Stats Cards */}
      <View style={[
        styles.statsGrid,
        isSmallScreen ? styles.statsGridVertical : styles.statsGridHorizontal
      ]}>
        <Card style={StyleSheet.flatten([styles.statCard, styles.orangeCard])}>
          <CardContent style={styles.statCardContent}>
            <View style={styles.statCardInner}>
              <View>
                <Text style={[styles.statLabel, styles.orangeLabel]}>Sessioni Rimanenti</Text>
                <Text style={[styles.statValue, styles.orangeValue]}>{user.sessionsRemaining}</Text>
              </View>
              <View style={[styles.statIcon, styles.orangeIcon]}>
                <AppIcon name="calendar" size={24} style={{ tintColor: 'white' }} />
              </View>
            </View>
          </CardContent>
        </Card>
        <Card style={StyleSheet.flatten([styles.statCard, styles.orangeCard])}>
          <CardContent style={styles.statCardContent}>
            <View style={styles.statCardInner}>
              <View>
                <Text style={[styles.statLabel, styles.orangeLabel]}>Sessioni Completate</Text>
                <Text style={[styles.statValue, styles.orangeValue]}>{user.completedSessions}</Text>
              </View>
              <View style={[styles.statIcon, styles.orangeIcon]}>
                <AppIcon name="user" size={24} style={{ tintColor: 'white' }} />
              </View>
            </View>
          </CardContent>
        </Card>
        <Card style={StyleSheet.flatten([styles.statCard, styles.orangeCard])}>
          <CardContent style={styles.statCardContent}>
            <View style={styles.statCardInner}>
              <View style={styles.nextSessionContent}>
                <Text style={[styles.statLabel, styles.orangeLabel]}>Prossima Sessione</Text>
                <Text style={[styles.nextSessionValue, styles.orangeValue]}>{user.nextSession}</Text>
              </View>
              <View style={[styles.statIcon, styles.orangeIcon]}>
                <AppIcon name="eye" size={24} style={{ tintColor: 'white' }} />
              </View>
            </View>
          </CardContent>
        </Card>
      </View>

      {/* Image Cards Section */}
      <ImageCardCarousel cards={imageCards} />

      {/* Quick Actions */}
      <View style={styles.actionsGrid}>
        <Pressable onPress={() => handleNavigation('/user/booking')} style={[styles.actionButton, styles.blueAction]}>
          <AppIcon name="calendar" size={20} style={{ tintColor: 'white', marginRight: 8 }} />
          <Text style={styles.actionText}>Prenota Sessione</Text>
        </Pressable>

        <Pressable onPress={() => handleNavigation('/user/guides')} style={[styles.actionButton, styles.tealAction]}>
          <Ionicons name="book" size={20} color="#14b8a6" />
          <Text style={[styles.actionText, styles.tealActionText]}>Guide Personalizzate</Text>
        </Pressable>

        <Pressable onPress={() => handleNavigation('/user/profile')} style={[styles.actionButton, styles.orangeAction]}>
          <Ionicons name="person" size={20} color="#f97316" />
          <Text style={[styles.actionText, styles.orangeActionText]}>Il Mio Profilo</Text>
        </Pressable>

        <Pressable onPress={() => handleNavigation('/user/sessions')} style={[styles.actionButton, styles.lightBlueAction]}>
          <Ionicons name="heart" size={20} color="#0ea5e9" />
          <Text style={[styles.actionText, styles.lightBlueActionText]}>Le Mie Sessioni</Text>
        </Pressable>
      </View>

      {/* Recent Activity */}
      <Card style={styles.activityCard}>
        <CardHeader>
          <CardTitle style={styles.cardTitle}>Attività Recente</CardTitle>
          <Text style={styles.cardDescription}>Le tue ultime interazioni con la piattaforma</Text>
        </CardHeader>
        <CardContent>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, styles.blueActivityIcon]}>
                <Ionicons name="calendar" size={20} color="white" />
              </View>
              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>Sessione completata</Text>
                <Text style={styles.activitySubtitle}>12 Gen 2024 - Dr.ssa Maria Bianchi</Text>
              </View>
              <Badge variant="success">
                <Text style={styles.badgeText}>Completata</Text>
              </Badge>
            </View>

            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, styles.tealActivityIcon]}>
                <Ionicons name="book" size={20} color="white" />
              </View>
              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>Guida completata</Text>
                <Text style={styles.activitySubtitle}>10 Gen 2024 - "Gestione dello Stress"</Text>
              </View>
              <Badge variant="default" style={styles.tealBadge}>
                <Text style={styles.badgeText}>Letta</Text>
              </Badge>
            </View>
          </View>
        </CardContent>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Add bottom padding to account for tab bar when needed
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statsGridHorizontal: {
    flexDirection: 'row',
    gap: 12,
  },
  statsGridVertical: {
    flexDirection: 'column',
    gap: 16,
  },
  statCard: {
    borderWidth: 1,
    flex: 1,
  },
  orangeCard: {
    borderColor: '#ffedd5', // ui-orange-100
    backgroundColor: '#ffffff', // white
  },
  statCardContent: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  statCardInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  orangeLabel: {
    color: '#c2410c', // ui-orange-700
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  orangeValue: {
    color: '#9a3412', // ui-orange-900
  },
  nextSessionContent: {
    flex: 1,
  },
  nextSessionValue: {
    fontSize: 14,
    fontWeight: '600',
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
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
    minWidth: 120,
    height: 64,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  blueAction: {
    backgroundColor: '#3b82f6', // ui-blue-500
  },
  tealAction: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#14b8a6', // ui-teal-500
  },
  orangeAction: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#f97316', // ui-orange-500
  },
  lightBlueAction: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#0ea5e9', // ui-lightBlue-500
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  tealActionText: {
    color: '#14b8a6',
  },
  orangeActionText: {
    color: '#f97316',
  },
  lightBlueActionText: {
    color: '#0ea5e9',
  },
  activityCard: {
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
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 12,
    borderRadius: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueActivityIcon: {
    backgroundColor: '#3b82f6', // ui-blue-500
  },
  tealActivityIcon: {
    backgroundColor: '#14b8a6', // ui-teal-500
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  tealBadge: {
    backgroundColor: '#14b8a6',
  },
  mobileImageCardsGrid: {
    flexDirection: 'column',
    gap: 16,
    marginBottom: 32,
  },
  mobileImageCard: {
    aspectRatio: 1,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 0,
  },
  mobileImageCardBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  mobileImageCardOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 18,
  },
  mobileImageCardContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    zIndex: 2,
  },
  mobileImageCardTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  mobileImageCardSubtitle: {
    color: 'white',
    fontSize: 14,
    marginBottom: 16,
  },
  mobileImageCardButton: {
    backgroundColor: '#22c55e',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  mobileImageCardButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
}); 