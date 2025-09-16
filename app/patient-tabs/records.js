import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import i18n from '../translations';
import { getPatientData } from '../dataStore'; // Updated import

export default function PatientRecordsScreen() {
  const [patientRecords, setPatientRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      const data = getPatientData();
      if (data && Array.isArray(data.records)) {
        setPatientRecords(data.records);
      } else {
        setPatientRecords([]);
      }
      setLoading(false);
    };

    fetchRecords();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00796B" />
        <Text style={styles.loadingText}>{i18n.t('loadingRecords')}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>{i18n.t('myMedicalRecords')}</Text>
      
      {patientRecords.length > 0 ? (
        patientRecords.map((record, index) => (
          <View key={index} style={styles.recordCard}>
            <Text style={styles.recordTitle}>Record #{patientRecords.length - index}</Text>
            <Text style={styles.recordDate}>Date: {new Date(record.timestamp).toLocaleDateString()}</Text>
            <Text style={styles.recordDescription}>{record.description}</Text>
            {record.imageUri && (
              <Image source={{ uri: record.imageUri }} style={styles.recordImage} />
            )}
          </View>
        ))
      ) : (
        <View style={styles.noRecordsContainer}>
          <Text style={styles.noRecordsText}>{i18n.t('noRecordsFound')}</Text>
          <Text style={styles.noRecordsSubText}>{i18n.t('yourHealthWorkerWillAddRecords')}</Text>
        </View>
      )}
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004D40',
    marginBottom: 20,
    textAlign: 'center',
  },
  recordCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recordTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796B',
  },
  recordDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  recordDescription: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  recordImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    resizeMode: 'cover',
  },
  noRecordsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noRecordsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  noRecordsSubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
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
});