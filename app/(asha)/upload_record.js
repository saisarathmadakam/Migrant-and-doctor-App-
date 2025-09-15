// File: (asha)/upload_record.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { getPatientDatabase, updatePatientRecords } from '../dataStore';
import i18n from '../translations';

export default function UploadRecordScreen() {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      const db = await getPatientDatabase();
      const patientList = Object.values(db).map(p => ({
        id: p.id,
        name: p.name
      }));
      setPatients(patientList);
    };
    fetchPatients();
  }, []);

  const handleUpload = async () => {
    if (!selectedPatientId || !description) {
      Alert.alert(i18n.t('error'), 'Please select a patient and enter a description.');
      return;
    }

    const newRecord = {
      description,
      timestamp: new Date().toISOString(),
      // Add a placeholder for image URI if you implement image capture later
      imageUri: null 
    };

    await updatePatientRecords(selectedPatientId, newRecord);
    Alert.alert(i18n.t('success'), 'Record uploaded successfully!');
    
    // Clear the form
    setSelectedPatientId('');
    setDescription('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MaterialCommunityIcons name="cloud-upload" size={70} color="#00796B" style={styles.icon} />
      <Text style={styles.title}>Upload Patient Record</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Select Patient</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedPatientId}
            style={styles.picker}
            onValueChange={itemValue => setSelectedPatientId(itemValue)}
          >
            <Picker.Item label="-- Select Patient --" value="" />
            {patients.map(p => (
              <Picker.Item key={p.id} label={p.name} value={p.id} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Record Details</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Enter description of the record (e.g., Blood pressure reading)"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonText}>Upload Record</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004D40',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
  },
  picker: {
    height: 50,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
    fontSize: 16,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#00796B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});