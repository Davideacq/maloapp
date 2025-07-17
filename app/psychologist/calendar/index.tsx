// Converted from malohr-platform/app/psychologist/calendar/page.tsx
// Psychologist calendar page with monthly view and appointments for React Native
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge } from '../../../src/components/badge';
import { Breadcrumb } from '../../../src/components/breadcrumb';
import { Button } from '../../../src/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../src/components/card';

export default function PsychologistCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const appointments = [
    {
      id: 1,
      date: '2024-01-15',
      time: '09:00',
      duration: 50,
      patient: 'Mario Rossi',
      company: 'Azienda SpA',
      type: 'Sessione Individuale',
      status: 'confirmed',
      notes: 'Sessione di follow-up',
    },
    {
      id: 2,
      date: '2024-01-15',
      time: '10:30',
      duration: 50,
      patient: 'Laura Bianchi',
      company: 'Tech Solutions',
      type: 'Sessione Individuale',
      status: 'confirmed',
      notes: 'Lavoro su work-life balance',
    },
    {
      id: 3,
      date: '2024-01-15',
      time: '14:00',
      duration: 60,
      patient: 'Giuseppe Verdi',
      company: 'Marketing Pro',
      type: 'Prima Valutazione',
      status: 'pending',
      notes: 'Primo colloquio',
    },
    {
      id: 4,
      date: '2024-01-16',
      time: '15:30',
      duration: 50,
      patient: 'Anna Moretti',
      company: 'Finance Corp',
      type: 'Sessione Individuale',
      status: 'confirmed',
      notes: 'Sessione conclusiva',
    },
    {
      id: 5,
      date: '2024-01-17',
      time: '17:00',
      duration: 50,
      patient: 'Marco Ferrari',
      company: 'StartUp Inc',
      type: 'Sessione Individuale',
      status: 'confirmed',
      notes: 'Gestione stress',
    },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = formatDate(date);
    return appointments.filter((apt) => apt.date === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const monthNames = [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre',
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

  const selectedDateAppointments = getAppointmentsForDate(selectedDate);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confermato';
      case 'pending':
        return 'In Attesa';
      case 'cancelled':
        return 'Annullato';
      default:
        return status;
    }
  };

  const handleBackToDashboard = () => {
    router.push('/psychologist/dashboard' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Breadcrumb
          items={[
            { label: 'Dashboard', onPress: handleBackToDashboard },
            { label: 'Calendario' },
          ]}
        />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentGrid}>
          {/* Calendar */}
          <View style={styles.calendarSection}>
            <Card style={styles.calendarCard}>
              <CardHeader>
                <View style={styles.calendarHeader}>
                  <Text style={styles.monthTitle}>
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </Text>
                  <View style={styles.calendarControls}>
                    <Button variant="outline" size="sm" onPress={() => navigateMonth('prev')}>
                      <Ionicons name="chevron-back" size={16} color="#666" />
                    </Button>
                    <Button variant="outline" size="sm" onPress={() => navigateMonth('next')}>
                      <Ionicons name="chevron-forward" size={16} color="#666" />
                    </Button>
                    <Button onPress={() => {}} variant="default">
                      <Ionicons name="add" size={16} color="white" style={styles.buttonIcon} />
                      <Text style={styles.newAppointmentText}>Nuovo</Text>
                    </Button>
                  </View>
                </View>
              </CardHeader>
              <CardContent style={styles.calendarContent}>
                {/* Day Headers */}
                <View style={styles.dayHeaders}>
                  {dayNames.map((day) => (
                    <View key={day} style={styles.dayHeader}>
                      <Text style={styles.dayHeaderText}>{day}</Text>
                    </View>
                  ))}
                </View>

                {/* Calendar Grid */}
                <View style={styles.calendarGrid}>
                  {getDaysInMonth(currentDate).map((day, index) => {
                    if (!day) {
                      return <View key={index} style={styles.emptyDay} />;
                    }

                    const dayAppointments = getAppointmentsForDate(day);
                    const isSelected = formatDate(day) === formatDate(selectedDate);
                    const isToday = formatDate(day) === formatDate(new Date());

                    return (
                      <Pressable
                        key={index}
                        style={[
                          styles.calendarDay,
                          isSelected && styles.selectedDay,
                          isToday && styles.todayDay,
                        ]}
                        onPress={() => setSelectedDate(day)}
                      >
                        <Text
                          style={[
                            styles.dayNumber,
                            isToday && styles.todayDayNumber,
                          ]}
                        >
                          {day.getDate()}
                        </Text>
                        <View style={styles.appointmentDots}>
                          {dayAppointments.slice(0, 2).map((apt) => (
                            <View key={apt.id} style={styles.appointmentDot}>
                              <Text style={styles.appointmentTime}>
                                {apt.time} {apt.patient.split(' ')[0]}
                              </Text>
                            </View>
                          ))}
                          {dayAppointments.length > 2 && (
                            <Text style={styles.moreAppointments}>
                              +{dayAppointments.length - 2} altri
                            </Text>
                          )}
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              </CardContent>
            </Card>
          </View>

          {/* Appointments for Selected Date */}
          <View style={styles.appointmentsSection}>
            <Card style={styles.appointmentsCard}>
              <CardHeader>
                <CardTitle style={styles.appointmentsTitle}>
                  Appuntamenti del {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]}
                </CardTitle>
                <Text style={styles.appointmentsCount}>
                  {selectedDateAppointments.length} appuntamenti programmati
                </Text>
              </CardHeader>
              <CardContent>
                {selectedDateAppointments.length > 0 ? (
                  <View style={styles.appointmentsList}>
                    {selectedDateAppointments
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map((appointment) => (
                        <View key={appointment.id} style={styles.appointmentCard}>
                          <View style={styles.appointmentHeader}>
                            <View style={styles.appointmentTimeRow}>
                              <Ionicons name="time" size={16} color="#14b8a6" />
                              <Text style={styles.timeText}>{appointment.time}</Text>
                            </View>
                            <Badge variant={getStatusVariant(appointment.status)}>
                              <Text style={styles.badgeText}>{getStatusLabel(appointment.status)}</Text>
                            </Badge>
                          </View>

                          <View style={styles.appointmentDetails}>
                            <View style={styles.patientInfo}>
                              <Ionicons name="person" size={16} color="#6b7280" />
                              <Text style={styles.patientName}>{appointment.patient}</Text>
                            </View>
                            <Text style={styles.companyName}>{appointment.company}</Text>
                            <Text style={styles.appointmentType}>{appointment.type}</Text>

                            {appointment.notes && (
                              <View style={styles.notesContainer}>
                                <Text style={styles.notesText}>{appointment.notes}</Text>
                              </View>
                            )}
                          </View>

                          <View style={styles.appointmentActions}>
                            <Button variant="outline" size="sm" onPress={() => {}}>
                              <Text style={styles.outlineButtonText}>Modifica</Text>
                            </Button>
                            <Button size="sm" onPress={() => {}}>
                              <Text style={styles.buttonText}>Inizia Sessione</Text>
                            </Button>
                          </View>
                        </View>
                      ))}
                  </View>
                ) : (
                  <View style={styles.emptyState}>
                    <Ionicons name="calendar" size={48} color="#9ca3af" style={styles.emptyIcon} />
                    <Text style={styles.emptyTitle}>Nessun appuntamento</Text>
                    <Text style={styles.emptyDescription}>
                      Non ci sono appuntamenti programmati per questa data
                    </Text>
                    <Button onPress={() => {}}>
                      <Ionicons name="add" size={16} color="white" style={styles.buttonIcon} />
                      <Text style={styles.buttonText}>Aggiungi Appuntamento</Text>
                    </Button>
                  </View>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card style={styles.statsCard}>
              <CardHeader>
                <CardTitle style={styles.statsTitle}>Statistiche Settimanali</CardTitle>
              </CardHeader>
              <CardContent>
                <View style={styles.statsList}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Appuntamenti questa settimana</Text>
                    <Text style={styles.statValue}>12</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Ore programmate</Text>
                    <Text style={styles.statValue}>10h</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Pazienti unici</Text>
                    <Text style={styles.statValue}>8</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Tasso completamento</Text>
                    <Text style={styles.successValue}>95%</Text>
                  </View>
                </View>
              </CardContent>
            </Card>
          </View>
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
  newAppointmentText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  contentGrid: {
    flexDirection: 'row',
    gap: 32,
  },
  calendarSection: {
    flex: 2,
  },
  calendarCard: {
    backgroundColor: 'white',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  calendarControls: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  calendarContent: {
    padding: 16,
  },
  dayHeaders: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dayHeader: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayHeaderText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emptyDay: {
    width: '14.28%',
    height: 80,
    padding: 8,
  },
  calendarDay: {
    width: '14.28%',
    height: 80,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedDay: {
    backgroundColor: '#f0fdfa', // ui-teal-50
    borderColor: '#14b8a6', // ui-teal-500
  },
  todayDay: {
    backgroundColor: '#eff6ff', // ui-blue-50
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  todayDayNumber: {
    color: '#1e40af', // ui-blue-700
  },
  appointmentDots: {
    marginTop: 4,
    gap: 2,
  },
  appointmentDot: {
    backgroundColor: '#14b8a6', // ui-teal-500
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  appointmentTime: {
    fontSize: 10,
    color: 'white',
  },
  moreAppointments: {
    fontSize: 10,
    color: '#6b7280',
  },
  appointmentsSection: {
    flex: 1,
  },
  appointmentsCard: {
    backgroundColor: 'white',
    marginBottom: 24,
  },
  appointmentsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  appointmentsCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  appointmentsList: {
    gap: 16,
  },
  appointmentCard: {
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  appointmentTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
  appointmentDetails: {
    gap: 8,
  },
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  patientName: {
    fontSize: 14,
    color: '#111827',
  },
  companyName: {
    fontSize: 14,
    color: '#6b7280',
  },
  appointmentType: {
    fontSize: 14,
    color: '#6b7280',
  },
  notesContainer: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  notesText: {
    fontSize: 14,
    color: '#374151',
  },
  appointmentActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
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
    marginBottom: 16,
  },
  statsCard: {
    backgroundColor: 'white',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  statsList: {
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f766e', // ui-teal-900
  },
  successValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#15803d', // success-700
  },
}); 