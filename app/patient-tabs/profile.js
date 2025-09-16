import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import i18n from '../translations';
import { getPatientData } from '../dataStore'; // Updated import

export default function PatientProfileScreen() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      const data = getPatientData();
      if (data) {
        setPatient(data);
      }
      setLoading(false);
    };

    fetchPatientData();
  }, []);

  const handleLogout = () => {
    // Clear patient data from global store if needed
    // savePatientData(null);
    router.replace('/login');
  };

  if (loading || !patient) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00796B" />
        <Text style={styles.loadingText}>{i18n.t('loadingProfile')}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>{i18n.t('myProfile')}</Text>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="account-circle-outline" size={40} color="#00796B" style={styles.headerIcon} />
          <View>
            <Text style={styles.cardTitle}>{patient.fullName || 'N/A'}</Text>
            <Text style={styles.cardSubtitle}>{i18n.t('viewAndUpdateYourDetails')}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="phone" size={20} color="#00796B" />
          <Text style={styles.infoText}>{i18n.t('contact')}: {patient.contact || 'N/A'}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="map-marker-outline" size={20} color="#00796B" />
          <Text style={styles.infoText}>{i18n.t('location')}: {patient.village || 'N/A'}, {patient.city || 'N/A'}, {patient.district || 'N/A'}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="calendar-range" size={20} color="#00796B" />
          <Text style={styles.infoText}>{i18n.t('age')}: {patient.age || 'N/A'}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="gender-male-female" size={20} color="#00796B" />
          <Text style={styles.infoText}>{i18n.t('gender')}: {patient.gender || 'N/A'}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="hospital" size={20} color="#00796B" />
          <Text style={styles.infoText}>{i18n.t('chronicDiseases')}: {patient.chronicDiseases || 'None'}</Text>
        </View>
        {patient.gender === 'Female' && (
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="account-group" size={20} color="#00796B" />
            <Text style={styles.profileInfo}>Pregnancy Details: {patient.pregnancyDetails || 'N/A'}</Text>
          </View>
        )}
        {patient.migrantType === 'Returnee' && (
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="arrow-left-circle" size={20} color="#00796B" />
            <Text style={styles.profileInfo}>Returnee Details: {patient.returneeDetails || 'N/A'}</Text>
          </View>
        )}
        {patient.migrantType === 'Incoming' && (
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="arrow-right-circle" size={20} color="#00796B" />
            <Text style={styles.profileInfo}>Incoming Details: {patient.incomingDetails || 'N/A'}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={20} color="#fff" />
        <Text style={styles.logoutButtonText}>{i18n.t('logout')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#00796B',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004D40',
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
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
    marginBottom: 20,
  },
  headerIcon: {
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004D40',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#777',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});