// File: patient-dashboard.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import i18n from './translations';
import { getPatientDatabase } from './dataStore';

export default function PatientDashboardScreen() {
  const params = useLocalSearchParams();
  const { 
    id, fullName, age, gender, contact, district, city, village, 
    migrantType, chronicDiseases, pregnancyDetails, 
    returneeDetails, incomingDetails
  } = params;
  
  const [patientRecords, setPatientRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        // Fetch the entire patient database to get the latest records
        const allPatients = await getPatientDatabase();
        const currentPatient = allPatients[contact]; // Use 'contact' as the unique key
        
        if (currentPatient && Array.isArray(currentPatient.records)) {
          setPatientRecords(currentPatient.records);
        } else {
          setPatientRecords([]); // Ensure records is always an array
        }
      } catch (error) {
        console.error("Failed to fetch patient records:", error);
        setPatientRecords([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [contact]); // Depend on 'contact' to re-fetch if the patient changes

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00796B" />
        <Text style={styles.loadingText}>{i18n.t('loadingRecords')}</Text>
      </View>
    );
  }

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

        <Text style={styles.recordsTitle}>{i18n.t('myMedicalRecords')}</Text>
        
        {patientRecords.length > 0 ? (
          <View style={styles.recordsList}>
            {patientRecords.map((record, index) => (
              <View key={index} style={styles.recordItem}>
                {record.imageUri && (
                  <Image source={{ uri: record.imageUri }} style={styles.recordImage} />
                )}
                <Text style={styles.recordDescription}>{record.description}</Text>
                <Text style={styles.recordDate}>{new Date(record.timestamp).toLocaleDateString()}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.noRecordsContainer}>
            <Text style={styles.noRecordsText}>{i18n.t('noRecordsFound')}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#00796B',
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
  recordsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004D40',
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  recordsList: {
    width: '100%',
  },
  recordItem: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  recordImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  recordDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  recordDate: {
    fontSize: 12,
    color: '#999',
    alignSelf: 'flex-end',
  },
  noRecordsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});