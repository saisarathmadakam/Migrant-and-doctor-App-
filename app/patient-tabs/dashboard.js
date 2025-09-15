// File: dashboard.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import i18n from '../translations';

export default function DashboardScreen() {
  const params = useLocalSearchParams();
  const { 
    id, fullName, age, gender, contact, district, city, village, 
    migrantType, chronicDiseases, pregnancyDetails, 
    returneeDetails, incomingDetails, 
  } = params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{i18n.t('patientDashboard')}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileContainer}>
          <MaterialCommunityIcons name="account-circle" size={80} color="#00796B" />
          <View style={styles.profileText}>
            <Text style={styles.profileName}>{fullName || 'N/A'}</Text>
            <Text style={styles.profileInfo}>{i18n.t('id')}: {id || 'N/A'}</Text>
            <Text style={styles.profileInfo}>{i18n.t('age')}: {age || 'N/A'}</Text>
            <Text style={styles.profileInfo}>{i18n.t('gender')}: {gender || 'N/A'}</Text>
            <Text style={styles.profileInfo}>{i18n.t('contact')}: {contact || 'N/A'}</Text>
            <Text style={styles.profileInfo}>{i18n.t('location')}: {village || 'N/A'}, {city || 'N/A'}, {district || 'N/A'}</Text>
            <Text style={styles.profileInfo}>Migration Type: {migrantType || 'N/A'}</Text>
            <Text style={styles.profileInfo}>Chronic Diseases: {chronicDiseases || 'N/A'}</Text>
            {gender === 'Female' && (
              <Text style={styles.profileInfo}>Pregnancy Details: {pregnancyDetails || 'N/A'}</Text>
            )}
            {migrantType === 'Returnee' && (
              <Text style={styles.profileInfo}>Returnee Details: {returneeDetails || 'N/A'}</Text>
            )}
            {migrantType === 'Incoming' && (
              <Text style={styles.profileInfo}>Incoming Details: {incomingDetails || 'N/A'}</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00796B',
  },
  scrollContent: {
    padding: 25,
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileText: {
    marginLeft: 20,
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00796B',
  },
  profileInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});