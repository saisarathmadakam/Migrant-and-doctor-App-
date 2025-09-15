// File: app/patient-tabs/profile.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import i18n from '../translations';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const params = useLocalSearchParams();
  const { 
    fullName, age, gender, contact, district, city, village, 
    migrantType, chronicDiseases, pregnancyDetails, 
    returneeDetails, incomingDetails
  } = params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('profile')}</Text>
      <View style={styles.profileCard}>
        <MaterialCommunityIcons name="account-circle" size={80} color="#00796B" style={styles.profileIcon} />
        <Text style={styles.infoText}><Text style={styles.label}>{i18n.t('name')}:</Text> {fullName || 'N/A'}</Text>
        <Text style={styles.infoText}><Text style={styles.label}>{i18n.t('age')}:</Text> {age || 'N/A'}</Text>
        <Text style={styles.infoText}><Text style={styles.label}>{i18n.t('gender')}:</Text> {gender || 'N/A'}</Text>
        <Text style={styles.infoText}><Text style={styles.label}>{i18n.t('contact')}:</Text> {contact || 'N/A'}</Text>
        <Text style={styles.infoText}><Text style={styles.label}>{i18n.t('location')}:</Text> {village || 'N/A'}, {city || 'N/A'}, {district || 'N/A'}</Text>
        <Text style={styles.infoText}>Migration Type: {migrantType || 'N/A'}</Text>
        <Text style={styles.infoText}>Chronic Diseases: {chronicDiseases || 'N/A'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 20,
    marginTop: 50,
  },
  profileCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileIcon: {
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#004D40',
  },
});