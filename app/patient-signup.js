// File: patient-signup.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getPatientDatabase, savePatientData } from './dataStore'; 
import i18n from './translations'; 

export default function PatientSignupScreen() {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');

  const generatePatientId = () => {
    return 'P' + Math.floor(100000 + Math.random() * 900000);
  };

  const handleSignup = async () => {
    if (!fullName || !address || !phoneNumber || !age) {
      Alert.alert(i18n.t('error'), i18n.t('fillAllFields'));
      return;
    }
    
    // Get the database data using the async function
    const patientDatabase = await getPatientDatabase();

    // Check if the phone number is already registered
    if (patientDatabase[phoneNumber]) {
      Alert.alert(i18n.t('error'), i18n.t('accountExists'));
      return;
    }

    const newId = 'P' + Math.floor(100000 + Math.random() * 900000);

    // Add the new patient's data to the loaded database object
    patientDatabase[phoneNumber] = {
      id: newId,
      fullName: fullName,
      address: address,
      age: age,
      records: []
    };

    // Save the updated database back to storage
    await savePatientData(patientDatabase);

    Alert.alert(
      i18n.t('signupSuccess'),
      i18n.t('canLogin'),
      [{ text: "OK", onPress: () => router.replace('/login') }]
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <MaterialCommunityIcons name="account-plus" size={70} color="#00796B" style={styles.icon} />
        <Text style={styles.title}>{i18n.t('patientSignup')}</Text>
        
        <View style={styles.formContainer}>
          <Text style={styles.label}>{i18n.t('fullName')}</Text>
          <TextInput
            style={styles.input}
            placeholder={i18n.t('enterYourFullName')}
            value={fullName}
            onChangeText={setFullName}
          />
          <Text style={styles.label}>{i18n.t('address')}</Text>
          <TextInput
            style={styles.input}
            placeholder={i18n.t('enterYourAddress')}
            value={address}
            onChangeText={setAddress}
          />
          <Text style={styles.label}>{i18n.t('phoneNumber')}</Text>
          <TextInput
            style={styles.input}
            placeholder={i18n.t('enterYourPhoneNumber')}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={10}
          />
          <Text style={styles.label}>{i18n.t('age')}</Text>
          <TextInput
            style={styles.input}
            placeholder={i18n.t('enterYourAge')}
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>{i18n.t('signUp')}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>{i18n.t('goBack')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
    padding: 25,
  },
  icon: {
    marginBottom: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#00796B',
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#00796B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 60,
    backgroundColor: '#00796B',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backText: {
    marginTop: 20,
    color: '#00796B',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});