// File: app/doctor-dashboard.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { getPatientDatabase, updatePatientRecords } from './dataStore';
import i18n from './translations';

export default function DoctorDashboardScreen() {
  const [patientId, setPatientId] = useState('');
  const [patientDetails, setPatientDetails] = useState(null);
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); // { uri, type, name }
  const [uploading, setUploading] = useState(false);

  const handleSearch = async () => {
    if (!patientId) {
      Alert.alert(i18n.t('invalidInput'), i18n.t('enterPatientId'));
      return;
    }

    try {
      const patientDatabase = await getPatientDatabase();
      const foundPatient = Object.values(patientDatabase || {}).find(
        (patient) => patient && patient.id && patient.id.toLowerCase() === patientId.toLowerCase()
      );

      if (foundPatient) {
        setPatientDetails(foundPatient);
        Alert.alert(i18n.t('patientFound'), `${foundPatient.fullName}`);
      } else {
        setPatientDetails(null);
        Alert.alert(i18n.t('notFound'), i18n.t('noPatientFound'));
      }
    } catch (error) {
      console.error("Failed to search patient:", error);
      Alert.alert(i18n.t('error'), i18n.t('searchFailed'));
    }
  };

  const selectMedia = async (useCamera) => {
    let permissionStatus;
    if (useCamera) {
      permissionStatus = await ImagePicker.requestCameraPermissionsAsync();
    } else {
      permissionStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
    }

    if (permissionStatus.status !== 'granted') {
      Alert.alert(i18n.t('permissionDenied'), i18n.t('mediaPermission'));
      return;
    }

    let result;
    if (useCamera) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.canceled) {
      setSelectedFile({
        uri: result.assets[0].uri,
        type: 'image',
        name: `photo_${new Date().getTime()}.jpg`
      });
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setSelectedFile({
          uri: result.assets[0].uri,
          type: 'pdf',
          name: result.assets[0].name
        });
      }
    } catch (err) {
      console.error("Document picking failed:", err);
      Alert.alert(i18n.t('error'), i18n.t('documentPickingFailed'));
    }
  };

  const handleUpload = async () => {
    if (!patientDetails || !description || !selectedFile) {
      Alert.alert(i18n.t('error'), i18n.t('uploadFieldsError'));
      return;
    }
    setUploading(true);

    const newRecord = {
      description,
      fileUri: selectedFile.uri,
      fileType: selectedFile.type,
      fileName: selectedFile.name,
      timestamp: new Date().toISOString(),
    };

    try {
      const patientDatabase = await getPatientDatabase();
      const patientKey = Object.keys(patientDatabase).find(
        (key) => patientDatabase[key].id.toLowerCase() === patientId.toLowerCase()
      );

      if (patientKey) {
        await updatePatientRecords(patientKey, newRecord);

        const updatedDatabase = await getPatientDatabase();
        setPatientDetails(updatedDatabase[patientKey]);

        Alert.alert(i18n.t('uploadSuccess'));
        setDescription('');
        setSelectedFile(null);
      } else {
        Alert.alert(i18n.t('error'), i18n.t('noPatientFound'));
      }
    } catch (error) {
      console.error("Failed to upload record:", error);
      Alert.alert(i18n.t('error'), i18n.t('uploadFailed'));
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="stethoscope" size={40} color="#fff" />
        <Text style={styles.headerTitle}>{i18n.t('doctorDashboard')}</Text>
      </View>

      <View style={styles.searchBarWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder={i18n.t('searchPatientId')}
          placeholderTextColor="#999"
          value={patientId}
          onChangeText={setPatientId}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <MaterialCommunityIcons name="magnify" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {patientDetails ? (
        <ScrollView style={styles.conditionalContentContainer}>
          <View style={styles.patientInfoCard}>
            <MaterialCommunityIcons name="account-circle" size={60} color="#00796B" style={styles.patientIcon} />
            <View style={styles.patientDetailsText}>
              <Text style={styles.patientName}>{patientDetails.fullName}</Text>
              <Text style={styles.infoText}>{i18n.t('age')}: {patientDetails.age}</Text>
              <Text style={styles.infoText}>{i18n.t('gender')}: {patientDetails.gender}</Text>
              <Text style={styles.infoText}>{i18n.t('contact')}: {patientDetails.contact}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{i18n.t('uploadNewRecord')}</Text>
            
            <View style={styles.filePickerRow}>
              <TouchableOpacity
                style={styles.mediaButton}
                onPress={() => Alert.alert(
                  i18n.t('selectMedia'),
                  i18n.t('chooseSource'),
                  [
                    { text: i18n.t('camera'), onPress: () => selectMedia(true) },
                    { text: i18n.t('photoLibrary'), onPress: () => selectMedia(false) },
                    { text: i18n.t('cancel'), style: 'cancel' }
                  ]
                )}
                disabled={uploading}
              >
                <MaterialCommunityIcons name="camera" size={24} color="#fff" />
                <Text style={styles.mediaButtonText}>{i18n.t('selectPhoto')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.documentButton}
                onPress={pickDocument}
                disabled={uploading}
              >
                <MaterialCommunityIcons name="file-document" size={24} color="#fff" />
                <Text style={styles.mediaButtonText}>{i18n.t('selectDocument')}</Text>
              </TouchableOpacity>
            </View>
            
            {selectedFile && selectedFile.type === 'image' && (
              <Image source={{ uri: selectedFile.uri }} style={styles.previewImage} />
            )}
            {selectedFile && selectedFile.type === 'pdf' && (
              <View style={styles.pdfPreview}>
                <MaterialCommunityIcons name="file-pdf-box" size={50} color="#E53935" />
                <Text style={styles.pdfName} numberOfLines={1}>{selectedFile.name}</Text>
              </View>
            )}

            <TextInput
              style={styles.input}
              placeholder={i18n.t('enterDescription')}
              placeholderTextColor="#999"
              multiline
              value={description}
              onChangeText={setDescription}
            />

            <TouchableOpacity
              style={[styles.uploadButton, uploading && styles.uploadButtonDisabled]}
              onPress={handleUpload}
              disabled={uploading}
            >
              {uploading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <MaterialCommunityIcons name="upload" size={24} color="#fff" />
                  <Text style={styles.uploadButtonText}>{i18n.t('upload')}</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{i18n.t('recordsHistory')}</Text>
            {patientDetails.records && patientDetails.records.length > 0 ? (
              patientDetails.records.slice().reverse().map((record, index) => (
                <View key={index} style={styles.recordItem}>
                  {record.fileType === 'image' ? (
                    <Image source={{ uri: record.fileUri }} style={styles.recordImage} />
                  ) : (
                    <MaterialCommunityIcons name="file-pdf-box" size={60} color="#E53935" style={styles.recordImage} />
                  )}
                  <View style={styles.recordContent}>
                    <Text style={styles.recordDescription}>{record.description}</Text>
                    <Text style={styles.recordDate}>{new Date(record.timestamp).toLocaleString()}</Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.noRecordsContainer}>
                <MaterialCommunityIcons name="folder-open" size={50} color="#ccc" />
                <Text style={styles.noRecordsText}>{i18n.t('noRecordsAvailable')}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.noDataContainer}>
          <MaterialCommunityIcons name="account-search" size={80} color="#ccc" />
          <Text style={styles.noDataText}>{i18n.t('noDataText')}</Text>
        </View>
      )}
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00796B',
    paddingTop: 50,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 20,
    height: 50,
    fontSize: 16,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  searchButton: {
    backgroundColor: '#00796B',
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  conditionalContentContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 15,
  },
  patientInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  patientIcon: {
    marginRight: 20,
  },
  patientDetailsText: {
    flex: 1,
  },
  patientName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004D40',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  filePickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  mediaButton: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004D40',
    borderRadius: 12,
    height: 50,
    marginRight: 10,
  },
  documentButton: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004D40',
    borderRadius: 12,
    height: 50,
    marginLeft: 10,
  },
  mediaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  pdfPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  pdfName: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
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
  uploadButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00796B',
    borderRadius: 12,
    height: 50,
  },
  uploadButtonDisabled: {
    backgroundColor: '#999',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },
  recordImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  recordContent: {
    flex: 1,
  },
  recordDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  recordDate: {
    fontSize: 12,
    color: '#666',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  noRecordsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noRecordsText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 5,
  },
});