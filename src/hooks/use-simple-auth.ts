import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SimpleUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: 'admin' | 'psychologist' | 'user';
  status: string;
  company_id?: number | null;
}

export interface AuthResult {
  success: boolean;
  user?: SimpleUser;
  message?: string;
}

// ========================================
// BACKDOOR PER SVILUPPO (RIMUOVERE IN PRODUZIONE!)
// ========================================
const BACKDOOR_USERS: Record<string, SimpleUser> = {
  'admin@backdoor': {
    id: 999,
    first_name: 'Admin',
    last_name: 'Backdoor',
    email: 'admin@backdoor',
    role: 'admin',
    status: 'active',
    company_id: 1,
  },
  'psi@backdoor': {
    id: 998,
    first_name: 'Dr. Psicologo',
    last_name: 'Backdoor',
    email: 'psi@backdoor',
    role: 'psychologist',
    status: 'active',
    company_id: 1,
  },
  'user@backdoor': {
    id: 997,
    first_name: 'Utente',
    last_name: 'Backdoor',
    email: 'user@backdoor',
    role: 'user',
    status: 'active',
    company_id: 1,
  },
};

// Controlla se le backdoor sono abilitate (solo per sviluppo)
const BACKDOOR_ENABLED = __DEV__; // true solo in modalità sviluppo

export const useSimpleAuth = () => {
  const [user, setUser] = useState<SimpleUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Errore caricamento utente:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<AuthResult> => {
    // ========================================
    // BACKDOOR PER SVILUPPO (RIMUOVERE IN PRODUZIONE!)
    // ========================================
    if (BACKDOOR_ENABLED && BACKDOOR_USERS[email] && password === 'test123') {
      const backdoorUser = BACKDOOR_USERS[email];
      console.log('🔓 Accesso backdoor:', backdoorUser.email, 'Ruolo:', backdoorUser.role);
      
      await AsyncStorage.setItem('user', JSON.stringify(backdoorUser));
      setUser(backdoorUser);
      
      return { 
        success: true, 
        user: backdoorUser,
        message: '🔓 Accesso backdoor - SVILUPPO SOLO!' 
      };
    }

    // ========================================
    // LOGIN NORMALE (API)
    // ========================================
    try {
      const response = await fetch('http://127.0.0.1:8000/api/simple/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (data.success && data.user) {
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || 'Login fallito' };
      }
    } catch (error) {
      console.error('Errore login:', error);
      return { 
        success: false, 
        message: 'Errore di connessione al server' 
      };
    }
  };

  const logout = async (): Promise<AuthResult> => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Errore logout:', error);
      return { 
        success: false, 
        message: 'Errore durante il logout' 
      };
    }
  };

  const checkAuth = async (): Promise<AuthResult> => {
    if (!user) {
      return { success: false, message: 'Nessun utente autenticato' };
    }

    // ========================================
    // VERIFICA BACKDOOR (FRONTEND)
    // ========================================
    if (BACKDOOR_ENABLED && BACKDOOR_USERS[user.email]) {
      const backdoorUser = BACKDOOR_USERS[user.email];
      console.log('🔓 Verifica backdoor:', backdoorUser.email);
      
      return { 
        success: true, 
        user: backdoorUser,
        message: '🔓 Verifica backdoor - SVILUPPO SOLO!' 
      };
    }

    // ========================================
    // VERIFICA NORMALE (API)
    // ========================================
    try {
      const response = await fetch('http://127.0.0.1:8000/api/simple/check-auth', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ user_id: user.id })
      });
      
      const data = await response.json();
      
      if (data.success && data.user) {
        // Aggiorna i dati utente se necessario
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        // Utente non più valido, fai logout
        await logout();
        return { success: false, message: 'Sessione scaduta' };
      }
    } catch (error) {
      console.error('Errore verifica auth:', error);
      return { 
        success: false, 
        message: 'Errore verifica autenticazione' 
      };
    }
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const hasRole = (role: string) => {
    return user?.role === role;
  };

  const isAdmin = () => hasRole('admin');
  const isPsychologist = () => hasRole('psychologist');
  const isUser = () => hasRole('user');

  // ========================================
  // UTILITY BACKDOOR (SOLO SVILUPPO)
  // ========================================
  const getBackdoorInfo = () => {
    if (!BACKDOOR_ENABLED) {
      return { enabled: false, message: 'Backdoor disabilitate in produzione' };
    }

    return {
      enabled: true,
      message: '🔓 Backdoor abilitate per sviluppo',
      users: Object.keys(BACKDOOR_USERS).map(email => ({
        email,
        role: BACKDOOR_USERS[email].role,
        password: 'test123'
      })),
      warning: '⚠️ RIMUOVERE IN PRODUZIONE!'
    };
  };

  const isBackdoorUser = (userEmail: string) => {
    return BACKDOOR_ENABLED && BACKDOOR_USERS[userEmail] !== undefined;
  };

  return { 
    user, 
    loading, 
    login, 
    logout, 
    checkAuth, 
    isAuthenticated,
    hasRole,
    isAdmin,
    isPsychologist,
    isUser,
    // Utility backdoor (solo sviluppo)
    getBackdoorInfo,
    isBackdoorUser,
    BACKDOOR_ENABLED
  };
};
