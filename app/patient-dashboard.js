// File: patient-dashboard.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { getPatientDatabase } from './dataStore';
import i18n from './translations';

export default function PatientDashboardScreen() {
  const params = useLocalSearchParams();
  const { patientId, fullName, address, age } = params;
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Safely get data. If it's null or undefined, default to an empty object.
      const allData = await getPatientDatabase();
      const patient = Object.values(allData || {}).find(
        (p) => p.id.toLowerCase() === patientId.toLowerCase()
      );
      setPatientData(patient);
    };

    fetchData();
  }, [patientId]);

  const toggleProfile = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{i18n.t('patientDashboard')}</Text>
        <TouchableOpacity onPress={toggleProfile} style={styles.profileIconContainer}>
          <MaterialCommunityIcons 
            name="account-circle" 
            size={40} 
            color="#00796B"
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {isProfileVisible && (
          <View style={styles.profileContainer}>
            <MaterialCommunityIcons name="account-circle" size={80} color="#00796B" />
            <View style={styles.profileText}>
              <Text style={styles.profileName}>{fullName || 'Patient Profile'}</Text>
              <Text style={styles.profileId}>{i18n.t('id')}: {patientId || 'N/A'}</Text>
              <Text style={styles.profileInfo}>{i18n.t('age')}: {age || 'N/A'}</Text>
              <Text style={styles.profileInfo}>{i18n.t('address')}: {address || 'N/A'}</Text>
            </View>
          </View>
        )}
        
        <Text style={styles.recordsTitle}>{i18n.t('myMedicalRecords')}</Text>
        
        {patientData && patientData.records && patientData.records.length > 0 ? (
          <View style={styles.recordsList}>
            {patientData.records.map((record, index) => (
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  profileIconContainer: {
    padding: 5,
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
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00796B',
  },
  profileId: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  profileInfo: {
    fontSize: 14,
    color: '#666',
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