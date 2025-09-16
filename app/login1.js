// File: login1.js

import React, { useState } from "react";
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
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import i18n from "./translations";
import { getDoctorDatabase } from "./dataStore";

export default function DoctorLoginScreen() {
  const [doctorId, setDoctorId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const doctorDatabase = await getDoctorDatabase();
    const foundDoctor = doctorDatabase[doctorId];

    if (foundDoctor && foundDoctor.password === password) {
      Alert.alert(i18n.t("loginSuccess"), i18n.t("navigatingToDashboard"));
      router.replace("/doctor-dashboard");
    } else {
      Alert.alert(i18n.t("loginFailed"), i18n.t("enterDetails"));
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {/* Doctor Illustration */}
          <Image
            source={require("../assets/images/doctor.png")}
            style={styles.image}
            resizeMode="contain"
          />

          {/* Title + Tagline */}
          <Text style={styles.title}>{i18n.t("doctorLogin")}</Text>
          <Text style={styles.subtitle}>
            Your Health, Our Priority ✨
          </Text>

          {/* Login Form Card */}
          <View style={styles.formContainer}>
            <Text style={styles.label}>{i18n.t("enterDoctorId")}</Text>
            <TextInput
              style={styles.input}
              placeholder={i18n.t("enterDoctorId")}
              value={doctorId}
              onChangeText={setDoctorId}
            />

            <Text style={styles.label}>{i18n.t("password")}</Text>
            <TextInput
              style={styles.input}
              placeholder={i18n.t("password")}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>{i18n.t("login")}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>{i18n.t("goBack")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0F7FA",
    padding: 20,
  },
  image: {
  width: 150,
  height: 150,
  borderRadius: 75, // half of width/height → circle
  marginBottom: 45,
  borderWidth: 3,
  borderColor: "#00796B", // optional border to highlight circle
},

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#00796B",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#004D40",
    marginBottom: 25,
    textAlign: "center",
    fontStyle: "italic",
  },
  formContainer: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  label: {
    fontSize: 16,
    color: "#00796B",
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    width: "100%",
    height: 55,
    backgroundColor: "#00796B",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  backText: {
    marginTop: 20,
    color: "#00796B",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
