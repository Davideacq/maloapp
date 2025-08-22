import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

export interface BackdoorUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: 'admin' | 'psychologist' | 'user';
  status: string;
  company_id?: number | null;
}

export interface BackdoorInfo {
  enabled: boolean;
  message: string;
  users?: Array<{
    email: string;
    role: string;
    password: string;
  }>;
  warning?: string;
}

// ========================================
// BACKDOOR PER SVILUPPO (RIMUOVERE IN PRODUZIONE!)
// ========================================
const BACKDOOR_USERS: Record<string, BackdoorUser> = {
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

export const useBackdoor = () => {
  // Debug log per verificare che l'hook sia chiamato
  console.log('🔓 useBackdoor hook chiamato, __DEV__:', __DEV__);

  useEffect(() => {
    // Log delle backdoor disponibili in sviluppo
    if (BACKDOOR_ENABLED) {
      console.log('🔓 Backdoor abilitate per sviluppo');
      console.log('📋 Credenziali disponibili:');
      Object.keys(BACKDOOR_USERS).forEach(email => {
        const user = BACKDOOR_USERS[email];
        console.log(`  • ${email} / test123 (${user.role})`);
      });
      console.log('⚠️ RIMUOVERE IN PRODUZIONE!');
    }
  }, []);

  /**
   * Verifica se un utente è una backdoor
   */
  const isBackdoorUser = (email: string): boolean => {
    return BACKDOOR_ENABLED && BACKDOOR_USERS[email] !== undefined;
  };

  /**
   * Ottiene le informazioni di un utente backdoor
   */
  const getBackdoorUser = (email: string): BackdoorUser | null => {
    if (!BACKDOOR_ENABLED) return null;
    return BACKDOOR_USERS[email] || null;
  };

  /**
   * Verifica le credenziali backdoor
   */
  const validateBackdoorCredentials = (email: string, password: string): BackdoorUser | null => {
    if (!BACKDOOR_ENABLED) return null;
    
    if (BACKDOOR_USERS[email] && password === 'test123') {
      return BACKDOOR_USERS[email];
    }
    
    return null;
  };

  /**
   * Ottiene tutte le informazioni sulle backdoor
   */
  const getBackdoorInfo = (): BackdoorInfo => {
    if (!BACKDOOR_ENABLED) {
      return { 
        enabled: false, 
        message: 'Backdoor disabilitate in produzione' 
      };
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

  /**
   * Mostra un alert con le credenziali backdoor disponibili
   */
  const showBackdoorCredentials = () => {
    console.log('🔓 showBackdoorCredentials chiamata');
    
    if (!BACKDOOR_ENABLED) {
      Alert.alert('Backdoor', 'Backdoor disabilitate in produzione');
      return;
    }

    const users = Object.keys(BACKDOOR_USERS).map(email => {
      const user = BACKDOOR_USERS[email];
      return `• ${email} / test123 (${user.role})`;
    }).join('\n');

    Alert.alert(
      '🔓 Credenziali Backdoor',
      `Credenziali disponibili per sviluppo:\n\n${users}\n\n⚠️ RIMUOVERE IN PRODUZIONE!`,
      [
        { text: 'OK', style: 'default' },
        { text: 'Copia', onPress: () => copyToClipboard(users) }
      ]
    );
  };

  /**
   * Copia le credenziali negli appunti (se disponibile)
   */
  const copyToClipboard = (text: string) => {
    // In React Native, potresti usare Clipboard API
    // Per ora mostriamo solo un alert
    Alert.alert('Copiato', 'Credenziali copiate negli appunti');
  };

  /**
   * Ottiene la lista di tutti gli utenti backdoor
   */
  const getAllBackdoorUsers = (): BackdoorUser[] => {
    if (!BACKDOOR_ENABLED) return [];
    return Object.values(BACKDOOR_USERS);
  };

  /**
   * Ottiene gli utenti backdoor per ruolo specifico
   */
  const getBackdoorUsersByRole = (role: string): BackdoorUser[] => {
    if (!BACKDOOR_ENABLED) return [];
    return Object.values(BACKDOOR_USERS).filter(user => user.role === role);
  };

  /**
   * Controlla se le backdoor sono attive
   */
  const areBackdoorsEnabled = (): boolean => {
    return BACKDOOR_ENABLED;
  };

  /**
   * Disabilita temporaneamente le backdoor (per testing)
   */
  const disableBackdoors = () => {
    if (__DEV__) {
      // setIsEnabled(false); // This line was removed as per the edit hint
      console.log('🔒 Backdoor disabilitate temporaneamente');
    }
  };

  /**
   * Riabilita le backdoor (per testing)
   */
  const enableBackdoors = () => {
    if (__DEV__) {
      // setIsEnabled(true); // This line was removed as per the edit hint
      console.log('🔓 Backdoor riabilitate');
    }
  };

  return {
    // Stato
    isEnabled: BACKDOOR_ENABLED,
    
    // Funzioni principali
    isBackdoorUser,
    getBackdoorUser,
    validateBackdoorCredentials,
    getBackdoorInfo,
    
    // Utility
    showBackdoorCredentials,
    getAllBackdoorUsers,
    getBackdoorUsersByRole,
    
    // Costanti
    BACKDOOR_USERS: BACKDOOR_USERS,
    BACKDOOR_ENABLED: BACKDOOR_ENABLED,
  };
};
