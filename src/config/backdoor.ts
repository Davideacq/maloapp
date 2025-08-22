// ========================================
// BACKDOOR PER SVILUPPO (RIMUOVERE IN PRODUZIONE!)
// ========================================

export interface BackdoorUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: 'admin' | 'psychologist' | 'user';
  status: string;
  company_id?: number | null;
}

export interface BackdoorConfig {
  enabled: boolean;
  users: Record<string, BackdoorUser>;
  password: string;
  warning: string;
}

// Configurazione delle backdoor
export const BACKDOOR_CONFIG: BackdoorConfig = {
  // Abilita le backdoor solo in modalità sviluppo
  enabled: __DEV__,
  
  // Password comune per tutte le backdoor
  password: 'test123',
  
  // Messaggio di avvertimento
  warning: '⚠️ RIMUOVERE IN PRODUZIONE!',
  
  // Utenti backdoor disponibili
  users: {
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
  },
};

// Utility functions
export const isBackdoorEnabled = (): boolean => {
  return BACKDOOR_CONFIG.enabled;
};

export const getBackdoorUser = (email: string): BackdoorUser | null => {
  if (!BACKDOOR_CONFIG.enabled) return null;
  return BACKDOOR_CONFIG.users[email] || null;
};

export const validateBackdoorCredentials = (email: string, password: string): BackdoorUser | null => {
  if (!BACKDOOR_CONFIG.enabled) return null;
  
  if (BACKDOOR_CONFIG.users[email] && password === BACKDOOR_CONFIG.password) {
    return BACKDOOR_CONFIG.users[email];
  }
  
  return null;
};

export const getAllBackdoorUsers = (): BackdoorUser[] => {
  if (!BACKDOOR_CONFIG.enabled) return [];
  return Object.values(BACKDOOR_CONFIG.users);
};

export const getBackdoorUsersByRole = (role: string): BackdoorUser[] => {
  if (!BACKDOOR_CONFIG.enabled) return [];
  return Object.values(BACKDOOR_CONFIG.users).filter(user => user.role === role);
};

export const getBackdoorInfo = () => {
  if (!BACKDOOR_CONFIG.enabled) {
    return { 
      enabled: false, 
      message: 'Backdoor disabilitate in produzione' 
    };
  }

  return {
    enabled: true,
    message: '🔓 Backdoor abilitate per sviluppo',
    users: Object.keys(BACKDOOR_CONFIG.users).map(email => ({
      email,
      role: BACKDOOR_CONFIG.users[email].role,
      password: BACKDOOR_CONFIG.password
    })),
    warning: BACKDOOR_CONFIG.warning
  };
};

// Log delle backdoor in sviluppo
if (BACKDOOR_CONFIG.enabled) {
  console.log('🔓 Backdoor frontend abilitate per sviluppo');
  console.log('📋 Credenziali disponibili:');
  Object.keys(BACKDOOR_CONFIG.users).forEach(email => {
    const user = BACKDOOR_CONFIG.users[email];
    console.log(`  • ${email} / ${BACKDOOR_CONFIG.password} (${user.role})`);
  });
  console.log(BACKDOOR_CONFIG.warning);
}
