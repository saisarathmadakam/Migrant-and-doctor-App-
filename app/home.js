//Displays Apps -> Doctor App & Patient App
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Hospital Symbol on top */}
      <MaterialCommunityIcons name="hospital-building" size={70} color="#00796B" style={styles.icon} />

      <Text style={styles.title}>Choose Your Login</Text>
      
      {/* Patient Login Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/login')}
      >
        <MaterialCommunityIcons name="account-heart" size={26} color="#fff" style={styles.btnIcon} />
        <Text style={styles.buttonText}>Migrant Login</Text>
      </TouchableOpacity>
      
      {/* Doctor Login Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/login1')}
      >
        <MaterialCommunityIcons name="stethoscope" size={26} color="#fff" style={styles.btnIcon} />
        <Text style={styles.buttonText}>Doctor Login</Text>
      </TouchableOpacity>
    </View>
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
  button: {
    flexDirection: 'row', // to place icon & text side by side
    width: '80%',
    height: 60,
    backgroundColor: '#00796B',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
