import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import i18n from '../translations';
import { getPatientData } from '../dataStore'; // Updated import

export default function PatientDashboardScreen() {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      const data = getPatientData();
      if (data) {
        setPatientData(data);
      }
      setLoading(false);
    };

    fetchPatientData();
  }, []);

  if (loading || !patientData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00796B" />
        <Text style={styles.loadingText}>{i18n.t('loadingData')}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>{i18n.t('welcome')}, {patientData.fullName || 'N/A'}</Text>
        <View style={styles.languageContainer}>
          <Text style={[styles.languageBtn, styles.activeLanguage]}>EN</Text>
          <Text style={styles.languageBtn}>తెలుగు</Text>
          <Text style={styles.languageBtn}>हिंदी</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>{i18n.t('yourHealthAtAGlance')}</Text>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="clipboard-pulse-outline" size={30} color="#00796B" style={styles.headerIcon} />
          <View>
            <Text style={styles.cardTitle}>{i18n.t('healthRecords')}</Text>
            <Text style={styles.cardSubtitle}>{i18n.t('assessmentsAndVaccinations')}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.viewAllButton} 
          onPress={() => router.navigate('/patient-tabs/records')}
        >
          <Text style={styles.viewAllText}>{i18n.t('viewAll')}</Text>
        </TouchableOpacity>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.recordsButton}>
            <Text style={styles.recordsButtonText}>{i18n.t('medicalAssessments')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.recordsButton}>
            <Text style={styles.recordsButtonText}>{i18n.t('vaccinationHistory')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="file-document-outline" size={30} color="#00796B" style={styles.headerIcon} />
          <View>
            <Text style={styles.cardTitle}>{i18n.t('governmentSchemes')}</Text>
            <Text style={styles.cardSubtitle}>{i18n.t('activeSchemesForYou')}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.viewAllButton} onPress={() => router.navigate('/patient-tabs/schemes')}>
          <Text style={styles.viewAllText}>{i18n.t('viewAll')}</Text>
        </TouchableOpacity>
        <ScrollView horizontal style={styles.scrollableSchemes}>
          <View style={styles.schemeItem}>
            <MaterialCommunityIcons name="shield-check" size={24} color="#00796B" style={styles.schemeIcon} />
            <View>
              <Text style={styles.schemeTitle}>{i18n.t('eShramHealthCover')}</Text>
              <Text style={styles.schemeDescription}>{i18n.t('cashlessTreatment')}</Text>
            </View>
          </View>
          <View style={styles.schemeItem}>
            <MaterialCommunityIcons name="heart-plus" size={24} color="#00796B" style={styles.schemeIcon} />
            <View>
              <Text style={styles.schemeTitle}>{i18n.t('ayushmanBharat')}</Text>
              <Text style={styles.schemeDescription}>{i18n.t('fiveLakhCoverage')}</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.helpButton}>
        <Text style={styles.helpText}>{i18n.t('needHelp')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#00796B',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004D40',
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1E8E6',
    borderRadius: 20,
    padding: 3,
  },
  languageBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    color: '#00796B',
  },
  activeLanguage: {
    backgroundColor: '#00796B',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerIcon: {
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004D40',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#777',
  },
  viewAllButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#E0F7FA',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewAllText: {
    color: '#00796B',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  recordsButton: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    borderRadius: 15,
    paddingVertical: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  recordsButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00796B',
    textAlign: 'center',
  },
  scrollableSchemes: {
    flexDirection: 'row',
    marginTop: 10,
  },
  schemeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDFB',
    borderRadius: 15,
    padding: 15,
    marginRight: 10,
    width: 250,
  },
  schemeIcon: {
    marginRight: 10,
  },
  schemeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#004D40',
  },
  schemeDescription: {
    fontSize: 12,
    color: '#666',
    width: '90%',
  },
  helpButton: {
    marginTop: 20,
    marginBottom: 50,
    alignSelf: 'center',
  },
  helpText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});