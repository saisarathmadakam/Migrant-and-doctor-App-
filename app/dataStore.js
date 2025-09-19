// File: dataStore.js

import AsyncStorage from '@react-native-async-storage/async-storage';

// Initial patient data updated with Aadhaar and migration info
const INITIAL_PATIENT_DATA = {
  '9182933812': {
    id: 'P123456',
    fullName: 'John Doe',
    age: 35,
    gender: 'Male',
    contact: '9182933812',
    aadhaar: '1234-5678-9012',       // ✅ Added Aadhaar
    state: 'Kerala',
    district: 'Kozhikode',
    city: 'Anytown City',
    village: 'Anytown Village',
    migrantType: 'Returnee',
    migrationState: 'UAE',           // ✅ Origin state for migration
    migrationDistrict: 'Dubai',      // ✅ Origin district/city
    chronicDiseases: 'Diabetes, Hypertension',
    pregnancyDetails: null,
    returneeDetails: 'Returned from Dubai on 10/10/2023',
    incomingDetails: null,
    records: [],
  },
};

const INITIAL_DOCTOR_DATA = {
  'D12345': {
    password: 'password123',
    fullName: 'Dr. Jane Smith',
  },
};

const PATIENT_STORAGE_KEY = 'medicalRecordsApp';
const DOCTOR_STORAGE_KEY = 'doctorRecordsApp';

// Get all patients
export const getPatientDatabase = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(PATIENT_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : INITIAL_PATIENT_DATA;
  } catch (e) {
    console.error("Failed to load patient data from storage:", e);
    return INITIAL_PATIENT_DATA;
  }
};

// Save all patients
export const savePatientData = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(PATIENT_STORAGE_KEY, jsonValue);
    console.log("Patient data successfully saved to storage.");
  } catch (e) {
    console.error("Failed to save patient data to storage:", e);
  }
};

// Get all doctors
export const getDoctorDatabase = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(DOCTOR_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : INITIAL_DOCTOR_DATA;
  } catch (e) {
    console.error("Failed to load doctor data from storage:", e);
    return INITIAL_DOCTOR_DATA;
  }
};

// Add a new patient
export const addPatientToDatabase = async (phoneNumber, patientDetails) => {
  try {
    const patientDatabase = await getPatientDatabase();
    patientDatabase[phoneNumber] = patientDetails;
    await savePatientData(patientDatabase);
    console.log(`New patient ${phoneNumber} added and saved.`);
  } catch (e) {
    console.error("Failed to add new patient to database:", e);
  }
};

// Update patient medical records
export const updatePatientRecords = async (patientId, newRecord) => {
  const allPatients = await getPatientDatabase();

  if (!patientId) {
    console.error("updatePatientRecords called with undefined patientId");
    return;
  }

  const patient = Object.values(allPatients).find(
    (p) => p?.id && p.id.toLowerCase() === patientId.toLowerCase()
  );

  if (patient) {
    if (!Array.isArray(patient.records)) {
      patient.records = [];
    }
    patient.records.unshift(newRecord);
    await savePatientData(allPatients);
  } else {
    console.error(`Patient with ID ${patientId} not found in database.`);
  }
};
