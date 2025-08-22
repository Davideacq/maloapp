// Converted from malohr-platform/app/user/booking/page.tsx
// User booking page with psychologist selection and appointment scheduling for React Native
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { Breadcrumb } from '../../../src/components/breadcrumb';
import { Button } from '../../../src/components/button';
import { Card, CardContent, CardHeader } from '../../../src/components/card';
import { useIsMobile } from '../../../src/hooks/use-mobile';

export default function BookingPage() {
  const [selectedPsychologist, setSelectedPsychologist] = useState<string | null>(null);

  const psychologists = [
    {
      id: '1',
      name: 'WorkCare',
      specialization: 'Supporto psicologico per il benessere lavorativo',
      availability: 'Disponibile questa settimana',
    },
    {
      id: '2',
      name: 'Accompagnamento alla Leadership',
      specialization: 'Percorsi di crescita e sviluppo della leadership',
      availability: 'Disponibile da lunedì prossimo',
    },
    {
      id: '3',
      name: "Sportello d'ascolto",
      specialization: 'Spazio di ascolto e supporto per ogni esigenza',
      availability: 'Disponibile oggi',
    },
  ];

  const CalendlyPlaceholder = ({ psychologistId }: { psychologistId: string }) => {
    return (
      <View style={styles.calendlyContainer}>
        <View style={styles.calendlyContent}>
          <Ionicons name="calendar" size={48} color="#3b82f6" style={styles.calendlyIcon} />
          <Text style={styles.calendlyTitle}>Calendario di Prenotazione</Text>
          <Text style={styles.calendlyDescription}>
            Qui verrà integrato il widget Calendly per la prenotazione delle sessioni
          </Text>
          <Button onPress={() => {}} style={styles.calendlyButton}>
            <Text style={styles.buttonText}>Prenota Sessione</Text>
          </Button>
        </View>
      </View>
    );
  };

  const handleNavigation = (path: string) => {
    router.push(path as any);
  };

  const handleBackToDashboard = () => {
    router.push('/user/dashboard' as any);
  };

  const selectedPsych = psychologists.find((p) => p.id === selectedPsychologist);
  const isMobile = useIsMobile();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Breadcrumb - Removed for mobile app */}
        {/* <Breadcrumb
          items={[
            { label: 'Home', onPress: handleBackToDashboard },
            { label: 'Prenota una Sessione' },
          ]}
        /> */}
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {!selectedPsychologist ? (
          <>
            {/* Psychologist Selection */}
            <View style={styles.selectionSection}>
              <Text style={styles.sectionTitle}>Scegli il servizio adatto a te</Text>
              <Text style={styles.sectionDescription}>
                Seleziona il servizio più adatto alle tue esigenze per prenotare una sessione
              </Text>
            </View>

            <View
              style={[
                styles.psychologistGrid,
                isMobile
                  ? { flexDirection: 'column' }
                  : { flexDirection: 'row', flexWrap: 'wrap', gap: 24, justifyContent: 'space-between' },
              ]}
            >
              {psychologists.map((psychologist) => (
                <Pressable
                  key={psychologist.id}
                  onPress={() => setSelectedPsychologist(psychologist.id)}
                  style={[
                    styles.psychologistCard,
                    !isMobile && { flexBasis: '32%', minWidth: 280, flexGrow: 1, maxWidth: '32%' },
                  ]}
                >
                  <Card style={[styles.card, !isMobile && { height: '100%' }]}> 
                    <CardHeader style={styles.cardHeader}>
                      <Text style={styles.psychologistName}>{psychologist.name}</Text>
                      <Text style={styles.psychologistSpecialization}>{psychologist.specialization}</Text>
                    </CardHeader>
                    <CardContent style={styles.cardContent}>
                      <View style={styles.availabilityContainer}>
                        <Ionicons name="time" size={16} color="#22c55e" />
                        <Text style={styles.availability}>{psychologist.availability}</Text>
                      </View>
                      <Button onPress={() => setSelectedPsychologist(psychologist.id)} style={styles.selectButton}>
                        <Text style={styles.buttonText}>Seleziona e Prenota</Text>
                      </Button>
                    </CardContent>
                  </Card>
                </Pressable>
              ))}
            </View>

            {/* Info Section */}
            <Card style={StyleSheet.flatten([styles.card, styles.infoCard, isMobile && { marginBottom: 80 }])}>
              <CardHeader>
                <Text style={styles.infoCardTitle}>Come Funziona</Text>
              </CardHeader>
              <CardContent style={styles.infoCardContent}>
                <View
                  style={[
                    styles.stepsGrid,
                    !isMobile && { flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', gap: 48 },
                  ]}
                >
                  <View style={styles.step}>
                    <View style={styles.stepIcon}>
                      <Ionicons name="person" size={24} color="white" />
                    </View>
                    <Text style={styles.stepNumber}>1. Scegli</Text>
                    <Text style={styles.stepDescription}>
                      Seleziona il servizio più adatto alle tue esigenze
                    </Text>
                  </View>
                  <View style={styles.step}>
                    <View style={styles.stepIcon}>
                      <Ionicons name="calendar" size={24} color="white" />
                    </View>
                    <Text style={styles.stepNumber}>2. Prenota</Text>
                    <Text style={styles.stepDescription}>
                      Scegli data e orario che preferisci dal calendario disponibile
                    </Text>
                  </View>
                  <View style={styles.step}>
                    <View style={styles.stepIcon}>
                      <Ionicons name="time" size={24} color="white" />
                    </View>
                    <Text style={styles.stepNumber}>3. Partecipa</Text>
                    <Text style={styles.stepDescription}>
                      Riceverai il link per la sessione online o l'indirizzo per quella in presenza
                    </Text>
                  </View>
                </View>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Booking Interface */}
            <View style={styles.bookingSection}>
              <Button
                variant="outline"
                onPress={() => setSelectedPsychologist(null)}
                style={styles.changeButton}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="arrow-back" size={16} color="#666" style={styles.buttonIcon} />
                  <Text style={styles.outlineButtonText}>Cambia Servizio</Text>
                </View>
              </Button>
              <Text style={styles.bookingTitle}>Prenota una sessione di {selectedPsych?.name}</Text>
              <Text style={styles.bookingDescription}>Seleziona data e orario per la tua sessione</Text>
            </View>

            <View style={styles.bookingGrid}>
              {/* Psychologist Info */}
              <Card style={styles.psychInfoCard}>
                <CardHeader style={styles.psychInfoHeader}>
                  <View style={styles.psychInfoAvatar}>
                    <Ionicons name="person" size={40} color="white" />
                  </View>
                  <Text style={styles.psychInfoName}>{selectedPsych?.name}</Text>
                  <Text style={styles.psychInfoSpecialization}>{selectedPsych?.specialization}</Text>
                </CardHeader>
                <CardContent style={styles.psychInfoContent}>
                  {/* Solo descrizione servizio e disponibilità */}
                  <View style={styles.availabilityCard}>
                    <View style={styles.availabilityRow}>
                      <Ionicons name="time" size={16} color="#22c55e" />
                      <Text style={styles.availabilityText}>{selectedPsych?.availability}</Text>
                    </View>
                  </View>
                </CardContent>
              </Card>

              {/* Calendly Embed */}
              <Card style={styles.calendarCard}>
                <CardHeader>
                  <Text style={styles.calendarTitle}>Seleziona Data e Orario</Text>
                  <Text style={styles.calendarDescription}>Scegli il momento più comodo per la tua sessione</Text>
                </CardHeader>
                <CardContent>
                  <CalendlyPlaceholder psychologistId={selectedPsychologist} />
                </CardContent>
              </Card>
            </View>
          </>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e3a8a', // ui-blue-900
  },
  buttonIcon: {
    marginRight: 4,
    alignSelf: 'center',
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
    textAlignVertical: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  selectionSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#6b7280',
  },
  psychologistGrid: {
    gap: 24,
    marginBottom: 32,
  },
  psychologistCard: {
    marginBottom: 0,
  },
  card: {
    backgroundColor: 'white',
  },
  cardHeader: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  psychologistAvatar: {
    width: 80,
    height: 80,
    backgroundColor: '#3b82f6',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  psychologistName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  psychologistSpecialization: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    alignSelf: 'center',
  },
  cardContent: {
    gap: 16,
  },
  psychologistInfo: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  experienceBadge: {
    backgroundColor: '#eff6ff',
    borderColor: '#3b82f6',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1d4ed8',
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  availability: {
    fontSize: 14,
    color: '#15803d',
  },
  selectButton: {
    backgroundColor: '#3b82f6',
  },
  infoCard: {
    backgroundColor: '#eff6ff',
    borderColor: '#bfdbfe',
    borderWidth: 1,
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e3a8a',
  },
  infoCardContent: {
    paddingTop: 16,
  },
  stepsGrid: {
    gap: 24,
    flexDirection: 'column',
  },
  step: {
    alignItems: 'center',
    gap: 12,
  },
  stepIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e3a8a',
  },
  stepDescription: {
    fontSize: 14,
    color: '#1d4ed8',
    textAlign: 'center',
  },
  bookingSection: {
    marginBottom: 24,
  },
  changeButton: {
    marginBottom: 16,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  bookingDescription: {
    fontSize: 16,
    color: '#6b7280',
  },
  bookingGrid: {
    gap: 32,
  },
  psychInfoCard: {
    backgroundColor: 'white',
  },
  psychInfoHeader: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  psychInfoAvatar: {
    width: 80,
    height: 80,
    backgroundColor: '#3b82f6',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  psychInfoName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  psychInfoSpecialization: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  psychInfoContent: {
    gap: 16,
  },
  psychInfoDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  psychInfoDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  availabilityCard: {
    backgroundColor: '#f0fdf4',
    padding: 12,
    borderRadius: 12,
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  availabilityText: {
    fontSize: 14,
    color: '#15803d',
  },
  calendarCard: {
    backgroundColor: 'white',
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  calendarDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  calendlyContainer: {
    width: '100%',
    height: 384,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    overflow: 'hidden',
  },
  calendlyContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    gap: 16,
  },
  calendlyIcon: {
    marginBottom: 0,
  },
  calendlyTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  calendlyDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  calendlyButton: {
    backgroundColor: '#3b82f6',
  },
}); 