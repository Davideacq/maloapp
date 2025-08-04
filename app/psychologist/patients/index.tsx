// Converted from malohr-platform/app/psychologist/patients/page.tsx
// Psychologist patients management page with comprehensive patient profiles for React Native
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '../../../src/components/avatar';
import { Badge } from '../../../src/components/badge';
import { Breadcrumb } from '../../../src/components/breadcrumb';
import { Button } from '../../../src/components/button';
import { Card, CardContent } from '../../../src/components/card';
import { Image } from 'react-native';

export default function PsychologistPatientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('all');

  const companies = [
    { id: 'all', name: 'Tutte le aziende' },
    { id: 'azienda-spa', name: 'Azienda SpA' },
    { id: 'tech-solutions', name: 'Tech Solutions' },
    { id: 'marketing-pro', name: 'Marketing Pro' },
    { id: 'finance-corp', name: 'Finance Corp' },
  ];

  const patients = [
    {
      id: 1,
      name: 'Mario Rossi',
      email: 'mario.rossi@azienda.com',
      company: 'Azienda SpA',
      department: 'Marketing',
      startDate: '15 Gen 2024',
      lastSession: '12 Gen 2024',
      nextSession: '15 Gen 2024, 14:30',
      sessionsCompleted: 4,
      sessionsRemaining: 8,
      totalSessions: 12,
      status: 'active',
      notes: 'Progressi nella gestione dello stress lavorativo. Risponde bene alle tecniche di respirazione.',
      goals: ['Ridurre stress', 'Migliorare concentrazione'],
    },
    {
      id: 2,
      name: 'Laura Bianchi',
      email: 'laura.bianchi@techsolutions.com',
      company: 'Tech Solutions',
      department: 'Sviluppo',
      startDate: '10 Gen 2024',
      lastSession: '11 Gen 2024',
      nextSession: '16 Gen 2024, 15:00',
      sessionsCompleted: 2,
      sessionsRemaining: 8,
      totalSessions: 10,
      status: 'active',
      notes: 'Lavoro su work-life balance. Difficoltà nel gestire i carichi di lavoro intensi.',
      goals: ['Work-life balance', 'Gestione tempo'],
    },
    {
      id: 3,
      name: 'Giuseppe Verdi',
      email: 'giuseppe.verdi@marketingpro.com',
      company: 'Marketing Pro',
      department: 'Vendite',
      startDate: '8 Gen 2024',
      lastSession: '9 Gen 2024',
      nextSession: 'Non programmata',
      sessionsCompleted: 1,
      sessionsRemaining: 7,
      totalSessions: 8,
      status: 'paused',
      notes: 'Primo colloquio completato. Valutazione iniziale positiva. In attesa di programmazione.',
      goals: ['Ansia da prestazione', 'Comunicazione'],
    },
    {
      id: 4,
      name: 'Anna Moretti',
      email: 'anna.moretti@financecorp.com',
      company: 'Finance Corp',
      department: 'Finanza',
      startDate: '5 Gen 2024',
      lastSession: '10 Gen 2024',
      nextSession: '17 Gen 2024, 16:30',
      sessionsCompleted: 13,
      sessionsRemaining: 2,
      totalSessions: 15,
      status: 'completing',
      notes: 'Fase conclusiva del percorso. Ottimi risultati raggiunti nella gestione dell\'ansia.',
      goals: ['Consolidamento risultati'],
    },
  ];

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