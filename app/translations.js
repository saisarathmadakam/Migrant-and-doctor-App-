// File: translations.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
const resources = {
  en: {
    translation: {
      "language": {
        "en": "English",
        "te": "తెలుగు",
        "hi": "हिंदी",
        "ml": "മലയാളം",
      },
      "chooseYourLogin": "Choose Your Login",
      "patientLogin": "Patient Login",
      "doctorLogin": "Doctor Login",
      "ashaWorkerLogin": "Asha Worker Login", // New
      "doctorDashboard": "Doctor Dashboard",
      "searchPatientId": "Search Patient ID",
      "patientFound": "Patient Found",
      "noPatientFound": "No patient found with that ID.",
      "invalidInput": "Invalid Input",
      "enterPatientId": "Please enter a patient ID.",
      "permissionDenied": "Permission Denied",
      "cameraRollPermission": "Permission to access camera roll is required!",
      "uploadSuccess": "Record uploaded successfully!",
      "error": "Error",
      "uploadFieldsError": "Please fill all fields and select an image.",
      "uploadNewRecord": "Upload New Record",
      "imageSelected": "Image Selected",
      "selectImage": "Select Image",
      "enterDescription": "Enter Description...",
      "upload": "Upload",
      "patientInformation": "Patient Information",
      "id": "ID",
      "name": "Name",
      "age": "Age",
      "address": "Address",
      "recordsHistory": "Records History",
      "noRecordsAvailable": "No records available for this patient.",
      "accountNotFound": "Account Not Found",
      "invalidPhoneNumber": "Invalid phone number or account not found.",
      "otpSent": "OTP Sent",
      "yourOTP": "Your OTP is",
      "mockOtp": "This is a mock OTP for demonstration.",
      "enterPhoneNumber": "Enter Phone Number",
      "enterOTP": "Enter OTP",
      "sendOTP": "Send OTP",
      "verifyOTP": "Verify OTP",
      "goBack": "Go Back",
      "loginSuccess": "Login Successful",
      "navigatingToDashboard": "Navigating to dashboard...",
      "loginFailed": "Login Failed",
      "enterDetails": "Invalid ID or password. Please try again.",
      "password": "Password",
      "enterDoctorId": "Enter Doctor ID",
      "login": "Login",
      "patientDashboard": "Patient Dashboard",
      "myMedicalRecords": "My Medical Records",
      "noRecordsFound": "No medical records found.",
      "homeScreenTitle": "Digital Health Records",
      "Enter AshaId": "Enter Asha ID", // New
      "migrantSignup": "Migrant Signup", // New
      "fullName": "Full Name", // New
      "phoneNumber": "Phone Number", // New
      "state": "State", // New
      "district": "District", // New
      "village": "Village/Town", // New
      "signup": "Signup", // New
      "fillAllDetails": "Please fill all details.", // New
      "signupSuccess": "Signup Successful", // New
      "patientAccountCreated": "A new patient account has been created." // New
    }
  },
  te: {
    translation: {
      "language": {
        "en": "English",
        "te": "తెలుగు",
        "hi": "हिंदी",
        "ml": "മലയാളം",
      },
      "chooseYourLogin": "మీ లాగిన్‌ను ఎంచుకోండి",
      "patientLogin": "రోగి లాగిన్",
      "doctorLogin": "డాక్టర్ లాగిన్",
      "AshaWorkerLogin": "ఆశా వర్కర్ లాగిన్", // New
      "doctorDashboard": "డాక్టర్ డాష్‌బోర్డ్",
      "searchPatientId": "రోగి IDని శోధించండి",
      "patientFound": "రోగి దొరికారు",
      "noPatientFound": "ఆ IDతో రోగి దొరకలేదు.",
      "invalidInput": "చెల్లని ఇన్‌పుట్",
      "enterPatientId": "దయచేసి రోగి IDని నమోదు చేయండి.",
      "permissionDenied": "అనుమతి నిరాకరించబడింది",
      "cameraRollPermission": "కెమెరా రోల్‌ను యాక్సెస్ చేయడానికి అనుమతి అవసరం!",
      "uploadSuccess": "రికార్డు విజయవంతంగా అప్‌లోడ్ చేయబడింది!",
      "error": "లోపం",
      "uploadFieldsError": "దయచేసి అన్ని ఫీల్డ్‌లను పూరించండి మరియు ఒక చిత్రాన్ని ఎంచుకోండి.",
      "uploadNewRecord": "కొత్త రికార్డును అప్‌లోడ్ చేయండి",
      "imageSelected": "చిత్రం ఎంపిక చేయబడింది",
      "selectImage": "చిత్రాన్ని ఎంచుకోండి",
      "enterDescription": "వివరణను నమోదు చేయండి...",
      "upload": "అప్‌లోడ్ చేయండి",
      "patientInformation": "రోగి సమాచారం",
      "id": "ఐడి",
      "name": "పేరు",
      "age": "వయస్సు",
      "address": "చిరునామా",
      "recordsHistory": "రికార్డుల చరిత్ర",
      "noRecordsAvailable": "ఈ రోగికి రికార్డులు అందుబాటులో లేవు.",
      "accountNotFound": "ఖాతా దొరకలేదు",
      "invalidPhoneNumber": "చెల్లని ఫోన్ నంబర్ లేదా ఖాతా దొరకలేదు.",
      "otpSent": "OTP పంపబడింది",
      "yourOTP": "మీ OTP",
      "mockOtp": "ఇది ప్రదర్శన కోసం ఒక మాక్ OTP.",
      "enterPhoneNumber": "ఫోన్ నంబర్ నమోదు చేయండి",
      "enterOTP": "OTP నమోదు చేయండి",
      "sendOTP": "OTP పంపండి",
      "verifyOTP": "OTP ధృవీకరించండి",
      "goBack": "వెనక్కి వెళ్ళు",
      "loginSuccess": "లాగిన్ విజయవంతమైంది",
      "navigatingToDashboard": "డాష్‌బోర్డ్‌కు నావిగేట్ అవుతోంది...",
      "loginFailed": "లాగిన్ విఫలమైంది",
      "enterDetails": "చెల్లని ID లేదా పాస్‌వర్డ్. దయచేసి మళ్లీ ప్రయత్నించండి.",
      "password": "పాస్వర్డ్",
      "enterDoctorId": "డాక్టర్ ఐడి నమోదు చేయండి",
      "login": "లాగిన్",
      "patientDashboard": "రోగి డాష్‌బోర్డ్",
      "myMedicalRecords": "నా వైద్య రికార్డులు",
      "noRecordsFound": "వైద్య రికార్డులు దొరకలేదు.",
      "homeScreenTitle": "డిజిటల్ హెల్త్ రికార్డ్స్",
      "Enter AshaId": "ఆశా ఐడి నమోదు చేయండి", // New
      "migrantSignup": "వలసదారు నమోదు", // New
      "fullName": "పూర్తి పేరు", // New
      "phoneNumber": "ఫోన్ నంబర్", // New
      "state": "రాష్ట్రం", // New
      "district": "జిల్లా", // New
      "village": "గ్రామం/పట్టణం", // New
      "signup": "నమోదు చేయండి", // New
      "fillAllDetails": "దయచేసి అన్ని వివరాలను పూరించండి.", // New
      "signupSuccess": "నమోదు విజయవంతమైంది", // New
      "patientAccountCreated": "కొత్త రోగి ఖాతా సృష్టించబడింది." // New
    }
  },
  hi: {
    translation: {
      "language": {
        "en": "English",
        "te": "తెలుగు",
        "hi": "हिंदी",
        "ml": "മലയാളം",
      },
      "chooseYourLogin": "अपना लॉगिन चुनें",
      "patientLogin": "रोगी लॉगिन",
      "doctorLogin": "डॉक्टर लॉगिन",
      "AshaWorkerLogin": "आशा वर्कर लॉगिन", // New
      "doctorDashboard": "डॉक्टर डैशबोर्ड",
      "searchPatientId": "रोगी आईडी खोजें",
      "patientFound": "रोगी मिला",
      "noPatientFound": "उस आईडी वाला कोई भी रोगी नहीं मिला।",
      "invalidInput": "अमान्य इनपुट",
      "enterPatientId": "कृपया एक रोगी आईडी दर्ज करें।",
      "permissionDenied": "अनुमति अस्वीकार कर दी गई",
      "cameraRollPermission": "कैमरा रोल तक पहुंचने की अनुमति आवश्यक है!",
      "uploadSuccess": "रिकॉर्ड सफलतापूर्वक अपलोड किया गया!",
      "error": "त्रुटि",
      "uploadFieldsError": "कृपया सभी फ़ील्ड भरें और एक छवि चुनें।",
      "uploadNewRecord": "नया रिकॉर्ड अपलोड करें",
      "imageSelected": "छवि चयनित",
      "selectImage": "छवि चुनें",
      "enterDescription": "विवरण दर्ज करें...",
      "upload": "अपलोड करें",
      "patientInformation": "रोगी की जानकारी",
      "id": "आईडी",
      "name": "नाम",
      "age": "उम्र",
      "address": "पता",
      "recordsHistory": "रिकॉर्ड इतिहास",
      "noRecordsAvailable": "इस रोगी के लिए कोई रिकॉर्ड उपलब्ध नहीं है।",
      "accountNotFound": "खाता नहीं मिला",
      "invalidPhoneNumber": "अमान्य फोन नंबर या खाता नहीं मिला।",
      "otpSent": "ओटीपी भेजा गया",
      "yourOTP": "आपका ओटीपी है",
      "mockOtp": "यह प्रदर्शन के लिए एक मॉक ओटीपी है।",
      "enterPhoneNumber": "फ़ोन नंबर दर्ज करें",
      "enterOTP": "ओटीपी दर्ज करें",
      "sendOTP": "ओटीपी भेजें",
      "verifyOTP": "ओटीपी सत्यापित करें",
      "goBack": "वापस जाएं",
      "loginSuccess": "लॉगिन सफल",
      "navigatingToDashboard": "डैशबोर्ड पर नेविगेट कर रहा है...",
      "loginFailed": "लॉगिन विफल",
      "enterDetails": "अमान्य आईडी या पासवर्ड। कृपया पुनः प्रयास करें।",
      "password": "पासवर्ड",
      "enterDoctorId": "डॉक्टर आईडी दर्ज करें",
      "login": "लॉग इन करें",
      "patientDashboard": "रोगी डैशबोर्ड",
      "myMedicalRecords": "मेरे चिकित्सा रिकॉर्ड",
      "noRecordsFound": "कोई चिकित्सा रिकॉर्ड नहीं मिला।",
      "homeScreenTitle": "डिजिटल स्वास्थ्य रिकॉर्ड",
      "Enter AshaId": "आशा आईडी दर्ज करें", // New
      "migrantSignup": "प्रवासी पंजीकरण", // New
      "fullName": "पूरा नाम", // New
      "phoneNumber": "फ़ोन नंबर", // New
      "state": "राज्य", // New
      "district": "ज़िला", // New
      "village": "गाँव/कस्बा", // New
      "signup": "साइन अप करें", // New
      "fillAllDetails": "कृपया सभी विवरण भरें।", // New
      "signupSuccess": "पंजीकरण सफल", // New
      "patientAccountCreated": "एक नया रोगी खाता बनाया गया है।" // New
    }
  },
  ml: {
    translation: {
      "language": {
        "en": "English",
        "te": "തെലുങ്ക്",
        "hi": "ഹിന്ദി",
        "ml": "മലയാളം",
      },
      "chooseYourLogin": "നിങ്ങളുടെ ലോഗിൻ തിരഞ്ഞെടുക്കുക",
      "patientLogin": "രോഗിയുടെ ലോഗിൻ",
      "doctorLogin": "ഡോക്ടർ ലോഗിൻ",
      "AshaWorkerLogin": "ആശ വർക്കർ ലോഗിൻ", // New
      "doctorDashboard": "ഡോക്ടർ ഡാഷ്‌ബോർഡ്",
      "searchPatientId": "രോഗിയുടെ ഐഡി തിരയുക",
      "patientFound": "രോഗിയെ കണ്ടെത്തി",
      "noPatientFound": "ആ ഐഡിയിൽ രോഗിയെ കണ്ടെത്താനായില്ല.",
      "invalidInput": "അസാധുവായ ഇൻപുട്ട്",
      "enterPatientId": "ദയവായി ഒരു രോഗിയുടെ ഐഡി നൽകുക.",
      "permissionDenied": "അനുമതി നിഷേധിച്ചു",
      "cameraRollPermission": "ക്യാമറ റോൾ ആക്സസ് ചെയ്യാൻ അനുമതി ആവശ്യമാണ്!",
      "uploadSuccess": "റെക്കോർഡ് വിജയകരമായി അപ്‌ലോഡ് ചെയ്തു!",
      "error": "പിശക്",
      "uploadFieldsError": "എല്ലാ ഫീൽഡുകളും പൂരിപ്പിച്ച് ഒരു ചിത്രം തിരഞ്ഞെടുക്കുക.",
      "uploadNewRecord": "പുതിയ റെക്കോർഡ് അപ്‌ലോഡ് ചെയ്യുക",
      "imageSelected": "ചിത്രം തിരഞ്ഞെടുത്തു",
      "selectImage": "ചിത്രം തിരഞ്ഞെടുക്കുക",
      "enterDescription": "വിവരണം നൽകുക...",
      "upload": "അപ്‌ലോഡ് ചെയ്യുക",
      "patientInformation": "രോഗിയുടെ വിവരങ്ങൾ",
      "id": "ഐഡി",
      "name": "പേര്",
      "age": "പ്രായം",
      "address": "വിലാസം",
      "recordsHistory": "റെക്കോർഡുകളുടെ ചരിത്രം",
      "noRecordsAvailable": "ഈ രോഗിക്ക് റെക്കോർഡുകൾ ലഭ്യമല്ല.",
      "accountNotFound": "അക്കൗണ്ട് കണ്ടെത്തിയില്ല",
      "invalidPhoneNumber": "അസാധുവായ ഫോൺ നമ്പർ അല്ലെങ്കിൽ അക്കൗണ്ട് കണ്ടെത്തിയില്ല.",
      "otpSent": "ഒടിപി അയച്ചു",
      "yourOTP": "നിങ്ങളുടെ ഒടിപി",
      "mockOtp": "ഇത് പ്രദർശനത്തിനുള്ള ഒരു മോക്ക് ഒടിപി ആണ്.",
      "enterPhoneNumber": "ഫോൺ നമ്പർ നൽകുക",
      "enterOTP": "ഒടിപി നൽകുക",
      "sendOTP": "ഒടിപി അയയ്ക്കുക",
      "verifyOTP": "ഒടിപി പരിശോധിക്കുക",
      "goBack": "പുറകിലേക്ക് പോകുക",
      "loginSuccess": "ലോഗിൻ വിജയിച്ചു",
      "navigatingToDashboard": "ഡാഷ്‌ബോർഡിലേക്ക് നാവിഗേറ്റ് ചെയ്യുന്നു...",
      "loginFailed": "ലോഗിൻ പരാജയപ്പെട്ടു",
      "enterDetails": "അസാധുവായ ഐഡി അല്ലെങ്കിൽ പാസ്‌വേഡ്. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
      "password": "പാസ്വേഡ്",
      "enterDoctorId": "ഡോക്ടർ ഐഡി നൽകുക",
      "login": "ലോഗിൻ ചെയ്യുക",
      "patientDashboard": "രോഗിയുടെ ഡാഷ്‌ബോർഡ്",
      "myMedicalRecords": "എൻ്റെ മെഡിക്കൽ റെക്കോർഡുകൾ",
      "noRecordsFound": "മെഡിക്കൽ റെക്കോർഡുകളൊന്നും കണ്ടെത്തിയില്ല.",
      "homeScreenTitle": "ഡിജിറ്റൽ ഹെൽത്ത് റെക്കോർഡ്സ്",
      "Enter AshaId": "ആശ ഐഡി നൽകുക", // New
      "migrantSignup": "കുടിയേറ്റക്കാരൻ്റെ രജിസ്ട്രേഷൻ", // New
      "fullName": "പൂർണ്ണമായ പേര്", // New
      "phoneNumber": "ഫോൺ നമ്പർ", // New
      "state": "സംസ്ഥാനം", // New
      "district": "ജില്ല", // New
      "village": "ഗ്രാമം/പട്ടണം", // New
      "signup": "രജിസ്റ്റർ ചെയ്യുക", // New
      "fillAllDetails": "എല്ലാ വിവരങ്ങളും പൂരിപ്പിക്കുക.", // New
      "signupSuccess": "രജിസ്ട്രേഷൻ വിജയിച്ചു", // New
      "patientAccountCreated": "ഒരു പുതിയ രോഗി അക്കൗണ്ട് സൃഷ്ടിച്ചു." // New
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;