import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';

export default function LanguageScreen() {
  const { i18n } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState(i18n.language);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setActiveLanguage(lang);
    router.replace('/home'); 
  };

  const languages = [
    { code: 'en', label: i18n.t('language.en') },
     { code: 'ml', label: i18n.t('language.ml') },
    { code: 'te', label: i18n.t('language.te') },
    { code: 'hi', label: i18n.t('language.hi') },
   
  ];

  return (
    <LinearGradient colors={['#E0F7FA', '#B2DFDB']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {i18n.t('languageSelectionTitle', { defaultValue: 'Choose Your Language' })}
        </Text>

        <View style={styles.languageContainer}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.card,
                activeLanguage === lang.code && styles.activeCard
              ]}
              onPress={() => handleLanguageChange(lang.code)}
            >
              <LinearGradient
                colors={activeLanguage === lang.code 
                  ? ['#00796B', '#004D40']  // Active card = Dark teal gradient
                  : ['#B2DFDB', '#E0F7FA']} // Normal card = soft teal gradient
                style={styles.cardGradient}
              >
                <Text
                  style={[
                    styles.languageText,
                    activeLanguage === lang.code && styles.activeText
                  ]}
                >
                  {lang.label}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
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
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004D40',
    marginBottom: 30,
    textAlign: 'center',
  },
  languageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    margin: 12,
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  cardGradient: {
    width: 150,
    height: 150,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#004D40',
  },
  activeText: {
    color: '#fff',
    fontWeight: '700',
  },
});
