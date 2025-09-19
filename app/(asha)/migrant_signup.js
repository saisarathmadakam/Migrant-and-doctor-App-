// File: migrant_signup.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
import { addPatientToDatabase } from '../dataStore';

// Data for states and districts
const statesOfIndia = {
  Kerala: [
    'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam',
    'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode',
    'Wayanad', 'Kannur', 'Kasaragod'
  ],
  TamilNadu: ['Chennai', 'Coimbatore', 'Madurai', 'Salem'], // example
  Karnataka: ['Bangalore', 'Mysore', 'Mangalore'], // example
};

export default function MigrantSignup() {
  const { t } = useTranslation();

  // Personal Info
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [aadhaar, setAadhaar] = useState(''); // Added Aadhaar number

  // Location Info
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [village, setVillage] = useState('');

  // Migration Info
  const [migrantType, setMigrantType] = useState('');
  const [migrationState, setMigrationState] = useState(''); // State near Migration Type
  const [migrationDistrict, setMigrationDistrict] = useState(''); // District near Migration Type
  const [chronicDiseases, setChronicDiseases] = useState('');
  const [pregnancyDetails, setPregnancyDetails] = useState('');

  // Conditional Info
  const [returneeDetails, setReturneeDetails] = useState('');
  const [incomingDetails, setIncomingDetails] = useState('');

  const handleSignup = async () => {
    if (!fullName || !age || !contact || !migrantType || !state || !district || !aadhaar) {
      Alert.alert(t('error'), 'Please fill in all required fields (Name, Age, Contact, Aadhaar, Migrant Type, State, and District).');
      return;
    }

    const patientData = {
      id: contact,
      fullName,
      age,
      gender,
      contact,
      aadhaar, // Added
      state,
      district,
      city,
      village,
      migrantType,
      migrationState,       // Added
      migrationDistrict,    // Added
      chronicDiseases,
      pregnancyDetails,
      returneeDetails: migrantType === 'Returnee' ? returneeDetails : null,
      incomingDetails: migrantType === 'Incoming' ? incomingDetails : null,
      records: []
    };

    await addPatientToDatabase(contact, patientData);

    Alert.alert(t('signupSuccess'), t('patientAccountCreated'), [
      { text: "OK", onPress: () => router.back() }
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Register Migrant</Text>
      </View>

      {/* Personal Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Personal Info</Text>
        <TextInput style={styles.input} placeholder="Enter full name" value={fullName} onChangeText={setFullName} />
        <View style={styles.row}>
          <TextInput style={[styles.input, styles.halfInput]} placeholder="Age" keyboardType="numeric" value={age} onChangeText={setAge} />
          <View style={[styles.input, styles.halfInput]}>
            <Picker selectedValue={gender} onValueChange={setGender} style={{ height: 50 }}>
              <Picker.Item label="Gender" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
        </View>
        <TextInput style={styles.input} placeholder="Phone number" keyboardType="phone-pad" value={contact} onChangeText={setContact} />
        <TextInput style={styles.input} placeholder="Aadhaar number" keyboardType="numeric" value={aadhaar} onChangeText={setAadhaar} />
      </View>

      {/* Location Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Location Info</Text>
        <View style={styles.input}>
          <Picker selectedValue={state} onValueChange={(itemValue) => { setState(itemValue); setDistrict(''); }} style={{ height: 50 }}>
            <Picker.Item label="Select State" value="" />
            {Object.keys(statesOfIndia).map((s, idx) => (
              <Picker.Item key={idx} label={s} value={s} />
            ))}
          </Picker>
        </View>

        <View style={styles.input}>
          <Picker selectedValue={district} onValueChange={setDistrict} style={{ height: 50 }}>
            <Picker.Item label="Select District" value="" />
            {state ? statesOfIndia[state].map((d, idx) => (
              <Picker.Item key={idx} label={d} value={d} />
            )) : null}
          </Picker>
        </View>

        <TextInput style={styles.input} placeholder="City (Optional)" value={city} onChangeText={setCity} />
        <TextInput style={styles.input} placeholder="Village (Optional)" value={village} onChangeText={setVillage} />
      </View>

      {/* Migration Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Migration Type</Text>
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[styles.typeButton, migrantType === 'Returnee' && styles.selectedType]}
            onPress={() => setMigrantType('Returnee')}>
            <Text style={[styles.typeText, migrantType === 'Returnee' && styles.selectedTypeText]}>Returnee</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, migrantType === 'Incoming' && styles.selectedType]}
            onPress={() => setMigrantType('Incoming')}>
            <Text style={[styles.typeText, migrantType === 'Incoming' && styles.selectedTypeText]}>Incoming</Text>
          </TouchableOpacity>
        </View>

        {/* State & District near Migration Type */}
        <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#00796B' }}>Migration Origin</Text>
        <View style={styles.input}>
          <Picker selectedValue={migrationState} onValueChange={(val) => { setMigrationState(val); setMigrationDistrict(''); }} style={{ height: 50 }}>
            <Picker.Item label="Select State" value="" />
            {Object.keys(statesOfIndia).map((s, idx) => (
              <Picker.Item key={idx} label={s} value={s} />
            ))}
          </Picker>
        </View>
        <View style={styles.input}>
          <Picker selectedValue={migrationDistrict} onValueChange={setMigrationDistrict} style={{ height: 50 }}>
            <Picker.Item label="Select District" value="" />
            {migrationState ? statesOfIndia[migrationState].map((d, idx) => (
              <Picker.Item key={idx} label={d} value={d} />
            )) : null}
          </Picker>
        </View>
      </View>

      {/* Health Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Health Info</Text>
        <TextInput style={styles.input} placeholder="Chronic Diseases (Optional)" value={chronicDiseases} onChangeText={setChronicDiseases} />
        <TextInput style={styles.input} placeholder="Pregnancy (Optional)" value={pregnancyDetails} onChangeText={setPregnancyDetails} />
      </View>

      {/* Conditional Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Conditional Info</Text>
        {migrantType === 'Returnee' && (
          <TextInput style={styles.input} placeholder="Returnee Details (Last state/country, date)" value={returneeDetails} onChangeText={setReturneeDetails} />
        )}
        {migrantType === 'Incoming' && (
          <TextInput style={styles.input} placeholder="Incoming Details (Origin state/country, stay)" value={incomingDetails} onChangeText={setIncomingDetails} />
        )}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSignup}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#E0F7FA' },
  header: { alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#004D40' },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#00796B' },
  input: { width: '100%', paddingHorizontal: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 15, backgroundColor: '#F9F9F9' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  halfInput: { width: '48%' },
  typeSelector: { flexDirection: 'row', backgroundColor: '#F0F0F0', borderRadius: 8 },
  typeButton: { flex: 1, padding: 10, alignItems: 'center', borderRadius: 8 },
  selectedType: { backgroundColor: '#00796B' },
  typeText: { color: '#555' },
  selectedTypeText: { color: '#fff', fontWeight: 'bold' },
  submitButton: { backgroundColor: '#00796B', padding: 18, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  submitButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
