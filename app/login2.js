// File: asha-login.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

export default function AshaWorkerLogin() {
  const [ashaWorkerId, setAshaWorkerId] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();

  const handleLogin = () => {
    if (ashaWorkerId === "123" && password === "pass") {
      Alert.alert(
        t("loginSuccess"),
        t("navigatingToDashboard"),
        [{ text: "OK", onPress: () => router.push("/dashboard") }]
      );
    } else {
      Alert.alert(t("loginFailed"), t("enterDetails"));
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {/* 🔥 Illustration Image (replace with asha.png/doctor.png) */}
          <Image
            source={require("../assets/images/asha.png")}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Title + Subtitle */}
          <Text style={styles.title}>{t("AshaWorkerLogin")}</Text>
          <Text style={styles.subtitle}>
            Connecting Communities with Healthcare 💙
          </Text>

          {/* Form Card */}
          <View style={styles.formCard}>
            <TextInput
              style={styles.input}
              placeholder={t("Enter AshaId")}
              placeholderTextColor="#666"
              value={ashaWorkerId}
              onChangeText={setAshaWorkerId}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder={t("password")}
              placeholderTextColor="#666"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>{t("login")}</Text>
            </TouchableOpacity>
          </View>
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
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#00796B",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#00796B",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#004D40",
    marginBottom: 25,
    fontStyle: "italic",
    textAlign: "center",
  },
  formCard: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
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
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
