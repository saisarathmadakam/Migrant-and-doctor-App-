// File: layout.js

import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
      <Stack.Screen
        name="login"
        options={{
          animation: 'flip',
        }}
      />
      <Stack.Screen
        name="login1"
        options={{
          animation: 'flip',
        }}
      />
      <Stack.Screen name="patient-dashboard" />
      <Stack.Screen name="doctor-dashboard" /> {/* Add this line */}
    </Stack>
  );
}