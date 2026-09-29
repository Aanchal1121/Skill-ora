import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  Bookmark, 
  ExternalLink, 
  ShieldAlert, 
  CheckCircle2, 
  MapPin, 
  Building2, 
  Clock, 
  DollarSign, 
  Sparkles, 
  X, 
  Plus, 
  Edit3, 
  AlertTriangle,
  ArrowRight,
  BookmarkCheck
} from 'lucide-react';

export default function JobsOpportunitiesPage({ studentProfile, onNavigate }) {
  const [activeTab, setActiveTab] = useState('internships'); // 'internships' | 'jobs' | 'my-applications'
  const [searchQuery, setSearchQuery] = useState('');
  const [workModeFilter, setWorkModeFilter] = useState('all');
  const [selectedOpportunityModal, setSelectedOpportunityModal] = useState(null);

  // Student details for matching
  const targetRole = studentProfile?.targetRole || 'Java Backend Developer';
  const studentSkills = studentProfile?.skills || ['Java', 'C++', 'SQL', 'HTML'];

  // Master Jobs & Internships Dataset
  const [opportunities, setOpportunities] = useState([
    {
      id: 1,
      type: 'internship',
      title: 'Junior Java Developer Intern',
      company: 'TCS (Tata Consultancy Services)',
      logoBg: '#9333EA',
      location: 'Bangalore / Hybrid',
      workMode: 'Hybrid',
      stipend: '₹25,000 / month',
      duration: '6 Months',
      deadline: 'Oct 15, 2026',
      source: 'Official TCS Careers',
      sourceUrl: 'https://tcs.com/careers',
      requiredSkills: ['Core Java', 'SQL', 'REST APIs', 'Git'],
      matchingSkills: ['Core Java', 'SQL', 'Git'],
      missingSkills: ['REST APIs'],
      experience: '0-1 Year (2025/2026 Batch B.Tech CSE/IT)',
      description: 'Join the Enterprise Software team to develop RESTful microservices using Core Java, Spring Boot, and PostgreSQL databases. Participate in Agile sprint reviews and unit testing.',
      responsibilities: [
        'Write clean, modular Core Java code for backend microservices.',
        'Optimize SQL queries and relational database schemas.',
        'Collaborate with senior software engineers during sprint reviews.'
      ],
      isSaved: true,
      status: 'Applied'
    },
    {
      id: 2,
      type: 'internship',
      title: 'Backend Software Trainee',
      company: 'InnoTech Solutions',
      logoBg: '#2563EB',
      location: 'Gurgaon / Remote',
      workMode: 'Remote',
      stipend: '₹30,000 / month',
      duration: '3 Months',
      deadline: 'Oct 20, 2026',
      source: 'LinkedIn Jobs',
      sourceUrl: 'https://linkedin.com/jobs',
      requiredSkills: ['Java Core', 'Spring Boot', 'MySQL'],
      matchingSkills: ['Java Core', 'MySQL'],
      missingSkills: ['Spring Boot'],
      experience: 'Fresher (Min 60% CGPA)',
      description: 'Assisting senior engineers in building database migration scripts, REST APIs, and automated unit testing for cloud backend services.',
      responsibilities: [
        'Assist in building microservice API endpoints.',
        'Write automated unit tests using JUnit.'
      ],
      isSaved: false,
      status: 'Saved'
    },
    {
      id: 3,
      type: 'job',
      title: 'Full Stack Java Graduate Trainee',
      company: 'CyberTech Global',
      logoBg: '#059669',
      location: 'Pune / On-site',
      workMode: 'On-site',
      stipend: '₹6.5 - ₹8.0 LPA (Full-time)',
      duration: 'Permanent Role',
      deadline: 'Nov 01, 2026',
      source: 'Naukri.com',
      sourceUrl: 'https://naukri.com',
      requiredSkills: ['Java', 'SQL', 'React', 'HTML/CSS'],
      matchingSkills: ['Java', 'SQL', 'HTML/CSS'],
      missingSkills: ['React'],
      experience: '0-1 Years Experience',
      description: 'Full-time graduate engineer trainee position focusing on end-to-end Java backend microservices and React web user interfaces.',
      responsibilities: [
        'Develop responsive web frontend and Java REST APIs.',
        'Participate in code reviews and CI/CD deployment.'
      ],
      isSaved: true,
      status: 'Interviewing'
    },
    {
      id: 4,
      type: 'job',
      title: 'Associate Cloud Backend Engineer',
      company: 'CloudScale Labs',
      logoBg: '#D97706',
      location: 'Hyderabad / Hybrid',
      workMode: 'Hybrid',
      stipend: '₹7.5 LPA',
      duration: 'Permanent Role',
      deadline: 'Oct 30, 2026',
      source: 'Official Career Portal',
      sourceUrl: 'https://cloudscale.io/careers',
      requiredSkills: ['Java', 'AWS', 'Docker', 'SQL'],
      matchingSkills: ['Java', 'SQL'],
      missingSkills: ['AWS', 'Docker'],
      experience: '0-2 Years',
      description: 'Design and deploy scalable cloud backend microservices on AWS infrastructure using Docker containers and PostgreSQL.',
      responsibilities: [
        'Deploy microservices to AWS EC2 and ECS.',
        'Monitor cloud application performance and logs.'
      ],
      isSaved: false,
      status: 'Planning to Apply'
    }
  ]);

  // Toggle Saved Opportunity
  const toggleSaveOpportunity = (id) => {
    setOpportunities(opportunities.map(opp => opp.id === id ? { ...opp, isSaved: !opp.isSaved } : opp));
  };

  // Update Application Status
  const updateApplicationStatus = (id, newStatus) => {
    setOpportunities(opportunities.map(opp => opp.id === id ? { ...opp, status: newStatus } : opp));
  };

  // Filtered dataset
  const filteredOpportunities = opportunities.filter(opp => {
    const matchesTab = activeTab === 'my-applications' 
      ? opp.isSaved || opp.status !== 'Saved'
      : activeTab === 'internships' ? opp.type === 'internship' : opp.type === 'job';

    const matchesSearch = searchQuery === '' || 
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesWorkMode = workModeFilter === 'all' || opp.workMode.toLowerCase() === workModeFilter.toLowerCase();

    return matchesTab && matchesSearch && matchesWorkMode;
  });

  const savedCount = opportunities.filter(o => o.isSaved).length;
  const internshipsCount = opportunities.filter(o => o.type === 'internship').length;
  const jobsCount = opportunities.filter(o => o.type === 'job').length;

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '24px 20px' }} className="fade-in">
      
      {/* 1. HEADER & METRIC DASHBOARD */}
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
          <div className="badge-pill" style={{ marginBottom: '8px', background: '#EFF6FF', color: '#2563EB' }}>
            <Briefcase size={15} />
            <span>VERIFIED HIRING & OPPORTUNITIES PORTAL</span>
          </div>
          <h1 style={{ fontSize: '2.0rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
            Internship & Job Opportunities
          </h1>
          <p style={{ color: '#7A6F8A', fontSize: '0.95rem' }}>
            Curated, verified openings matching your target goal: <strong style={{ color: '#9333EA' }}>{targetRole}</strong>.
          </p>
        </div>

        {/* Metric Cards Row */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ background: '#FFFFFF', padding: '12px 18px', borderRadius: '16px', border: '1px solid #EAE2F8', textAlign: 'center', minWidth: '100px' }}>
            <div style={{ fontSize: '0.74rem', color: '#7A6F8A', fontWeight: 700 }}>RECOMMENDED</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#9333EA' }}>{filteredOpportunities.length}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '12px 18px', borderRadius: '16px', border: '1px solid #EAE2F8', textAlign: 'center', minWidth: '100px' }}>
            <div style={{ fontSize: '0.74rem', color: '#7A6F8A', fontWeight: 700 }}>INTERNSHIPS</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2563EB' }}>{internshipsCount}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '12px 18px', borderRadius: '16px', border: '1px solid #EAE2F8', textAlign: 'center', minWidth: '100px' }}>
            <div style={{ fontSize: '0.74rem', color: '#7A6F8A', fontWeight: 700 }}>FULL-TIME JOBS</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669' }}>{jobsCount}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '12px 18px', borderRadius: '16px', border: '1px solid #EAE2F8', textAlign: 'center', minWidth: '100px' }}>
            <div style={{ fontSize: '0.74rem', color: '#7A6F8A', fontWeight: 700 }}>SAVED / TRACKED</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#DB2777' }}>{savedCount}</div>
          </div>
        </div>
      </div>

      {/* 2. SEARCH, TAB SWITCHER & FILTERS */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #EAE2F8',
        borderRadius: '24px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 4px 20px rgba(147, 51, 234, 0.06)'
      }}>
        {/* Main Tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('internships')}
              className={`tab-pill ${activeTab === 'internships' ? 'active' : ''}`}
              style={{ fontSize: '0.88rem', padding: '8px 18px' }}
            >
              🎓 Internships ({internshipsCount})
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`tab-pill ${activeTab === 'jobs' ? 'active' : ''}`}
              style={{ fontSize: '0.88rem', padding: '8px 18px' }}
            >
              💼 Full-Time Jobs ({jobsCount})
            </button>
            <button
              onClick={() => setActiveTab('my-applications')}
              className={`tab-pill ${activeTab === 'my-applications' ? 'active' : ''}`}
              style={{ fontSize: '0.88rem', padding: '8px 18px' }}
            >
              🔖 My Saved & Applications ({savedCount})
            </button>
          </div>

          {/* Work Mode Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem' }}>
            <Filter size={16} color="#7A6F8A" />
            <select
              value={workModeFilter}
              onChange={(e) => setWorkModeFilter(e.target.value)}
              className="form-control"
              style={{ width: 'auto', padding: '6px 12px', fontSize: '0.84rem' }}
            >
              <option value="all">All Work Modes</option>
              <option value="remote">Remote Only</option>
              <option value="hybrid">Hybrid</option>
              <option value="on-site">On-site</option>
            </select>
          </div>
        </div>

        {/* Live Search Input Bar */}
        <div style={{ position: 'relative' }}>
          <Search size={18} color="#7A6F8A" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search by job title, company name, or required skills (e.g. Java, Spring Boot, TCS)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '44px' }}
          />
        </div>
      </div>

      {/* 3. OPPORTUNITY LISTING CARDS GRID */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
        {filteredOpportunities.length === 0 ? (
          <div style={{ background: '#FFFFFF', padding: '40px', borderRadius: '24px', textAlign: 'center', border: '1px solid #EAE2F8', color: '#7A6F8A' }}>
            <h3>No matching opportunities found.</h3>
            <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>Try adjusting your search keywords or work mode filter.</p>
          </div>
        ) : (
          filteredOpportunities.map((opp) => (
            <div
              key={opp.id}
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
                gap: '16px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: opp.logoBg,
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1.1rem'
                  }}>
                    {opp.company.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2D1B4E' }}>{opp.title}</h3>
                    <div style={{ fontSize: '0.88rem', color: '#7A6F8A', fontWeight: 600 }}>
                      {opp.company} • <span style={{ color: '#9333EA' }}>{opp.location}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '0.84rem', color: '#4A3E56', marginBottom: '12px' }}>
                  <div><strong>Stipend/Salary:</strong> <span style={{ color: '#059669', fontWeight: 700 }}>{opp.stipend}</span></div>
                  <div><strong>Duration:</strong> {opp.duration}</div>
                  <div><strong>Deadline:</strong> {opp.deadline}</div>
                </div>

                {/* Skills Match Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {opp.matchingSkills.map((s, i) => (
                    <span key={i} style={{ background: '#ECFDF5', color: '#059669', fontSize: '0.76rem', fontWeight: 700, padding: '3px 10px', borderRadius: '10px' }}>
                      ✓ {s}
                    </span>
                  ))}
                  {opp.missingSkills.map((s, i) => (
                    <span key={i} style={{ background: '#FFFBEB', color: '#D97706', fontSize: '0.76rem', fontWeight: 700, padding: '3px 10px', borderRadius: '10px' }}>
                      ! {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '180px', alignItems: 'flex-end' }}>
                {activeTab === 'my-applications' && (
                  <select
                    value={opp.status}
                    onChange={(e) => updateApplicationStatus(opp.id, e.target.value)}
                    className="form-control"
                    style={{ padding: '4px 10px', fontSize: '0.78rem', fontWeight: 700, borderColor: '#9333EA', color: '#9333EA' }}
                  >
                    <option value="Saved">Status: Saved</option>
                    <option value="Planning to Apply">Planning to Apply</option>
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Selected">Selected 🎉</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                )}

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => toggleSaveOpportunity(opp.id)}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    title={opp.isSaved ? 'Unsave' : 'Save Opportunity'}
                  >
                    {opp.isSaved ? <BookmarkCheck size={16} color="#9333EA" /> : <Bookmark size={16} />}
                  </button>

                  <button
                    onClick={() => setSelectedOpportunityModal(opp)}
                    className="btn-secondary"
                    style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                  >
                    View Details
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => onNavigate('red-flag-detector')}
                    style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', padding: '6px 12px', borderRadius: '10px', fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    title="Check listing for red flags & scams"
                  >
                    <ShieldAlert size={14} />
                    <span>Check Red Flags</span>
                  </button>

                  <a
                    href={opp.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                    style={{ padding: '6px 14px', fontSize: '0.8rem', textDecoration: 'none' }}
                  >
                    <span>Apply Now</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 4. OPPORTUNITY DETAILS MODAL */}
      {selectedOpportunityModal && (
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
                <span className="badge-pill" style={{ background: '#F0EAFA', color: '#9333EA', marginBottom: '6px' }}>
                  {selectedOpportunityModal.company}
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E' }}>{selectedOpportunityModal.title}</h3>
                <p style={{ color: '#7A6F8A', fontSize: '0.88rem' }}>{selectedOpportunityModal.location} • {selectedOpportunityModal.stipend}</p>
              </div>
              <button onClick={() => setSelectedOpportunityModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="#7A6F8A" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.9rem', color: '#4A3E56' }}>
              <div style={{ background: '#FAF7FF', padding: '14px', borderRadius: '14px', border: '1px solid #EAE2F8' }}>
                <strong style={{ color: '#2D1B4E', display: 'block', marginBottom: '4px' }}>Job Description:</strong>
                <p>{selectedOpportunityModal.description}</p>
              </div>

              <div>
                <strong style={{ color: '#2D1B4E', display: 'block', marginBottom: '6px' }}>Key Responsibilities:</strong>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  {selectedOpportunityModal.responsibilities.map((resp, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{resp}</li>
                  ))}
                </ul>
              </div>

              <div style={{ background: '#ECFDF5', padding: '14px', borderRadius: '14px', border: '1px solid #A7F3D0' }}>
                <strong style={{ color: '#059669', display: 'block', marginBottom: '4px' }}>Your Profile Match & Missing Skills:</strong>
                <div>Matching Skills: <strong>{selectedOpportunityModal.matchingSkills.join(', ')}</strong></div>
                {selectedOpportunityModal.missingSkills.length > 0 && (
                  <div style={{ marginTop: '4px', color: '#D97706' }}>
                    Missing Skill Gap: <strong>{selectedOpportunityModal.missingSkills.join(', ')}</strong> — Assess in Skill Gap Analysis.
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={() => { setSelectedOpportunityModal(null); onNavigate('skill-gap'); }} className="btn-secondary">
                  <span>Practice Skill Gap</span>
                </button>
                <a href={selectedOpportunityModal.sourceUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ textDecoration: 'none' }}>
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
