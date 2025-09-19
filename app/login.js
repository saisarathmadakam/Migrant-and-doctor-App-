import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getPatientDatabase } from './dataStore';
import i18n from './translations';

export default function PatientLoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');

  const sendOtp = async () => {
    const patientDatabase = await getPatientDatabase();

    if (phoneNumber.length === 10) {
      if (!patientDatabase[phoneNumber]) {
        Alert.alert(i18n.t('accountNotFound'), i18n.t('invalidPhoneNumber'));
        return;
      }
      const newOtp = '123456';
      setGeneratedOtp(newOtp);
      Alert.alert(
        i18n.t('otpSent'),
        `${i18n.t('yourOTP')} ${newOtp} (${i18n.t('mockOtp')})`
      );
      setIsOtpSent(true);
    } else {
      Alert.alert(i18n.t('invalidPhoneNumber'), i18n.t('enterPhoneNumber'));
    }
  };

  const verifyOtp = async () => {
    const patientDatabase = await getPatientDatabase();

    if (otp === generatedOtp) {
      const patientData = patientDatabase[phoneNumber];
      if (patientData) {
        if (!Array.isArray(patientData.records)) {
          patientData.records = [];
        }

        router.replace({
          pathname: '/patient-dashboard',
          params: patientData,
        });
      }
    } else {
      Alert.alert(i18n.t('error'), i18n.t('invalidOtp'));
      setOtp('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <Image
          source={require('../assets/images/migrant.jpg')}
          style={styles.heroImage}
          resizeMode="contain"
        />

        <Text style={styles.title}>{i18n.t('MigrantLogin')}</Text>

        {/* wrap subtitle in Text */}
        <Text style={styles.subtitle}>{i18n.t('welcomeMessage')}</Text>

        <View style={styles.card}>
          {!isOtpSent ? (
            <View style={styles.formContainer}>
              <Text style={styles.label}>{i18n.t('enterPhoneNumber')}</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="cellphone"
                  size={22}
                  color="#00796B"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder={i18n.t('enterPhoneNumber')}
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  maxLength={10}
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={sendOtp}>
                <Text style={styles.buttonText}>{i18n.t('sendOTP')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.formContainer}>
              <Text style={styles.label}>{i18n.t('enterOTP')}</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="key-variant"
                  size={22}
                  color="#00796B"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder={i18n.t('enterOTP')}
                  keyboardType="number-pad"
                  value={otp}
                  onChangeText={setOtp}
                  maxLength={6}
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={verifyOtp}>
                <Text style={styles.buttonText}>{i18n.t('verifyOTP')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
  },
  heroImage: {
    width: 200,
    height: 200,
    marginBottom: 40,
    borderRadius: 100,
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 50,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#00796B',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 55,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  backText: {
    marginTop: 10,
    color: '#00796B',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
