import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import i18n from '../translations';

export default function SchemesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>{i18n.t('governmentSchemes')}</Text>
      <Text style={styles.headerSubtitle}>{i18n.t('activeSchemesForYou')}</Text>

      <View style={styles.schemeItem}>
        <MaterialCommunityIcons name="shield-check" size={40} color="#00796B" style={styles.schemeIcon} />
        <View style={styles.schemeDetails}>
          <Text style={styles.schemeTitle}>{i18n.t('eShramHealthCover')}</Text>
          <Text style={styles.schemeDescription}>{i18n.t('cashlessTreatment')}</Text>
        </View>
      </View>

      <View style={styles.schemeItem}>
        <MaterialCommunityIcons name="heart-plus" size={40} color="#00796B" style={styles.schemeIcon} />
        <View style={styles.schemeDetails}>
          <Text style={styles.schemeTitle}>{i18n.t('ayushmanBharat')}</Text>
          <Text style={styles.schemeDescription}>{i18n.t('fiveLakhCoverage')}</Text>
        </View>
      </View>
      
      <View style={styles.schemeItem}>
        <MaterialCommunityIcons name="finance" size={40} color="#00796B" style={styles.schemeIcon} />
        <View style={styles.schemeDetails}>
          <Text style={styles.schemeTitle}>{i18n.t('pradhanMantriJanAushadhi')}</Text>
          <Text style={styles.schemeDescription}>{i18n.t('affordableMedicines')}</Text>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    padding: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004D40',
    marginTop: 40,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  schemeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  schemeIcon: {
    marginRight: 15,
  },
  schemeDetails: {
    flex: 1,
  },
  schemeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004D40',
  },
  schemeDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
});