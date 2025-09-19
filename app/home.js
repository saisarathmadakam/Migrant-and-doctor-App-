import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const { i18n } = useTranslation();

  return (
    <LinearGradient colors={['#E0F7FA', '#B2DFDB']} style={styles.gradient}>
      <View style={styles.container}>
        
        {/* Illustration (Hero Image) */}
        <Image 
          source={require('../assets/images/health.png')} 
          style={styles.heroImage}
          resizeMode="contain"
        />

        {/* Title */}
        <Text style={styles.title}>{i18n.t('chooseYourLogin')}</Text>

        {/* Info Card / Tagline */}
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            {i18n.t('welcomeMessage', { defaultValue: 'Your Health Our Priority' })}
          </Text>
        </View>

        {/* Patient Login Button */}
        <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
          <MaterialCommunityIcons name="account-heart" size={26} color="#fff" style={styles.btnIcon} />
          <Text style={styles.buttonText}>{i18n.t('MigrantLogin')}</Text>
        </TouchableOpacity>

        {/* Doctor Login Button */}
        <TouchableOpacity style={styles.button} onPress={() => router.push('/login1')}>
          <MaterialCommunityIcons name="stethoscope" size={26} color="#fff" style={styles.btnIcon} />
          <Text style={styles.buttonText}>{i18n.t('doctorLogin')}</Text>
        </TouchableOpacity>

        {/* Asha Worker Login Button */}
        <TouchableOpacity style={styles.button} onPress={() => router.push('/login2')}>
          <MaterialCommunityIcons name="account-group" size={26} color="#fff" style={styles.btnIcon} />
          <Text style={styles.buttonText}>{i18n.t('ashaWorkerLogin')}</Text>
        </TouchableOpacity>

        {/* Footer Note */}
        <Text style={styles.footer}>© 2025 HealthWealth Hackathon</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  heroImage: {
    width: 280,
    height: 180,
    marginBottom: 35,
  },
  icon: {
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#004D40',
    textAlign: 'center',
    marginBottom:30,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    width: '90%',
    alignItems: 'center',
  },
  infoText: {
    color: '#004D40',
    fontSize: 15,
    textAlign: 'center',
  },
  // The languageContainer and languageButton styles are no longer needed here
  button: {
    flexDirection: 'row',
    width: '85%',
    height: 60,
    backgroundColor: '#00796B',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  btnIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    fontSize: 12,
    color: '#555',
    marginTop: 20,
    textAlign: 'center',
  },
});