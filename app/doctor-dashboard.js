// File: doctor-dashboard.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getPatientDatabase, updatePatientRecords } from './dataStore';
import i18n from './translations';

export default function DoctorDashboardScreen() {
  const [patientId, setPatientId] = useState('');
  const [patientDetails, setPatientDetails] = useState(null);
  const [description, setDescription] = useState('');
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const handleSearch = async () => {
    if (!patientId) {
      Alert.alert(i18n.t('invalidInput'), i18n.t('enterPatientId'));
      return;
    }

    const patientDatabase = await getPatientDatabase();
    // This is the corrected line to handle undefined database
    const foundPatient = Object.values(patientDatabase || {}).find(
      (patient) => patient.id.toLowerCase() === patientId.toLowerCase()
    );

    if (foundPatient) {
      setPatientDetails(foundPatient);
      Alert.alert(i18n.t('patientFound'), `${foundPatient.fullName}`);
    } else {
      setPatientDetails(null);
      Alert.alert(i18n.t('notFound'), i18n.t('noPatientFound'));
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(i18n.t('permissionDenied'), i18n.t('cameraRollPermission'));
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImageUri(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (!patientDetails || !description || !selectedImageUri) {
      Alert.alert(i18n.t('error'), i18n.t('uploadFieldsError'));
      return;
    }
    
    const newRecord = {
      description,
      imageUri: selectedImageUri,
      timestamp: new Date().toISOString(),
    };

    await updatePatientRecords(patientId, newRecord);

    Alert.alert(i18n.t('uploadSuccess'));
    setDescription('');
    setSelectedImageUri(null);
    setPatientDetails(null);
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="stethoscope" size={60} color="#00796B" style={styles.icon} />
      <Text style={styles.title}>{i18n.t('doctorDashboard')}</Text>
      
      <View style={styles.searchBarWrapper}>
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={24} color="#555" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={i18n.t('searchPatientId')}
            value={patientId}
            onChangeText={setPatientId}
            onSubmitEditing={handleSearch}
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>{i18n.t('search')}</Text>
        </TouchableOpacity>
      </View>

      {patientDetails ? (
        <ScrollView style={styles.conditionalContentContainer}>
          <View style={styles.uploadForm}>
            <Text style={styles.formTitle}>{i18n.t('uploadNewRecord')}</Text>
            
            <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
              <MaterialCommunityIcons name="image-plus" size={24} color="#fff" />
              <Text style={styles.imagePickerButtonText}>
                {selectedImageUri ? i18n.t('imageSelected') : i18n.t('selectImage')}
              </Text>
            </TouchableOpacity>
            {selectedImageUri && (
              <Image source={{ uri: selectedImageUri }} style={styles.previewImage} />
            )}

            <TextInput
              style={styles.input}
              placeholder={i18n.t('enterDescription')}
              multiline
              value={description}
              onChangeText={setDescription}
            />
            <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
              <MaterialCommunityIcons name="upload" size={24} color="#fff" />
              <Text style={styles.uploadButtonText}>{i18n.t('upload')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>{i18n.t('patientInformation')}</Text>
            <Text style={styles.detailsText}><Text style={styles.label}>{i18n.t('id')}:</Text> {patientDetails.id}</Text>
            <Text style={styles.detailsText}><Text style={styles.label}>{i18n.t('name')}:</Text> {patientDetails.fullName}</Text>
            <Text style={styles.detailsText}><Text style={styles.label}>{i18n.t('age')}:</Text> {patientDetails.age}</Text>
            <Text style={styles.detailsText}><Text style={styles.label}>{i18n.t('address')}:</Text> {patientDetails.address}</Text>
          </View>

          <View style={styles.recordsContainer}>
            <Text style={styles.recordsTitle}>{i18n.t('recordsHistory')}</Text>
            {patientDetails.records && patientDetails.records.length > 0 ? (
              patientDetails.records.map((record, index) => (
                <View key={index} style={styles.recordCard}>
                  <Image source={{ uri: record.imageUri }} style={styles.recordImage} />
                  <View style={styles.recordContent}>
                    <Text style={styles.recordDescription}>{record.description}</Text>
                    <Text style={styles.recordDate}>
                      {new Date(record.timestamp).toLocaleString()}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noRecordsText}>{i18n.t('noRecordsAvailable')}</Text>
            )}
          </View>

        </ScrollView>
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>{i18n.t('noDataText')}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
    padding: 25,
  },
  icon: {
    marginBottom: 10,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 25,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 15,
    height: 50,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#00796B',
    height: 50,
    paddingHorizontal: 25,
    borderRadius: 50,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  conditionalContentContainer: {
    width: '100%',
    flex: 1,
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 15,
  },
  detailsText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#004D40',
  },
  uploadForm: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    minHeight: 100,
    fontSize: 16,
    marginBottom: 15,
    textAlignVertical: 'top',
  },
  imagePickerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004D40',
    borderRadius: 12,
    height: 50,
    marginBottom: 15,
  },
  imagePickerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  uploadButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00796B',
    borderRadius: 12,
    height: 50,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  recordsContainer: {
    width: '100%', backgroundColor: '#fff', borderRadius: 15, padding: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1,
    shadowRadius: 3.84, elevation: 5, marginBottom: 20,
  },
  recordsTitle: { fontSize: 20, fontWeight: 'bold', color: '#00796B', marginBottom: 15 },
  recordCard: { flexDirection: 'row', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 },
  recordImage: { width: 60, height: 60, borderRadius: 10, marginRight: 15 },
  recordContent: { flex: 1 },
  recordDescription: { fontSize: 16, color: '#333', marginBottom: 5 },
  recordDate: { fontSize: 12, color: '#666' },
  noRecordsText: { fontSize: 14, color: '#999', textAlign: 'center' },
});