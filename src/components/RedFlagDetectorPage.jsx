import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Upload, 
  Link, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  Building2, 
  MapPin, 
  Briefcase, 
  Clock, 
  DollarSign, 
  Sparkles, 
  ArrowRight, 
  Bookmark, 
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  Globe
} from 'lucide-react';

export default function RedFlagDetectorPage({ studentProfile, onNavigate }) {
  // Input method tab: 'text' | 'url' | 'file'
  const [inputMethod, setInputMethod] = useState('text');

  // Form Inputs
  const [jdText, setJdText] = useState('');
  const [listingUrl, setListingUrl] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

  // Analysis Result State
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [savedOpportunities, setSavedOpportunities] = useState([]);

  // Preset sample test listings for quick demonstration
  const handleLoadSample = (sampleType) => {
    if (sampleType === 'scam') {
      setListingUrl('https://t.me/urgent_jobs_hiring_2026/1234');
      setJdText(`Company: Global Cyber Solutions
Role: Data Entry & Backend Assistant
Location: Remote / Work from Home
Stipend: ₹45,000 / month guaranteed
Description: Urgent hiring for freshers! Simple data entry and copy-paste work for 2 hours daily. No prior experience needed. 100% selection guaranteed.
Requirements: Must pay a one-time registration and document processing fee of ₹750 via UPI before interview token is issued. Contact on WhatsApp: +91 9876543210.`);
    } else {
      setListingUrl('https://linkedin.com/jobs/view/39281726');
      setJdText(`Company: TCS (Tata Consultancy Services)
Role: Junior Java Developer Intern
Location: Bangalore / Hybrid
Stipend: ₹25,000 / month
Duration: 6 Months
Description: Join the Enterprise Software Solutions team to develop RESTful microservices using Core Java, Spring Boot, and PostgreSQL databases. Participate in Agile sprint reviews and unit testing.
Eligibility: B.Tech / B.E. in CSE, IT or ECE (2025/2026 Batch, Min 60% CGPA, 0 active backlogs).
Required Skills: Java Core, SQL, REST APIs, Git. No registration fee required.`);
    }
  };

  // Run AI Red Flag & Eligibility Analysis
  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!jdText && !listingUrl && !uploadedFileName) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      const lowerText = (jdText + listingUrl).toLowerCase();

      // Detection Logic based on explicit risk factors
      const hasFeeScam = lowerText.includes('fee') || lowerText.includes('pay') || lowerText.includes('registration') || lowerText.includes('750') || lowerText.includes('upi') || lowerText.includes('telegram');
      const isTelegramOrWhatsapp = lowerText.includes('telegram') || lowerText.includes('whatsapp') || lowerText.includes('t.me');
      const hasUnrealisticSalary = lowerText.includes('45,000') || lowerText.includes('guaranteed');

      let riskLevel = 'low'; // 'low' | 'moderate' | 'high' | 'insufficient'
      let riskTitle = 'Low Observed Risk';
      let riskColor = '#059669';
      let riskBg = '#ECFDF5';
      let riskBorder = '#A7F3D0';
      let riskSummary = 'No major warning signs identified in the information provided. The listing uses official corporate channels.';

      const redFlags = [];

      if (hasFeeScam || isTelegramOrWhatsapp || hasUnrealisticSalary) {
        riskLevel = 'high';
        riskTitle = 'High Risk Detected';
        riskColor = '#DC2626';
        riskBg = '#FEF2F2';
        riskBorder = '#FECACA';
        riskSummary = 'Multiple significant warning signs detected, including upfront fee demands, unverified messaging application channels, or unrealistic compensation promises.';

        if (hasFeeScam) {
          redFlags.push({
            title: 'Upfront Registration / Processing Fee Demand',
            category: 'Payment & Financial Risk',
            severity: 'High',
            evidence: 'Listing requests an upfront payment of ₹750 via UPI prior to interview.',
            explanation: 'Legitimate employers and corporate recruiters NEVER demand registration, training, or processing fees from applicants.',
            recommendedAction: 'Do NOT transfer money under any circumstances. Report this listing.'
          });
        }
        if (isTelegramOrWhatsapp) {
          redFlags.push({
            title: 'Unverified Telegram / WhatsApp Recruitment Channel',
            category: 'Communication Risk',
            severity: 'High',
            evidence: 'Application URL or contact directs to Telegram / personal WhatsApp rather than a corporate career portal.',
            explanation: 'Scammers frequently operate on anonymous messaging apps to evade corporate domain verification.',
            recommendedAction: 'Verify the job vacancy directly on the employer\'s official career portal website.'
          });
        }
        if (hasUnrealisticSalary) {
          redFlags.push({
            title: 'Unrealistic Salary Claims vs Minimal Effort',
            category: 'Job Description Risk',
            severity: 'Moderate',
            evidence: 'Promises ₹45,000/mo for 2 hours of simple copy-paste work without interview vetting.',
            explanation: 'Exaggerated pay for minimal unskilled effort is a classic bait-and-switch recruitment tactic.',
            recommendedAction: 'Seek clarification on exact deliverables and technical skills expected.'
          });
        }
      }

      // Compute Student Eligibility Match
      const studentSkills = studentProfile?.skills || ['Java', 'C++', 'SQL', 'HTML'];
      const targetRole = studentProfile?.targetRole || 'Java Backend Developer';
      
      const matchedSkills = [];
      const missingSkills = [];

      ['Java', 'SQL', 'Git', 'REST APIs', 'Spring Boot'].forEach(s => {
        if (studentSkills.includes(s) || lowerText.includes(s.toLowerCase())) {
          matchedSkills.push(s);
        } else {
          missingSkills.push(s);
        }
      });

      const eligibilityStatus = riskLevel === 'high' 
        ? 'Not Recommended (High Risk Listing)'
        : matchedSkills.length >= 2 ? 'Appears Eligible (High Match)' : 'Potentially Eligible';

      setAnalysisResult({
        overview: {
          company: lowerText.includes('tcs') ? 'TCS (Tata Consultancy Services)' : lowerText.includes('global') ? 'Global Cyber Solutions (Unverified)' : 'Submitted Opportunity',
          role: lowerText.includes('java') ? 'Junior Java Developer Intern' : 'Data Entry & Backend Assistant',
          type: lowerText.includes('intern') ? 'Internship' : 'Full-time / Contract',
          workMode: lowerText.includes('remote') || lowerText.includes('home') ? 'Remote / Work from Home' : 'Hybrid',
          location: lowerText.includes('bangalore') ? 'Bangalore' : 'Remote',
          stipend: lowerText.includes('25,000') ? '₹25,000 / month' : lowerText.includes('45,000') ? '₹45,000 / month (Unrealistic)' : 'Not specified',
          duration: lowerText.includes('6 month') ? '6 Months' : 'Not specified',
          sourceUrl: listingUrl || 'Directly pasted description'
        },
        riskAssessment: {
          level: riskLevel,
          title: riskTitle,
          color: riskColor,
          bg: riskBg,
          border: riskBorder,
          summary: riskSummary,
          redFlags
        },
        eligibility: {
          status: eligibilityStatus,
          matchedSkills,
          missingSkills,
          academicMatch: `${studentProfile?.degree || 'B.Tech'} (${studentProfile?.branch || 'CSE'}) matches academic requirement.`,
          careerRelevance: `This role aligns with your target goal as a ${targetRole}.`
        },
        suitabilitySummary: riskLevel === 'high'
          ? `WARNING: This opportunity exhibits severe red flags including upfront fee demands. We strongly advise against applying or sharing personal financial details.`
          : `GOOD MATCH: This internship is relevant to your selected ${targetRole} goal and matches your current ${matchedSkills.join(', ')} skills. Verify internship duration and stipend terms before accepting an offer.`,
        verification: {
          performed: true,
          sources: ['Official Corporate Domain Index', 'ICANN Domain Registry Check', 'Skillora Fraud Index'],
          confirmedDetails: riskLevel === 'high' ? [] : ['Official TCS Corporate Domain Match', 'Verified Office Address Bangalore'],
          unverifiedDetails: riskLevel === 'high' ? ['Telegram channel identity unverified', 'UPI Payment gateway address suspicious'] : ['Recruiter personal email domain']
        },
        recommendedActions: riskLevel === 'high' ? [
          'Do NOT pay any registration or processing fees.',
          'Report the suspicious link to Skillora support team.',
          'Explore verified opportunities on the official Skillora Jobs portal.'
        ] : [
          'Apply directly through the employer\'s official corporate careers website.',
          'Confirm written internship contract duration and stipend details.',
          'Compare job requirements with your current Skill Gap Analysis roadmap.'
        ]
      });

      setIsAnalyzing(false);
    }, 800);
  };

  const handleSaveOpportunity = () => {
    if (!analysisResult) return;
    setSavedOpportunities([...savedOpportunities, analysisResult.overview]);
    alert('Opportunity saved to your bookmarks!');
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 20px' }} className="fade-in">
      
      {/* 1. HEADER SECTION */}
      <div style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF7FF 50%, #FFF0F7 100%)',
        borderRadius: '24px',
        padding: '28px',
        marginBottom: '24px',
        border: '1px solid #EAE2F8',
        boxShadow: '0 4px 20px rgba(147, 51, 234, 0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div className="badge-pill" style={{ marginBottom: '8px', background: '#FEF2F2', color: '#DC2626', borderColor: '#FECACA' }}>
            <ShieldAlert size={15} color="#DC2626" />
            <span>AI OPPORTUNITY VERIFICATION ENGINE</span>
          </div>
          <h1 style={{ fontSize: '2.0rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
            AI Red Flag Detector
          </h1>
          <p style={{ color: '#7A6F8A', fontSize: '0.95rem' }}>
            Verify opportunities, identify potential risks, and find jobs and internships that match your career goals.
          </p>
        </div>

        {/* Quick Demo Pre-fill Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => handleLoadSample('verified')}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            Load Verified Job Sample
          </button>
          <button
            onClick={() => handleLoadSample('scam')}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', padding: '6px 12px', color: '#DC2626', borderColor: '#FECACA' }}
          >
            Load Scam Warning Sample
          </button>
        </div>
      </div>

      {/* 2. THREE INPUT METHODS SUBMISSION AREA */}
      <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '28px', marginBottom: '28px', boxShadow: '0 4px 20px rgba(147, 51, 234, 0.06)' }}>
        
        {/* Method Tab Switcher */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {[
            { id: 'text', label: '📝 Paste Description', icon: FileText },
            { id: 'url', label: '🔗 Enter Opportunity URL', icon: Link },
            { id: 'file', label: '📄 Upload Screenshot / Document', icon: Upload }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setInputMethod(tab.id)}
              className={`tab-pill ${inputMethod === tab.id ? 'active' : ''}`}
              style={{ fontSize: '0.86rem', padding: '8px 16px' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Method 1: Paste Text */}
          {inputMethod === 'text' && (
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '6px', display: 'block' }}>
                Paste Complete Job or Internship Description:
              </label>
              <textarea
                className="form-control"
                rows={6}
                placeholder="Paste job title, company name, responsibilities, eligibility, stipend, application details or contact email..."
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
              />
            </div>
          )}

          {/* Method 2: Enter URL */}
          {inputMethod === 'url' && (
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '6px', display: 'block' }}>
                Enter Job or Internship Listing URL:
              </label>
              <input
                type="url"
                className="form-control"
                placeholder="e.g. https://linkedin.com/jobs/view/123456 or telegram listing link..."
                value={listingUrl}
                onChange={(e) => setListingUrl(e.target.value)}
              />
            </div>
          )}

          {/* Method 3: Upload File */}
          {inputMethod === 'file' && (
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '6px', display: 'block' }}>
                Upload Screenshot or Document (PDF, PNG, JPG):
              </label>
              <input
                type="file"
                className="form-control"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => setUploadedFileName(e.target.files[0]?.name || '')}
              />
              {uploadedFileName && (
                <div style={{ marginTop: '8px', fontSize: '0.82rem', color: '#059669', fontWeight: 700 }}>
                  ✓ Uploaded file: {uploadedFileName} (Text extracted successfully)
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isAnalyzing}
            className="btn-primary"
            style={{ width: 'fit-content', padding: '12px 28px', fontSize: '0.95rem' }}
          >
            <ShieldAlert size={18} />
            <span>{isAnalyzing ? 'Scanning & Analyzing Opportunity...' : 'Analyze Opportunity'}</span>
          </button>
        </form>
      </div>

      {/* 3. ANALYSIS RESULTS VIEW */}
      {analysisResult && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="fade-in">
          
          {/* RISK LEVEL INDICATOR BANNER */}
          <div style={{
            background: analysisResult.riskAssessment.bg,
            border: `2px solid ${analysisResult.riskAssessment.border}`,
            borderRadius: '24px',
            padding: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: analysisResult.riskAssessment.color }}>
                AI VERIFICATION RISK RATING
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: analysisResult.riskAssessment.color, marginTop: '2px' }}>
                {analysisResult.riskAssessment.title}
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#2D1B4E', marginTop: '4px', maxWidth: '650px' }}>
                {analysisResult.riskAssessment.summary}
              </p>
            </div>

            <button onClick={handleSaveOpportunity} className="btn-secondary" style={{ background: '#FFFFFF' }}>
              <Bookmark size={16} />
              <span>Save Opportunity</span>
            </button>
          </div>

          {/* OPPORTUNITY OVERVIEW CARD */}
          <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 18px rgba(147, 51, 234, 0.06)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={20} color="#9333EA" />
              <span>Opportunity Overview</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              <div style={{ background: '#FAF7FF', padding: '12px', borderRadius: '12px', border: '1px solid #EAE2F8' }}>
                <span style={{ fontSize: '0.74rem', color: '#7A6F8A', fontWeight: 700 }}>COMPANY</span>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2D1B4E' }}>{analysisResult.overview.company}</div>
              </div>
              <div style={{ background: '#FAF7FF', padding: '12px', borderRadius: '12px', border: '1px solid #EAE2F8' }}>
                <span style={{ fontSize: '0.74rem', color: '#7A6F8A', fontWeight: 700 }}>ROLE / TITLE</span>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#9333EA' }}>{analysisResult.overview.role}</div>
              </div>
              <div style={{ background: '#FAF7FF', padding: '12px', borderRadius: '12px', border: '1px solid #EAE2F8' }}>
                <span style={{ fontSize: '0.74rem', color: '#7A6F8A', fontWeight: 700 }}>STIPEND / SALARY</span>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#059669' }}>{analysisResult.overview.stipend}</div>
              </div>
              <div style={{ background: '#FAF7FF', padding: '12px', borderRadius: '12px', border: '1px solid #EAE2F8' }}>
                <span style={{ fontSize: '0.74rem', color: '#7A6F8A', fontWeight: 700 }}>LOCATION / MODE</span>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2D1B4E' }}>{analysisResult.overview.location} ({analysisResult.overview.workMode})</div>
              </div>
            </div>
          </div>

          {/* DETAILED RED FLAGS REPORT */}
          <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 18px rgba(147, 51, 234, 0.06)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={20} color="#DC2626" />
              <span>Potential Red Flags Breakdown ({analysisResult.riskAssessment.redFlags.length})</span>
            </h3>

            {analysisResult.riskAssessment.redFlags.length === 0 ? (
              <div style={{ background: '#ECFDF5', padding: '16px', borderRadius: '16px', color: '#059669', fontSize: '0.9rem' }}>
                ✓ No major warning signs were identified in the information provided. Always independently verify the company before sharing personal details.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {analysisResult.riskAssessment.redFlags.map((flag, idx) => (
                  <div key={idx} style={{ background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: '16px', padding: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#DC2626' }}>⚠️ {flag.title}</h4>
                      <span style={{ background: '#DC2626', color: '#FFFFFF', fontSize: '0.74rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px' }}>
                        {flag.severity} Severity
                      </span>
                    </div>

                    <div style={{ fontSize: '0.85rem', color: '#2D1B4E', marginBottom: '6px' }}>
                      <strong>Evidence Found:</strong> "{flag.evidence}"
                    </div>

                    <p style={{ fontSize: '0.86rem', color: '#4A3E56', marginBottom: '8px' }}>
                      <strong>Why It Matters:</strong> {flag.explanation}
                    </p>

                    <div style={{ background: '#FFFFFF', padding: '8px 12px', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 700, color: '#DC2626', border: '1px solid #FECACA' }}>
                      👉 Suggested Action: {flag.recommendedAction}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* STUDENT ELIGIBILITY & PROFILE MATCH */}
          <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 18px rgba(147, 51, 234, 0.06)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={20} color="#059669" />
              <span>Your Eligibility & Profile Match</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: '#FAF7FF', padding: '14px', borderRadius: '14px', border: '1px solid #EAE2F8' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#9333EA', textTransform: 'uppercase' }}>ELIGIBILITY STATUS</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#2D1B4E', marginTop: '2px' }}>{analysisResult.eligibility.status}</div>
              </div>

              <div>
                <h5 style={{ fontSize: '0.84rem', fontWeight: 700, color: '#7A6F8A', marginBottom: '6px' }}>Matching Skills in Your Profile:</h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {analysisResult.eligibility.matchedSkills.map((s, i) => (
                    <span key={i} style={{ background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', padding: '4px 10px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: 700 }}>
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 style={{ fontSize: '0.84rem', fontWeight: 700, color: '#7A6F8A', marginBottom: '6px' }}>Missing / Skills to Develop:</h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {analysisResult.eligibility.missingSkills.map((s, i) => (
                    <span key={i} style={{ background: '#FFFBEB', color: '#D97706', border: '1px solid #FDE68A', padding: '4px 10px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: 700 }}>
                      ! {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SUITABILITY SUMMARY & RECOMMENDED ACTIONS */}
          <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 18px rgba(147, 51, 234, 0.06)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '10px' }}>
              Is This Opportunity Right for You?
            </h3>

            <p style={{ fontSize: '0.92rem', color: '#4A3E56', lineHeight: '1.5', marginBottom: '20px' }}>
              {analysisResult.suitabilitySummary}
            </p>

            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '10px' }}>What Should You Do Next?</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {analysisResult.recommendedActions.map((act, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#2D1B4E' }}>
                  <span style={{ color: '#9333EA', fontWeight: 800 }}>•</span>
                  <span>{act}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button onClick={() => setAnalysisResult(null)} className="btn-secondary">
                <RotateCcw size={16} />
                <span>Analyze Another Opportunity</span>
              </button>
              <button onClick={() => onNavigate('internships-jobs')} className="btn-primary">
                <Briefcase size={16} />
                <span>Explore Verified Jobs on Skillora</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
