// File: upload_record.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { getPatientDatabase, updatePatientRecords } from '../dataStore';
import i18n from '../translations';

export default function UploadRecordScreen() {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
      }
    })();

    const fetchPatients = async () => {
      const db = await getPatientDatabase();

      if (db && typeof db === "object") {
        const patientList = Object.values(db).map(p => ({
          id: p?.contact || "",
          name: p?.fullName || "Unnamed Patient"
        }));
        setPatients(patientList);
      } else {
        setPatients([]);
      }
    };

    fetchPatients();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (!selectedPatientId || !description || !imageUri) {
      Alert.alert(i18n.t('error'), 'Please select a patient, an image, and enter a description.');
      return;
    }

    const newRecord = {
      description,
      imageUri,
      timestamp: new Date().toISOString(),
    };

    await updatePatientRecords(selectedPatientId, newRecord);
    Alert.alert(i18n.t('success'), 'Record uploaded successfully!');

    setSelectedPatientId('');
    setDescription('');
    setImageUri(null);
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

        <Text style={styles.label}>Upload Image</Text>
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <MaterialCommunityIcons name="image-plus" size={30} color="#fff" />
          <Text style={styles.imageButtonText}>Select Image</Text>
        </TouchableOpacity>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

        <Text style={styles.label}>Record Details</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Enter description of the record..."
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
  imageButton: {
    backgroundColor: '#00796B',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  imageButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
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
