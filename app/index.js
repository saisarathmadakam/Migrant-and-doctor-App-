//SplashScreen 
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { router } from 'expo-router';

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      router.replace('/home'); // Changed navigation to go to the new home screen
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: 'https://c8.alamy.com/comp/MRY67P/medical-records-icon-caduceus-and-personal-health-record-imagery-phr-emr-ehr-MRY67P.jpg' }}
            style={styles.logo}
          />
          <Text style={styles.title}>Digital Health Records</Text>
          <Text style={styles.subtitle}>Secure Access, Anytime, Anywhere</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796B',
  },
  subtitle: {
    fontSize: 16,
    color: '#004D40',
    marginTop: 5,
  },
});