// Converted from malohr-platform/app/admin/companies/page.tsx
// Admin companies management page with search, filters and actions
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge } from '../../../src/components/badge';
import { Card, CardContent } from '../../../src/components/card';
import { Input } from '../../../src/components/input';

export default function AdminCompaniesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const companies = [
    {
      id: 1,
      name: 'Azienda SpA',
      domain: 'azienda.com',
      users: 156,
      activeSessions: 89,
      totalSessions: 1234,
      joinDate: '15 Gen 2023',
      status: 'active',
      plan: 'Premium',
      contact: 'admin@azienda.com',
    },
    {
      id: 2,
      name: 'Tech Solutions',
      domain: 'techsolutions.com',
      users: 203,
      activeSessions: 124,
      totalSessions: 2156,
      joinDate: '8 Feb 2023',
      status: 'active',
      plan: 'Enterprise',
      contact: 'hr@techsolutions.com',
    },
    {
      id: 3,
      name: 'Marketing Pro',
      domain: 'marketingpro.com',
      users: 87,
      activeSessions: 45,
      totalSessions: 567,
      joinDate: '22 Mar 2023',
      status: 'active',
      plan: 'Standard',
      contact: 'info@marketingpro.com',
    },
    {
      id: 4,
      name: 'Finance Corp',
      domain: 'financecorp.com',
      users: 134,
      activeSessions: 0,
      totalSessions: 890,
      joinDate: '10 Apr 2023',
      status: 'inactive',
      plan: 'Premium',
      contact: 'contact@financecorp.com',
    },
    {
      id: 5,
      name: 'StartUp Inc',
      domain: 'startup.com',
      users: 45,
      activeSessions: 23,
      totalSessions: 234,
      joinDate: '5 Mag 2023',
      status: 'active',
      plan: 'Standard',
      contact: 'team@startup.com',
    },
  ];

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || company.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleBackToDashboard = () => {
    router.push('/admin/dashboard' as any);
  };

  const handleCreateCompany = () => {
    router.push('/admin/companies/create' as any);
  };

  const handleEditCompany = (companyId: number) => {
    router.push(`/admin/companies/${companyId}/edit` as any);
  };

  const handleDeleteCompany = (companyId: number, companyName: string) => {
    Alert.alert(
      'Elimina Azienda',
      `Sei sicuro di voler eliminare "${companyName}"? Tutti i dati associati saranno persi.`,
      [
        { text: 'Annulla', style: 'cancel' },
        { 
          text: 'Elimina', 
          style: 'destructive',
          onPress: () => Alert.alert('Successo', 'Azienda eliminata con successo')
        }
      ]
    );
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'success' : 'secondary';
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise': return 'default';
      case 'Premium': return 'warning';
      case 'Standard': return 'outline';
      default: return 'secondary';
    }
  };

  const renderCompany = ({ item }: { item: typeof companies[0] }) => (
    <Card style={styles.companyCard}>
      <CardContent style={styles.companyContent}>
        <View style={styles.companyHeader}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{item.name}</Text>
            <Text style={styles.companyDomain}>{item.domain}</Text>
          </View>
          <View style={styles.companyStatus}>
            <Badge variant={getStatusColor(item.status) as any}>
              {item.status === 'active' ? 'Attiva' : 'Inattiva'}
            </Badge>
            <Badge variant={getPlanColor(item.plan) as any} style={styles.planBadge}>
              {item.plan}
            </Badge>
          </View>
        </View>

        <View style={styles.companyStats}>
          <View style={styles.statItem}>
            <Ionicons name="people" size={16} color="#6b7280" />
            <Text style={styles.statValue}>{item.users}</Text>
            <Text style={styles.statLabel}>utenti</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="pulse" size={16} color="#6b7280" />
            <Text style={styles.statValue}>{item.activeSessions}</Text>
            <Text style={styles.statLabel}>sessioni attive</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="calendar" size={16} color="#6b7280" />
            <Text style={styles.statValue}>{item.totalSessions}</Text>
            <Text style={styles.statLabel}>totali</Text>
          </View>
        </View>

        <View style={styles.companyMeta}>
          <Text style={styles.joinDate}>Registrata: {item.joinDate}</Text>
          <Text style={styles.contact}>{item.contact}</Text>
        </View>

        <View style={styles.companyActions}>
          <Pressable
            onPress={() => handleEditCompany(item.id)}
            style={styles.actionButton}
          >
            <Ionicons name="pencil" size={16} color="#3b82f6" />
            <Text style={styles.actionText}>Modifica</Text>
          </Pressable>
          <Pressable
            onPress={() => handleDeleteCompany(item.id, item.name)}
            style={styles.actionButton}
          >
            <Ionicons name="trash" size={16} color="#ef4444" />
            <Text style={[styles.actionText, styles.deleteText]}>Elimina</Text>
          </Pressable>
        </View>
      </CardContent>
    </Card>
  );

  const statusFilters = [
    { id: 'all', label: 'Tutte' },
    { id: 'active', label: 'Attive' },
    { id: 'inactive', label: 'Inattive' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBackToDashboard} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#3b82f6" />
          <Text style={styles.backText}>Dashboard</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Gestione Aziende</Text>
        <Pressable onPress={handleCreateCompany} style={styles.createButton}>
          <Ionicons name="add" size={20} color="#3b82f6" />
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        {/* Search and Filters */}
        <View style={styles.filtersContainer}>
          <Input
            placeholder="Cerca aziende..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={styles.searchInput}
          />
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statusFilters}>
            {statusFilters.map((filter) => (
              <Pressable
                key={filter.id}
                onPress={() => setSelectedStatus(filter.id)}
                style={[
                  styles.filterChip,
                  selectedStatus === filter.id && styles.activeFilter
                ]}
              >
                <Text style={[
                  styles.filterText,
                  selectedStatus === filter.id && styles.activeFilterText
                ]}>
                  {filter.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Summary Stats */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{companies.length}</Text>
              <Text style={styles.summaryLabel}>Aziende Totali</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>
                {companies.filter(c => c.status === 'active').length}
              </Text>
              <Text style={styles.summaryLabel}>Attive</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>
                {companies.reduce((sum, c) => sum + c.users, 0)}
              </Text>
              <Text style={styles.summaryLabel}>Utenti Totali</Text>
            </View>
          </View>
        </View>

        {/* Companies List */}
        <View style={styles.companiesSection}>
          <Text style={styles.sectionTitle}>
            {filteredCompanies.length} aziende trovate
          </Text>
          <FlatList
            data={filteredCompanies}
            renderItem={renderCompany}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nessuna azienda trovata</Text>
            }
          />
        </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 8,
    color: '#3b82f6',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  createButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  filtersContainer: {
    marginBottom: 24,
  },
  searchInput: {
    marginBottom: 16,
  },
  statusFilters: {
    marginHorizontal: -4,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activeFilter: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeFilterText: {
    color: 'white',
  },
  summaryContainer: {
    marginBottom: 24,
  },
  summaryGrid: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  companiesSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  companyCard: {
    marginBottom: 16,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  companyContent: {
    padding: 16,
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  companyDomain: {
    fontSize: 14,
    color: '#6b7280',
  },
  companyStatus: {
    alignItems: 'flex-end',
  },
  planBadge: {
    marginTop: 8,
  },
  companyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  companyMeta: {
    marginBottom: 16,
  },
  joinDate: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  contact: {
    fontSize: 14,
    color: '#3b82f6',
  },
  companyActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#3b82f6',
  },
  deleteText: {
    color: '#ef4444',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6b7280',
    fontStyle: 'italic',
    marginVertical: 32,
  },
}); 