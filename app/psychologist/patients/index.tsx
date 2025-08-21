// Converted from malohr-platform/app/psychologist/patients/page.tsx
// Psychologist patients management page with comprehensive patient profiles for React Native
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '../../../src/components/avatar';
import { Badge } from '../../../src/components/badge';
import { Breadcrumb } from '../../../src/components/breadcrumb';
import { Button } from '../../../src/components/button';
import { Card, CardContent } from '../../../src/components/card';
import { getToken } from '../../../src/utils/auth';
import { formatDateIT } from '../../../src/utils/date';


export default function PsychologistPatientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // PRODUZIONE:
  // - Sposta l'URL base in `EXPO_PUBLIC_API_URL`
  // - Usa HTTPS e abilita correttamente CORS sul dominio API
  const API_BASE = 'http://127.0.0.1:8000/api';

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError('');
        const token = await getToken();
        if (!token) {
          setError('Token mancante: effettua di nuovo il login.');
          setLoading(false);
          return;
        }

        // 1) Recupera id psicologo corrente
        const meResp = await fetch(`${API_BASE}/psychologists/me`, {
          headers: {
            'Authorization': token,
            'Accept': 'application/json',
          },
        });
        const meData = await meResp.json();
        if (!meData?.success || !meData?.data?.id) {
          setError(meData?.message || 'Impossibile recuperare il profilo psicologo');
          setLoading(false);
          return;
        }
        const psychologistId = meData.data.id as number;

        // 2) Recupera pazienti dello psicologo
        const resp = await fetch(`${API_BASE}/psychologists/${psychologistId}/patients`, {
          headers: {
            'Authorization': token,
            'Accept': 'application/json',
          },
        });
        const data = await resp.json();
        if (!data?.success) {
          setError(data?.message || 'Errore durante il caricamento dei pazienti');
          setLoading(false);
          return;
        }

        // Mappa i pazienti API nella struttura UI
        const mapped = (data.data as any[]).map((p) => ({
          id: p.id,
          name: p.user?.full_name || 'Senza nome',
          email: p.user?.email || '',
          company: p.user?.company?.name || '—',
          department: p.user?.department || '—',
          startDate: formatDateIT(p.start_date) || '—',
          lastSession: formatDateIT(p.last_session_date) || '—',
          nextSession: formatDateIT(p.next_session_date) || '—',
          sessionsCompleted: p.completed_sessions ?? 0,
          sessionsRemaining: Math.max((p.total_sessions ?? 0) - (p.completed_sessions ?? 0), 0),
          totalSessions: p.total_sessions ?? 0,
          status: p.status || 'active',
          notes: p.notes || '',
          goals: [],
        }));
        setPatients(mapped);
      } catch (e: any) {
        setError(e?.message || 'Errore imprevisto');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCompany =
      selectedCompany === 'all' || patient.company.toLowerCase().replace(/\s+/g, '-') === selectedCompany;

    return matchesSearch && matchesCompany;
  });

  const stats = {
    totalPatients: patients.length,
    activePatients: patients.filter((p) => p.status === 'active').length,
    completingPatients: patients.filter((p) => p.status === 'completing').length,
    pausedPatients: patients.filter((p) => p.status === 'paused').length,
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'completing':
        return 'default';
      case 'paused':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Attivo';
      case 'completing':
        return 'In Conclusione';
      case 'paused':
        return 'In Pausa';
      default:
        return status;
    }
  };

  const handleNavigation = (path: string) => {
    router.push(path as any);
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
          <Breadcrumb
            items={[
              { label: 'Dashboard', onPress: handleBackToDashboard },
              { label: 'Gestione Pazienti' },
            ]}
          />
        </View>
        <View style={styles.headerRight}>
          <Button onPress={() => {}} variant="outline" size="sm">
            <Ionicons name="filter" size={16} color="#666" style={styles.buttonIcon} />
            <Text style={styles.outlineButtonText}>Filtri</Text>
          </Button>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <Card style={StyleSheet.flatten([styles.statCard, styles.tealCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View style={[styles.statIcon, styles.tealIcon]}>
                  <Ionicons name="people" size={24} color="white" />
                </View>
                <Text style={[styles.statValue, styles.tealValue]}>{stats.totalPatients}</Text>
                <Text style={[styles.statLabel, styles.tealLabel]}>Pazienti Totali</Text>
              </View>
            </CardContent>
          </Card>

          <Card style={StyleSheet.flatten([styles.statCard, styles.successCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View style={[styles.statIcon, styles.successIcon]}>
                  <Ionicons name="people" size={24} color="white" />
                </View>
                <Text style={[styles.statValue, styles.successValue]}>{stats.activePatients}</Text>
                <Text style={[styles.statLabel, styles.successLabel]}>Pazienti Attivi</Text>
              </View>
            </CardContent>
          </Card>

          <Card style={StyleSheet.flatten([styles.statCard, styles.blueCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View style={[styles.statIcon, styles.blueIcon]}>
                  <Ionicons name="calendar" size={24} color="white" />
                </View>
                <Text style={[styles.statValue, styles.blueValue]}>{stats.completingPatients}</Text>
                <Text style={[styles.statLabel, styles.blueLabel]}>In Conclusione</Text>
              </View>
            </CardContent>
          </Card>

          <Card style={StyleSheet.flatten([styles.statCard, styles.warningCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View style={[styles.statIcon, styles.warningIcon]}>
                  <Ionicons name="people" size={24} color="white" />
                </View>
                <Text style={[styles.statValue, styles.warningValue]}>{stats.pausedPatients}</Text>
                <Text style={[styles.statLabel, styles.warningLabel]}>In Pausa</Text>
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Actions Bar */}
        <View style={styles.actionsBar}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={16} color="#9ca3af" style={styles.searchIcon} />
            <TextInput
              placeholder="Cerca pazienti per nome o email..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              style={styles.searchInput}
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.actionsRow}>
            <View style={styles.filterContainer}>
              <Text style={styles.filterLabel}>Tutte le aziende</Text>
            </View>
            <Button onPress={() => {}} variant="outline">
              <Ionicons name="filter" size={16} color="#666" style={styles.buttonIcon} />
              <Text style={styles.outlineButtonText}>Filtri Avanzati</Text>
            </Button>
            <Button onPress={() => {}} variant="default">
              <Ionicons name="add" size={16} color="white" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Nuovo Paziente</Text>
            </Button>
          </View>
        </View>

        {/* Patients List */}
        {loading && (
          <Card style={styles.emptyCard}>
            <CardContent style={styles.emptyContent}>
              <Ionicons name="hourglass" size={32} color="#9ca3af" style={styles.emptyIcon} />
              <Text style={styles.emptyTitle}>Caricamento pazienti...</Text>
            </CardContent>
          </Card>
        )}
        {!!error && !loading && (
          <Card style={styles.emptyCard}>
            <CardContent style={styles.emptyContent}>
              <Ionicons name="alert-circle" size={32} color="#ef4444" style={styles.emptyIcon} />
              <Text style={styles.emptyTitle}>Errore</Text>
              <Text style={styles.emptyDescription}>{error}</Text>
            </CardContent>
          </Card>
        )}
        <View style={styles.patientsList}>
          {filteredPatients.map((patient) => (
            <Card key={patient.id} style={styles.patientCard}>
              <CardContent style={styles.patientCardContent}>
                <View style={styles.patientHeader}>
                                  <View style={styles.patientInfo}>
                  <Avatar
                    alt={patient.name}
                    size="md"
                  />
                  <View style={styles.patientDetails}>
                    <Text style={styles.patientName}>{patient.name}</Text>
                    <Text style={styles.patientEmail}>{patient.email}</Text>
                    <Text style={styles.patientCompany}>
                      {patient.company} • {patient.department}
                    </Text>
                  </View>
                </View>
                  <View style={styles.patientActions}>
                    <Badge variant={getStatusVariant(patient.status)}>
                      <Text style={styles.badgeText}>{getStatusLabel(patient.status)}</Text>
                    </Badge>
                    <View style={styles.actionButtons}>
                      <Button size="sm" variant="outline" onPress={() => {}}>
                        <Ionicons name="calendar" size={16} color="#666" />
                      </Button>
                      <Button size="sm" variant="outline" onPress={() => {}}>
                        <Ionicons name="document-text" size={16} color="#666" />
                      </Button>
                      <Button size="sm" onPress={() => {}}>
                        <Ionicons name="create" size={16} color="white" />
                      </Button>
                    </View>
                  </View>
                </View>

                <View style={styles.patientMetrics}>
                  <View style={styles.metric}>
                    <Text style={styles.metricLabel}>Inizio Percorso</Text>
                    <Text style={styles.metricValue}>{patient.startDate}</Text>
                  </View>
                  <View style={styles.metric}>
                    <Text style={styles.metricLabel}>Ultima Sessione</Text>
                    <Text style={styles.metricValue}>{patient.lastSession}</Text>
                  </View>
                  <View style={styles.metric}>
                    <Text style={styles.metricLabel}>Prossima Sessione</Text>
                    <Text style={styles.metricValue}>{patient.nextSession}</Text>
                  </View>
                  <View style={styles.metric}>
                    <Text style={styles.metricLabel}>Sessioni</Text>
                    <Text style={styles.metricValue}>
                      {patient.sessionsCompleted}/{patient.totalSessions} completate
                    </Text>
                  </View>
                </View>

                <View style={styles.progressSection}>
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>Progresso</Text>
                    <Text style={styles.progressPercentage}>
                      {Math.round((patient.sessionsCompleted / patient.totalSessions) * 100)}%
                    </Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${(patient.sessionsCompleted / patient.totalSessions) * 100}%` },
                      ]}
                    />
                  </View>
                </View>

                <View style={styles.goalsSection}>
                  <Text style={styles.goalsLabel}>Obiettivi</Text>
                  <View style={styles.goalsList}>
                    {patient.goals.map((goal, index) => (
                      <Badge key={index} variant="outline" style={styles.goalBadge}>
                        <Text style={styles.goalText}>{goal}</Text>
                      </Badge>
                    ))}
                  </View>
                </View>

                <View style={styles.notesSection}>
                  <Text style={styles.notesLabel}>Note Cliniche</Text>
                  <Text style={styles.notesText}>{patient.notes}</Text>
                </View>
              </CardContent>
            </Card>
          ))}
        </View>

        {filteredPatients.length === 0 && (
          <Card style={styles.emptyCard}>
            <CardContent style={styles.emptyContent}>
              <Ionicons name="people" size={48} color="#9ca3af" style={styles.emptyIcon} />
              <Text style={styles.emptyTitle}>Nessun paziente trovato</Text>
              <Text style={styles.emptyDescription}>
                Prova a modificare i filtri di ricerca o aggiungi un nuovo paziente
              </Text>
            </CardContent>
          </Card>
        )}
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

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f766e', // ui-teal-900
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
  tealCard: {
    borderColor: '#5eead4', // ui-teal-200
    backgroundColor: '#f0fdfa', // ui-teal-50
  },
  successCard: {
    borderColor: '#bbf7d0', // success-200
    backgroundColor: '#f0fdf4', // success-50
  },
  blueCard: {
    borderColor: '#bfdbfe', // ui-blue-200
    backgroundColor: '#eff6ff', // ui-blue-50
  },
  warningCard: {
    borderColor: '#fde68a', // warning-200
    backgroundColor: '#fffbeb', // warning-50
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
  tealIcon: {
    backgroundColor: '#14b8a6', // ui-teal-500
  },
  successIcon: {
    backgroundColor: '#22c55e', // success-500
  },
  blueIcon: {
    backgroundColor: '#3b82f6', // ui-blue-500
  },
  warningIcon: {
    backgroundColor: '#f59e0b', // warning-500
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tealValue: {
    color: '#0f766e', // ui-teal-900
  },
  successValue: {
    color: '#14532d', // success-900
  },
  blueValue: {
    color: '#1e3a8a', // ui-blue-900
  },
  warningValue: {
    color: '#92400e', // warning-900
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  tealLabel: {
    color: '#0d9488', // ui-teal-700
  },
  successLabel: {
    color: '#15803d', // success-700
  },
  blueLabel: {
    color: '#1d4ed8', // ui-blue-700
  },
  warningLabel: {
    color: '#d97706', // warning-700
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
  patientsList: {
    gap: 24,
  },
  patientCard: {
    backgroundColor: 'white',
  },
  patientCardContent: {
    padding: 24,
  },
  patientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    flex: 1,
  },

  patientDetails: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  patientEmail: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  patientCompany: {
    fontSize: 14,
    color: '#6b7280',
  },
  patientActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
  patientMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metric: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
  },
  progressFill: {
    height: 8,
    backgroundColor: '#14b8a6', // ui-teal-500
    borderRadius: 4,
  },
  goalsSection: {
    marginBottom: 16,
  },
  goalsLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  goalsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  goalBadge: {
    borderColor: '#14b8a6', // ui-teal-500
    backgroundColor: 'transparent',
  },
  goalText: {
    color: '#14b8a6', // ui-teal-500
    fontSize: 12,
    fontWeight: '500',
  },
  notesSection: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 12,
  },
  notesLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#374151',
  },
  emptyCard: {
    backgroundColor: 'white',
  },
  emptyContent: {
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
    textAlign: 'center',
  },
}); 