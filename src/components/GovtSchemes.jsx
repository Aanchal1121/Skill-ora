import React, { useState } from 'react';
import { 
  Building2, 
  Award, 
  Search, 
  Filter, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  FileText, 
  MapPin, 
  Sparkles, 
  X, 
  ArrowRight,
  Briefcase
} from 'lucide-react';

export default function GovtSchemes({ studentProfile }) {
  const [activeCategoryTab, setActiveCategoryTab] = useState('all'); // 'all' | 'jobs' | 'internships' | 'scholarships' | 'schemes' | 'saved'
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all'); // 'all' | 'central' | 'state'
  const [selectedItemModal, setSelectedItemModal] = useState(null);

  // Student profile details for eligibility calculation
  const degree = studentProfile?.degree || 'B.Tech';
  const branch = studentProfile?.branch || 'CSE';
  const cgpa = studentProfile?.cgpa || 8.4;

  // Master Unified Dataset for Government Opportunities & Schemes
  const [govtItems, setGovtItems] = useState([
    {
      id: 1,
      category: 'jobs',
      categoryLabel: 'Government Job',
      title: 'ISRO Scientist / Engineer Trainee (SC)',
      dept: 'Indian Space Research Organisation (ISRO)',
      level: 'Central Government',
      state: 'All India (Central)',
      stipend: '₹56,100 - ₹1,77,500 (Level 10 Pay Matrix)',
      deadline: 'Oct 30, 2026',
      startDate: 'Sep 15, 2026',
      eligibilityStatus: 'Likely Eligible',
      eligibilityReason: `Matches your ${degree} (${branch}) degree with > 65% aggregate score requirement.`,
      requiredSkills: ['Core Engineering', 'DSA', 'Space Systems', 'GATE Score / ISRO Exam'],
      officialSource: 'ISRO Official Recruitment Portal',
      officialUrl: 'https://isro.gov.in/careers',
      description: 'Central government recruitment for fresh B.Tech engineering graduates in Computer Science and Electronics.',
      responsibilities: [
        'Design spacecraft software payloads and ground control communication algorithms.',
        'Participate in real-time satellite data processing and system validation.'
      ],
      documents: ['B.Tech Degree Certificate', 'GATE Scorecard / Registration Token', 'Aadhaar Card'],
      isSaved: true,
      status: 'Applied'
    },
    {
      id: 2,
      category: 'internships',
      categoryLabel: 'Government Internship',
      title: 'NITI Aayog Undergraduate Research Internship',
      dept: 'NITI Aayog, Government of India',
      level: 'Central Government',
      state: 'New Delhi / Remote',
      stipend: 'Official Experience Certificate & Certificate of Excellence',
      duration: '6 Weeks to 3 Months',
      deadline: 'Oct 10, 2026',
      startDate: 'Sep 01, 2026',
      eligibilityStatus: 'Likely Eligible',
      eligibilityReason: `Open to undergraduate students in 3rd/4th year with CGPA > 8.0 (Your CGPA: ${cgpa}).`,
      requiredSkills: ['Policy Research', 'Data Analysis', 'Python/Excel', 'Report Writing'],
      officialSource: 'NITI Aayog Official Portal',
      officialUrl: 'https://niti.gov.in/internship',
      description: 'Work directly with NITI Aayog vertical heads on tech policy, digital infrastructure, and AI implementation governance.',
      responsibilities: [
        'Conduct policy research on emerging tech and digital public infrastructure.',
        'Prepare analytical data reports for government committees.'
      ],
      documents: ['College NOC Certificate', 'Academic Transcripts', 'Statement of Purpose (SOP)'],
      isSaved: true,
      status: 'Saved'
    },
    {
      id: 3,
      category: 'internships',
      categoryLabel: 'Government Internship',
      title: 'AICTE TULIP (The Urban Learning Internship Program)',
      dept: 'Ministry of Housing & Urban Affairs & AICTE',
      level: 'Central Government',
      state: 'Pan India (Smart Cities)',
      stipend: '₹12,000 - ₹20,000 / month',
      duration: '6 Months',
      deadline: 'Nov 15, 2026',
      startDate: 'Sep 20, 2026',
      eligibilityStatus: 'Likely Eligible',
      eligibilityReason: `Eligible B.Tech CSE student (Smart City digital dashboard project requirements matched).`,
      requiredSkills: ['Web Development', 'SQL', 'GIS Systems', 'IoT'],
      officialSource: 'AICTE TULIP Portal',
      officialUrl: 'https://internship.aicte-india.org',
      description: 'Internships in Smart City projects across India, building urban management dashboards and digital municipal portals.',
      responsibilities: [
        'Develop web interfaces for city municipal service portals.',
        'Analyze smart city sensor data and IoT telemetry.'
      ],
      documents: ['AICTE Student ID', 'College Recommendation Letter'],
      isSaved: false,
      status: 'Planning to Apply'
    },
    {
      id: 4,
      category: 'scholarships',
      categoryLabel: 'Scholarship & Financial Aid',
      title: 'Prime Minister Research Fellowship (PMRF)',
      dept: 'Ministry of Education, Govt of India',
      level: 'Central Government',
      state: 'All India (IITs / IISc / NITs)',
      stipend: '₹70,000 - ₹80,000 / month + ₹2 Lakh Research Grant',
      deadline: 'Dec 01, 2026',
      startDate: 'Oct 01, 2026',
      eligibilityStatus: 'Potentially Eligible',
      eligibilityReason: 'Requires CGPA >= 8.0 at graduation and admission to direct Ph.D / M.Tech Research program.',
      requiredSkills: ['Advanced Research', 'Algorithm Design', 'Publications'],
      officialSource: 'PMRF Official Portal',
      officialUrl: 'https://pmrf.in',
      description: 'Prestigious fellowship supporting high-performing engineering graduates pursuing doctoral research in frontier tech.',
      responsibilities: ['Publish research in peer-reviewed IEEE/ACM journals.'],
      documents: ['PMRF Application Form', 'Project Proposal', 'Letters of Recommendation'],
      isSaved: false,
      status: 'Saved'
    },
    {
      id: 5,
      category: 'schemes',
      categoryLabel: 'Government Scheme',
      title: 'PM Kaushal Vikas Yojana 4.0 (PMKVY - AI & Cloud Skills)',
      dept: 'Ministry of Skill Development & Entrepreneurship (MSDE)',
      level: 'Central Government',
      state: 'All India',
      stipend: 'Free NCVT Certification & Assessment Fee Waiver',
      deadline: 'Dec 31, 2026',
      startDate: 'Ongoing',
      eligibilityStatus: 'Likely Eligible',
      eligibilityReason: 'Free industry-aligned skill certification for Indian college students.',
      requiredSkills: ['Python', 'Cloud Basics', 'Cybersecurity Basics'],
      officialSource: 'National Skill Development Corporation (NSDC)',
      officialUrl: 'https://pmkvyofficial.org',
      description: 'Government-funded skill development scheme offering recognized NCVT industry certifications in Cloud, AI, and Cyber Security.',
      responsibilities: ['Complete 120 hours of skill training and pass NCVT practical exam.'],
      documents: ['Aadhaar Card', 'Student ID'],
      isSaved: false,
      status: 'Planning to Apply'
    },
    {
      id: 6,
      category: 'schemes',
      categoryLabel: 'State Government Scheme',
      title: 'MP Mukhyamantri Medhavi Chhatra Yojana',
      dept: 'Department of Technical Education, Govt of MP',
      level: 'State Government',
      state: 'Madhya Pradesh',
      stipend: 'Full College Tuition Fee Reimbursement',
      deadline: 'Nov 30, 2026',
      startDate: 'Aug 01, 2026',
      eligibilityStatus: 'Potentially Eligible',
      eligibilityReason: 'Requires MP Domicile and Class 12th marks > 70% (MP Board) or > 85% (CBSE).',
      requiredSkills: ['Academic Merit'],
      officialSource: 'MP Scholar Portal',
      officialUrl: 'https://scholarshipportal.mp.nic.in',
      description: 'Madhya Pradesh government tuition fee assistance scheme for meritorious undergraduate engineering students.',
      responsibilities: ['Maintain clean academic record with zero active backlogs.'],
      documents: ['MP Domicile Certificate', 'Income Certificate', 'Class 12th Marksheet'],
      isSaved: true,
      status: 'Under Review'
    }
  ]);

  // Toggle Save item
  const toggleSaveItem = (id) => {
    setGovtItems(govtItems.map(item => item.id === id ? { ...item, isSaved: !item.isSaved } : item));
  };

  // Update Status
  const updateStatus = (id, newStatus) => {
    setGovtItems(govtItems.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  // Filtered dataset
  const filteredItems = govtItems.filter(item => {
    const matchesCategory = activeCategoryTab === 'all' 
      ? true 
      : activeCategoryTab === 'saved' 
        ? item.isSaved || item.status !== 'Saved'
        : item.category === activeCategoryTab;

    const matchesLevel = levelFilter === 'all' 
      ? true 
      : levelFilter === 'central' ? item.level.includes('Central') : item.level.includes('State');

    const matchesSearch = searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesLevel && matchesSearch;
  });

  const jobsCount = govtItems.filter(i => i.category === 'jobs').length;
  const internshipsCount = govtItems.filter(i => i.category === 'internships').length;
  const scholarshipsCount = govtItems.filter(i => i.category === 'scholarships').length;
  const schemesCount = govtItems.filter(i => i.category === 'schemes').length;
  const savedCount = govtItems.filter(i => i.isSaved).length;

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '24px 20px' }} className="fade-in">
      
      {/* 1. HEADER & UNIFIED DASHBOARD SUMMARY */}
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
        gap: '20px'
      }}>
        <div>
          <div className="badge-pill" style={{ marginBottom: '8px', background: '#F0EAFA', color: '#9333EA' }}>
            <Building2 size={15} />
            <span>OFFICIAL GOVERNMENT PORTAL INTEGRATOR</span>
          </div>
          <h1 style={{ fontSize: '2.0rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
            Government Opportunities & Schemes
          </h1>
          <p style={{ color: '#7A6F8A', fontSize: '0.95rem' }}>
            Unified portal for Central & State Government Jobs, Internships, Scholarships, and Skill Schemes.
          </p>
        </div>

        {/* Category Count Metric Badges */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ background: '#FFFFFF', padding: '10px 16px', borderRadius: '16px', border: '1px solid #EAE2F8', textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: '#7A6F8A', fontWeight: 700 }}>GOVT JOBS</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#9333EA' }}>{jobsCount}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '10px 16px', borderRadius: '16px', border: '1px solid #EAE2F8', textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: '#7A6F8A', fontWeight: 700 }}>INTERNSHIPS</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2563EB' }}>{internshipsCount}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '10px 16px', borderRadius: '16px', border: '1px solid #EAE2F8', textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: '#7A6F8A', fontWeight: 700 }}>SCHOLARSHIPS</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669' }}>{scholarshipsCount}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '10px 16px', borderRadius: '16px', border: '1px solid #EAE2F8', textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: '#7A6F8A', fontWeight: 700 }}>SCHEMES</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#D97706' }}>{schemesCount}</div>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY TABS, SEARCH & LEVEL FILTERS */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #EAE2F8',
        borderRadius: '24px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 4px 20px rgba(147, 51, 234, 0.06)'
      }}>
        {/* Category Tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Opportunities' },
              { id: 'jobs', label: '🏛️ Govt Jobs' },
              { id: 'internships', label: '🎓 Govt Internships' },
              { id: 'scholarships', label: '💰 Scholarships' },
              { id: 'schemes', label: '📜 Skill Schemes' },
              { id: 'saved', label: `🔖 My Saved (${savedCount})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategoryTab(tab.id)}
                className={`tab-pill ${activeCategoryTab === tab.id ? 'active' : ''}`}
                style={{ fontSize: '0.86rem', padding: '8px 16px' }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Level Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem' }}>
            <Filter size={16} color="#7A6F8A" />
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="form-control"
              style={{ width: 'auto', padding: '6px 12px', fontSize: '0.84rem' }}
            >
              <option value="all">All Govt Levels</option>
              <option value="central">Central Government</option>
              <option value="state">State Government (e.g. MP)</option>
            </select>
          </div>
        </div>

        {/* Live Search Bar */}
        <div style={{ position: 'relative' }}>
          <Search size={18} color="#7A6F8A" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search government openings, ministries, scheme names, or required skills (e.g. ISRO, NITI Aayog, GATE, PMKVY)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '44px' }}
          />
        </div>
      </div>

      {/* 3. OPPORTUNITY CARDS LISTING */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
        {filteredItems.length === 0 ? (
          <div style={{ background: '#FFFFFF', padding: '40px', borderRadius: '24px', textAlign: 'center', border: '1px solid #EAE2F8', color: '#7A6F8A' }}>
            <h3>No government opportunities found matching your filter.</h3>
            <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>Try switching category tabs or clearing search keywords.</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: '#FFFFFF',
                border: '1px solid #EAE2F8',
                borderRadius: '20px',
                padding: '22px',
                boxShadow: '0 4px 18px rgba(147, 51, 234, 0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span className="badge-pill" style={{ background: '#FAF7FF', color: '#9333EA' }}>
                    {item.categoryLabel}
                  </span>
                  <span className="badge-pill" style={{ background: '#EFF6FF', color: '#2563EB' }}>
                    {item.level}
                  </span>
                  <span className="badge-pill" style={{ background: '#ECFDF5', color: '#059669', fontWeight: 800 }}>
                    {item.eligibilityStatus}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '4px' }}>{item.title}</h3>
                <div style={{ fontSize: '0.88rem', color: '#7A6F8A', fontWeight: 600, marginBottom: '10px' }}>
                  🏛️ {item.dept} • <span style={{ color: '#2D1B4E' }}>{item.state}</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '0.84rem', color: '#4A3E56', marginBottom: '12px' }}>
                  <div><strong>Benefits / Stipend:</strong> <span style={{ color: '#059669', fontWeight: 700 }}>{item.stipend}</span></div>
                  <div><strong>Application Deadline:</strong> {item.deadline}</div>
                </div>

                <p style={{ fontSize: '0.86rem', color: '#7A6F8A', marginBottom: '10px' }}>
                  <strong>Eligibility Insight:</strong> {item.eligibilityReason}
                </p>

                {/* Skills Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {item.requiredSkills.map((s, i) => (
                    <span key={i} style={{ background: '#FAF7FF', color: '#9333EA', fontSize: '0.76rem', fontWeight: 700, padding: '3px 10px', borderRadius: '10px' }}>
                      • {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '180px', alignItems: 'flex-end' }}>
                {activeCategoryTab === 'saved' && (
                  <select
                    value={item.status}
                    onChange={(e) => updateStatus(item.id, e.target.value)}
                    className="form-control"
                    style={{ padding: '4px 10px', fontSize: '0.78rem', fontWeight: 700, borderColor: '#9333EA', color: '#9333EA' }}
                  >
                    <option value="Saved">Status: Saved</option>
                    <option value="Planning to Apply">Planning to Apply</option>
                    <option value="Applied">Applied</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Selected">Selected 🎉</option>
                    <option value="Not Selected">Not Selected</option>
                  </select>
                )}

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => toggleSaveItem(item.id)}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    title={item.isSaved ? 'Unsave' : 'Save Opportunity'}
                  >
                    {item.isSaved ? <BookmarkCheck size={16} color="#9333EA" /> : <Bookmark size={16} />}
                  </button>

                  <button
                    onClick={() => setSelectedItemModal(item)}
                    className="btn-secondary"
                    style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                  >
                    View Details
                  </button>
                </div>

                <a
                  href={item.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                  style={{ padding: '6px 14px', fontSize: '0.8rem', textDecoration: 'none' }}
                >
                  <span>Apply on Official Portal</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 4. DETAILS MODAL */}
      {selectedItemModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '650px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }} className="fade-in">
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="badge-pill" style={{ background: '#FAF7FF', color: '#9333EA', marginBottom: '6px' }}>
                  {selectedItemModal.dept}
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#2D1B4E' }}>{selectedItemModal.title}</h3>
                <p style={{ color: '#7A6F8A', fontSize: '0.88rem' }}>{selectedItemModal.level} • {selectedItemModal.stipend}</p>
              </div>
              <button onClick={() => setSelectedItemModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="#7A6F8A" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', color: '#4A3E56' }}>
              <div style={{ background: '#FAF7FF', padding: '14px', borderRadius: '14px', border: '1px solid #EAE2F8' }}>
                <strong style={{ color: '#2D1B4E', display: 'block', marginBottom: '4px' }}>Overview:</strong>
                <p>{selectedItemModal.description}</p>
              </div>

              <div style={{ background: '#ECFDF5', padding: '14px', borderRadius: '14px', border: '1px solid #A7F3D0' }}>
                <strong style={{ color: '#059669', display: 'block', marginBottom: '4px' }}>Your Eligibility Assessment:</strong>
                <div style={{ fontWeight: 800, color: '#047857' }}>{selectedItemModal.eligibilityStatus}</div>
                <div style={{ fontSize: '0.84rem', marginTop: '2px' }}>{selectedItemModal.eligibilityReason}</div>
              </div>

              <div>
                <strong style={{ color: '#2D1B4E', display: 'block', marginBottom: '4px' }}>Required Documents:</strong>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  {selectedItemModal.documents.map((doc, i) => (
                    <li key={i} style={{ marginBottom: '2px' }}>{doc}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <div style={{ fontSize: '0.78rem', color: '#7A6F8A' }}>
                  Source: <strong>{selectedItemModal.officialSource}</strong>
                </div>

                <a href={selectedItemModal.officialUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ textDecoration: 'none' }}>
                  <span>Apply on Official Portal</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
