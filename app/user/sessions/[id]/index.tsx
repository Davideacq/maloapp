import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
    Alert,
    Image,
    Linking,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface SessionData {
  id: number;
  date: string;
  time: string;
  psychologist: string;
  psychologistAvatar: string;
  type: string;
  status: string;
  meetingLink: string;
  notes: string;
}

interface ButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor: string;
  variant?: 'primary' | 'outline' | 'destructive';
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  backgroundColor, 
  variant = 'primary', 
  icon, 
  disabled = false 
}) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    style={[
      styles.button,
      variant === 'outline' && styles.buttonOutline,
      variant === 'destructive' && styles.buttonDestructive,
      variant === 'primary' && { backgroundColor: disabled ? '#9ca3af' : backgroundColor },
    ]}
  >
    <View style={styles.buttonContent}>
      {icon && (
        <Ionicons 
          name={icon} 
          size={16} 
          color={variant === 'outline' ? '#374151' : 'white'} 
          style={styles.buttonIcon}
        />
      )}
      <Text style={[
        styles.buttonText,
        variant === 'outline' && styles.buttonTextOutline,
        variant === 'destructive' && styles.buttonTextDestructive,
      ]}>
        {title}
      </Text>
    </View>
  </Pressable>
);

interface BadgeProps {
  text: string;
  variant: 'success' | 'warning' | 'default';
}

const Badge: React.FC<BadgeProps> = ({ text, variant }) => {
  const getBadgeStyle = () => {
    switch (variant) {
      case 'success': return styles.badgeSuccess;
      case 'warning': return styles.badgeWarning;
      default: return styles.badgeDefault;
    }
  };

  const getBadgeTextStyle = () => {
    switch (variant) {
      case 'success': return styles.badgeTextSuccess;
      case 'warning': return styles.badgeTextWarning;
      default: return styles.badgeTextDefault;
    }
  };

  return (
    <View style={[styles.badge, getBadgeStyle()]}>
      <Text style={[styles.badgeText, getBadgeTextStyle()]}>
        {text}
      </Text>
    </View>
  );
};

export default function SessionDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Mock data for a single session
  const session: SessionData = {
    id: Number(id) || 1,
    date: "15 Gen 2024",
    time: "14:30",
    psychologist: "Dr.ssa Maria Bianchi",
    psychologistAvatar: "https://via.placeholder.com/80x80/3b82f6/ffffff?text=MB",
    type: "Online",
    status: "confirmed",
    meetingLink: "https://meet.example.com/xyz-abc-123",
    notes: "In questa sessione esploreremo le tecniche di gestione dello stress e definiremo i prossimi obiettivi.",
  };

  const handleJoinSession = () => {
    Linking.openURL(session.meetingLink).catch(() => {
      Alert.alert('Errore', 'Impossibile aprire il link della sessione');
    });
  };

  const handleContactPsychologist = () => {
    Alert.alert('Contatta Psicologo', 'Funzionalità non ancora implementata');
  };

  const handleReschedule = () => {
    Alert.alert('Ripianifica', 'Funzionalità di ripianificazione non ancora implementata');
  };

  const handleCancel = () => {
    Alert.alert(
      'Annulla Sessione',
      'Sei sicuro di voler annullare questa sessione?',
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Sì, Annulla', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Sessione Annullata', 'La sessione è stata annullata con successo');
            router.back();
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={20} color="#374151" />
          <Text style={styles.backButtonText}>Tutte le Sessioni</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Dettagli Sessione</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Session Header Card */}
          <View style={styles.sessionCard}>
            <View style={styles.sessionHeader}>
              <View>
                <Text style={styles.sessionDateLabel}>Sessione del {session.date}</Text>
                <Text style={styles.sessionTime}>alle {session.time}</Text>
              </View>
              <Badge 
                text={session.status === "confirmed" ? "Confermata" : "Da confermare"}
                variant={session.status === "confirmed" ? "success" : "warning"}
              />
            </View>
          </View>

          <View style={styles.mainContent}>
            {/* Left Column */}
            <View style={styles.leftColumn}>
              {/* Connection Details */}
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Ionicons name="videocam" size={20} color="#3b82f6" />
                  <Text style={styles.cardTitle}>Dettagli Connessione</Text>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardDescription}>
                    La sessione si terrà online. Clicca sul bottone qui sotto per accedere alla 
                    videochiamata all'ora stabilita.
                  </Text>
                  <Button
                    title="Accedi alla Sessione"
                    onPress={handleJoinSession}
                    backgroundColor="#3b82f6"
                    icon="videocam"
                  />
                </View>
              </View>

              {/* Session Notes */}
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Ionicons name="document-text" size={20} color="#3b82f6" />
                  <Text style={styles.cardTitle}>Note per la Sessione</Text>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.notesText}>{session.notes}</Text>
                </View>
              </View>
            </View>

            {/* Right Column */}
            <View style={styles.rightColumn}>
              {/* Psychologist Card */}
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Ionicons name="person" size={20} color="#3b82f6" />
                  <Text style={styles.cardTitle}>Il Tuo Psicologo</Text>
                </View>
                <View style={[styles.cardContent, styles.psychologistContent]}>
                  <Image
                    source={{ uri: session.psychologistAvatar }}
                    style={styles.psychologistAvatar}
                  />
                  <Text style={styles.psychologistName}>{session.psychologist}</Text>
                  <Text style={styles.psychologistRole}>Psicologo del Lavoro</Text>
                  <Button
                    title="Contatta"
                    onPress={handleContactPsychologist}
                    backgroundColor="#f3f4f6"
                    variant="outline"
                    icon="chatbubble-outline"
                  />
                </View>
              </View>

              {/* Actions Card */}
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Azioni</Text>
                </View>
                <View style={styles.cardContent}>
                  <Button
                    title="Ripianifica Sessione"
                    onPress={handleReschedule}
                    backgroundColor="#f3f4f6"
                    variant="outline"
                    icon="calendar-outline"
                  />
                  <Button
                    title="Annulla Sessione"
                    onPress={handleCancel}
                    backgroundColor="#ef4444"
                    variant="destructive"
                    icon="trash-outline"
                  />
                </View>
              </View>
            </View>
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
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#374151',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    maxWidth: 896, // max-w-4xl equivalent
    alignSelf: 'center',
    width: '100%',
  },
  sessionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 24,
  },
  sessionHeader: {
    backgroundColor: '#3b82f6',
    padding: 24,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionDateLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    marginBottom: 4,
  },
  sessionTime: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeSuccess: {
    backgroundColor: 'white',
  },
  badgeWarning: {
    backgroundColor: '#fef3c7',
  },
  badgeDefault: {
    backgroundColor: '#f3f4f6',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  badgeTextSuccess: {
    color: '#1e3a8a',
  },
  badgeTextWarning: {
    color: '#92400e',
  },
  badgeTextDefault: {
    color: '#374151',
  },
  mainContent: {
    flexDirection: 'row',
    gap: 24,
  },
  leftColumn: {
    flex: 2,
    gap: 24,
  },
  rightColumn: {
    flex: 1,
    gap: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 12,
  },
  cardContent: {
    padding: 16,
    gap: 16,
  },
  cardDescription: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
  notesText: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
  psychologistContent: {
    alignItems: 'center',
  },
  psychologistAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  psychologistName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  psychologistRole: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  button: {
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  buttonDestructive: {
    backgroundColor: '#ef4444',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  buttonTextOutline: {
    color: '#374151',
  },
  buttonTextDestructive: {
    color: 'white',
  },
}); 