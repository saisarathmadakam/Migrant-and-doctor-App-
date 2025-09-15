// File: app/patient-tabs/records.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import i18n from '../translations';
import { getPatientDatabase } from '../dataStore';

export default function RecordsScreen() {
  const params = useLocalSearchParams();
  const { contact } = params;
  const [patientRecords, setPatientRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const allPatients = await getPatientDatabase();
        const currentPatient = allPatients[contact];
        
        if (currentPatient && Array.isArray(currentPatient.records)) {
          setPatientRecords(currentPatient.records);
        } else {
          setPatientRecords([]);
        }
      } catch (error) {
        console.error("Failed to fetch patient records:", error);
        setPatientRecords([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, [contact]);

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
      <Text style={styles.recordsTitle}>{i18n.t('myMedicalRecords')}</Text>
      
      {patientRecords.length > 0 ? (
        <ScrollView style={styles.recordsList}>
          {patientRecords.map((record, index) => (
            <View key={index} style={styles.recordItem}>
              {record.imageUri && (
                <Image source={{ uri: record.imageUri }} style={styles.recordImage} />
              )}
              <Text style={styles.recordDescription}>{record.description}</Text>
              <Text style={styles.recordDate}>{new Date(record.timestamp).toLocaleDateString()}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noRecordsContainer}>
          <Text style={styles.noRecordsText}>{i18n.t('noRecordsFound')}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    padding: 25,
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