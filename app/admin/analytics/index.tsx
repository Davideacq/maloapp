// Converted from malohr-platform/app/admin/analytics/page.tsx
// Admin analytics with comprehensive stats, top companies, and trending guides for React Native
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge } from '../../../src/components/badge';
import { Breadcrumb } from '../../../src/components/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '../../../src/components/card';

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');

  const stats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalSessions: 3456,
    completedSessions: 2890,
    averageSessionDuration: '45 min',
    userGrowth: 12.5,
    sessionGrowth: 8.3,
    completionRate: 83.6,
  };

  const topCompanies = [
    { name: 'Tech Solutions', users: 203, sessions: 456, growth: 15.2 },
    { name: 'Azienda SpA', users: 156, sessions: 389, growth: 8.7 },
    { name: 'Finance Corp', users: 134, sessions: 298, growth: -2.1 },
    { name: 'Marketing Pro', users: 87, sessions: 234, growth: 22.4 },
    { name: 'StartUp Inc', users: 45, sessions: 123, growth: 45.6 },
  ];

  const topGuides = [
    { title: 'Gestione del Tempo e Priorità', views: 2341, completions: 1987, rate: 84.9 },
    { title: 'Tecniche di Respirazione', views: 1234, completions: 1098, rate: 89.0 },
    { title: 'Mindfulness per la Concentrazione', views: 856, completions: 712, rate: 83.2 },
    { title: 'Comunicazione Assertiva', views: 645, completions: 523, rate: 81.1 },
    { title: 'Work-Life Balance', views: 534, completions: 445, rate: 83.3 },
  ];

  const monthlyData = [
    { month: 'Gen', users: 890, sessions: 2340 },
    { month: 'Feb', users: 945, sessions: 2567 },
    { month: 'Mar', users: 1023, sessions: 2890 },
    { month: 'Apr', users: 1156, sessions: 3234 },
    { month: 'Mag', users: 1247, sessions: 3456 },
  ];

  const timeRangeOptions = [
    { value: '7d', label: 'Ultimi 7 giorni' },
    { value: '30d', label: 'Ultimi 30 giorni' },
    { value: '90d', label: 'Ultimi 90 giorni' },
    { value: '1y', label: 'Ultimo anno' },
  ];

  const handleNavigation = (path: string) => {
    router.push(path as any);
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return '#22c55e'; // green
    if (growth < 0) return '#ef4444'; // red
    return '#6b7280'; // gray
  };

  const getProgressWidth = (value: number, max: number) => {
    return Math.min((value / max) * 100, 100);
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
        <View style={styles.headerCenter}>
          <Breadcrumb
            items={[
              { label: 'Dashboard', onPress: () => handleNavigation('/admin/dashboard') },
              { label: 'Analytics' },
            ]}
          />
        </View>
        <View style={styles.headerRight}>
          <View style={styles.timeRangeContainer}>
            <Text style={styles.timeRangeLabel}>Ultimi 30 giorni</Text>
          </View>
          <Pressable 
            onPress={() => {}} 
            style={styles.headerButton}
          >
            <Ionicons name="download" size={20} color="white" />
            <Text style={styles.headerButtonText}>Esporta</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Main Stats */}
        <View style={styles.statsGrid}>
          <Card style={StyleSheet.flatten([styles.statCard, styles.orangeCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View>
                  <Text style={[styles.statLabel, styles.orangeLabel]}>Utenti Totali</Text>
                  <Text style={[styles.statValue, styles.orangeValue]}>{stats.totalUsers}</Text>
                  <Text style={styles.growthText}>+{stats.userGrowth}% vs mese scorso</Text>
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
                  <Text style={[styles.statLabel, styles.blueLabel]}>Sessioni Totali</Text>
                  <Text style={[styles.statValue, styles.blueValue]}>{stats.totalSessions}</Text>
                  <Text style={styles.growthText}>+{stats.sessionGrowth}% vs mese scorso</Text>
                </View>
                <View style={[styles.statIcon, styles.blueIcon]}>
                  <Ionicons name="calendar" size={24} color="white" />
                </View>
              </View>
            </CardContent>
          </Card>

          <Card style={StyleSheet.flatten([styles.statCard, styles.tealCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View>
                  <Text style={[styles.statLabel, styles.tealLabel]}>Tasso Completamento</Text>
                  <Text style={[styles.statValue, styles.tealValue]}>{stats.completionRate}%</Text>
                  <Text style={styles.completionsText}>{stats.completedSessions} completate</Text>
                </View>
                <View style={[styles.statIcon, styles.tealIcon]}>
                  <Ionicons name="trending-up" size={24} color="white" />
                </View>
              </View>
            </CardContent>
          </Card>

          <Card style={StyleSheet.flatten([styles.statCard, styles.lightBlueCard])}>
            <CardContent style={styles.statCardContent}>
              <View style={styles.statCardInner}>
                <View>
                  <Text style={[styles.statLabel, styles.lightBlueLabel]}>Durata Media</Text>
                  <Text style={[styles.statValue, styles.lightBlueValue]}>{stats.averageSessionDuration}</Text>
                  <Text style={styles.durationText}>per sessione</Text>
                </View>
                <View style={[styles.statIcon, styles.lightBlueIcon]}>
                  <Ionicons name="time" size={24} color="white" />
                </View>
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Main Content Grid */}
        <View style={styles.contentGrid}>
          {/* Top Companies */}
          <Card style={styles.companiesCard}>
            <CardHeader>
              <CardTitle style={styles.cardTitle}>Aziende Top Performer</CardTitle>
              <Text style={styles.cardDescription}>Aziende con maggiore utilizzo della piattaforma</Text>
            </CardHeader>
            <CardContent>
              <View style={styles.companiesList}>
                {topCompanies.map((company, index) => (
                  <View key={company.name} style={styles.companyItem}>
                    <View style={styles.companyInfo}>
                      <View style={styles.companyRank}>
                        <Text style={styles.rankNumber}>{index + 1}</Text>
                      </View>
                      <View style={styles.companyDetails}>
                        <Text style={styles.companyName}>{company.name}</Text>
                        <Text style={styles.companyStats}>
                          {company.users} utenti • {company.sessions} sessioni
                        </Text>
                      </View>
                    </View>
                                         <Badge style={StyleSheet.flatten([styles.growthBadge, { backgroundColor: getGrowthColor(company.growth) }])}>
                       <Text style={styles.badgeText}>
                         {company.growth > 0 ? '+' : ''}{company.growth}%
                       </Text>
                     </Badge>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>

          {/* Top Guides */}
          <Card style={styles.guidesCard}>
            <CardHeader>
              <CardTitle style={styles.cardTitle}>Guide Più Popolari</CardTitle>
              <Text style={styles.cardDescription}>Contenuti con maggiori visualizzazioni e completamenti</Text>
            </CardHeader>
            <CardContent>
              <View style={styles.guidesList}>
                {topGuides.map((guide, index) => (
                  <View key={guide.title} style={styles.guideItem}>
                    <View style={styles.guideInfo}>
                      <View style={[styles.guideRank, styles.blueRank]}>
                        <Text style={styles.rankNumber}>{index + 1}</Text>
                      </View>
                      <View style={styles.guideDetails}>
                        <Text style={styles.guideTitle}>{guide.title}</Text>
                        <Text style={styles.guideStats}>
                          {guide.views} visualizzazioni • {guide.completions} completamenti
                        </Text>
                      </View>
                    </View>
                    <Badge variant="success">
                      <Text style={styles.badgeText}>{guide.rate}%</Text>
                    </Badge>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Monthly Trend */}
        <Card style={styles.trendCard}>
          <CardHeader>
            <CardTitle style={styles.cardTitle}>Trend Mensile</CardTitle>
            <Text style={styles.cardDescription}>Crescita di utenti e sessioni negli ultimi mesi</Text>
          </CardHeader>
          <CardContent>
            <View style={styles.trendList}>
              {monthlyData.map((data) => (
                <View key={data.month} style={styles.trendItem}>
                  <View style={styles.monthLabel}>
                    <Text style={styles.monthText}>{data.month}</Text>
                  </View>
                  <View style={styles.trendData}>
                    <View style={styles.trendRow}>
                      <View style={styles.trendInfo}>
                        <Text style={styles.trendLabel}>Utenti</Text>
                        <Text style={styles.trendValue}>{data.users}</Text>
                      </View>
                      <View style={styles.progressContainer}>
                        <View style={styles.progressBackground}>
                          <View 
                            style={[
                              styles.progressBar, 
                              styles.orangeProgress, 
                              { width: `${getProgressWidth(data.users, 1300)}%` }
                            ]} 
                          />
                        </View>
                      </View>
                    </View>
                    <View style={styles.trendRow}>
                      <View style={styles.trendInfo}>
                        <Text style={styles.trendLabel}>Sessioni</Text>
                        <Text style={styles.trendValue}>{data.sessions}</Text>
                      </View>
                      <View style={styles.progressContainer}>
                        <View style={styles.progressBackground}>
                          <View 
                            style={[
                              styles.progressBar, 
                              styles.blueProgress, 
                              { width: `${getProgressWidth(data.sessions, 3500)}%` }
                            ]} 
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
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
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
  },
  headerButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9a3412', // ui-orange-900
  },
  timeRangeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
  },
  timeRangeLabel: {
    fontSize: 14,
    color: '#374151',
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  statsGrid: {
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    borderWidth: 1,
    marginBottom: 16,
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
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
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
  growthText: {
    fontSize: 14,
    color: '#22c55e', // success-600
  },
  completionsText: {
    fontSize: 14,
    color: '#6b7280',
  },
  durationText: {
    fontSize: 14,
    color: '#6b7280',
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
  contentGrid: {
    gap: 32,
    marginBottom: 32,
  },
  companiesCard: {
    backgroundColor: 'white',
  },
  guidesCard: {
    backgroundColor: 'white',
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
  companyRank: {
    width: 32,
    height: 32,
    backgroundColor: '#f97316', // ui-orange-500
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankNumber: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
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
  growthBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
  guidesList: {
    gap: 16,
  },
  guideItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
  },
  guideInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  guideRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueRank: {
    backgroundColor: '#3b82f6', // ui-blue-500
  },
  guideDetails: {
    flex: 1,
  },
  guideTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  guideStats: {
    fontSize: 14,
    color: '#6b7280',
  },
  trendCard: {
    backgroundColor: 'white',
    marginBottom: 32,
  },
  trendList: {
    gap: 24,
  },
  trendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  monthLabel: {
    width: 48,
    alignItems: 'center',
  },
  monthText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  trendData: {
    flex: 1,
    gap: 8,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  trendInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120,
  },
  trendLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  trendValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  progressContainer: {
    flex: 1,
  },
  progressBackground: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  orangeProgress: {
    backgroundColor: '#f97316', // ui-orange-500
  },
  blueProgress: {
    backgroundColor: '#3b82f6', // ui-blue-500
  },
}); 