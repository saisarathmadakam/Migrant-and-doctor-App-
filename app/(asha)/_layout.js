import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import i18n from '../translations';

export default function AshaWorkerTabs() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false, 
      tabBarActiveTintColor: '#00796B',
      tabBarLabelStyle: { fontSize: 12 },
    }}>
      <Tabs.Screen 
        name="dashboard"
        options={{
          title: i18n.t('dashboard'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard-outline" size={size} color={color} />
          ),
        } }
        />
      <Tabs.Screen
        name="migrant_signup"
        options={{
          title: i18n.t('register'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-plus-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="upload_record"
        options={{
          title: i18n.t('upload'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cloud-upload-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: i18n.t('profile'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}