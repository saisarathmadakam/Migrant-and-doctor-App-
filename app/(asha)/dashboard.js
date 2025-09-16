// File: app/doctor-tabs/dashboard.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Translations placeholder
const i18n = {
  t: (key) => {
    const translations = {
      'welcome': 'Welcome',
      'healthWorkerDashboard': 'Health Worker Dashboard',
      'quickAccess': 'Quick Access',
      'commonActions': 'Common actions',
      'registerMigrant': 'Register Migrant',
      'updateRecords': 'Update Records',
      'profile': 'Profile',
      'scheduleVisit': 'Schedule Visit',
      'analytics': 'Analytics',
      'today': 'Today',
      'migrantsRegisteredToday': 'Migrants Registered Today',
      'ensureConsent': 'Ensure consent is recorded before updating records.',
      'notifications': 'Notifications',
      'tips': 'Daily Health Tips',
      'drinkWater': 'Stay hydrated and drink 8 glasses of water daily 💧',
    };
    return translations[key] || key;
  },
};

export default function AshaWorkerDashboardScreen() {
  const handleRegisterMigrant = () => router.push('/migrant_signup');
  const handleUpdateRecords = () => router.push('/(asha)/upload_record');
  const handleProfile = () => router.push('/(asha)/profile');
  const handleScheduleVisit = () => router.push('/(asha)/schedule-visit'); // ✅ updated

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <MaterialCommunityIcons name="account-heart" size={40} color="#004D40" style={{ marginRight: 10 }} />
        <View>
          <Text style={styles.welcomeText}>{i18n.t('welcome')}, Anitha</Text>
          <Text style={styles.dashboardTitle}>{i18n.t('healthWorkerDashboard')}</Text>
        </View>
      </View>

      {/* Quick Access Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="lightning-bolt" size={24} color="#00796B" style={{ marginRight: 10 }} />
          <View>
            <Text style={styles.cardTitle}>{i18n.t('quickAccess')}</Text>
            <Text style={styles.cardSubtitle}>{i18n.t('commonActions')}</Text>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.accessButton} onPress={handleRegisterMigrant}>
            <MaterialCommunityIcons name="account-plus" size={24} color="#00796B" />
            <Text style={styles.accessButtonText}>{i18n.t('registerMigrant')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.accessButton} onPress={handleUpdateRecords}>
            <MaterialCommunityIcons name="file-document-edit" size={24} color="#00796B" />
            <Text style={styles.accessButtonText}>{i18n.t('updateRecords')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.accessButton} onPress={handleProfile}>
            <MaterialCommunityIcons name="account" size={24} color="#00796B" />
            <Text style={styles.accessButtonText}>{i18n.t('profile')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.accessButton} onPress={handleScheduleVisit}>
            <MaterialCommunityIcons name="calendar" size={24} color="#00796B" />
            <Text style={styles.accessButtonText}>{i18n.t('scheduleVisit')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Analytics Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="chart-bar" size={24} color="#00796B" style={{ marginRight: 10 }} />
          <View>
            <Text style={styles.cardTitle}>{i18n.t('analytics')}</Text>
            <Text style={styles.cardSubtitle}>{i18n.t('today')}</Text>
          </View>
        </View>
        <View style={styles.analyticsItem}>
          <Text style={styles.analyticsText}>{i18n.t('migrantsRegisteredToday')}</Text>
          <Text style={styles.analyticsValue}>12</Text>
        </View>
      </View>

      {/* Notifications Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="bell" size={24} color="#00796B" style={{ marginRight: 10 }} />
          <Text style={styles.cardTitle}>{i18n.t('notifications')}</Text>
        </View>
        <Text style={styles.notificationText}>✅ 3 New Migrants need health checkup</Text>
        <Text style={styles.notificationText}>⚠️ 1 Visit overdue for follow-up</Text>
      </View>

      {/* Tips Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="lightbulb-on" size={24} color="#00796B" style={{ marginRight: 10 }} />
          <Text style={styles.cardTitle}>{i18n.t('tips')}</Text>
        </View>
        <Text style={styles.tipText}>{i18n.t('drinkWater')}</Text>
      </View>

      <Text style={styles.consentText}>{i18n.t('ensureConsent')}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E0F7FA',
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004D40',
  },
  dashboardTitle: {
    fontSize: 14,
    color: '#00796B',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004D40',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#777',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  accessButton: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    borderRadius: 15,
    paddingVertical: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  accessButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00796B',
    marginTop: 5,
    textAlign: 'center',
  },
  analyticsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  analyticsText: {
    fontSize: 16,
    color: '#333',
  },
  analyticsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796B',
  },
  notificationText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 5,
  },
  tipText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
  },
  consentText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
});
