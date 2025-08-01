// Converted from malohr-platform/app/user/sessions/page.tsx
// User sessions page with tabs for upcoming, completed sessions and package purchase
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppIcon } from '../../../src/components/app-icon';
import { Breadcrumb } from '../../../src/components/breadcrumb';
import { Button } from '../../../src/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../src/components/card';
import { useScreenSize } from '../../../src/hooks/use-screen-size';

export default function SessionsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const userStats = {
    totalSessions: 12,
    completedSessions: 4,
    remainingSessions: 8,
    nextSession: '15 Gen 2024, 14:30',
  };

  const upcomingSessions = [
    {
      id: 1,
      date: '15 Gen 2024',
      time: '14:30',
      psychologist: 'Dr.ssa Maria Bianchi',
      type: 'Online',
      status: 'confirmed',
    },
    {
      id: 2,
      date: '22 Gen 2024',
      time: '14:30',
      psychologist: 'Dr.ssa Maria Bianchi',
      type: 'Online',
      status: 'confirmed',
    },
  ];

  const completedSessions = [
    {
      id: 1,
      date: '12 Gen 2024',
      time: '14:30',
      psychologist: 'Dr.ssa Maria Bianchi',
      type: 'Online',
      duration: '50 min',
      notes: 'Sessione molto produttiva, progressi nella gestione dello stress',
    },
    {
      id: 2,
      date: '8 Gen 2024',
      time: '14:30',
      psychologist: 'Dr.ssa Maria Bianchi',
      type: 'Online',
      duration: '50 min',
      notes: 'Lavoro su tecniche di respirazione e mindfulness',
    },
    {
      id: 3,
      date: '3 Gen 2024',
      time: '14:30',
      psychologist: 'Dr.ssa Maria Bianchi',
      type: 'Online',
      duration: '50 min',
      notes: 'Prima sessione, valutazione iniziale completata',
    },
  ];

  const sessionPackages = [
    {
      id: 1,
      name: 'Pacchetto Base',
      sessions: 5,
      price: 250,
      description: 'Ideale per un supporto continuativo',
      popular: false,
    },
    {
      id: 2,
      name: 'Pacchetto Standard',
      sessions: 10,
      price: 450,
      description: 'Il più scelto dai nostri utenti',
      popular: true,
    },
    {
      id: 3,
      name: 'Pacchetto Premium',
      sessions: 20,
      price: 800,
      description: 'Per un percorso completo e approfondito',
      popular: false,
    },
  ];

  const handleBookSession = () => {
    router.push('/user/booking' as any);
  };

  const handlePurchasePackage = (packageId: number) => {
    router.push(`/user/payment/${packageId}` as any);
  };

  const handleBackToDashboard = () => {
    router.push('/user/dashboard' as any);
  };

  const renderUpcomingSession = ({ item }: { item: typeof upcomingSessions[0] }) => (
    <Card style={styles.sessionCard}>
      <CardContent style={styles.sessionContent}>
        <View style={styles.sessionHeader}>
          <View style={styles.sessionDate}>
            <Ionicons name="calendar" size={16} color="#3b82f6" />
            <Text style={styles.sessionDateText}>{item.date}</Text>
          </View>
          <View style={styles.sessionTime}>
            <Ionicons name="time" size={16} color="#6b7280" />
            <Text style={styles.sessionTimeText}>{item.time}</Text>
          </View>
        </View>
        <View style={styles.sessionInfo}>
          <Text style={styles.psychologistName}>{item.psychologist}</Text>
          <Text style={styles.sessionType}>{item.type}</Text>
        </View>
        <View style={styles.sessionStatus}>
          <View style={[styles.statusBadge, styles.confirmedBadge]}>
            <Text style={styles.statusText}>Confermata</Text>
          </View>
        </View>
      </CardContent>
    </Card>
  );

  const renderCompletedSession = ({ item }: { item: typeof completedSessions[0] }) => (
    <Card style={styles.sessionCard}>
      <CardContent style={styles.sessionContent}>
        <View style={styles.sessionHeader}>
          <View style={styles.sessionDate}>
            <Ionicons name="calendar" size={16} color="#3b82f6" />
            <Text style={styles.sessionDateText}>{item.date}</Text>
          </View>
          <View style={styles.sessionTime}>
            <Ionicons name="time" size={16} color="#6b7280" />
            <Text style={styles.sessionTimeText}>{item.time} • {item.duration}</Text>
          </View>
        </View>
        <View style={styles.sessionInfo}>
          <Text style={styles.psychologistName}>{item.psychologist}</Text>
          <Text style={styles.sessionType}>{item.type}</Text>
        </View>
        <Text style={styles.sessionNotes}>{item.notes}</Text>
      </CardContent>
    </Card>
  );

  const renderPackage = ({ item }: { item: typeof sessionPackages[0] }) => {
    const cardStyle = item.popular 
      ? { ...styles.packageCard, ...styles.popularPackage }
      : styles.packageCard;
    
    const buttonStyle = item.popular 
      ? { ...styles.purchaseButton, ...styles.popularButton }
      : styles.purchaseButton;

    return (
      <Card style={cardStyle}>
        {item.popular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>PIÙ POPOLARE</Text>
          </View>
        )}
        <CardHeader>
          <CardTitle style={styles.packageTitle}>{item.name}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <View style={styles.packagePricing}>
            <Text style={styles.packagePrice}>€{item.price}</Text>
            <Text style={styles.packageSessions}>{item.sessions} sessioni</Text>
          </View>
          <Text style={styles.pricePerSession}>
            €{Math.round(item.price / item.sessions)} per sessione
          </Text>
          <Button
            onPress={() => handlePurchasePackage(item.id)}
            style={buttonStyle}
          >
            Acquista Ora
          </Button>
        </CardContent>
      </Card>
    );
  };

  const { isSmallScreen } = useScreenSize();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Breadcrumb
          items={[
            { label: 'Home', onPress: handleBackToDashboard },
            { label: 'Le Mie Sessioni' },
          ]}
        />
        {/* Qui puoi aggiungere un bottone a destra se necessario, come in /user/profile */}
      </View>

      {/* Stats Overview */}
      <View style={styles.statsOverview}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userStats.totalSessions}</Text>
          <Text style={styles.statLabel}>Sessioni Totali</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userStats.completedSessions}</Text>
          <Text style={styles.statLabel}>Completate</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userStats.remainingSessions}</Text>
          <Text style={styles.statLabel}>Rimanenti</Text>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Prossime ({upcomingSessions.length})
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            Completate ({completedSessions.length})
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'packages' && styles.activeTab]}
          onPress={() => setActiveTab('packages')}
        >
          <Text style={[styles.tabText, activeTab === 'packages' && styles.activeTabText]}>
            Pacchetti
          </Text>
        </Pressable>
      </View>

      {/* Tab Content */}
      {activeTab === 'upcoming' && (
        <View style={styles.tabContent}>
          {upcomingSessions.length > 0 ? (
            <FlatList
              data={upcomingSessions}
              renderItem={renderUpcomingSession}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <AppIcon name="calendar" size={48} style={{ tintColor: '#9ca3af' }} />
              <Text style={styles.emptyStateTitle}>Nessuna sessione programmata</Text>
              <Text style={styles.emptyStateText}>
                Non hai sessioni programmate. Prenota la tua prossima sessione.
              </Text>
              <Button onPress={handleBookSession} style={styles.bookButton}>
                Prenota Sessione
              </Button>
            </View>
          )}
        </View>
      )}

      {activeTab === 'completed' && (
        <View style={styles.tabContent}>
          <FlatList
            data={completedSessions}
            renderItem={renderCompletedSession}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        </View>
      )}

      {activeTab === 'packages' && (
        <View style={[styles.tabContent, !isSmallScreen && { flexDirection: 'row', gap: 16 }]}> 
          {sessionPackages.map((pkg) => (
            <View key={pkg.id} style={!isSmallScreen ? { flex: 1 } : undefined}>
              {renderPackage({ item: pkg })}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Add bottom padding to account for tab bar
  },
  pageHeader: {
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#6b7280',
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
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#3b82f6',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeTabText: {
    color: 'white',
  },
  tabContent: {
    gap: 16,
  },
  sessionCard: {
    backgroundColor: 'white',
    marginBottom: 16,
  },
  sessionContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sessionDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sessionDateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  sessionTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sessionTimeText: {
    fontSize: 14,
    color: '#6b7280',
  },
  sessionInfo: {
    marginBottom: 12,
  },
  psychologistName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  sessionType: {
    fontSize: 14,
    color: '#6b7280',
  },
  sessionStatus: {
    alignItems: 'flex-start',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  confirmedBadge: {
    backgroundColor: '#dcfce7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#166534',
  },
  sessionNotes: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
    marginTop: 8,
  },
  packageCard: {
    backgroundColor: 'white',
    marginBottom: 16,
    position: 'relative',
    alignSelf: 'stretch',
  },
  popularPackage: {
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: 20,
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  popularText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  packageTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  packagePricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 4,
  },
  packagePrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },
  packageSessions: {
    fontSize: 16,
    color: '#6b7280',
  },
  pricePerSession: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
  },
  purchaseButton: {
    backgroundColor: '#f97316', // arancione
    borderColor: '#f97316',
    borderWidth: 1,
  },
  popularButton: {
    backgroundColor: '#f97316', // arancione anche per il bottone popolare
    borderColor: '#f97316',
    borderWidth: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  bookButton: {
    backgroundColor: '#3b82f6',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
}); 