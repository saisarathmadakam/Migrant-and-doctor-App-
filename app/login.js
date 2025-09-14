// File: login.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getPatientDatabase } from './dataStore'; // Correct import
import i18n, { setLanguage } from './translations';

export default function PatientLoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');

  const sendOtp = async () => {
    // Now, we await the database before we can use it
    const patientDatabase = await getPatientDatabase();

    if (phoneNumber.length === 10) {
      if (!patientDatabase[phoneNumber]) {
        Alert.alert(i18n.t('accountNotFound'), i18n.t('invalidPhoneNumber'));
        return;
      }
      
      const newOtp = '123456'; 
      setGeneratedOtp(newOtp);
      Alert.alert(i18n.t('otpSent'), `${i18n.t('yourOTP')} ${newOtp} (${i18n.t('mockOtp')})`);
      setIsOtpSent(true);
    } else {
      Alert.alert(i18n.t('invalidPhoneNumber'), i18n.t('enterPhoneNumber'));
    }
  };

  const verifyOtp = async () => {
    // We also need the database to verify the user
    const patientDatabase = await getPatientDatabase();

    if (otp === generatedOtp) {
      const patientData = patientDatabase[phoneNumber];
      if (patientData) {
        router.replace({
          pathname: '/patient-dashboard',
          params: { 
            patientId: patientData.id,
            fullName: patientData.fullName,
            address: patientData.address,
            age: patientData.age,
          },
        });
      }
    } else {
      Alert.alert(i18n.t('error'), i18n.t('invalidOtp'));
      setOtp('');
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setPhoneNumber(prev => prev);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <MaterialCommunityIcons name="account-heart" size={70} color="#00796B" style={styles.icon} />
        <Text style={styles.title}>{i18n.t('patientLogin')}</Text>

        {!isOtpSent ? (
          <View style={styles.formContainer}>
            <Text style={styles.label}>{i18n.t('enterPhoneNumber')}</Text>
            <TextInput
              style={styles.input}
              placeholder={i18n.t('enterPhoneNumber')}
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              maxLength={10}
            />
            <TouchableOpacity style={styles.button} onPress={sendOtp}>
              <Text style={styles.buttonText}>{i18n.t('sendOTP')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.label}>{i18n.t('enterOTP')}</Text>
            <TextInput
              style={styles.input}
              placeholder={i18n.t('enterOTP')}
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
              maxLength={6}
            />
            <TouchableOpacity style={styles.button} onPress={verifyOtp}>
              <Text style={styles.buttonText}>{i18n.t('verifyOTP')}</Text>
            </TouchableOpacity>
          </View>
        )}
        
        <TouchableOpacity onPress={() => router.push('/patient-signup')}>
          <Text style={styles.linkText}>{i18n.t('dontHaveAccount')} <Text style={styles.linkTextBold}>{i18n.t('signUp')}</Text></Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>{i18n.t('goBack')}</Text>
        </TouchableOpacity>
        
        <View style={styles.languageContainer}>
          <TouchableOpacity onPress={() => handleLanguageChange('en')}>
            <Text style={styles.languageText}>English</Text>
          </TouchableOpacity>
          <Text style={styles.languageSeparator}>|</Text>
          <TouchableOpacity onPress={() => handleLanguageChange('te')}>
            <Text style={styles.languageText}>తెలుగు</Text>
          </TouchableOpacity>
          <Text style={styles.languageSeparator}>|</Text>
          <TouchableOpacity onPress={() => handleLanguageChange('hi')}>
            <Text style={styles.languageText}>हिन्दी</Text>
          </TouchableOpacity>
          <Text style={styles.languageSeparator}>|</Text>
          <TouchableOpacity onPress={() => handleLanguageChange('ml')}>
            <Text style={styles.languageText}>മലയാളം</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 16,
    marginBottom: 20,
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
  linkText: {
    marginTop: 10,
    fontSize: 16,
    color: '#00796B',
  },
  linkTextBold: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  languageContainer: {
    flexDirection: 'row',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  languageText: {
    color: '#00796B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  languageSeparator: {
    color: '#00796B',
    marginHorizontal: 10,
  },
});