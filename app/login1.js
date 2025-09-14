// File: login1.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import i18n from './translations';
import { getDoctorDatabase } from './dataStore';

export default function DoctorLoginScreen() {
  const [doctorId, setDoctorId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // We now await the doctor database before we can use it
    const doctorDatabase = await getDoctorDatabase();
    
    // Find the doctor by ID
    const foundDoctor = doctorDatabase[doctorId];

    if (foundDoctor && foundDoctor.password === password) {
      Alert.alert(i18n.t('loginSuccess'), i18n.t('navigatingToDashboard'));
      router.replace('/doctor-dashboard'); 
    } else {
      Alert.alert(i18n.t('loginFailed'), i18n.t('enterDetails'));
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <MaterialCommunityIcons name="stethoscope" size={70} color="#00796B" style={styles.icon} />
        <Text style={styles.title}>{i18n.t('doctorLogin')}</Text>
        
        <View style={styles.formContainer}>
          <Text style={styles.label}>{i18n.t('enterDoctorId')}</Text>
          <TextInput
            style={styles.input}
            placeholder={i18n.t('enterDoctorId')}
            value={doctorId}
            onChangeText={setDoctorId}
          />
          <Text style={styles.label}>{i18n.t('password')}</Text>
          <TextInput
            style={styles.input}
            placeholder={i18n.t('password')}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>{i18n.t('login')}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>{i18n.t('goBack')}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
    padding: 25,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#00796B',
  },
  formContainer: {
    width: '80%',
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
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: '80%',
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