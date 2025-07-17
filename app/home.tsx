// Converted from malohr-platform/app/page.tsx
// Home page with navigation cards for different user areas using Onest fonts
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTypography } from '../src/hooks/use-typography';

export default function HomePage() {
  const { typography, fontsLoaded } = useTypography();

  const handleNavigation = (path: string) => {
    console.log('Navigating to:', path);
    router.push(path as any);
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Caricamento...</Text>
      </SafeAreaView>
    );
  }

  return (
    <LinearGradient
      colors={['#eff6ff', '#e0f2fe']} // from-ui-blue-50 to-ui-lightBlue-50
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.mainContainer}>
            {/* Header Section */}
            <View style={styles.headerSection}>
              <Text style={[styles.title, typography.h1]}>
                MaloHR - Area Riservata
              </Text>
              <Text style={[styles.subtitle, typography.body]}>
                Piattaforma per il benessere psicologico dei dipendenti aziendali
              </Text>
            </View>

            {/* Navigation Cards Grid */}
            <View style={styles.cardsContainer}>
              {/* Row 1 */}
              <View style={styles.cardRow}>
                {/* Area Utente Card */}
                <Pressable
                  onPress={() => handleNavigation('/login')}
                  style={[styles.card, styles.userCard]}
                >
                  <View style={[styles.iconContainer, styles.userIconBg]}>
                    <Ionicons name="person" size={24} color="white" />
                  </View>
                  <Text style={[styles.cardTitle, styles.userCardTitle, typography.h4]}>
                    Area Utente
                  </Text>
                  <Text style={[styles.cardSubtitle, typography.bodySmall]}>
                    Accedi alla tua area personale
                  </Text>
                </Pressable>

                {/* Area Admin Card */}
                <Pressable
                  onPress={() => handleNavigation('/admin/dashboard')}
                  style={[styles.card, styles.adminCard]}
                >
                  <View style={[styles.iconContainer, styles.adminIconBg]}>
                    <Ionicons name="bar-chart" size={24} color="white" />
                  </View>
                  <Text style={[styles.cardTitle, styles.adminCardTitle, typography.h4]}>
                    Area Admin
                  </Text>
                  <Text style={[styles.cardSubtitle, typography.bodySmall]}>
                    Gestisci la piattaforma
                  </Text>
                </Pressable>
              </View>

              {/* Row 2 */}
              <View style={styles.cardRow}>
                {/* Area Psicologo Card */}
                <Pressable
                  onPress={() => handleNavigation('/psychologist/dashboard')}
                  style={[styles.card, styles.psychologistCard]}
                >
                  <View style={[styles.iconContainer, styles.psychologistIconBg]}>
                    <Ionicons name="heart" size={24} color="white" />
                  </View>
                  <Text style={[styles.cardTitle, styles.psychologistCardTitle, typography.h4]}>
                    Area Psicologo
                  </Text>
                  <Text style={[styles.cardSubtitle, typography.bodySmall]}>
                    Gestisci i tuoi pazienti
                  </Text>
                </Pressable>

                {/* Styleguide Card */}
                <Pressable
                  onPress={() => handleNavigation('/styleguide')}
                  style={[styles.card, styles.styleguideCard]}
                >
                  <View style={[styles.iconContainer, styles.styleguideIconBg]}>
                    <Ionicons name="library" size={24} color="white" />
                  </View>
                  <Text style={[styles.cardTitle, styles.styleguideCardTitle, typography.h4]}>
                    Styleguide
                  </Text>
                  <Text style={[styles.cardSubtitle, typography.bodySmall]}>
                    Componenti e stili
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={[styles.footerText, typography.bodySmall]}>
                Seleziona l'area di accesso appropriata per continuare
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    maxWidth: 600,
    width: '100%',
  },
  headerSection: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    color: '#1e3a8a', // ui-blue-900
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    color: '#6b7280', // text-60
    marginBottom: 32,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  cardsContainer: {
    marginBottom: 48,
    gap: 24,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 24,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
    maxWidth: 200,
    alignItems: 'center',
  },
  userCard: {
    borderColor: '#dbeafe', // ui-blue-100
    borderWidth: 1,
  },
  adminCard: {
    borderColor: '#fed7aa', // ui-orange-100
    borderWidth: 1,
  },
  psychologistCard: {
    borderColor: '#ccfbf1', // ui-teal-100
    borderWidth: 1,
  },
  styleguideCard: {
    borderColor: '#e0f2fe', // ui-lightBlue-100
    borderWidth: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  userIconBg: {
    backgroundColor: '#3b82f6', // ui-blue-500
  },
  adminIconBg: {
    backgroundColor: '#f97316', // ui-orange-500
  },
  psychologistIconBg: {
    backgroundColor: '#14b8a6', // ui-teal-500
  },
  styleguideIconBg: {
    backgroundColor: '#0ea5e9', // ui-lightBlue-500
  },
  cardTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  userCardTitle: {
    color: '#1e3a8a', // ui-blue-900
  },
  adminCardTitle: {
    color: '#9a3412', // ui-orange-900
  },
  psychologistCardTitle: {
    color: '#134e4a', // ui-teal-900
  },
  styleguideCardTitle: {
    color: '#0c4a6e', // ui-lightBlue-900
  },
  cardSubtitle: {
    color: '#6b7280', // text-60
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: '#9ca3af', // text-40
    textAlign: 'center',
  },
}); 