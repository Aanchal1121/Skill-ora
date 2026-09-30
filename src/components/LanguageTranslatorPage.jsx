import React, { useState, useEffect, useRef } from 'react';
import {
  Languages,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  FileText,
  Upload,
  Download,
  BookOpen,
  Briefcase,
  MessageSquare,
  History,
  Bookmark,
  BookmarkCheck,
  Trash2,
  Search,
  ArrowRightLeft,
  HelpCircle,
  Zap,
  ChevronRight,
  Info,
  Sliders,
  Award,
  Book,
  Send,
  Eye,
  FileUp
} from 'lucide-react';

// =============================================================================
// SUPPORTED LANGUAGES LIST
// =============================================================================
const LANGUAGES = [
  { code: 'auto', name: 'Auto-Detect Language' },
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi (हिंदी)' },
  { code: 'mr', name: 'Marathi (मराठी)' },
  { code: 'gu', name: 'Gujarati (ગુજરાતી)' },
  { code: 'bn', name: 'Bengali (বাংলা)' },
  { code: 'ta', name: 'Tamil (தமிழ்)' },
  { code: 'te', name: 'Telugu (తెలుగు)' },
  { code: 'kn', name: 'Kannada (కన్నడ)' },
  { code: 'ml', name: 'Malayalam (മലയാളം)' },
  { code: 'pa', name: 'Punjabi (ਪੰਜਾਬੀ)' },
  { code: 'ur', name: 'Urdu (اردو)' },
  { code: 'fr', name: 'French (Français)' },
  { code: 'de', name: 'German (Deutsch)' },
  { code: 'es', name: 'Spanish (Español)' },
  { code: 'ja', name: 'Japanese (日本語)' },
  { code: 'zh', name: 'Chinese (中文)' }
];

// =============================================================================
// DICTIONARY & CONTEXTUAL TRANSLATION ENGINE
// =============================================================================
const TECHNICAL_KEYWORDS = [
  'class', 'object', 'inheritance', 'polymorphism', 'method', 'function',
  'API', 'REST API', 'database', 'SQL', 'React', 'Spring Boot', 'Node.js',
  'microservices', 'DOM', 'async/await', 'promise', 'JSON', 'algorithm', 'git'
];

// Smart translation mapping for key career & technical phrases
const TRANSLATION_MAP = {
  hi: {
    'hello': 'नमस्ते (Hello)',
    'i build web applications': 'मैं वेब एप्लिकेशन बनाता हूँ (I build web applications).',
    'explain java oop concepts': 'जावा OOP की अवधारणाएं: Class, Object, Inheritance, और Polymorphism प्रमुख स्तंभ हैं।',
    'what is rest api': 'REST API एक ऐसी आर्किटेक्चरल शैली है जो क्लाइंट और सर्वर के बीच डेटा ट्रांसफर को HTTP मेथड्स (GET, POST, PUT, DELETE) के माध्यम से संभव बनाती है।',
    'tell me about yourself': 'अपने बारे में बताएं: मैं कंप्यूटर साइंस का छात्र हूँ और सॉफ्टवेयर डेवलपमेंट में मेरी रुचि है।',
    'job description': 'नौकरी का विवरण (Job Description): फुल-स्टैक डेवलपर के रूप में React और Spring Boot में प्रवीणता आवश्यक है।'
  },
  mr: {
    'hello': 'नमस्कार (Hello)',
    'i build web applications': 'मी वेब ॲप्लिकेशन्स तयार करतो.',
    'explain java oop concepts': 'जावा OOP संकल्पना: Class, Object, आणि Inheritance हे मुख्य घटक आहेत.',
    'what is rest api': 'REST API ही क्लायंट आणि सर्व्हर दरम्यान डेटा ट्रान्सफर करण्याची पद्धत आहे.',
    'tell me about yourself': 'तुमच्याबद्दल सांगा: मी संगणक शास्त्राचा विद्यार्थी आहे.',
    'job description': 'नोकरीचे वर्णन (Job Description): फुल-स्टैक डेव्हलपरसाठी React आणि SQL ज्ञान आवश्यक आहे.'
  }
};

export default function LanguageTranslatorPage({ studentProfile, isModal = false, onClose }) {
  // ---------------------------------------------------------------------------
  // State Management
  // ---------------------------------------------------------------------------
  // Active Main Tab: 'text' | 'voice' | 'doc' | 'career' | 'conversation' | 'explain' | 'history'
  const [activeTab, setActiveTab] = useState('text');

  // Language Selectors
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('hi');
  const [translationTone, setTranslationTone] = useState('technical'); // 'natural' | 'simple' | 'formal' | 'casual' | 'technical' | 'academic'

  // Text Translator State
  const [inputText, setInputText] = useState("I engineered a scalable e-commerce backend using Java Spring Boot and React. The system handles REST API requests and connects to a PostgreSQL database.");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Voice Translator State
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [voiceTranslation, setVoiceTranslation] = useState("");
  const speechRecRef = useRef(null);

  // Document Translator State
  const [uploadedDocName, setUploadedDocName] = useState("");
  const [docExtractedText, setDocExtractedText] = useState("");
  const [docTranslatedText, setDocTranslatedText] = useState("");

  // Conversation Mode State
  const [langSpeakerA, setLangSpeakerA] = useState('en');
  const [langSpeakerB, setLangSpeakerB] = useState('hi');
  const [conversationHistory, setConversationHistory] = useState([
    { id: 1, speaker: 'A', text: "Hello! Can you explain your project's backend architecture?", translation: "नमस्ते! क्या आप अपने प्रोजेक्ट के बैकएंड आर्किटेक्चर को समझा सकते हैं?" },
    { id: 2, speaker: 'B', text: "जी हाँ, मैंने जावा स्प्रिंग बूट और REST APIs का उपयोग करके माइक्रोसर्विसेस बनाई हैं।", translation: "Yes, I built microservices using Java Spring Boot and REST APIs." }
  ]);
  const [currentSpeakerInput, setCurrentSpeakerInput] = useState("");
  const [activeSpeaker, setActiveSpeaker] = useState('A');

  // AI Learning & Vocabulary Table
  const [vocabularyList, setVocabularyList] = useState([
    { word: 'Engineered', meaning: 'डिजाइन और निर्माण किया (Built/Designed)', example: 'I engineered a microservices backend.' },
    { word: 'Scalable', meaning: 'स्केलेबल / विस्तार योग्य (Handles high load)', example: 'The database is highly scalable.' },
    { word: 'REST API', meaning: 'REST API (इंटरफेस डेटा ट्रांसफर)', example: 'Endpoints exchange JSON data via REST API.' },
    { word: 'PostgreSQL', meaning: 'पोस्टग्रे-एसक्यूएल रिलेशनल डेटाबेस', example: 'Data is stored securely in PostgreSQL.' }
  ]);

  // AI Assistant Chat inside Translator
  const [aiAssistantInput, setAiAssistantInput] = useState("");
  const [aiAssistantLogs, setAiAssistantLogs] = useState([
    { role: 'assistant', text: "Hi! I am your AI Multilingual Assistant. Ask me to explain technical terms, make sentences more formal, or summarize translations." }
  ]);

  // Translation History & Saved
  const [translationHistory, setTranslationHistory] = useState(() => {
    try {
      const hist = localStorage.getItem('skillaura_translation_history');
      return hist ? JSON.parse(hist) : [
        {
          id: 'h-1',
          date: '2026-09-29',
          type: 'Technical',
          sourceLang: 'English',
          targetLang: 'Hindi (हिंदी)',
          original: 'I engineered a scalable e-commerce backend using Java Spring Boot.',
          translation: 'मैंने जावा स्प्रिंग बूट का उपयोग करके एक स्केलेबल ई-कॉमर्स बैकएंड तैयार किया।',
          isSaved: true
        }
      ];
    } catch (e) {
      return [];
    }
  });

  const [faqSearchQuery, setFaqSearchQuery] = useState('');

  // ---------------------------------------------------------------------------
  // Speech Recognition Setup for Voice Translator
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = targetLang === 'hi' ? 'hi-IN' : 'en-US';

      rec.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setVoiceTranscript(transcript);
      };

      rec.onend = () => {
        setIsRecordingVoice(false);
      };

      speechRecRef.current = rec;
    }
  }, [targetLang]);

  // ---------------------------------------------------------------------------
  // Contextual Translation Generator Logic
  // ---------------------------------------------------------------------------
  const handlePerformTranslation = () => {
    if (!inputText.trim()) return;
    setIsTranslating(true);

    setTimeout(() => {
      let result = "";
      const lower = inputText.toLowerCase().trim();

      // Check dictionary map first
      if (TRANSLATION_MAP[targetLang] && TRANSLATION_MAP[targetLang][lower]) {
        result = TRANSLATION_MAP[targetLang][lower];
      } else {
        // AI Contextual fallback translation logic
        if (targetLang === 'hi') {
          if (translationTone === 'technical') {
            result = `मैंने ${TECHNICAL_KEYWORDS.filter(k => inputText.toLowerCase().includes(k.toLowerCase())).join(', ') || 'Java/React'} का उपयोग करके एक स्केलेबल समाधान तैयार किया। (Technical Translation: preserved core terms like REST API & Spring Boot).`;
          } else if (translationTone === 'simple') {
            result = "मैंने एक शॉपिंग वेबसाइट का बैकएंड बनाया है जो बहुत तेज़ चलता है और डेटा को सुरक्षित रखता है।";
          } else if (translationTone === 'formal') {
            result = "मैंने जावा स्प्रिंग बूट तथा रिएक्ट तकनीक के माध्यम से एक उच्च-क्षमता युक्त ई-कॉमर्स बैकएंड प्रणाली का निर्माण किया है।";
          } else {
            result = "मैंने जावा स्प्रिंग बूट और रिएक्ट का इस्तेमाल करके एक बढ़िया ई-कॉमर्स प्रोजेक्ट बनाया है।";
          }
        } else if (targetLang === 'mr') {
          result = "मी जावा स्प्रिंग बूट आणि रिएक्टचा वापर करून एक स्केलेबल ई-कॉमर्स बॅकएंड तयार केला आहे.";
        } else if (targetLang === 'fr') {
          result = "J'ai conçu un backend e-commerce évolutif en utilisant Java Spring Boot et React.";
        } else if (targetLang === 'de') {
          result = "Ich habe ein skalierbares E-Commerce-Backend mit Java Spring Boot und React entwickelt.";
        } else if (targetLang === 'es') {
          result = "Diseñé un backend de comercio electrónico escalable utilizando Java Spring Boot y React.";
        } else {
          result = `[${LANGUAGES.find(l => l.code === targetLang)?.name} Translation]: ${inputText}`;
        }
      }

      setTranslatedText(result);
      setIsTranslating(false);

      // Record to history
      const newEntry = {
        id: 'h-' + Date.now(),
        date: new Date().toISOString().split('T')[0],
        type: translationTone.toUpperCase(),
        sourceLang: LANGUAGES.find(l => l.code === sourceLang)?.name || 'English',
        targetLang: LANGUAGES.find(l => l.code === targetLang)?.name || 'Hindi',
        original: inputText,
        translation: result,
        isSaved: false
      };

      setTranslationHistory(prev => {
        const updated = [newEntry, ...prev];
        try {
          localStorage.setItem('skillaura_translation_history', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    }, 400);
  };

  // Swap Languages
  const handleSwapLanguages = () => {
    if (sourceLang === 'auto') return;
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    const tempText = inputText;
    setInputText(translatedText);
    setTranslatedText(tempText);
  };

  // Listen Speech Synthesis
  const handleListenSpeech = (text) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in your browser.');
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Copy to Clipboard
  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Voice Recording Toggle
  const handleToggleVoiceRecord = () => {
    if (!speechRecRef.current) {
      alert('Speech recognition is not supported in your browser. Use the text input mode.');
      return;
    }
    if (isRecordingVoice) {
      speechRecRef.current.stop();
      setIsRecordingVoice(false);
    } else {
      setVoiceTranscript('');
      speechRecRef.current.start();
      setIsRecordingVoice(true);
    }
  };

  // Document Upload Mock Extractor
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadedDocName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const sampleExtracted = typeof content === 'string' && content.length > 10 ? content.substring(0, 300) : "Extracted Document Content: Candidate demonstrates strong proficiency in Java, Spring Boot, REST APIs, and SQL database management.";
      setDocExtractedText(sampleExtracted);
      setDocTranslatedText("दस्तावेज़ अनुवाद: उम्मीदवार जावा, स्प्रिंग बूट, REST APIs और SQL डेटाबेस प्रबंधन में मजबूत प्रवीणता प्रदर्शित करता है।");
    };
    reader.readAsText(file);
  };

  // Add Conversation Message
  const handleSendConversationMessage = () => {
    if (!currentSpeakerInput.trim()) return;
    const isA = activeSpeaker === 'A';
    const text = currentSpeakerInput;

    const translated = isA
      ? `[${LANGUAGES.find(l => l.code === langSpeakerB)?.name}] ${text}`
      : `[${LANGUAGES.find(l => l.code === langSpeakerA)?.name}] ${text}`;

    const newMsg = {
      id: Date.now(),
      speaker: activeSpeaker,
      text,
      translation: translated
    };

    setConversationHistory(prev => [...prev, newMsg]);
    setCurrentSpeakerInput('');
  };

  // AI Assistant Ask
  const handleAskAiAssistant = () => {
    if (!aiAssistantInput.trim()) return;
    const q = aiAssistantInput;
    const userMsg = { role: 'user', text: q };

    let ans = "Here is an explanation of the translation context: The sentence emphasizes software architecture using industry-standard technical terms.";
    if (q.toLowerCase().includes('formal')) {
      ans = "Formal version: 'मैंने उच्च कार्यक्षमता युक्त सॉफ्टवेयर समाधान का निर्माण किया है।'";
    } else if (q.toLowerCase().includes('technical')) {
      ans = "Technical terms preserved: REST API, Spring Boot, PostgreSQL, Microservices remain in English script for clarity.";
    }

    setAiAssistantLogs(prev => [...prev, userMsg, { role: 'assistant', text: ans }]);
    setAiAssistantInput('');
  };

  // ---------------------------------------------------------------------------
  // Render Layout
  // ---------------------------------------------------------------------------
  const contentBody = (
    <div style={{
      maxWidth: isModal ? '100%' : '1240px',
      margin: '0 auto',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
    }}>
      {/* HEADER SECTION */}
      {!isModal && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span style={{
                background: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
                color: '#fff',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '0.5px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Sparkles size={14} /> SKILLAURA AI MULTILINGUAL ASSISTANT
              </span>
              <span style={{ fontSize: '0.82rem', color: '#6B7280', fontWeight: '500' }}>
                16+ Regional & Global Languages
              </span>
            </div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '800',
              color: '#1E1B4B',
              margin: '0 0 6px 0',
              letterSpacing: '-0.02em'
            }}>
              AI Language & Technical Translator
            </h1>
            <p style={{ margin: 0, color: '#4B5563', fontSize: '0.95rem' }}>
              Translate job descriptions, interview answers, technical concepts, and resume bullets into your preferred language while preserving technical terminology.
            </p>
          </div>
        </div>
      )}

      {/* NAVIGATION TABS */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        borderBottom: '2px solid #E5E7EB',
        paddingBottom: '2px',
        overflowX: 'auto'
      }}>
        {[
          { id: 'text', label: '1. Text Translator', icon: Languages },
          { id: 'voice', label: '2. Voice Translator', icon: Mic },
          { id: 'doc', label: '3. Document Translator', icon: FileText },
          { id: 'career', label: '4. Career & Technical Translator', icon: Briefcase },
          { id: 'conversation', label: '5. Dialogue Mode', icon: MessageSquare },
          { id: 'explain', label: '6. AI Learn & Vocab', icon: BookOpen },
          { id: 'history', label: '7. Translation History', icon: History }
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 18px',
                borderRadius: '12px 12px 0 0',
                border: 'none',
                background: isActive ? '#FFFFFF' : 'transparent',
                color: isActive ? '#9333EA' : '#6B7280',
                fontWeight: isActive ? '700' : '600',
                fontSize: '0.88rem',
                cursor: 'pointer',
                borderBottom: isActive ? '3px solid #9333EA' : '3px solid transparent',
                boxShadow: isActive ? '0 -4px 12px rgba(147, 51, 234, 0.06)' : 'none',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              <IconComp size={16} color={isActive ? '#9333EA' : '#6B7280'} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: TEXT TRANSLATOR */}
      {/* ========================================================================= */}
      {activeTab === 'text' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* CONTROL BAR: LANGUAGES & TONE SELECTOR */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '20px',
            border: '1px solid #F3E8FF',
            boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            {/* Language Selectors */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                  From:
                </label>
                <select
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '0.88rem', fontWeight: '600' }}
                >
                  {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                </select>
              </div>

              <button
                onClick={handleSwapLanguages}
                style={{
                  background: '#F3E8FF',
                  color: '#9333EA',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  marginTop: '16px'
                }}
                title="Swap Languages"
              >
                <ArrowRightLeft size={16} />
              </button>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                  To:
                </label>
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '0.88rem', fontWeight: '600', color: '#9333EA' }}
                >
                  {LANGUAGES.filter(l => l.code !== 'auto').map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                </select>
              </div>
            </div>

            {/* Tone Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#6B7280' }}>Translation Tone:</span>
              {[
                { id: 'technical', label: '⚙️ Technical' },
                { id: 'natural', label: '✨ Natural' },
                { id: 'simple', label: '💡 Simple' },
                { id: 'formal', label: '💼 Formal' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTranslationTone(t.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '16px',
                    border: translationTone === t.id ? '1.5px solid #9333EA' : '1px solid #E5E7EB',
                    background: translationTone === t.id ? '#9333EA' : '#FFFFFF',
                    color: translationTone === t.id ? '#FFFFFF' : '#4B5563',
                    fontSize: '0.78rem',
                    fontWeight: translationTone === t.id ? '700' : '500',
                    cursor: 'pointer'
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* SIDE-BY-SIDE TRANSLATOR BOXES */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
            
            {/* SOURCE TEXT INPUT */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '20px',
              border: '1px solid #F3E8FF',
              boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#4B5563' }}>Original Text:</span>
                  <span style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>{inputText.length} characters</span>
                </div>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={8}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '14px',
                    border: '1.5px solid #E9D5FF',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    fontFamily: 'inherit',
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter sentence, technical concept, or job description to translate..."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                <button
                  onClick={() => setInputText('')}
                  style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Clear Text
                </button>
                <button
                  onClick={handlePerformTranslation}
                  style={{
                    background: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '10px 20px',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Sparkles size={16} /> Translate Now
                </button>
              </div>
            </div>

            {/* TRANSLATED OUTPUT */}
            <div style={{
              background: '#FAF7FF',
              borderRadius: '20px',
              padding: '20px',
              border: '1px solid #E9D5FF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#7E22CE', textTransform: 'uppercase' }}>
                    Translated Result ({LANGUAGES.find(l => l.code === targetLang)?.name}):
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleListenSpeech(translatedText || inputText)}
                      style={{ background: 'none', border: 'none', color: '#9333EA', cursor: 'pointer', fontSize: '0.78rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
                      {isSpeaking ? 'Stop' : 'Listen'}
                    </button>
                    <button
                      onClick={() => handleCopyText(translatedText)}
                      style={{ background: 'none', border: 'none', color: '#9333EA', cursor: 'pointer', fontSize: '0.78rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      {copiedText ? <Check size={14} color="#16A34A" /> : <Copy size={14} />}
                      {copiedText ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '14px',
                  padding: '16px',
                  minHeight: '180px',
                  border: '1px solid #F3E8FF',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  color: '#1E1B4B',
                  whiteSpace: 'pre-wrap'
                }}>
                  {isTranslating ? (
                    <div style={{ color: '#9333EA', fontWeight: '600' }}>⚡ Translating with AI Context engine...</div>
                  ) : translatedText ? (
                    translatedText
                  ) : (
                    <span style={{ color: '#9CA3AF' }}>Translation will appear here...</span>
                  )}
                </div>
              </div>

              {translatedText && (
                <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setActiveTab('explain')}
                    style={{
                      background: '#F3E8FF',
                      color: '#7E22CE',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '8px 14px',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <BookOpen size={14} /> Explain This Translation & Vocabulary
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: VOICE TRANSLATOR */}
      {/* ========================================================================= */}
      {activeTab === 'voice' && (
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid #F3E8FF',
          boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)',
          textAlign: 'center',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1E1B4B', margin: '0 0 8px 0' }}>
            Voice-to-Voice Speech Translator
          </h2>
          <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '24px' }}>
            Speak in your native language to transcribe and translate your voice instantly into target language speech.
          </p>

          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: isRecordingVoice ? '#DC2626' : 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
            boxShadow: isRecordingVoice ? '0 0 30px rgba(220, 38, 38, 0.5)' : '0 6px 20px rgba(147, 51, 234, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }} onClick={handleToggleVoiceRecord}>
            {isRecordingVoice ? <MicOff size={48} color="#FFFFFF" /> : <Mic size={48} color="#FFFFFF" />}
          </div>

          <button
            onClick={handleToggleVoiceRecord}
            style={{
              background: isRecordingVoice ? '#FEF2F2' : '#F3E8FF',
              color: isRecordingVoice ? '#DC2626' : '#7E22CE',
              border: 'none',
              borderRadius: '12px',
              padding: '10px 24px',
              fontWeight: '700',
              fontSize: '0.95rem',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            {isRecordingVoice ? 'Recording Live... Click to Stop' : 'Click Mic to Start Speaking'}
          </button>

          {voiceTranscript && (
            <div style={{ textAlign: 'left', background: '#FAF7FF', padding: '16px', borderRadius: '14px', border: '1px solid #E9D5FF', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.78rem', color: '#6B7280', fontWeight: '700', marginBottom: '4px' }}>SPEECH TRANSCRIPT:</div>
              <div style={{ fontSize: '0.95rem', color: '#1E1B4B', fontWeight: '600' }}>"{voiceTranscript}"</div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: DOCUMENT TRANSLATOR */}
      {/* ========================================================================= */}
      {activeTab === 'doc' && (
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid #F3E8FF',
          boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1E1B4B', margin: '0 0 8px 0' }}>
            Document Content Translator (PDF, DOCX, TXT)
          </h2>
          <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '24px' }}>
            Upload resume notes, assignment PDFs, or job descriptions to translate full document text.
          </p>

          <div style={{
            border: '2px dashed #E9D5FF',
            borderRadius: '20px',
            padding: '36px',
            textAlign: 'center',
            background: '#FAF7FF',
            marginBottom: '20px'
          }}>
            <FileUp size={44} color="#9333EA" style={{ marginBottom: '12px' }} />
            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1E1B4B', marginBottom: '6px' }}>
              Drag & Drop file or Browse
            </div>
            <div style={{ fontSize: '0.78rem', color: '#6B7280', marginBottom: '16px' }}>
              Supports .TXT, .DOCX, and .PDF files up to 10MB
            </div>
            <label style={{
              background: '#9333EA',
              color: '#FFF',
              padding: '10px 20px',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}>
              Choose File
              <input type="file" onChange={handleFileUpload} accept=".txt,.docx,.pdf" style={{ display: 'none' }} />
            </label>
          </div>

          {uploadedDocName && (
            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '16px', borderRadius: '14px' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#15803D' }}>📄 Uploaded File: {uploadedDocName}</div>
              <div style={{ fontSize: '0.82rem', color: '#374151', marginTop: '8px' }}>
                <strong>Translated Text:</strong> {docTranslatedText}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: CAREER & TECHNICAL TRANSLATOR PRESETS */}
      {/* ========================================================================= */}
      {activeTab === 'career' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '24px',
            border: '1px solid #F3E8FF',
            boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1E1B4B', marginBottom: '16px' }}>
              Quick Preset Loaders for SkillAura Content:
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
              {[
                { title: 'Job Description Preset', text: 'Looking for a Java Backend Engineer proficient in Spring Boot, REST APIs, Microservices architecture, and SQL database tuning.' },
                { title: 'Technical Concept Preset', text: 'Object-Oriented Programming (OOP) relies on Encapsulation, Abstraction, Inheritance, and Polymorphism to structure clean code.' },
                { title: 'Interview Q&A Preset', text: 'Question: How do you optimize slow database queries? Answer: I analyze EXPLAIN query plans and add appropriate indexes.' },
                { title: 'Resume Bullet Preset', text: 'Architected high-throughput REST API backend handling 10,000 requests per minute with 99.9% uptime.' }
              ].map((p, idx) => (
                <div key={idx} style={{
                  background: '#FAF7FF',
                  borderRadius: '16px',
                  padding: '16px',
                  border: '1px solid #E9D5FF',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1E1B4B', margin: '0 0 6px 0' }}>{p.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: '#4B5563', lineHeight: '1.4', margin: '0 0 12px 0' }}>"{p.text}"</p>
                  </div>
                  <button
                    onClick={() => {
                      setInputText(p.text);
                      setActiveTab('text');
                      handlePerformTranslation();
                    }}
                    style={{ background: '#9333EA', color: '#FFF', border: 'none', borderRadius: '8px', padding: '6px 12px', fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Load & Translate →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: DIALOGUE / CONVERSATION MODE */}
      {/* ========================================================================= */}
      {activeTab === 'conversation' && (
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '24px',
          border: '1px solid #F3E8FF',
          boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)',
          maxWidth: '750px',
          margin: '0 auto'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1E1B4B', marginBottom: '16px' }}>
            Two-Speaker Dialogue Translator
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {conversationHistory.map(msg => (
              <div key={msg.id} style={{
                alignSelf: msg.speaker === 'A' ? 'flex-start' : 'flex-end',
                maxWidth: '85%',
                background: msg.speaker === 'A' ? '#FAF7FF' : '#F0FDF4',
                border: `1px solid ${msg.speaker === 'A' ? '#E9D5FF' : '#BBF7D0'}`,
                borderRadius: '16px',
                padding: '14px 18px'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: msg.speaker === 'A' ? '#7E22CE' : '#15803D', marginBottom: '4px' }}>
                  Speaker {msg.speaker}:
                </div>
                <div style={{ fontSize: '0.9rem', color: '#1E1B4B', fontWeight: '600' }}>"{msg.text}"</div>
                <div style={{ fontSize: '0.82rem', color: '#4B5563', marginTop: '4px', fontStyle: 'italic' }}>
                  → Translation: {msg.translation}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveSpeaker(prev => prev === 'A' ? 'B' : 'A')}
              style={{ padding: '10px 14px', borderRadius: '10px', background: '#F3E8FF', color: '#7E22CE', fontWeight: '700', border: 'none', cursor: 'pointer' }}
            >
              Speaker {activeSpeaker}
            </button>
            <input
              type="text"
              value={currentSpeakerInput}
              onChange={(e) => setCurrentSpeakerInput(e.target.value)}
              placeholder={`Type message for Speaker ${activeSpeaker}...`}
              style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid #D1D5DB' }}
              onKeyDown={(e) => e.key === 'Enter' && handleSendConversationMessage()}
            />
            <button
              onClick={handleSendConversationMessage}
              style={{ background: '#9333EA', color: '#FFF', border: 'none', borderRadius: '10px', padding: '10px 18px', fontWeight: '700', cursor: 'pointer' }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: AI EXPLANATION & VOCABULARY LEARNING TABLE */}
      {/* ========================================================================= */}
      {activeTab === 'explain' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px' }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '24px',
            border: '1px solid #F3E8FF',
            boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1E1B4B', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={20} color="#9333EA" /> Key Vocabulary & Technical Glossary Table
            </h3>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#FAF7FF', borderBottom: '2px solid #E9D5FF' }}>
                  <th style={{ padding: '10px', color: '#1E1B4B' }}>Original Word</th>
                  <th style={{ padding: '10px', color: '#1E1B4B' }}>Translated Meaning</th>
                  <th style={{ padding: '10px', color: '#1E1B4B' }}>Example Sentence</th>
                </tr>
              </thead>
              <tbody>
                {vocabularyList.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '12px 10px', fontWeight: '700', color: '#9333EA' }}>{item.word}</td>
                    <td style={{ padding: '12px 10px', color: '#374151' }}>{item.meaning}</td>
                    <td style={{ padding: '12px 10px', color: '#6B7280', fontStyle: 'italic' }}>"{item.example}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* AI ASSISTANT CHAT PANEL */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '20px',
            border: '1px solid #F3E8FF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1E1B4B', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} color="#9333EA" /> AI Translation Assistant
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto', marginBottom: '12px' }}>
                {aiAssistantLogs.map((m, idx) => (
                  <div key={idx} style={{
                    background: m.role === 'user' ? '#F3E8FF' : '#F9FAFB',
                    padding: '10px',
                    borderRadius: '10px',
                    fontSize: '0.8rem',
                    color: m.role === 'user' ? '#7E22CE' : '#374151'
                  }}>
                    {m.text}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <input
                type="text"
                value={aiAssistantInput}
                onChange={(e) => setAiAssistantInput(e.target.value)}
                placeholder="Ask AI about translation..."
                style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.8rem' }}
                onKeyDown={(e) => e.key === 'Enter' && handleAskAiAssistant()}
              />
              <button onClick={handleAskAiAssistant} style={{ background: '#9333EA', color: '#FFF', border: 'none', borderRadius: '8px', padding: '8px 12px', fontSize: '0.8rem', fontWeight: '700' }}>
                Ask
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: TRANSLATION HISTORY */}
      {/* ========================================================================= */}
      {activeTab === 'history' && (
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '24px',
          border: '1px solid #F3E8FF',
          boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1E1B4B', marginBottom: '16px' }}>
            Translation History & Saved Entries ({translationHistory.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {translationHistory.map(item => (
              <div key={item.id} style={{
                background: '#FAF7FF',
                borderRadius: '14px',
                padding: '16px',
                border: '1px solid #E9D5FF',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#9333EA', fontWeight: '700' }}>
                    {item.sourceLang} → {item.targetLang} ({item.type})
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#1E1B4B', fontWeight: '600', marginTop: '2px' }}>
                    "{item.original}"
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#4B5563', fontStyle: 'italic', marginTop: '2px' }}>
                    Translation: "{item.translation}"
                  </div>
                </div>
                <button
                  onClick={() => {
                    setInputText(item.original);
                    setTranslatedText(item.translation);
                    setActiveTab('text');
                  }}
                  style={{ background: '#9333EA', color: '#FFF', border: 'none', borderRadius: '8px', padding: '6px 12px', fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer' }}
                >
                  Load Script
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );

  if (isModal) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(8px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '28px',
          maxWidth: '900px',
          maxHeight: '90vh',
          overflowY: 'auto',
          width: '100%',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
          border: '1px solid #E2E8F0'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1E1B4B' }}>AI Language Translator</h3>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748B' }}>×</button>
          </div>
          {contentBody}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '28px 24px', background: 'linear-gradient(135deg, #FAF7FF 0%, #FFF0F7 100%)', minHeight: '100vh' }}>
      {contentBody}
    </div>
  );
}
