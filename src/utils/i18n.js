// Centralized Multilingual Internationalization (i18n) Dictionary for Skillora

export const SUPPORTED_LANGUAGES = [
  { code: 'English', nativeName: 'English', rtl: false },
  { code: 'Hindi', nativeName: 'हिन्दी (Hindi)', rtl: false },
  { code: 'Marathi', nativeName: 'मराठी (Marathi)', rtl: false },
  { code: 'Gujarati', nativeName: 'ગુજરાતી (Gujarati)', rtl: false },
  { code: 'Bengali', nativeName: 'বাংলা (Bengali)', rtl: false },
  { code: 'Tamil', nativeName: 'தமிழ் (Tamil)', rtl: false },
  { code: 'Telugu', nativeName: 'తెలుగు (Telugu)', rtl: false },
  { code: 'Kannada', nativeName: 'ಕನ್ನಡ (Kannada)', rtl: false },
  { code: 'Malayalam', nativeName: 'മലയാളം (Malayalam)', rtl: false },
  { code: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ (Punjabi)', rtl: false },
  { code: 'Urdu', nativeName: 'اردو (Urdu)', rtl: true },
  { code: 'French', nativeName: 'Français (French)', rtl: false },
  { code: 'German', nativeName: 'Deutsch (German)', rtl: false },
  { code: 'Spanish', nativeName: 'Español (Spanish)', rtl: false }
];

export const I18N_DICTIONARY = {
  English: {
    // Nav & Common
    home: 'Home',
    about_us: 'About Us',
    why_us: 'Why Us',
    contact: 'Contact',
    search_placeholder: 'Search jobs, skills, roles, courses...',
    login_register: 'Login / Register',
    welcome_back: 'Welcome back',
    start_journey: 'Start My Journey',
    view_all_results: 'View All Results',
    recent_searches: 'Recent Searches',

    // Sidebar Category Headers
    career_guidance_header: 'CAREER & ACADEMIC GUIDANCE',
    employability_header: 'EMPLOYABILITY & SKILLS',
    opportunities_header: 'INTERNSHIPS & OPPORTUNITIES',
    tools_header: 'PREPARATION & TOOLS',

    // Sidebar Subfeature Labels
    'students-profile-analysis': 'Students Profile Analysis',
    'profile-analysis': 'Students Profile Analysis',
    'connected-jobs-network': 'Connected Jobs Network',
    'academic-guidance': 'Career Guidance & Career Roadmap',
    'skill-gap': 'Skill Gap Analysis',
    'employability-score': 'Employability Score',
    'resume-assist': 'Resume Assist',
    'project-ideas': 'Project Lab',
    'communication-skills': '30-Sec Elevator Pitch',
    'mock-interviews': 'AI Mock Interview',
    'jobs-opportunities': 'Internship & Job Opportunities',
    'govt-opportunities-schemes': 'Government Opportunities & Schemes',
    'job-alerts': 'Job & Internship Alerts',
    'growth-map': 'Growth Map & Weekly Report',
    'peer-benchmarking': 'Peer Benchmarking',
    'skill-demand': 'Skill Demand Radar',
    'red-flag-detector': 'AI Red Flag Scam Detector',
    'mentor-guidance': 'Mentor Guidance & AI Coach',
    'tpo': 'College / TPO Dashboard',
    'language-translation': 'AI Language Translator',

    // Dashboard & Profile Labels
    my_profile: 'My Profile',
    target_role: 'Target Job Role',
    cgpa: 'Current CGPA',
    skills: 'Technical Skills',
    save_changes: 'Save Changes',
    cancel: 'Cancel',
    loading: 'Loading content...',

    // Profile Enhancement Labels
    student_profile: 'Student Profile',
    edit_student_profile: 'Edit Student Profile',
    edit_profile_details: 'Edit Student Details & Contact Info',
    profile_photo: 'Profile Photo',
    upload_new_photo: 'Upload New Photo',
    remove_photo: 'Remove Photo',
    photo_preview_loaded: '✓ Photo preview loaded',
    full_name: 'Full Name',
    email_address: 'Email Address',
    phone_number: 'Phone Number',
    degree_branch: 'Degree & Branch',
    verify_and_save: 'Verify & Save Changes',
    verification_code_required: 'Contact Change Verification Required',
    enter_verification_code_msg: 'Enter the 6-digit verification code sent to your updated contact number/email to authorize changes.',
    enter_code_placeholder: 'Enter 6-digit code (e.g. 582910)',
    invalid_email_format: 'Please enter a valid email address format (e.g. student@college.edu.in).',
    invalid_phone_format: 'Please enter a valid phone number with at least 10 digits.',
    invalid_verification_code: 'Invalid verification code. Please enter the 6-digit code provided.',
    profile_updated_success: 'Profile updated successfully!',
    authorized_owner: '✓ Authorized Profile Owner',
    verified_student: '✓ Verified Student',
    target_label: 'Target',
    change_photo: 'Change Photo',
    code_sent_notice: 'A 6-digit verification code has been dispatched to your updated contact info.',
    only_own_profile: 'You can only edit your own profile.'
  },

  Hindi: {
    // Nav & Common
    home: 'मुख्य पृष्ठ (Home)',
    about_us: 'हमारे बारे में (About Us)',
    why_us: 'स्किलोरा क्यों (Why Us)',
    contact: 'संपर्क करें (Contact)',
    search_placeholder: 'नौकरियां, कौशल, रोल या कोर्स खोजें...',
    login_register: 'लॉगिन / पंजीकरण',
    welcome_back: 'पुनः स्वागत है',
    start_journey: 'अपनी यात्रा शुरू करें',
    view_all_results: 'सभी परिणाम देखें',
    recent_searches: 'हाल की खोजें',

    // Sidebar Category Headers
    career_guidance_header: 'करियर एवं अकादमिक मार्गदर्शन',
    employability_header: 'रोजगार क्षमता एवं कौशल',
    opportunities_header: 'इंटर्नशिप और अवसर',
    tools_header: 'तैयारी एवं उपकरण',

    // Sidebar Subfeature Labels
    'academic-guidance': 'करियर मार्गदर्शन एवं रोडमैप',
    'skill-gap': 'कौशल अंतराल विश्लेषण (Skill Gap)',
    'employability-score': 'रोजगार क्षमता स्कोर',
    'resume-assist': 'रिज्यूमे असिस्ट (Resume Assist)',
    'project-ideas': 'प्रोजेक्ट लैब (Project Lab)',
    'communication-skills': '30-सेकंड एलिवेटर पिच',
    'mock-interviews': 'एआई मॉक इंटरव्यू',
    'jobs-opportunities': 'इंटर्नशिप एवं जॉब अवसर',
    'govt-opportunities-schemes': 'सरकारी अवसर एवं योजनाएं',
    'job-alerts': 'जॉब अलर्ट और सूचनाएं',
    'growth-map': 'ग्रोथ मैप एवं रिपोर्ट',
    'peer-benchmarking': 'सहकर्मी बेंचमार्किंग',
    'skill-demand': 'कौशल मांग रडार',
    'red-flag-detector': 'स्कैम रेड फ्लैग डिटेक्टर',
    'mentor-guidance': 'मेंटर गाइडेंस एवं एआई कोच',
    'tpo': 'कॉलेज / TPO डैशबोर्ड',
    'language-translation': 'एआई भाषा अनुवादक',

    // Dashboard & Profile Labels
    my_profile: 'मेरा प्रोफाइल',
    target_role: 'लक्ष्य करियर रोल',
    cgpa: 'वर्तमान CGPA',
    skills: 'तकनीकी कौशल',
    save_changes: 'बदलाव सहेजें',
    cancel: 'रद्द करें',
    loading: 'सामग्री लोड हो रही है...',

    // Profile Enhancement Labels
    student_profile: 'छात्र प्रोफाइल',
    edit_student_profile: 'प्रोफाइल संपादित करें',
    edit_profile_details: 'छात्र विवरण और संपर्क जानकारी संपादित करें',
    profile_photo: 'प्रोफाइल फोटो',
    upload_new_photo: 'नई फोटो अपलोड करें',
    remove_photo: 'फोटो हटाएं',
    photo_preview_loaded: '✓ फोटो पूर्वावलोकन लोड हो गया',
    full_name: 'पूरा नाम',
    email_address: 'ईमेल पता',
    phone_number: 'फोन नंबर',
    degree_branch: 'डिग्री और शाखा',
    verify_and_save: 'सत्यापित करें और सहेजें',
    verification_code_required: 'संपर्क परिवर्तन सत्यापन आवश्यक',
    enter_verification_code_msg: 'परिवर्तन अधिकृत करने के लिए अपने अद्यतन संपर्क पर भेजा गया 6-अंकीय सत्यापन कोड दर्ज करें।',
    enter_code_placeholder: '6-अंकीय कोड दर्ज करें (जैसे 582910)',
    invalid_email_format: 'कृपया एक वैध ईमेल पता दर्ज करें (उदा. student@college.edu.in)।',
    invalid_phone_format: 'कृपया कम से कम 10 अंकों का वैध फोन नंबर दर्ज करें।',
    invalid_verification_code: 'अमान्य सत्यापन कोड। कृपया प्रदान किया गया 6-अंकीय कोड दर्ज करें।',
    profile_updated_success: 'प्रोफाइल सफलतापूर्वक अपडेट की गई!',
    authorized_owner: '✓ अधिकृत प्रोफाइल स्वामी',
    verified_student: '✓ सत्यापित छात्र',
    target_label: 'लक्ष्य',
    change_photo: 'फोटो बदलें',
    code_sent_notice: 'आपकी अद्यतन संपर्क जानकारी पर 6-अंकीय सत्यापन कोड भेजा गया है।',
    only_own_profile: 'आप केवल अपना ही प्रोफाइल संपादित कर सकते हैं।'
  },

  Marathi: {
    // Nav & Common
    home: 'मुख्यपृष्ठ (Home)',
    about_us: 'आमच्याबद्दल (About Us)',
    why_us: 'स्किलोरा का (Why Us)',
    contact: 'संपर्क करा (Contact)',
    search_placeholder: 'नोकऱ्या, कौशल्ये किंवा कोर्स शोधा...',
    login_register: 'लॉगिन / नोंदणी',
    welcome_back: 'पुन्हा स्वागत आहे',
    start_journey: 'माझा प्रवास सुरू करा',
    view_all_results: 'सर्व निकाल पहा',
    recent_searches: 'अलीकडील शोध',

    // Sidebar Category Headers
    career_guidance_header: 'करिअर आणि शैक्षणिक मार्गदर्शन',
    employability_header: 'रोजगार क्षमता आणि कौशल्ये',
    opportunities_header: 'इंटरनशिप आणि संधी',
    tools_header: 'तपशील आणि साधने',

    // Sidebar Subfeature Labels
    'academic-guidance': 'करिअर मार्गदर्शन आणि रोडमॅप',
    'skill-gap': 'कौशल्य अंतर विश्लेषण (Skill Gap)',
    'employability-score': 'रोजगार क्षमता स्कोर',
    'resume-assist': 'रेझ्युमे असिस्ट (Resume Assist)',
    'project-ideas': 'प्रकल्प प्रयोगशाळा (Project Lab)',
    'communication-skills': '३०-सेकंद एलिव्हेटर पिच',
    'mock-interviews': 'एआय मॉक मुलाखत',
    'jobs-opportunities': 'इंटरनशिप आणि नोकरीच्या संधी',
    'govt-opportunities-schemes': 'सरकारी संधी आणि योजना',
    'job-alerts': 'नोकरी अलर्ट आणि सूचना',
    'growth-map': 'ग्रोथ मॅप आणि रिपोर्ट',
    'peer-benchmarking': 'समकक्ष तुलना (Benchmarking)',
    'skill-demand': 'कौशल्य मागणी रडार',
    'red-flag-detector': 'स्कॅम रेड फ्लॅग डिटेक्टर',
    'mentor-guidance': 'मार्गदर्शक आणि एआय कोच',
    'tpo': 'कॉलेज / TPO डैशबोर्ड',
    'language-translation': 'एआय भाषा अनुवादक',

    // Dashboard & Profile Labels
    my_profile: 'माझे प्रोफाइल',
    target_role: 'लक्ष्य करिअर भूमिका',
    cgpa: 'सध्याचा CGPA',
    skills: 'तांत्रिक कौशल्ये',
    save_changes: 'बदल जतन करा',
    cancel: 'रद्द करा',
    loading: 'सामग्री लोड होत आहे...',

    // Profile Enhancement Labels
    student_profile: 'विद्यार्थी प्रोफाइल',
    edit_student_profile: 'प्रोफाइल संपादित करा',
    edit_profile_details: 'विद्यार्थी तपशील आणि संपर्क माहिती संपादित करा',
    profile_photo: 'प्रोफाइल फोटो',
    upload_new_photo: 'नवीन फोटो अपलोड करा',
    remove_photo: 'फोटो काढा',
    photo_preview_loaded: '✓ फोटो पूर्वावलोकन लोड झाले',
    full_name: 'पूर्ण नाव',
    email_address: 'ईमेल पत्ता',
    phone_number: 'फोन नंबर',
    degree_branch: 'पदवी आणि शाखा',
    verify_and_save: 'सत्यापित करा आणि जतन करा',
    verification_code_required: 'संपर्क बदल सत्यापन आवश्यक',
    enter_verification_code_msg: 'बदल अधिकृत करण्यासाठी तुमच्या अद्यतनित संपर्कावर पाठवलेला ६-अंकी सत्यापन कोड प्रविष्ट करा.',
    enter_code_placeholder: '६-अंकी कोड प्रविष्ट करा (उदा. 582910)',
    invalid_email_format: 'कृपया वैध ईमेल पत्ता प्रविष्ट करा (उदा. student@college.edu.in).',
    invalid_phone_format: 'कृपया किमान १० अंकांचा वैध फोन नंबर प्रविष्ट करा.',
    invalid_verification_code: 'अवैध सत्यापन कोड. कृपया दिलेला ६-अंकी कोड प्रविष्ट करा.',
    profile_updated_success: 'प्रोफाइल यशस्वीरित्या अपडेट केली!',
    authorized_owner: '✓ अधिकृत प्रोफाइल मालक',
    verified_student: '✓ सत्यापित विद्यार्थी',
    target_label: 'लक्ष्य',
    change_photo: 'फोटो बदला',
    code_sent_notice: 'तुमच्या अद्यतनित संपर्क माहितीवर ६-अंकी सत्यापन कोड पाठवला गेला आहे.',
    only_own_profile: 'तुम्ही फक्त स्वतःचे प्रोफाइल संपादित करू शकता.'
  },

  Gujarati: {
    home: 'મુખ્ય પૃષ્ઠ',
    about_us: 'અમારા વિશે',
    why_us: 'શા માટે સ્કીલોરા',
    contact: 'સંપર્ક કરો',
    search_placeholder: 'નોકરીઓ, કૌશલ્યો, રોલ શોધો...',
    login_register: 'લોગિન / નોંધણી',
    'academic-guidance': 'કારકિર્દી માર્ગદર્શન અને રોડમેપ',
    'skill-gap': 'કૌશલ્ય તફાવત વિશ્લેષણ',
    'employability-score': 'રોજગાર ક્ષમતા સ્કોર',
    'resume-assist': 'રેઝ્યુમે આસિસ્ટ',
    'project-ideas': 'પ્રોજેક્ટ લેબ',
    'communication-skills': '30-સેકન્ડ એલિવેટર પિચ',
    'mock-interviews': 'AI મોક ઈન્ટરવ્યુ',
    'jobs-opportunities': 'ઇન્ટર્નશીપ અને નોકરીની તકો',
    'govt-opportunities-schemes': 'સરકારી તકો અને યોજનાઓ'
  },

  Bengali: {
    home: 'হোম পেজ',
    about_us: 'আমাদের সম্পর্কে',
    why_us: 'কেন স্কিল ওরা',
    contact: 'যোগাযোগ',
    search_placeholder: 'চাকরি, দক্ষতা বা কোর্স খুঁজুন...',
    login_register: 'লগইন / নিবন্ধন',
    'academic-guidance': 'ক্যারিয়ার নির্দেশিকা ও রোডম্যাপ',
    'skill-gap': 'দক্ষতার ঘাটতি বিশ্লেষণ',
    'employability-score': 'কর্মসংস্থান যোগ্যতা স্কোর',
    'resume-assist': 'জীবনবৃত্তান্ত সহকারী',
    'project-ideas': 'প্রজেক্ট ল্যাব',
    'mock-interviews': 'এআই মক ইন্টারভিউ',
    'jobs-opportunities': 'ইন্টার্নশিপ এবং চাকরির সুযোগ'
  },

  Tamil: {
    home: 'முகப்பு',
    about_us: 'எங்களைப் பற்றி',
    why_us: 'ஏன் ஸ்கில்லோரா',
    contact: 'தொடர்பு கொள்ள',
    search_placeholder: 'வேலைகள், திறன்களைத் தேடுங்கள்...',
    login_register: 'உள்நுழைவு / பதிவு',
    'academic-guidance': 'தொழில் வழிகாட்டுதல் & வரைபடம்',
    'skill-gap': 'திறன் இடைவெளி பகுப்பாய்வு',
    'employability-score': 'வேலைவாய்ப்புத் திறன் மதிப்பெண்',
    'mock-interviews': 'AI மாதிரி நேர்காணல்',
    'jobs-opportunities': 'வேலை வாய்ப்புகள்'
  },

  Telugu: {
    home: 'హోమ్‌పేజీ',
    about_us: 'మా గురించి',
    why_us: 'ఎందుకు స్కిల్లోరా',
    contact: 'సంప్రదించండి',
    search_placeholder: 'ఉద్యోగాలు, నైపుణ్యాలను శోధించండి...',
    login_register: 'లాగిన్ / నమోదు',
    'academic-guidance': 'కెరీర్ మార్గదర్శకత్వం & రోడ్‌మ్యాప్',
    'skill-gap': 'నైపుణ్య లోపాల విశ్లేషణ',
    'mock-interviews': 'AI మాక్ ఇంటర్వ్యూ',
    'jobs-opportunities': 'ఉద్యోగ అవకాశాలు'
  },

  Urdu: {
    home: 'ہوم پیج',
    about_us: 'ہمارے بارے میں',
    why_us: 'سکل اورا کیوں',
    contact: 'رابطہ کریں',
    search_placeholder: 'ملازمتیں، مہارتیں تلاش کریں...',
    login_register: 'لاگ ان / رجسٹریشن',
    'academic-guidance': 'کیریئر رہنمائی اور روڈ میپ',
    'skill-gap': 'مہارت کا تجزیہ',
    'mock-interviews': 'مصنوعی ذہانت کے انٹرویو',
    'jobs-opportunities': 'انٹرنشپ اور نوکری کے مواقع'
  }
};

export function t(key, language = 'English') {
  if (I18N_DICTIONARY[language] && I18N_DICTIONARY[language][key]) {
    return I18N_DICTIONARY[language][key];
  }
  if (I18N_DICTIONARY['English'] && I18N_DICTIONARY['English'][key]) {
    return I18N_DICTIONARY['English'][key];
  }
  return key;
}

export function isRTL(language = 'English') {
  const langObj = SUPPORTED_LANGUAGES.find(l => l.code === language);
  return langObj ? langObj.rtl : false;
}
