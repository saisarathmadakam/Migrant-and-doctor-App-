// app/(tabs)/_layout.js
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#00796B',
        tabBarInactiveTintColor: '#777',
        tabBarStyle: { backgroundColor: '#E0F7FA', height: 70, paddingBottom: 10 },
      }}
    >
      <Tabs.Screen
        name="patient-dashboard" // Must match (tabs)/patient-dashboard.js
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="records" // Must match (tabs)/records.js
        options={{
          title: 'Records',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-document" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
