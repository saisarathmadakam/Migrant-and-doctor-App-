import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

export default function AshaWorkerLogin() {
  const [ashaWorkerId, setAshaWorkerId] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();

  const handleLogin = () => {
    // Hardcoded credentials for demonstration
    if (ashaWorkerId === '123' && password === 'pass') {
      Alert.alert(
        t('loginSuccess'),
        t('navigatingToDashboard'),
        [{ text: "OK", onPress: () => router.push('/dashboard') }]
      );
    } else {
      Alert.alert(t('loginFailed'), t('enterDetails'));
    }
  };

  return (
    <View style={styles.container}>
      {/* Replaced Image with a relevant icon */}
      <MaterialCommunityIcons name="account-group" size={70} color="#00796B" style={styles.icon} />
      <Text style={styles.title}>{t('AshaWorkerLogin')}</Text>

      {/* ID Input */}
      <TextInput
        style={styles.input}
        placeholder={t('Enter AshaId')}
        placeholderTextColor="#666"
        value={ashaWorkerId}
        onChangeText={setAshaWorkerId}
        keyboardType="numeric"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder={t('password')}
        placeholderTextColor="#666"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{t('login')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA', // Updated color
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00796B', // Updated color
  },
  input: {
    width: '90%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc', // Updated color
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    width: '90%',
    padding: 15,
    backgroundColor: '#00796B', // Updated color
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});