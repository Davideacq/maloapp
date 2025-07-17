// Converted from malohr-platform/app/user/booking/page.tsx
// User booking page with psychologist selection and appointment scheduling for React Native
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge } from '../../../src/components/badge';
import { Breadcrumb } from '../../../src/components/breadcrumb';
import { Button } from '../../../src/components/button';
import { Card, CardContent, CardHeader } from '../../../src/components/card';

export default function BookingPage() {
  const [selectedPsychologist, setSelectedPsychologist] = useState<string | null>(null);

  const psychologists = [
    {
      id: '1',
      name: 'Dr.ssa Maria Bianchi',
      specialization: 'Stress e Ansia',
      experience: '8 anni',
      rating: 4.9,
      description: 'Specializzata in gestione dello stress lavorativo e tecniche di mindfulness.',
      availability: 'Disponibile questa settimana',
    },
    {
      id: '2',
      name: 'Dr. Marco Rossi',
      specialization: 'Work-Life Balance',
      experience: '12 anni',
      rating: 4.8,
      description: 'Esperto in equilibrio vita-lavoro e gestione del tempo.',
      availability: 'Disponibile da lunedì prossimo',
    },
    {
      id: '3',
      name: 'Dr.ssa Laura Verdi',
      specialization: 'Comunicazione',
      experience: '6 anni',
      rating: 4.9,
      description: 'Specializzata in comunicazione efficace e relazioni interpersonali.',
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Breadcrumb
          items={[
            { label: 'Home', onPress: handleBackToDashboard },
            { label: 'Prenota una Sessione' },
          ]}
        />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {!selectedPsychologist ? (
          <>
            {/* Psychologist Selection */}
            <View style={styles.selectionSection}>
              <Text style={styles.sectionTitle}>Scegli il tuo Psicologo</Text>
              <Text style={styles.sectionDescription}>
                Seleziona lo psicologo più adatto alle tue esigenze per prenotare una sessione
              </Text>
            </View>

            <View style={styles.psychologistGrid}>
              {psychologists.map((psychologist) => (
                <Pressable
                  key={psychologist.id}
                  onPress={() => setSelectedPsychologist(psychologist.id)}
                  style={styles.psychologistCard}
                >
                  <Card style={styles.card}>
                    <CardHeader style={styles.cardHeader}>
                      <View style={styles.psychologistAvatar}>
                        <Ionicons name="person" size={40} color="white" />
                      </View>
                      <Text style={styles.psychologistName}>{psychologist.name}</Text>
                      <Text style={styles.psychologistSpecialization}>{psychologist.specialization}</Text>
                    </CardHeader>
                    <CardContent style={styles.cardContent}>
                      <View style={styles.psychologistInfo}>
                        <View style={styles.infoRow}>
                          <Text style={styles.infoLabel}>Esperienza:</Text>
                          <Badge variant="secondary" style={styles.experienceBadge}>
                            <Text style={styles.badgeText}>{psychologist.experience}</Text>
                          </Badge>
                        </View>
                        <View style={styles.infoRow}>
                          <Text style={styles.infoLabel}>Valutazione:</Text>
                          <Text style={styles.rating}>⭐ {psychologist.rating}</Text>
                        </View>
                      </View>
                      <Text style={styles.description}>{psychologist.description}</Text>
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
            <Card style={StyleSheet.flatten([styles.card, styles.infoCard])}>
              <CardHeader>
                <Text style={styles.infoCardTitle}>Come Funziona</Text>
              </CardHeader>
              <CardContent style={styles.infoCardContent}>
                <View style={styles.stepsGrid}>
                  <View style={styles.step}>
                    <View style={styles.stepIcon}>
                      <Ionicons name="person" size={24} color="white" />
                    </View>
                    <Text style={styles.stepNumber}>1. Scegli</Text>
                    <Text style={styles.stepDescription}>
                      Seleziona lo psicologo più adatto alle tue esigenze
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
                <Ionicons name="arrow-back" size={16} color="#666" style={styles.buttonIcon} />
                <Text style={styles.outlineButtonText}>Cambia Psicologo</Text>
              </Button>
              <Text style={styles.bookingTitle}>Prenota con {selectedPsych?.name}</Text>
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
                  <View style={styles.psychInfoDetails}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Esperienza:</Text>
                      <Text style={styles.detailValue}>{selectedPsych?.experience}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Valutazione:</Text>
                      <Text style={styles.detailValue}>⭐ {selectedPsych?.rating}</Text>
                    </View>
                  </View>
                  <Text style={styles.psychInfoDescription}>{selectedPsych?.description}</Text>
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