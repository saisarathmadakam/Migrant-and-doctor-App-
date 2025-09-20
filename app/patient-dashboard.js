// File: patient-dashboard.js

import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, Image, 
  ActivityIndicator, FlatList, Linking, TouchableOpacity, Alert, Modal 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import i18n from './translations';
import { getPatientDatabase } from './dataStore';

export default function PatientDashboardScreen() {
  const params = useLocalSearchParams();
  const { 
    id, fullName, age, gender, contact, aadhaar, district, city, village, 
    migrantType, migrationState, migrationDistrict,
    chronicDiseases, pregnancyDetails, 
    returneeDetails, incomingDetails
  } = params;
  
  const [patientRecords, setPatientRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileVisible, setProfileVisible] = useState(false);

  const healthSchemes = [
    { title: 'Ayushman Bharat', description: 'Medical coverage up to ₹5L/year.', color1: '#00796B', color2: '#004D40', icon: 'hospital-building', url: 'https://pmjay.gov.in' },
    { title: 'PM Jan Arogya', description: 'Insurance for vulnerable citizens.', color1: '#26A69A', color2: '#00897B', icon: 'account-heart', url: 'https://www.google.com/search?q=PM+Jan+Arogya+scheme' },
    { title: 'State Health Programs', description: 'Check state portal for benefits.', color1: '#4DB6AC', color2: '#00796B', icon: 'file-document-outline', url: 'https://www.google.com/search?q=State+Health+Programs+India' },
  ];

  const moreSchemes = [
    { title: "Pradhan Mantri Matru Vandana Yojana", description: "Financial aid for pregnant women and mothers.", color1: "#009688", color2: "#004D40", icon: "baby-carriage", url: "https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana" },
    { title: "Janani Suraksha Yojana", description: "Safe motherhood cash assistance for institutional delivery.", color1: "#4DB6AC", color2: "#00796B", icon: "human-pregnant", url: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309" },
    { title: "Rashtriya Swasthya Bima Yojana", description: "Health insurance for BPL families.", color1: "#26A69A", color2: "#004D40", icon: "shield-heart", url: "https://www.india.gov.in/spotlight/rashtriya-swasthya-bima-yojana" }
  ];

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const allPatients = await getPatientDatabase();
        const currentPatient = allPatients[contact];
        if (currentPatient && Array.isArray(currentPatient.records)) {
          setPatientRecords(currentPatient.records);
        } else {
          setPatientRecords([]);
        }
      } catch (error) {
        console.error("Failed to fetch patient records:", error);
        setPatientRecords([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, [contact]);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => router.replace("/login") }
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00796B" />
        <Text style={styles.loadingText}>{i18n.t('loadingRecords')}</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#E0F7FA', '#B2EBF2']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Migrant Dashboard</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setProfileVisible(true)} style={styles.profileBtn}>
            <MaterialCommunityIcons name="account-circle" size={26} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <MaterialCommunityIcons name="logout" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.welcomeText}>👋 Welcome, {fullName || 'Patient'}!</Text>

        {/* Medical Records */}
        <Text style={styles.sectionTitle}>📄 Medical Records</Text>
        {patientRecords.length > 0 ? (
          patientRecords.map((record, index) => (
            <View key={index} style={styles.recordCard}>
              {record.imageUri && <Image source={{ uri: record.imageUri }} style={styles.recordImage} />}
              <Text style={styles.recordDesc}>{record.description}</Text>
              <Text style={styles.recordDate}>{new Date(record.timestamp).toLocaleDateString()}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noRecords}>No records found</Text>
        )}

        {/* Health Schemes */}
        <Text style={styles.sectionTitle}>💡 Health Schemes</Text>
        <FlatList
          data={healthSchemes}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingVertical: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
              <LinearGradient colors={[item.color1, item.color2]} style={styles.schemeCard}>
                <MaterialCommunityIcons name={item.icon} size={40} color="#fff" />
                <Text style={styles.schemeTitle}>{item.title}</Text>
                <Text style={styles.schemeDesc}>{item.description}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        />

        {/* More Health Programs */}
        <Text style={styles.sectionTitle}>🌍 More Health Programs</Text>
        <FlatList
          data={moreSchemes}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingVertical: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
              <LinearGradient colors={[item.color1, item.color2]} style={styles.schemeCard}>
                <MaterialCommunityIcons name={item.icon} size={40} color="#fff" />
                <Text style={styles.schemeTitle}>{item.title}</Text>
                <Text style={styles.schemeDesc}>{item.description}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        />
      </ScrollView>

      {/* Profile Modal - Full Screen */}
      <Modal visible={profileVisible} animationType="slide" transparent={false}>
        <View style={styles.fullModalContainer}>
          <TouchableOpacity onPress={() => setProfileVisible(false)} style={styles.fullCloseBtn}>
            <MaterialCommunityIcons name="close" size={26} color="#fff" />
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.fullProfileContent}>
            <MaterialCommunityIcons name="account-circle" size={100} color="#00796B" />
            <Text style={styles.profileName}>{fullName || 'N/A'}</Text>
            <Text style={styles.profileInfo}>ID: {id || 'N/A'}</Text>
            <Text style={styles.profileInfo}>Aadhaar: {aadhaar || 'N/A'}</Text>
            <Text style={styles.profileInfo}>Age: {age || 'N/A'}</Text>
            <Text style={styles.profileInfo}>Gender: {gender || 'N/A'}</Text>
            <Text style={styles.profileInfo}>Contact: {contact || 'N/A'}</Text>
            <Text style={styles.profileInfo}>Location: {village || 'N/A'}, {city || 'N/A'}, {district || 'N/A'}</Text>
            {migrantType && <Text style={styles.profileInfo}>Migrant Type: {migrantType}</Text>}
            {migrationState && migrationDistrict && (
              <Text style={styles.profileInfo}>Origin: {migrationDistrict}, {migrationState}</Text>
            )}
            {chronicDiseases && <Text style={styles.profileInfo}>Chronic: {chronicDiseases}</Text>}
            {gender === 'Female' && pregnancyDetails && <Text style={styles.profileInfo}>Pregnancy: {pregnancyDetails}</Text>}
            {migrantType === 'Returnee' && <Text style={styles.profileInfo}>Returnee: {returneeDetails}</Text>}
            {migrantType === 'Incoming' && <Text style={styles.profileInfo}>Incoming: {incomingDetails}</Text>}
          </ScrollView>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E0F7FA' },
  loadingText: { color: '#00796B', marginTop: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 50, backgroundColor: '#00796B', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  profileBtn: { backgroundColor: '#004D40', padding: 8, borderRadius: 8, marginRight: 10 },
  logoutBtn: { backgroundColor: '#004D40', padding: 8, borderRadius: 8 },
  scrollContent: { paddingBottom: 30, paddingHorizontal: 20 },
  welcomeText: { fontSize: 20, fontWeight: 'bold', color: '#004D40', textAlign: 'center', marginVertical: 15 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#004D40', marginBottom: 10, marginTop: 15 },
  schemeCard: { width: 220, borderRadius: 20, padding: 20, marginRight: 15, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
  schemeTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginTop: 10, textAlign: 'center' },
  schemeDesc: { color: '#fff', fontSize: 12, marginTop: 5, textAlign: 'center' },
  recordCard: { backgroundColor: '#fff', borderRadius: 15, padding: 15, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  recordImage: { width: '100%', height: 180, borderRadius: 12, marginBottom: 10 },
  recordDesc: { fontSize: 16, color: '#333' },
  recordDate: { fontSize: 12, color: '#888', alignSelf: 'flex-end', marginTop: 5 },
  noRecords: { color: '#00796B', textAlign: 'center', marginTop: 20, fontSize: 16 },

  // Full Profile Modal
  fullModalContainer: { flex: 1, backgroundColor: '#E0F2F1', paddingTop: 50 },
  fullCloseBtn: { position: 'absolute', top: 40, right: 20, backgroundColor: '#00796B', borderRadius: 20, padding: 8, zIndex: 10 },
  fullProfileContent: { padding: 20, alignItems: 'center' },
  profileName: { fontSize: 22, fontWeight: 'bold', marginTop: 10, color: '#004D40' },
  profileInfo: { fontSize: 16, marginTop: 5, color: '#333' },
});
