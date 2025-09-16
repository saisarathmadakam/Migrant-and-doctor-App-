// File: (asha)/profile.js

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import i18n from '../translations';

export default function AshaProfileScreen() {
  const ashaWorker = {
    name: 'vivek mahesh',
    profession: 'Asha Worker',
    hospital: 'Bhimavaram Community Health Center',
    location: 'Bhimavaram, Andhra Pradesh',
    phone: '+91 9876543210',
    email: 'seema.asha@health.in',
    experience: '8 years of service',
    patients: 'Handled 450+ patients',
  };

  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient colors={['#00796B', '#48C9B0']} style={styles.header}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{ashaWorker.name}</Text>
        <Text style={styles.profession}>{ashaWorker.profession}</Text>
        <Text style={styles.experience}>{ashaWorker.experience}</Text>
      </LinearGradient>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="hospital-building" size={26} color="#00796B" />
          <Text style={styles.infoText}>{i18n.t('hospital')}: {ashaWorker.hospital}</Text>
        </View>

        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="map-marker" size={26} color="#00796B" />
          <Text style={styles.infoText}>{i18n.t('location')}: {ashaWorker.location}</Text>
        </View>

        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="account-heart" size={26} color="#00796B" />
          <Text style={styles.infoText}>{ashaWorker.patients}</Text>
        </View>

        {/* Contact Section */}
        <Text style={styles.contactTitle}>Contact Information</Text>
        <View style={styles.contactCard}>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${ashaWorker.phone}`)} style={styles.contactItem}>
            <MaterialCommunityIcons name="phone" size={26} color="#00796B" />
            <Text style={styles.contactText}>{ashaWorker.phone}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${ashaWorker.email}`)} style={styles.contactItem}>
            <MaterialCommunityIcons name="email" size={26} color="#00796B" />
            <Text style={styles.contactText}>{ashaWorker.email}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDFB',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  profession: {
    fontSize: 18,
    color: '#E0F7FA',
    marginTop: 4,
  },
  experience: {
    fontSize: 14,
    color: '#DFF9F4',
    marginTop: 6,
    fontStyle: 'italic',
  },
  infoSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flexShrink: 1,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004D40',
    marginVertical: 10,
  },
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
});
