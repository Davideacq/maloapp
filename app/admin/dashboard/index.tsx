// Converted from malohr-platform/app/admin/dashboard/page.tsx
// Admin dashboard with stats, companies, and user management for React Native
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppIcon } from '../../../src/components/app-icon';
import { Badge } from '../../../src/components/badge';
import { Button } from '../../../src/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../src/components/card';

export default function AdminDashboard() {
  console.log('AdminDashboard page loaded');
  
  const [searchTerm, setSearchTerm] = useState('');

  const stats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalCompanies: 15,
    totalSessions: 3456,
    monthlyGrowth: 12.5,
  };

  const companies = [
    { id: 1, name: 'Azienda SpA', users: 156, activeSessions: 89, status: 'active' },
    { id: 2, name: 'Tech Solutions', users: 203, activeSessions: 124, status: 'active' },
    { id: 3, name: 'Marketing Pro', users: 87, activeSessions: 45, status: 'active' },
    { id: 4, name: 'Finance Corp', users: 134, activeSessions: 78, status: 'inactive' },
  ];

  const recentActivity = [
    { id: 1, action: 'Nuovo utente registrato', company: 'Azienda SpA', time: '2 min fa', type: 'user' },
    { id: 2, action: 'Sessione completata', company: 'Tech Solutions', time: '15 min fa', type: 'session' },
    { id: 3, action: 'Nuova azienda aggiunta', company: 'StartUp Inc', time: '1 ora fa', type: 'company' },
    { id: 4, action: 'Guida aggiornata', company: 'Sistema', time: '2 ore fa', type: 'content' },
  ];

  const users = [
    { id: 1, name: 'Mario Rossi', company: 'Azienda SpA', lastAccess: '2 ore fa', sessions: '8/12', status: 'active' },
    { id: 2, name: 'Laura Bianchi', company: 'Tech Solutions', lastAccess: '1 giorno fa', sessions: '5/10', status: 'active' },
    { id: 3, name: 'Giuseppe Verdi', company: 'Marketing Pro', lastAccess: '3 giorni fa', sessions: '0/8', status: 'inactive' },
  ];

  const handleNavigation = (path: string) => {
    router.push(path as any);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return 'people';
      case 'session':
        return 'calendar';
      case 'company':
        return 'business';
      case 'content':
        return 'settings';
      default:
        return 'information-circle';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user':
        return '#3b82f6'; // blue-500
      case 'session':
        return '#14b8a6'; // teal-500
      case 'company':
        return '#f97316'; // orange-500
      case 'content':
        return '#0ea5e9'; // lightBlue-500
      default:
        return '#6b7280'; // gray-500
    }
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
          <Button onPress={() => handleNavigation('/admin/companies/create')} variant="default" size="sm">
            <Ionicons name="add" size={16} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Aggiungi Azienda</Text>
          </Button>
          <Button onPress={() => handleNavigation('/admin/settings')} variant="outline" size="sm">
            <Ionicons name="settings" size={16} color="#666" style={styles.buttonIcon} />
            <Text style={styles.outlineButtonText}>Impostazioni</Text>
          </Button>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Dashboard Title */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Dashboard Amministratore</Text>
          <Text style={styles.subtitle}>Panoramica generale della piattaforma e gestione utenti</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <Card style={StyleSheet.flatten([styles.statCard, styles.orangeCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View>
                  <Text style={[styles.statLabel, styles.orangeLabel]}>Utenti Totali</Text>
                  <Text style={[styles.statValue, styles.orangeValue]}>{stats.totalUsers}</Text>
                </View>
                <View style={[styles.statIcon, styles.orangeIcon]}>
                  <Ionicons name="people" size={24} color="white" />
                </View>
              </View>
            </CardContent>
          </Card>

          <Card style={StyleSheet.flatten([styles.statCard, styles.blueCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View>
                  <Text style={[styles.statLabel, styles.blueLabel]}>Utenti Attivi</Text>
                  <Text style={[styles.statValue, styles.blueValue]}>{stats.activeUsers}</Text>
                </View>
                <View style={[styles.statIcon, styles.blueIcon]}>
                  <Ionicons name="trending-up" size={24} color="white" />
                </View>
              </View>
            </CardContent>
          </Card>

          <Card style={StyleSheet.flatten([styles.statCard, styles.tealCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View>
                  <Text style={[styles.statLabel, styles.tealLabel]}>Aziende</Text>
                  <Text style={[styles.statValue, styles.tealValue]}>{stats.totalCompanies}</Text>
                </View>
                <View style={[styles.statIcon, styles.tealIcon]}>
                  <Ionicons name="business" size={24} color="white" />
                </View>
              </View>
            </CardContent>
          </Card>

          <Card style={StyleSheet.flatten([styles.statCard, styles.lightBlueCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View>
                  <Text style={[styles.statLabel, styles.lightBlueLabel]}>Sessioni Totali</Text>
                  <Text style={[styles.statValue, styles.lightBlueValue]}>{stats.totalSessions}</Text>
                </View>
                <View style={[styles.statIcon, styles.lightBlueIcon]}>
                  <Ionicons name="calendar" size={24} color="white" />
                </View>
              </View>
            </CardContent>
          </Card>

          <Card style={StyleSheet.flatten([styles.statCard, styles.successCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View>
                  <Text style={[styles.statLabel, styles.successLabel]}>Crescita Mensile</Text>
                  <Text style={[styles.statValue, styles.successValue]}>+{stats.monthlyGrowth}%</Text>
                </View>
                <View style={[styles.statIcon, styles.successIcon]}>
                  <Ionicons name="trending-up" size={24} color="white" />
                </View>
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsGrid}>
          <Pressable onPress={() => handleNavigation('/admin/users')} style={[styles.actionButton, styles.orangeAction]}>
            <AppIcon name="user" size={20} style={{ marginRight: 8 }} />
            <Text style={styles.actionText}>Gestione Utenti</Text>
          </Pressable>

          <Pressable onPress={() => handleNavigation('/admin/companies')} style={[styles.actionButton, styles.blueAction]}>
            <AppIcon name="home" size={20} style={{ marginRight: 8 }} />
            <Text style={[styles.actionText, styles.blueActionText]}>Gestione Aziende</Text>
          </Pressable>

          <Pressable onPress={() => handleNavigation('/admin/content')} style={[styles.actionButton, styles.tealAction]}>
            <AppIcon name="settings" size={20} style={{ marginRight: 8 }} />
            <Text style={[styles.actionText, styles.tealActionText]}>Gestione Contenuti</Text>
          </Pressable>

          <Pressable onPress={() => handleNavigation('/admin/analytics')} style={[styles.actionButton, styles.lightBlueAction]}>
            <AppIcon name="book-open" size={20} style={{ marginRight: 8 }} />
            <Text style={[styles.actionText, styles.lightBlueActionText]}>Analytics</Text>
          </Pressable>
        </View>

        {/* Main Content Grid */}
        <View style={styles.contentGrid}>
          {/* Companies Overview */}
          <Card style={styles.companiesCard}>
            <CardHeader>
              <View style={styles.cardHeaderRow}>
                <View>
                  <CardTitle style={styles.cardTitle}>Aziende Clienti</CardTitle>
                  <Text style={styles.cardDescription}>Panoramica delle aziende registrate</Text>
                </View>
                <Button onPress={() => handleNavigation('/admin/companies/create')} variant="default" size="sm">
                  <Ionicons name="add" size={16} color="white" style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>Aggiungi</Text>
                </Button>
              </View>
            </CardHeader>
            <CardContent>
              <View style={styles.companiesList}>
                {companies.map((company) => (
                  <View key={company.id} style={styles.companyItem}>
                    <View style={styles.companyInfo}>
                      <View style={styles.companyIcon}>
                        <Ionicons name="business" size={20} color="white" />
                      </View>
                      <View style={styles.companyDetails}>
                        <Text style={styles.companyName}>{company.name}</Text>
                        <Text style={styles.companyStats}>
                          {company.users} utenti • {company.activeSessions} sessioni attive
                        </Text>
                      </View>
                    </View>
                    <Badge variant={company.status === 'active' ? 'success' : 'secondary'}>
                      <Text style={styles.badgeText}>{company.status === 'active' ? 'Attiva' : 'Inattiva'}</Text>
                    </Badge>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card style={styles.activityCard}>
            <CardHeader>
              <CardTitle style={styles.cardTitle}>Attività Recente</CardTitle>
              <Text style={styles.cardDescription}>Ultime azioni sulla piattaforma</Text>
            </CardHeader>
            <CardContent>
              <View style={styles.activityList}>
                {recentActivity.map((activity) => (
                  <View key={activity.id} style={styles.activityItem}>
                    <View style={[styles.activityIcon, { backgroundColor: getActivityColor(activity.type) }]}>
                      <Ionicons name={getActivityIcon(activity.type) as any} size={20} color="white" />
                    </View>
                    <View style={styles.activityDetails}>
                      <Text style={styles.activityAction}>{activity.action}</Text>
                      <Text style={styles.activityMeta}>
                        {activity.company} • {activity.time}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Users Management Preview */}
        <Card style={styles.usersCard}>
          <CardHeader>
            <View style={styles.usersHeader}>
              <View>
                <CardTitle style={styles.cardTitle}>Gestione Utenti</CardTitle>
                <Text style={styles.cardDescription}>Panoramica degli utenti registrati</Text>
              </View>
              <View style={styles.usersActions}>
                <View style={styles.searchContainer}>
                  <Ionicons name="search" size={16} color="#9ca3af" style={styles.searchIcon} />
                  <TextInput
                    placeholder="Cerca utenti..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    style={styles.searchInput}
                    placeholderTextColor="#9ca3af"
                  />
                </View>
                <Button variant="outline" size="sm" onPress={() => {}}>
                  <Ionicons name="filter" size={16} color="#666" style={styles.buttonIcon} />
                  <Text style={styles.filterText}>Filtri</Text>
                </Button>
              </View>
            </View>
          </CardHeader>
          <CardContent>
            <View style={styles.usersTable}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, styles.nameColumn]}>Nome</Text>
                <Text style={[styles.tableHeaderText, styles.companyColumn]}>Azienda</Text>
                <Text style={[styles.tableHeaderText, styles.accessColumn]}>Ultimo Accesso</Text>
                <Text style={[styles.tableHeaderText, styles.sessionsColumn]}>Sessioni</Text>
                <Text style={[styles.tableHeaderText, styles.statusColumn]}>Stato</Text>
                <Text style={[styles.tableHeaderText, styles.actionsColumn]}>Azioni</Text>
              </View>
              
              {/* Table Rows */}
              {users.map((user) => (
                <View key={user.id} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.nameColumn]}>{user.name}</Text>
                  <Text style={[styles.tableCell, styles.companyColumn]}>{user.company}</Text>
                  <Text style={[styles.tableCell, styles.accessColumn]}>{user.lastAccess}</Text>
                  <Text style={[styles.tableCell, styles.sessionsColumn]}>{user.sessions}</Text>
                                     <View style={styles.statusColumn}>
                     <Badge variant={user.status === 'active' ? 'success' : 'warning'}>
                       <Text style={styles.badgeText}>{user.status === 'active' ? 'Attivo' : 'Inattivo'}</Text>
                     </Badge>
                   </View>
                   <View style={styles.actionsColumn}>
                     <Button 
                       variant="outline" 
                       size="sm" 
                       onPress={() => handleNavigation(`/admin/users/${user.id}`)}
                     >
                       <Text style={styles.manageText}>Gestisci</Text>
                     </Button>
                   </View>
                </View>
              ))}
            </View>
            
            <View style={styles.seeAllContainer}>
              <Button 
                variant="outline" 
                onPress={() => handleNavigation('/admin/users')}
              >
                <Text style={styles.seeAllText}>Vedi tutti gli utenti</Text>
              </Button>
            </View>
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
  buttonIcon: {
    marginRight: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  outlineButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  titleSection: {
    marginBottom: 32,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827', // text-100
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280', // text-60
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
  blueCard: {
    borderColor: '#bfdbfe', // ui-blue-200
    backgroundColor: '#eff6ff', // ui-blue-50
  },
  tealCard: {
    borderColor: '#99f6e4', // ui-teal-200
    backgroundColor: '#f0fdfa', // ui-teal-50
  },
  lightBlueCard: {
    borderColor: '#bae6fd', // ui-lightBlue-200
    backgroundColor: '#f0f9ff', // ui-lightBlue-50
  },
  successCard: {
    borderColor: '#bbf7d0', // success-200
    backgroundColor: '#f0fdf4', // success-50
  },
  statCardContent: {
    padding: 24,
  },
  statCardInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  orangeLabel: {
    color: '#c2410c', // ui-orange-700
  },
  blueLabel: {
    color: '#1d4ed8', // ui-blue-700
  },
  tealLabel: {
    color: '#0f766e', // ui-teal-700
  },
  lightBlueLabel: {
    color: '#0369a1', // ui-lightBlue-700
  },
  successLabel: {
    color: '#15803d', // success-700
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  orangeValue: {
    color: '#9a3412', // ui-orange-900
  },
  blueValue: {
    color: '#1e3a8a', // ui-blue-900
  },
  tealValue: {
    color: '#134e4a', // ui-teal-900
  },
  lightBlueValue: {
    color: '#0c4a6e', // ui-lightBlue-900
  },
  successValue: {
    color: '#14532d', // success-900
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
  blueIcon: {
    backgroundColor: '#3b82f6', // ui-blue-500
  },
  tealIcon: {
    backgroundColor: '#14b8a6', // ui-teal-500
  },
  lightBlueIcon: {
    backgroundColor: '#0ea5e9', // ui-lightBlue-500
  },
  successIcon: {
    backgroundColor: '#22c55e', // success-500
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
    minWidth: 120,
    height: 64,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  orangeAction: {
    backgroundColor: '#f97316', // ui-orange-500
  },
  blueAction: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#3b82f6', // ui-blue-500
  },
  tealAction: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#14b8a6', // ui-teal-500
  },
  lightBlueAction: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#0ea5e9', // ui-lightBlue-500
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  blueActionText: {
    color: '#3b82f6',
  },
  tealActionText: {
    color: '#14b8a6',
  },
  lightBlueActionText: {
    color: '#0ea5e9',
  },
  contentGrid: {
    gap: 32,
    marginBottom: 32,
  },
  companiesCard: {
    backgroundColor: 'white',
  },
  activityCard: {
    backgroundColor: 'white',
  },
  cardHeaderRow: {
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
  companiesList: {
    gap: 16,
  },
  companyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  companyIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#f97316', // ui-orange-500
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  companyDetails: {
    flex: 1,
  },
  companyName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  companyStats: {
    fontSize: 14,
    color: '#6b7280',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityDetails: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  activityMeta: {
    fontSize: 14,
    color: '#6b7280',
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
  usersActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
    width: 200,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  filterText: {
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
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    alignItems: 'center',
  },
  tableCell: {
    fontSize: 14,
    color: '#111827',
  },
  nameColumn: {
    flex: 2,
  },
  companyColumn: {
    flex: 2,
  },
  accessColumn: {
    flex: 1.5,
  },
  sessionsColumn: {
    flex: 1,
  },
  statusColumn: {
    flex: 1,
    alignItems: 'center',
  },
  actionsColumn: {
    flex: 1,
    alignItems: 'center',
  },
  manageText: {
    fontSize: 14,
    color: '#374151',
  },
  seeAllContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: '#374151',
  },
}); 