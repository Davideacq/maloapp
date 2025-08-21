// Converted from malohr-platform/app/psychologist/dashboard/page.tsx
// Psychologist dashboard with patients management and session tracking for React Native
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '../../../src/components/avatar';
import { Badge } from '../../../src/components/badge';
import { Breadcrumb } from '../../../src/components/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '../../../src/components/card';
import { Notification, NotificationMenu } from '../../../src/components/notification-menu';
import { useScreenSize } from '../../../src/hooks/use-screen-size';
import { getUser } from '../../../src/utils/auth';
import { api } from '../../../src/utils/api';

export default function PsychologistDashboard() {
  const { isSmallScreen, isMediumScreen } = useScreenSize();
  const [userName, setUserName] = useState<string>('');
  const [stats, setStats] = useState({
    activePatients: 0,
    todaySessions: 0,
    completedSessions: 0,
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
      department: 'HR',
      lastSession: 'Oggi, 15:00',
      nextSession: 'Giovedì, 14:30',
      remaining: 7,
      totalSessions: 12,
      completedSessions: 5,
      status: 'active',
      category: 'Gestione Stress',
      lastActivity: 'Completata sessione su tecniche di respirazione',
      progress: 42, // percentuale completamento
    },
    {
      id: 2,
      name: 'Laura Bianchi',
      company: 'Tech Solutions',
      department: 'Sviluppo',
      lastSession: 'Ieri, 16:00',
      nextSession: 'Venerdì, 10:00',
      remaining: 4,
      totalSessions: 10,
      completedSessions: 6,
      status: 'active',
      category: 'Work-Life Balance',
      lastActivity: 'Discussione su confini lavoro-vita privata',
      progress: 60,
    },
    {
      id: 3,
      name: 'Giuseppe Verdi',
      company: 'Marketing Pro',
      department: 'Marketing',
      lastSession: '3 giorni fa',
      nextSession: 'Lunedì, 11:00',
      remaining: 8,
      totalSessions: 8,
      completedSessions: 0,
      status: 'new',
      category: 'Primo Colloquio',
      lastActivity: 'Valutazione iniziale completata',
      progress: 0,
    },
    {
      id: 4,
      name: 'Anna Moretti',
      company: 'Finance Corp',
      department: 'Contabilità',
      lastSession: '1 settimana fa',
      nextSession: 'Martedì, 17:00',
      remaining: 2,
      totalSessions: 15,
      completedSessions: 13,
      status: 'concluding',
      category: 'Gestione Ansia',
      lastActivity: 'Preparazione per fase conclusiva',
      progress: 87,
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path as any);
  };

  useEffect(() => {
    (async () => {
      const user = await getUser();
      if (user) {
        const fullName = user.full_name && user.full_name.length > 0
          ? user.full_name
          : `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim();
        setUserName(fullName || 'Account');
      } else {
        setUserName('Account');
      }
      // Fetch live stats
      const res = await api.get<{ active_patients: number; sessions_today: number; sessions_completed: number }>(
        '/psychologists/stats/me'
      );
      if (res.ok && res.data) {
        setStats({
          activePatients: (res.data as any).active_patients ?? 0,
          todaySessions: (res.data as any).sessions_today ?? 0,
          completedSessions: (res.data as any).sessions_completed ?? 0,
        });
      }
    })();
  }, []);



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      {/* Header removed on mobile to use bottom tab navigation */}


      {/* Scrollable Content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <Card style={StyleSheet.flatten([styles.statCard, styles.tealCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View>
                  <Text style={[styles.statLabel, styles.tealLabel]}>Pazienti Attivi</Text>
                  <Text style={[styles.statValue, styles.tealValue]}>{stats.activePatients}</Text>
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
                  <Text style={[styles.statLabel, styles.successLabel]}>Sessioni Completate</Text>
                  <Text style={[styles.statValue, styles.successValue]}>{stats.completedSessions}</Text>
                </View>
                <View style={[styles.statIcon, styles.successIcon]}>
                  <Ionicons name="checkmark-circle" size={24} color="white" />
                </View>
              </View>
            </CardContent>
          </Card>
        </View>

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

        {/* Recent Patients */}
        <Card style={styles.patientsCard}>
          <CardHeader>
            <CardTitle style={styles.cardTitle}>Pazienti Recenti</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.patientsList}>
              {recentPatients.map((patient) => (
                <View key={patient.id} style={styles.patientItem}>
                  <View style={styles.patientHeader}>
                    <Avatar
                      alt={patient.name}
                      size="sm"
                    />
                    <View style={styles.patientInfo}>
                      <View style={styles.patientNameRow}>
                        <Text style={styles.patientName}>{patient.name}</Text>
                        <Badge 
                          variant={patient.status === 'active' ? 'success' : 
                                   patient.status === 'new' ? 'secondary' : 'warning'}
                          style={styles.statusBadge}
                        >
                          {patient.status === 'active' ? 'Attivo' : 
                           patient.status === 'new' ? 'Nuovo' : 'Conclusione'}
                        </Badge>
                      </View>
                      <Text style={styles.patientCompany}>{patient.company} • {patient.department}</Text>
                      <Text style={styles.patientCategory}>{patient.category}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.patientProgress}>
                    <View style={styles.progressHeader}>
                      <Text style={styles.progressText}>Progresso: {patient.progress}%</Text>
                      <Text style={styles.sessionsText}>{patient.completedSessions}/{patient.totalSessions} sessioni</Text>
                    </View>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: `${patient.progress}%` }]} />
                    </View>
                  </View>
                  
                  <View style={styles.patientActivity}>
                    <Text style={styles.lastActivityLabel}>Ultima attività:</Text>
                    <Text style={styles.lastActivityText}>{patient.lastActivity}</Text>
                  </View>
                  
                  <View style={styles.patientSessions}>
                    <View style={styles.sessionInfo}>
                      <Text style={styles.sessionLabel}>Ultima sessione:</Text>
                      <Text style={styles.sessionText}>{patient.lastSession}</Text>
                    </View>
                    <View style={styles.sessionInfo}>
                      <Text style={styles.sessionLabel}>Prossima sessione:</Text>
                      <Text style={styles.sessionText}>{patient.nextSession}</Text>
                    </View>
                    <View style={styles.sessionInfo}>
                      <Text style={styles.sessionLabel}>Sessioni rimanenti:</Text>
                      <Text style={styles.sessionText}>{patient.remaining}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.patientActions}>
                    <Pressable style={styles.patientActionButton}>
                      <Ionicons name="calendar" size={16} color="#3b82f6" />
                      <Text style={styles.actionButtonText}>Calendario</Text>
                    </Pressable>
                    <Pressable style={styles.patientActionButton}>
                      <Ionicons name="document-text" size={16} color="#10b981" />
                      <Text style={styles.actionButtonText}>Note</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </CardContent>
        </Card>
      </ScrollView>
      
      <NotificationMenu
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onDelete={handleDelete}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  header: {
    // removed (header not used on mobile)
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
  headerRightSmall: {
    gap: 8,
  },

  // Stili legacy per compatibilità (da rimuovere in futuro)
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
  profileContainer: {
    position: 'relative',
    zIndex: 1001,
  },
  profileButton: {
    cursor: 'pointer',
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  profileButtonPressed: {
    opacity: 0.7,
    backgroundColor: '#f3f4f6',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 40,
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'center',
    borderRadius: 8,
  },
  profileInfoSmall: {
    height: 30,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  userName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
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
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  patientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  patientInfo: {
    flex: 1,
  },
  patientNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  statusBadge: {
    marginLeft: 8,
  },
  patientCategory: {
    fontSize: 12,
    color: '#8b5cf6',
    fontWeight: '500',
  },
  patientProgress: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  sessionsText: {
    fontSize: 12,
    color: '#6b7280',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 3,
  },
  patientActivity: {
    marginBottom: 12,
  },
  lastActivityLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  lastActivityText: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
  },
  patientSessions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  sessionText: {
    fontSize: 12,
    color: '#6b7280',
  },
  patientActions: {
    flexDirection: 'row',
    gap: 8,
  },
  patientActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
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
  calendarIndicator: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#14b5e2',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  indicatorText: {
    fontSize: 11,
    fontWeight: '700',
    color: 'white',
  },
  notificationButton: {
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
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: 'white',
  },
}); 