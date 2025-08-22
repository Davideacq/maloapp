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
    isUser
  };
};
