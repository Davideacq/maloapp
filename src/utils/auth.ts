import AsyncStorage from '@react-native-async-storage/async-storage';
// PRODUZIONE:
// - Preferire l'uso di SecureStore (expo-secure-store) per conservare il token
// - Evitare di salvare dati sensibili in chiaro; ruotare i token periodicamente
// - Valutare timeout/refresh automatico del token e logout su invalidazione

export type AuthUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: 'admin' | 'psychologist' | 'user';
  status?: string;
  company_id?: number | null;
  full_name?: string;
  last_login?: string | null;
};

export type AuthData = {
  token: string;
  token_type?: string; // es: "Bearer"
  user: AuthUser;
};

const STORAGE_TOKEN_KEY = 'maloapp_auth_token';
const STORAGE_USER_KEY = 'maloapp_auth_user';

export async function saveAuth(auth: AuthData) {
  try {
    const bearerToken = auth.token_type && auth.token_type.length > 0
      ? `${auth.token_type} ${auth.token}`
      : auth.token;
    await AsyncStorage.setItem(STORAGE_TOKEN_KEY, bearerToken);
    await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(auth.user));
  } catch (e) {
    console.warn('Errore durante il salvataggio delle credenziali:', e);
  }
}

export async function getToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(STORAGE_TOKEN_KEY);
  } catch (e) {
    console.warn('Errore durante il recupero del token:', e);
    return null;
  }
}

export async function getUser(): Promise<AuthUser | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch (e) {
    console.warn('Errore durante il recupero dell\'utente:', e);
    return null;
  }
}

export async function clearAuth() {
  try {
    await AsyncStorage.removeItem(STORAGE_TOKEN_KEY);
    await AsyncStorage.removeItem(STORAGE_USER_KEY);
  } catch (e) {
    console.warn('Errore durante la pulizia delle credenziali:', e);
  }
}

/**
 * Esegue il logout dell'utente cancellando tutti i dati di sessione.
 * Può essere esteso per invalidare token lato server.
 */
export async function logoutUser() {
  try {
    await clearAuth();
    // Qui puoi aggiungere altre logiche di logout (es. chiamate API)
  } catch (e) {
    console.warn('Errore durante il logout:', e);
  }
}