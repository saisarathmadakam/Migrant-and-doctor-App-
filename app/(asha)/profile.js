// File: (asha)/profile.js

import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

// 🔹 Import your local image from assets
import profilePhoto from "../../assets/images/ashap.png"; // <-- Replace 'myPhoto.jpg' with your actual image file

export default function AshaProfileScreen() {
  const ashaWorker = {
    name: "Anjali",
    profession: "ASHA Worker",
    hospital: "Bhimavaram Community Health Center",
    location: "Bhimavaram, Andhra Pradesh",
    experience: "7 years of service",
    patients: "500+ patients",
    training: "Certified in Maternal & Child Health",
    villagesCovered: "Bhimavaram, Veeravasaram, Mogallu",
    specialFocus: "Maternal care, Immunization, Nutrition awareness"
  };

  const handleLogout = () => {
    router.replace("/login");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient colors={["#008080", "#20B2AA"]} style={styles.header}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={24} color="#fff" />
        </TouchableOpacity>

        <Image source={profilePhoto} style={styles.avatar} />
        <Text style={styles.name}>{ashaWorker.name}</Text>
        <Text style={styles.profession}>{ashaWorker.profession}</Text>
      </LinearGradient>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="star" size={22} color="#008080" />
          <Text style={styles.statValue}>{ashaWorker.experience}</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="account-group" size={22} color="#008080" />
          <Text style={styles.statValue}>{ashaWorker.patients}</Text>
        </View>
      </View>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="hospital-building" size={26} color="#008080" />
          <Text style={styles.infoText}>{ashaWorker.hospital}</Text>
        </View>

        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="map-marker" size={26} color="#008080" />
          <Text style={styles.infoText}>{ashaWorker.location}</Text>
        </View>

        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="school" size={26} color="#008080" />
          <Text style={styles.infoText}>{ashaWorker.training}</Text>
        </View>

        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="map" size={26} color="#008080" />
          <Text style={styles.infoText}>Villages Covered: {ashaWorker.villagesCovered}</Text>
        </View>

        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="heart-pulse" size={26} color="#008080" />
          <Text style={styles.infoText}>Special Focus: {ashaWorker.specialFocus}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E0F2F1" },

  // Header
  header: {
    alignItems: "center",
    paddingVertical: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "relative",
    elevation: 4,
  },
  logoutBtn: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 8,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10,
    backgroundColor: "#fff",
    elevation: 5,
  },
  name: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  profession: { fontSize: 16, color: "#B2DFDB", marginTop: 2 },

  // Stats
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: -20,
    paddingHorizontal: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 8,
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    elevation: 3,
  },
  statValue: {
    fontSize: 14,
    color: "#008080",
    fontWeight: "600",
    marginTop: 5,
    textAlign: "center",
  },

  // Info
  infoSection: { marginTop: 25, paddingHorizontal: 20 },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  infoText: { fontSize: 16, color: "#333", marginLeft: 12, flexShrink: 1 },
});
