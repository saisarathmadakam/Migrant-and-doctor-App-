// File: (asha)/profile.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import i18n from '../translations';

export default function AshaProfileScreen() {
  // Static data for the profile. This can be loaded from AsyncStorage if needed.
  const ashaWorker = {
    name: 'Seema',
    profession: 'Asha Worker',
    hospital: 'Bhimavaram Community Health Center',
    location: 'Bhimavaram, Andhra Pradesh',
    // You can add more details here
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="account-circle" size={120} color="#00796B" style={styles.icon} />
      <View style={styles.card}>
        <Text style={styles.title}>{ashaWorker.name}</Text>
        <Text style={styles.info}>{i18n.t('profession')}: {ashaWorker.profession}</Text>
        <Text style={styles.info}>{i18n.t('hospital')}: {ashaWorker.hospital}</Text>
        <Text style={styles.info}>{i18n.t('location')}: {ashaWorker.location}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
    padding: 20,
  },
  icon: {
    marginBottom: 30,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 30,
    // The main change is here: removed alignItems to allow content to align to the left
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
});