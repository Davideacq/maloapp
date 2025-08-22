import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBackdoor } from '../hooks/use-backdoor';

export const BackdoorInfo: React.FC = () => {
  const { isEnabled, showBackdoorCredentials } = useBackdoor();

  // Non mostrare nulla se le backdoor non sono abilitate
  if (!isEnabled) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="key" size={20} color="#dc2626" />
        <Text style={styles.title}>🔓 Modalità Sviluppo</Text>
      </View>
      
      <Text style={styles.description}>
        Le backdoor sono attive per facilitare lo sviluppo e i test.
      </Text>
      
      <Pressable 
        onPress={showBackdoorCredentials}
        style={styles.button}
      >
        <Ionicons name="information-circle" size={16} color="#dc2626" />
        <Text style={styles.buttonText}>Mostra Credenziali</Text>
      </Pressable>
      
      <Text style={styles.warning}>
        ⚠️ RIMUOVERE IN PRODUZIONE!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#dc2626',
    borderRadius: 12,
    padding: 16,
    margin: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: '#991b1b',
    marginBottom: 12,
    lineHeight: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc2626',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  warning: {
    fontSize: 12,
    fontWeight: '600',
    color: '#dc2626',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
