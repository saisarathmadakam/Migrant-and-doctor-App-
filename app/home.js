// File: home.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const { i18n } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState(i18n.language);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setActiveLanguage(lang);
  };

  return (
    <LinearGradient colors={['#E0F7FA', '#B2DFDB']} style={styles.gradient}>
      <View style={styles.container}>
        
        {/* Illustration (Hero Image) */}
        <Image 
          source={require('../assets/images/health.png')}   // <-- Place your health image here
          style={styles.heroImage}
          resizeMode="contain"
        />

        {/* App Icon */}
        

        {/* Title */}
        <Text style={styles.title}>{i18n.t('chooseYourLogin')}</Text>

        {/* Info Card / Tagline */}
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            {i18n.t('welcomeMessage', { defaultValue: 'Your Health Our Priority' })}
          </Text>
        </View>

        {/* Language Selection Buttons */}
        <View style={styles.languageContainer}>
          {['en', 'te', 'hi', 'ml'].map((lang) => (
            <TouchableOpacity
              key={lang}
              style={[
                styles.languageButton,
                activeLanguage === lang && styles.activeButton
              ]}
              onPress={() => handleLanguageChange(lang)}
            >
              <Text
                style={[
                  styles.languageButtonText,
                  activeLanguage === lang && styles.activeButtonText
                ]}
              >
                {i18n.t(`language.${lang}`)}
              </Text>
            </TouchableOpacity>
          ))}
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
  languageContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  languageButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#B2DFDB',
    borderRadius: 8,
    marginHorizontal: 5,
    elevation: 2,
  },
  languageButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#004D40',
  },
  activeButton: {
    backgroundColor: '#004D40',
  },
  activeButtonText: {
    color: '#FFFFFF',
  },
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
