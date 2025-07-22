import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Esegue il logout dell'utente cancellando tutti i dati di sessione.
 * Può essere esteso per invalidare token lato server.
 */
export async function logoutUser() {
  try {
    await AsyncStorage.clear();
    // Qui puoi aggiungere altre logiche di logout (es. chiamate API)
  } catch (e) {
    console.warn('Errore durante il logout:', e);
  }
} 