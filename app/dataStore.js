// File: dataStore.js

import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIAL_PATIENT_DATA = {
  '9182933812': {
    id: 'P123456',
    fullName: 'John Doe',
    address: '123 Main St, Anytown',
    age: 35,
    records: [],
  },
};

const INITIAL_DOCTOR_DATA = {
  'D12345': {
    password: 'password123',
    fullName: 'Dr. Jane Smith'
  }
};

const PATIENT_STORAGE_KEY = 'medicalRecordsApp';
const DOCTOR_STORAGE_KEY = 'doctorRecordsApp';


// Function to get the patient database
export const getPatientDatabase = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(PATIENT_STORAGE_KEY);
    const data = jsonValue != null ? JSON.parse(jsonValue) : INITIAL_PATIENT_DATA;
    return data;
  } catch (e) {
    console.error("Failed to load patient data from storage:", e);
    return INITIAL_PATIENT_DATA;
  }
};

// Function to save the entire patient database
export const savePatientData = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(PATIENT_STORAGE_KEY, jsonValue);
    console.log("Patient data successfully saved to storage.");
  } catch (e) {
    console.error("Failed to save patient data to storage:", e);
  }
};

// Function to get the doctor database
export const getDoctorDatabase = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(DOCTOR_STORAGE_KEY);
    const data = jsonValue != null ? JSON.parse(jsonValue) : INITIAL_DOCTOR_DATA;
    return data;
  } catch (e) {
    console.error("Failed to load doctor data from storage:", e);
    return INITIAL_DOCTOR_DATA;
  }
};


export const updatePatientRecords = async (patientId, newRecord) => {
  const allPatients = await getPatientDatabase();
  const patient = Object.values(allPatients).find(
    (p) => p.id.toLowerCase() === patientId.toLowerCase()
  );
  
  if (patient) {
    if (!patient.records) {
      patient.records = [];
    }
    patient.records.unshift(newRecord);
    await savePatientData(allPatients);
  } else {
    console.error(`Patient with ID ${patientId} not found in database.`);
  }
};