// File: app/patient-tabs/_layout.js

import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import i18n from '../translations'; // Use '..' to go up one directory

export default function PatientTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#00796B',
        tabBarInactiveTintColor: '#999',
        headerShown: false, 
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: i18n.t('dashboard'),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-dashboard" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="records"
        options={{
          title: i18n.t('records'),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="clipboard-text" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: i18n.t('profile'),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}