// Converted from malohr-platform/app/psychologist/dashboard/page.tsx
// Psychologist dashboard with patients management and session tracking for React Native
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { AppIcon } from '../../../src/components/app-icon';
import { Badge } from '../../../src/components/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../src/components/card';
import { Notification, NotificationMenu } from '../../../src/components/notification-menu';

export default function PsychologistDashboard() {
  const [stats] = useState({
    totalPatients: 24,
    todaySessions: 6,
    weekSessions: 18,
    completedSessions: 142,
  });

  // Stato per il modal notifiche
  const [showNotifications, setShowNotifications] = useState(false);
  // Stato notifiche (esempio statico)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Nuova sessione assegnata',
      message: 'Hai una nuova sessione oggi alle 15:00.',
      timestamp: 'Oggi, 09:00',
      isRead: false,
      type: 'session',
    },
    {
      id: '2',
      title: 'Promemoria nota clinica',
      message: 'Ricordati di compilare la nota clinica per Mario Rossi.',
      timestamp: 'Ieri, 18:30',
      isRead: false,
      type: 'reminder',
    },
    {
      id: '3',
      title: 'Aggiornamento sistema',
      message: 'La piattaforma è stata aggiornata con nuove funzionalità.',
      timestamp: '2 giorni fa',
      isRead: true,
      type: 'system',
    },
  ]);

  // Funzioni per gestire notifiche
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));
  };
  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const recentPatients = [
    {
      id: 1,
      name: 'Mario Rossi',
      company: 'Azienda SpA',
      lastSession: 'Oggi',
      remaining: 7,
      totalSessions: 12,
      notes: 'Progressi nella gestione dello stress',
    },
    {
      id: 2,
      name: 'Laura Bianchi',
      company: 'Tech Solutions',
      lastSession: 'Ieri',
      remaining: 4,
      totalSessions: 10,
      notes: 'Lavoro su work-life balance',
    },
    {
      id: 3,
      name: 'Giuseppe Verdi',
      company: 'Marketing Pro',
      lastSession: '3 giorni fa',
      remaining: 8,
      totalSessions: 8,
      notes: 'Primo colloquio completato',
    },
    {
      id: 4,
      name: 'Anna Moretti',
      company: 'Finance Corp',
      lastSession: '1 settimana fa',
      remaining: 2,
      totalSessions: 15,
      notes: 'Fase conclusiva del percorso',
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path as any);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {/* Header Navigation */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require('../../../assets/images/malo-logo-dark.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.headerRight}>
            <Pressable 
              style={styles.headerButton}
              onPress={() => handleNavigation('/psychologist/calendar')}
            >
              <AppIcon name="calendar" size={20} style={{ marginRight: 8 }} />
              <Text style={styles.headerButtonText}>Calendario</Text>
            </Pressable>
            
            <Pressable style={styles.headerButton} onPress={() => setShowNotifications(true)}>
              <AppIcon name="bell" size={20} style={{ marginRight: 8 }} />
              <Badge variant="destructive" style={styles.notificationBadge}>
                {notifications.filter(n => !n.isRead).length}
              </Badge>
            </Pressable>
            
            <Pressable 
              style={styles.avatar}
              onPress={() => handleNavigation('/psychologist/profile')}
            >
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>MB</Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <Card style={StyleSheet.flatten([styles.statCard, styles.tealCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View>
                  <Text style={[styles.statLabel, styles.tealLabel]}>Pazienti Totali</Text>
                  <Text style={[styles.statValue, styles.tealValue]}>{stats.totalPatients}</Text>
                </View>
                <View style={[styles.statIcon, styles.tealIcon]}>
                  <Ionicons name="people" size={24} color="white" />
                </View>
              </View>
            </CardContent>
          </Card>

          <Card style={StyleSheet.flatten([styles.statCard, styles.blueCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View>
                  <Text style={[styles.statLabel, styles.blueLabel]}>Sessioni Oggi</Text>
                  <Text style={[styles.statValue, styles.blueValue]}>{stats.todaySessions}</Text>
                </View>
                <View style={[styles.statIcon, styles.blueIcon]}>
                  <Ionicons name="calendar" size={24} color="white" />
                </View>
              </View>
            </CardContent>
          </Card>

          <Card style={StyleSheet.flatten([styles.statCard, styles.successCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View>
                  <Text style={[styles.statLabel, styles.successLabel]}>Completate</Text>
                  <Text style={[styles.statValue, styles.successValue]}>{stats.completedSessions}</Text>
                </View>
                <View style={[styles.statIcon, styles.successIcon]}>
                  <Ionicons name="checkmark-circle" size={24} color="white" />
                </View>
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Recent Patients */}
        <Card style={styles.patientsCard}>
          <CardHeader>
            <CardTitle style={styles.cardTitle}>Pazienti Recenti</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.patientsList}>
              {recentPatients.map((patient) => (
                <View key={patient.id} style={styles.patientItem}>
                  <View style={styles.patientAvatar}>
                    <Text style={styles.patientInitials}>{getInitials(patient.name)}</Text>
                  </View>
                  <View style={styles.patientInfo}>
                    <Text style={styles.patientName}>{patient.name}</Text>
                    <Text style={styles.patientCompany}>{patient.company}</Text>
                    <Text style={styles.patientNotes}>{patient.notes}</Text>
                  </View>
                  <View style={styles.patientStats}>
                    <Text style={styles.patientRemaining}>{patient.remaining} rimanenti</Text>
                    <Text style={styles.patientLastSession}>{patient.lastSession}</Text>
                  </View>
                </View>
              ))}
            </View>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <View style={styles.actionsGrid}>
          <Pressable onPress={() => handleNavigation('/psychologist/patients')} style={[styles.actionButton, styles.tealAction]}>
            <Ionicons name="people" size={20} color="white" />
            <Text style={styles.actionText}>Gestione Pazienti</Text>
          </Pressable>

          <Pressable onPress={() => handleNavigation('/psychologist/notes')} style={[styles.actionButton, styles.blueAction]}>
            <Ionicons name="document-text" size={20} color="white" />
            <Text style={styles.actionText}>Note Cliniche</Text>
          </Pressable>

          <Pressable onPress={() => handleNavigation('/psychologist/guides')} style={[styles.actionButton, styles.successAction]}>
            <Ionicons name="library" size={20} color="white" />
            <Text style={styles.actionText}>Gestione Guide</Text>
          </Pressable>

          <Pressable onPress={() => handleNavigation('/psychologist/calendar')} style={[styles.actionButton, styles.orangeAction]}>
            <Ionicons name="calendar" size={20} color="white" />
            <Text style={styles.actionText}>Calendario</Text>
          </Pressable>
        </View>
      </ScrollView>
      <NotificationMenu
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onDelete={handleDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    paddingBottom: 32,
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    position: 'relative',
  },
  headerButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3b82f6',
    marginLeft: 6,
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
  },
  avatar: {
    marginLeft: 8,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    margin: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderWidth: 1,
  },
  tealCard: {
    borderColor: '#ccfbf1',
    backgroundColor: '#ffffff',
  },
  blueCard: {
    borderColor: '#dbeafe',
    backgroundColor: '#ffffff',
  },
  successCard: {
    borderColor: '#dcfce7',
    backgroundColor: '#ffffff',
  },
  statCardContent: {
    padding: 16,
  },
  statCardInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  tealLabel: {
    color: '#0f766e',
  },
  blueLabel: {
    color: '#1e40af',
  },
  successLabel: {
    color: '#15803d',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tealValue: {
    color: '#134e4a',
  },
  blueValue: {
    color: '#1e3a8a',
  },
  successValue: {
    color: '#14532d',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tealIcon: {
    backgroundColor: '#14b8a6',
  },
  blueIcon: {
    backgroundColor: '#3b82f6',
  },
  successIcon: {
    backgroundColor: '#22c55e',
  },
  patientsCard: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  patientsList: {
    gap: 16,
  },
  patientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
  },
  patientAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  patientInitials: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  patientCompany: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  patientNotes: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  patientStats: {
    alignItems: 'flex-end',
  },
  patientRemaining: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
  },
  patientLastSession: {
    fontSize: 12,
    color: '#6b7280',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginHorizontal: 16,
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
  tealAction: {
    backgroundColor: '#14b8a6',
  },
  blueAction: {
    backgroundColor: '#3b82f6',
  },
  successAction: {
    backgroundColor: '#22c55e',
  },
  orangeAction: {
    backgroundColor: '#f97316',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
}); 