// Converted from malohr-platform/app/admin/users/page.tsx
// Admin users management with filtering, search, and comprehensive user info for React Native
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge } from '../../../src/components/badge';
import { Button } from '../../../src/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../src/components/card';

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const companies = [
    { id: 'all', name: 'Tutte le aziende' },
    { id: 'azienda-spa', name: 'Azienda SpA' },
    { id: 'tech-solutions', name: 'Tech Solutions' },
    { id: 'marketing-pro', name: 'Marketing Pro' },
    { id: 'finance-corp', name: 'Finance Corp' },
  ];

  const users = [
    {
      id: 1,
      firstName: 'Mario',
      lastName: 'Rossi',
      email: 'mario.rossi@azienda.com',
      company: 'Azienda SpA',
      department: 'Marketing',
      joinDate: '15 Gen 2024',
      lastLogin: '2 ore fa',
      sessionsUsed: 4,
      totalSessions: 12,
      status: 'active',
    },
    {
      id: 2,
      firstName: 'Laura',
      lastName: 'Bianchi',
      email: 'laura.bianchi@techsolutions.com',
      company: 'Tech Solutions',
      department: 'Sviluppo',
      joinDate: '10 Gen 2024',
      lastLogin: '1 giorno fa',
      sessionsUsed: 2,
      totalSessions: 10,
      status: 'active',
    },
    {
      id: 3,
      firstName: 'Giuseppe',
      lastName: 'Verdi',
      email: 'giuseppe.verdi@marketingpro.com',
      company: 'Marketing Pro',
      department: 'Vendite',
      joinDate: '8 Gen 2024',
      lastLogin: '3 giorni fa',
      sessionsUsed: 0,
      totalSessions: 8,
      status: 'inactive',
    },
    {
      id: 4,
      firstName: 'Anna',
      lastName: 'Moretti',
      email: 'anna.moretti@financecorp.com',
      company: 'Finance Corp',
      department: 'Finanza',
      joinDate: '5 Gen 2024',
      lastLogin: '1 settimana fa',
      sessionsUsed: 8,
      totalSessions: 15,
      status: 'active',
    },
    {
      id: 5,
      firstName: 'Marco',
      lastName: 'Ferrari',
      email: 'marco.ferrari@azienda.com',
      company: 'Azienda SpA',
      department: 'HR',
      joinDate: '3 Gen 2024',
      lastLogin: '5 ore fa',
      sessionsUsed: 6,
      totalSessions: 12,
      status: 'active',
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCompany =
      selectedCompany === 'all' || user.company.toLowerCase().replace(/\s+/g, '-') === selectedCompany;

    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;

    return matchesSearch && matchesCompany && matchesStatus;
  });

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === 'active').length,
    inactiveUsers: users.filter((u) => u.status === 'inactive').length,
    newThisMonth: users.filter((u) => u.joinDate.includes('Gen 2024')).length,
  };

  const handleNavigation = (path: string) => {
    router.push(path as any);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`;
  };

  const getProgressPercentage = (used: number, total: number) => {
    return (used / total) * 100;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Navigation */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('../../../assets/images/malo-logo-dark.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.headerRight}>
          <Button onPress={() => handleNavigation('/admin/dashboard')} variant="outline" size="sm">
            <Ionicons name="arrow-back" size={16} color="#666" style={styles.buttonIcon} />
            <Text style={styles.backButtonText}>Dashboard</Text>
          </Button>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <Card style={StyleSheet.flatten([styles.statCard, styles.orangeCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View style={[styles.statIcon, styles.orangeIcon]}>
                  <Ionicons name="people" size={24} color="white" />
                </View>
                <Text style={[styles.statValue, styles.orangeValue]}>{stats.totalUsers}</Text>
                <Text style={[styles.statLabel, styles.orangeLabel]}>Utenti Totali</Text>
              </View>
            </CardContent>
          </Card>

          <Card style={StyleSheet.flatten([styles.statCard, styles.successCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View style={[styles.statIcon, styles.successIcon]}>
                  <Ionicons name="people" size={24} color="white" />
                </View>
                <Text style={[styles.statValue, styles.successValue]}>{stats.activeUsers}</Text>
                <Text style={[styles.statLabel, styles.successLabel]}>Utenti Attivi</Text>
              </View>
            </CardContent>
          </Card>

          <Card style={StyleSheet.flatten([styles.statCard, styles.grayCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View style={[styles.statIcon, styles.grayIcon]}>
                  <Ionicons name="people" size={24} color="white" />
                </View>
                <Text style={[styles.statValue, styles.grayValue]}>{stats.inactiveUsers}</Text>
                <Text style={[styles.statLabel, styles.grayLabel]}>Utenti Inattivi</Text>
              </View>
            </CardContent>
          </Card>

          <Card style={StyleSheet.flatten([styles.statCard, styles.blueCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View style={[styles.statIcon, styles.blueIcon]}>
                  <Ionicons name="add" size={24} color="white" />
                </View>
                <Text style={[styles.statValue, styles.blueValue]}>{stats.newThisMonth}</Text>
                <Text style={[styles.statLabel, styles.blueLabel]}>Nuovi questo mese</Text>
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Actions Bar */}
        <View style={styles.actionsBar}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={16} color="#9ca3af" style={styles.searchIcon} />
            <TextInput
              placeholder="Cerca utenti per nome o email..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              style={styles.searchInput}
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.actionsRow}>
            <View style={styles.filterContainer}>
              <Text style={styles.filterLabel}>Tutte le aziende</Text>
            </View>
            <View style={styles.filterContainer}>
              <Text style={styles.filterLabel}>Tutti gli stati</Text>
            </View>
            <Button onPress={() => {}} variant="default">
              <Ionicons name="add" size={16} color="white" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Nuovo Utente</Text>
            </Button>
            <Button onPress={() => {}} variant="outline">
              <Ionicons name="download" size={16} color="#666" style={styles.buttonIcon} />
              <Text style={styles.outlineButtonText}>Esporta</Text>
            </Button>
          </View>
        </View>

        {/* Users Table */}
        <Card style={styles.usersCard}>
          <CardHeader>
            <View style={styles.usersHeader}>
              <View>
                <CardTitle style={styles.cardTitle}>Utenti Registrati</CardTitle>
                <Text style={styles.cardDescription}>
                  {filteredUsers.length} di {users.length} utenti
                </Text>
              </View>
              <Button variant="outline" size="sm" onPress={() => {}}>
                <Ionicons name="filter" size={16} color="#666" style={styles.buttonIcon} />
                <Text style={styles.filterButtonText}>Filtri Avanzati</Text>
              </Button>
            </View>
          </CardHeader>
          <CardContent>
            {filteredUsers.length > 0 ? (
              <View style={styles.usersTable}>
                {/* Table Header */}
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableHeaderText, styles.userColumn]}>Utente</Text>
                  <Text style={[styles.tableHeaderText, styles.companyColumn]}>Azienda</Text>
                  <Text style={[styles.tableHeaderText, styles.accessColumn]}>Ultimo Accesso</Text>
                  <Text style={[styles.tableHeaderText, styles.sessionsColumn]}>Sessioni</Text>
                  <Text style={[styles.tableHeaderText, styles.statusColumn]}>Stato</Text>
                  <Text style={[styles.tableHeaderText, styles.actionsColumn]}>Azioni</Text>
                </View>
                
                {/* Table Rows */}
                <View style={styles.tableBody}>
                  {filteredUsers.map((user) => (
                    <View key={user.id} style={styles.tableRow}>
                      <View style={[styles.tableCell, styles.userColumn]}>
                        <View style={styles.userInfo}>
                          <View style={styles.userAvatar}>
                            <Text style={styles.userInitials}>
                              {getInitials(user.firstName, user.lastName)}
                            </Text>
                          </View>
                          <View style={styles.userDetails}>
                            <Text style={styles.userName}>
                              {user.firstName} {user.lastName}
                            </Text>
                            <Text style={styles.userEmail}>{user.email}</Text>
                          </View>
                        </View>
                      </View>
                      
                      <View style={[styles.tableCell, styles.companyColumn]}>
                        <Text style={styles.companyName}>{user.company}</Text>
                        <Text style={styles.departmentName}>{user.department}</Text>
                      </View>
                      
                      <View style={[styles.tableCell, styles.accessColumn]}>
                        <Text style={styles.lastLogin}>{user.lastLogin}</Text>
                        <Text style={styles.joinDate}>Iscritto: {user.joinDate}</Text>
                      </View>
                      
                      <View style={[styles.tableCell, styles.sessionsColumn]}>
                        <View style={styles.progressContainer}>
                          <View style={styles.progressBackground}>
                            <View 
                              style={[
                                styles.progressBar, 
                                { width: `${getProgressPercentage(user.sessionsUsed, user.totalSessions)}%` }
                              ]} 
                            />
                          </View>
                          <Text style={styles.progressText}>
                            {user.sessionsUsed}/{user.totalSessions}
                          </Text>
                        </View>
                      </View>
                      
                      <View style={[styles.tableCell, styles.statusColumn]}>
                        <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                          <Text style={styles.badgeText}>{user.status === 'active' ? 'Attivo' : 'Inattivo'}</Text>
                        </Badge>
                      </View>
                      
                      <View style={[styles.tableCell, styles.actionsColumn]}>
                        <View style={styles.userActions}>
                          <Button variant="outline" size="sm" onPress={() => {}}>
                            <Ionicons name="create" size={16} color="#666" />
                          </Button>
                          <Button variant="outline" size="sm" onPress={() => {}}>
                            <Ionicons name="mail" size={16} color="#666" />
                          </Button>
                          <Button variant="outline" size="sm" onPress={() => {}}>
                            <Ionicons name="trash" size={16} color="#ef4444" />
                          </Button>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="people" size={48} color="#9ca3af" style={styles.emptyIcon} />
                <Text style={styles.emptyTitle}>Nessun utente trovato</Text>
                <Text style={styles.emptyDescription}>Prova a modificare i filtri di ricerca</Text>
              </View>
            )}

            {/* Pagination */}
            {filteredUsers.length > 0 && (
              <View style={styles.pagination}>
                <Text style={styles.paginationText}>
                  Mostrando {filteredUsers.length} di {users.length} utenti
                </Text>
                <View style={styles.paginationButtons}>
                  <Button variant="outline" size="sm" onPress={() => {}} disabled>
                    <Text style={styles.paginationButtonText}>Precedente</Text>
                  </Button>
                  <Button variant="outline" size="sm" onPress={() => {}} disabled>
                    <Text style={styles.paginationButtonText}>Successivo</Text>
                  </Button>
                </View>
              </View>
            )}
          </CardContent>
        </Card>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 32,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9a3412', // ui-orange-900
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    minWidth: 120,
    borderWidth: 1,
  },
  orangeCard: {
    borderColor: '#fed7aa', // ui-orange-200
    backgroundColor: '#fff7ed', // ui-orange-50
  },
  successCard: {
    borderColor: '#bbf7d0', // success-200
    backgroundColor: '#f0fdf4', // success-50
  },
  grayCard: {
    borderColor: '#e5e7eb', // gray-200
    backgroundColor: '#f9fafb', // gray-50
  },
  blueCard: {
    borderColor: '#bfdbfe', // ui-blue-200
    backgroundColor: '#eff6ff', // ui-blue-50
  },
  statCardContent: {
    padding: 24,
  },
  statCardInner: {
    alignItems: 'center',
    gap: 12,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orangeIcon: {
    backgroundColor: '#f97316', // ui-orange-500
  },
  successIcon: {
    backgroundColor: '#22c55e', // success-500
  },
  grayIcon: {
    backgroundColor: '#6b7280', // gray-500
  },
  blueIcon: {
    backgroundColor: '#3b82f6', // ui-blue-500
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  orangeValue: {
    color: '#9a3412', // ui-orange-900
  },
  successValue: {
    color: '#14532d', // success-900
  },
  grayValue: {
    color: '#374151', // gray-700
  },
  blueValue: {
    color: '#1e3a8a', // ui-blue-900
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  orangeLabel: {
    color: '#c2410c', // ui-orange-700
  },
  successLabel: {
    color: '#15803d', // success-700
  },
  grayLabel: {
    color: '#6b7280', // gray-500
  },
  blueLabel: {
    color: '#1d4ed8', // ui-blue-700
  },
  actionsBar: {
    gap: 16,
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  filterContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  filterLabel: {
    fontSize: 14,
    color: '#374151',
  },
  usersCard: {
    backgroundColor: 'white',
    marginBottom: 32,
  },
  usersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#374151',
  },
  usersTable: {
    backgroundColor: 'white',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  tableBody: {
    backgroundColor: 'white',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    alignItems: 'center',
  },
  tableCell: {
    justifyContent: 'center',
  },
  userColumn: {
    flex: 3,
  },
  companyColumn: {
    flex: 2,
  },
  accessColumn: {
    flex: 2,
  },
  sessionsColumn: {
    flex: 2,
  },
  statusColumn: {
    flex: 1,
    alignItems: 'center',
  },
  actionsColumn: {
    flex: 1.5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    backgroundColor: '#f97316', // ui-orange-500
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInitials: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#6b7280',
  },
  companyName: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 2,
  },
  departmentName: {
    fontSize: 14,
    color: '#6b7280',
  },
  lastLogin: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 2,
  },
  joinDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  progressContainer: {
    alignItems: 'center',
    gap: 8,
  },
  progressBackground: {
    width: 64,
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#3b82f6', // ui-blue-500
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  userActions: {
    flexDirection: 'row',
    gap: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
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
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  paginationText: {
    fontSize: 14,
    color: '#6b7280',
  },
  paginationButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  paginationButtonText: {
    fontSize: 14,
    color: '#374151',
  },
}); 