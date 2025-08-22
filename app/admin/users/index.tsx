// Converted from malohr-platform/app/admin/users/page.tsx
// Admin users management with filtering, search, and comprehensive user info for React Native
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge } from '../../../src/components/badge';
import { Button } from '../../../src/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../src/components/card';
import { api, ApiResult } from '../../../src/utils/api';
import { formatDateIT, formatDateTimeIT } from '../../../src/utils/date';

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus] = useState('all');
  const [page, setPage] = useState(1);

  type ApiCompany = { id: number; name: string };
  type ApiUser = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: 'admin' | 'psychologist' | 'user';
    status: 'active' | 'inactive' | 'suspended';
    company_id?: number | null;
    full_name?: string;
    last_login?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    company?: ApiCompany | null;
  };

  type Pagination = {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };

  const [users, setUsers] = useState<ApiUser[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Companies filter options will be loaded and wired later

  // Server-driven list; we keep the name for minimal UI changes
  const filteredUsers = users;

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const params: Record<string, string> = {
        per_page: '20',
        page: String(page),
      };
      if (searchTerm.trim().length > 0) params.search = searchTerm.trim();
      if (selectedStatus !== 'all') params.status = selectedStatus;
      // NOTE: selectedCompany in this UI is a slug; until we wire real companies, we skip company_id
      const qs = new URLSearchParams(params).toString();
      const res: ApiResult<{ success: boolean; data: ApiUser[] }> = await api.get(`/users?${qs}`);
      if (!res.ok) {
        throw new Error(res.message || 'Errore nel caricamento utenti');
      }
      const list = (res.data as unknown as ApiUser[]) || [];
      setUsers(list);
      // Try to read pagination from raw if present
      const pg = (res.raw && (res.raw as any).pagination) as Pagination | undefined;
      setPagination(pg ?? null);
    } catch (e: any) {
      setError(typeof e?.message === 'string' ? e.message : 'Errore sconosciuto');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedStatus, page]);

  const stats = useMemo(() => {
    const totalUsers = pagination?.total ?? users.length;
    const activeUsers = users.filter((u) => u.status === 'active').length;
    const inactiveUsers = users.filter((u) => u.status === 'inactive').length;
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const newThisMonth = users.filter((u) => {
      if (!u.created_at) return false;
      const d = new Date(u.created_at.replace(' ', 'T'));
      return d.getMonth() === month && d.getFullYear() === year;
    }).length;
    return { totalUsers, activeUsers, inactiveUsers, newThisMonth };
  }, [users, pagination]);

  const handleNavigation = (path: string) => {
    router.push(path as any);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();
  };

  const getProgressPercentage = (used: number, total: number) => {
    if (!total || total <= 0) return 0;
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
                  {filteredUsers.length} di {pagination?.total ?? filteredUsers.length} utenti
                </Text>
              </View>
              <Button variant="outline" size="sm" onPress={() => {}}>
                <Ionicons name="filter" size={16} color="#666" style={styles.buttonIcon} />
                <Text style={styles.filterButtonText}>Filtri Avanzati</Text>
              </Button>
            </View>
          </CardHeader>
          <CardContent>
            {error ? (
              <View style={styles.emptyState}>
                <Ionicons name="warning" size={48} color="#ef4444" style={styles.emptyIcon} />
                <Text style={styles.emptyTitle}>Errore</Text>
                <Text style={styles.emptyDescription}>{error}</Text>
              </View>
            ) : loading ? (
              <View style={styles.emptyState}>
                <Ionicons name="reload" size={32} color="#9ca3af" style={styles.emptyIcon} />
                <Text style={styles.emptyDescription}>Caricamento utenti…</Text>
              </View>
            ) : filteredUsers.length > 0 ? (
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
                  {filteredUsers.map((user: ApiUser) => (
                    <View key={user.id} style={styles.tableRow}>
                      <View style={[styles.tableCell, styles.userColumn]}>
                        <View style={styles.userInfo}>
                          <View style={styles.userAvatar}>
                            <Text style={styles.userInitials}>
                              {getInitials(user.first_name, user.last_name)}
                            </Text>
                          </View>
                          <View style={styles.userDetails}>
                            <Text style={styles.userName}>
                              {user.first_name} {user.last_name}
                            </Text>
                            <Text style={styles.userEmail}>{user.email}</Text>
                          </View>
                        </View>
                      </View>
                      
                      <View style={[styles.tableCell, styles.companyColumn]}>
                        <Text style={styles.companyName}>{user.company?.name ?? '-'}</Text>
                        <Text style={styles.departmentName}>-</Text>
                      </View>
                      
                      <View style={[styles.tableCell, styles.accessColumn]}>
                        <Text style={styles.lastLogin}>{user.last_login ? formatDateTimeIT(user.last_login) : '-'}</Text>
                        <Text style={styles.joinDate}>Iscritto: {formatDateIT(user.created_at)}</Text>
                      </View>
                      
                      <View style={[styles.tableCell, styles.sessionsColumn]}>
                        <View style={styles.progressContainer}>
                          <View style={styles.progressBackground}>
                            <View 
                              style={[
                                styles.progressBar, 
                                { width: `${getProgressPercentage(0, 0)}%` }
                              ]} 
                            />
                          </View>
                          <Text style={styles.progressText}>
                            0/0
                          </Text>
                        </View>
                      </View>
                      
                      <View style={[styles.tableCell, styles.statusColumn]}>
                        <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                          <Text style={styles.badgeText}>
                            {user.status === 'active' ? 'Attivo' : user.status === 'inactive' ? 'Inattivo' : 'Sospeso'}
                          </Text>
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
                  Mostrando {filteredUsers.length} di {pagination?.total ?? filteredUsers.length} utenti
                </Text>
                <View style={styles.paginationButtons}>
                  <Button
                    variant="outline"
                    size="sm"
                    onPress={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={!pagination || page <= 1}
                  >
                    <Text style={styles.paginationButtonText}>Precedente</Text>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onPress={() => setPage((p) => (!pagination ? p : Math.min(pagination.last_page, p + 1)))}
                    disabled={!pagination || page >= (pagination?.last_page ?? 1)}
                  >
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