import React, { useState } from 'react';
import { 
  Bell, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Mail, 
  ShieldAlert, 
  Sparkles, 
  Sliders, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Trash2, 
  Check, 
  X, 
  Building2, 
  MapPin, 
  Radio, 
  ThumbsDown,
  ArrowRight
} from 'lucide-react';

export default function JobAlertsPage({ studentProfile, onNavigate }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'unread' | 'internships' | 'jobs'
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [selectedOpportunityModal, setSelectedOpportunityModal] = useState(null);

  // Alert preferences state
  const [preferences, setPreferences] = useState({
    inAppAlerts: true,
    emailAlerts: true,
    pushAlerts: false,
    frequency: 'instant', // 'instant' | 'daily' | 'weekly'
    preferredWorkMode: 'hybrid',
    emailAddress: studentProfile?.email || 'aanchal.sharma@college.edu'
  });

  // Master Notifications & Job Alerts Dataset
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'internship',
      title: 'Junior Java Developer Intern',
      company: 'TCS (Tata Consultancy Services)',
      location: 'Bangalore / Hybrid',
      stipend: '₹25,000 / month',
      deadline: 'Oct 15, 2026',
      timestamp: 'Today, 10:30 AM (2 hours ago)',
      isRead: false,
      isSaved: true,
      matchPct: 92,
      matchReason: 'Matches your target role Java Backend Developer & 3 verified skills (Java, SQL, Git).',
      officialUrl: 'https://tcs.com/careers',
      description: 'Join the Enterprise Software team to develop RESTful microservices using Core Java, Spring Boot, and PostgreSQL databases.',
      requiredSkills: ['Core Java', 'SQL', 'REST APIs', 'Git'],
      matchingSkills: ['Core Java', 'SQL', 'Git'],
      missingSkills: ['REST APIs']
    },
    {
      id: 2,
      type: 'internship',
      title: 'Backend Software Trainee',
      company: 'InnoTech Solutions',
      location: 'Gurgaon / Remote',
      stipend: '₹30,000 / month',
      deadline: 'Oct 20, 2026',
      timestamp: 'Yesterday, 4:15 PM',
      isRead: false,
      isSaved: false,
      matchPct: 88,
      matchReason: 'Matches remote backend preference & Python/Java foundational requirements.',
      officialUrl: 'https://linkedin.com/jobs',
      description: 'Assisting senior engineers in building database migration scripts, REST APIs, and automated unit testing for cloud backend services.',
      requiredSkills: ['Java Core', 'Spring Boot', 'MySQL'],
      matchingSkills: ['Java Core', 'MySQL'],
      missingSkills: ['Spring Boot']
    },
    {
      id: 3,
      type: 'job',
      title: 'Full Stack Java Graduate Trainee',
      company: 'CyberTech Global',
      location: 'Pune / On-site',
      stipend: '₹6.5 - ₹8.0 LPA (Full-time)',
      deadline: 'Nov 01, 2026',
      timestamp: 'Sep 27, 2026',
      isRead: true,
      isSaved: true,
      matchPct: 84,
      matchReason: 'Direct campus hiring drive for 2026 B.Tech CSE graduating batch.',
      officialUrl: 'https://naukri.com',
      description: 'Full-time graduate engineer trainee position focusing on end-to-end Java backend microservices and React web interfaces.',
      requiredSkills: ['Java', 'SQL', 'React', 'HTML/CSS'],
      matchingSkills: ['Java', 'SQL', 'HTML/CSS'],
      missingSkills: ['React']
    },
    {
      id: 4,
      type: 'job',
      title: 'Associate Cloud Backend Engineer',
      company: 'CloudScale Labs',
      location: 'Hyderabad / Hybrid',
      stipend: '₹7.5 LPA',
      deadline: 'Oct 30, 2026',
      timestamp: 'Sep 25, 2026',
      isRead: true,
      isSaved: false,
      matchPct: 78,
      matchReason: 'Newly posted entry-level cloud backend position matched via Skill Demand Radar.',
      officialUrl: 'https://cloudscale.io/careers',
      description: 'Design and deploy scalable cloud backend microservices on AWS infrastructure using Docker containers and PostgreSQL.',
      requiredSkills: ['Java', 'AWS', 'Docker', 'SQL'],
      matchingSkills: ['Java', 'SQL'],
      missingSkills: ['AWS', 'Docker']
    }
  ]);

  // Mark single as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  // Toggle Save
  const toggleSave = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isSaved: !n.isSaved } : n));
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // Filter dataset
  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'unread') return !n.isRead;
    if (activeTab === 'internships') return n.type === 'internship';
    if (activeTab === 'jobs') return n.type === 'job';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '24px 20px' }} className="fade-in">
      
      {/* 1. HEADER & UNREAD SUMMARY DASHBOARD */}
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
            <Bell size={15} />
            <span>REAL-TIME MATCHING NOTIFICATION ENGINE</span>
          </div>
          <h1 style={{ fontSize: '2.0rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
            Job & Internship Alerts
          </h1>
          <p style={{ color: '#7A6F8A', fontSize: '0.95rem' }}>
            Automated alerts for new openings matching your profile and target goal.
          </p>
        </div>

        {/* Action & Preferences Buttons */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="btn-secondary"
              style={{ fontSize: '0.84rem', padding: '8px 16px' }}
            >
              <Check size={16} />
              <span>Mark All as Read ({unreadCount})</span>
            </button>
          )}

          <button
            onClick={() => setShowPreferencesModal(true)}
            className="btn-primary"
            style={{ fontSize: '0.84rem', padding: '8px 18px' }}
          >
            <Sliders size={16} />
            <span>Alert Preferences</span>
          </button>
        </div>
      </div>

      {/* 2. FILTER TABS BAR */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #EAE2F8',
        borderRadius: '20px',
        padding: '16px 20px',
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('all')}
            className={`tab-pill ${activeTab === 'all' ? 'active' : ''}`}
            style={{ fontSize: '0.84rem', padding: '6px 16px' }}
          >
            All Notifications ({notifications.length})
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`tab-pill ${activeTab === 'unread' ? 'active' : ''}`}
            style={{ fontSize: '0.84rem', padding: '6px 16px' }}
          >
            🔴 Unread ({unreadCount})
          </button>
          <button
            onClick={() => setActiveTab('internships')}
            className={`tab-pill ${activeTab === 'internships' ? 'active' : ''}`}
            style={{ fontSize: '0.84rem', padding: '6px 16px' }}
          >
            🎓 Internships
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`tab-pill ${activeTab === 'jobs' ? 'active' : ''}`}
            style={{ fontSize: '0.84rem', padding: '6px 16px' }}
          >
            💼 Full-Time Jobs
          </button>
        </div>

        <div style={{ fontSize: '0.8rem', color: '#7A6F8A' }}>
          Alert Channel: <strong>In-App & Email Active</strong>
        </div>
      </div>

      {/* 3. ALERTS FEED LIST */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
        {filteredNotifications.length === 0 ? (
          <div style={{ background: '#FFFFFF', padding: '40px', borderRadius: '24px', textAlign: 'center', border: '1px solid #EAE2F8', color: '#7A6F8A' }}>
            <CheckCircle2 size={36} color="#059669" style={{ marginBottom: '8px' }} />
            <h3>No unread notifications!</h3>
            <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>You are all caught up with your latest job & internship alerts.</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              style={{
                background: notif.isRead ? '#FFFFFF' : '#FAF7FF',
                border: `2px solid ${notif.isRead ? '#EAE2F8' : '#9333EA'}`,
                borderRadius: '20px',
                padding: '22px',
                boxShadow: '0 4px 18px rgba(147, 51, 234, 0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '16px',
                position: 'relative',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Unread Indicator Pulse Dot */}
              {!notif.isRead && (
                <div 
                  title="Unread alert"
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#DC2626'
                  }}
                />
              )}

              <div style={{ flex: 1, minWidth: '280px', paddingLeft: notif.isRead ? '0' : '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                  <span className="badge-pill" style={{ background: '#ECFDF5', color: '#059669', fontWeight: 800, fontSize: '0.78rem' }}>
                    ⚡ {notif.matchPct}% Profile Match
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#7A6F8A', fontWeight: 600 }}>
                    🕒 {notif.timestamp}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '2px' }}>{notif.title}</h3>
                <div style={{ fontSize: '0.88rem', color: '#7A6F8A', fontWeight: 600, marginBottom: '8px' }}>
                  🏢 {notif.company} • <span style={{ color: '#9333EA' }}>{notif.location}</span> • <strong>{notif.stipend}</strong>
                </div>

                <p style={{ fontSize: '0.86rem', color: '#4A3E56', background: '#FFFFFF', padding: '10px 14px', borderRadius: '12px', border: '1px solid #EAE2F8', marginBottom: '10px' }}>
                  💡 <strong>Why This Matches You:</strong> {notif.matchReason}
                </p>

                {/* Skills Match Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {notif.matchingSkills.map((s, i) => (
                    <span key={i} style={{ background: '#ECFDF5', color: '#059669', fontSize: '0.74rem', fontWeight: 700, padding: '2px 8px', borderRadius: '8px' }}>
                      ✓ {s}
                    </span>
                  ))}
                  {notif.missingSkills.map((s, i) => (
                    <span key={i} style={{ background: '#FFFBEB', color: '#D97706', fontSize: '0.74rem', fontWeight: 700, padding: '2px 8px', borderRadius: '8px' }}>
                      ! {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '170px', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => toggleSave(notif.id)}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    title={notif.isSaved ? 'Unsave' : 'Save Opportunity'}
                  >
                    {notif.isSaved ? <BookmarkCheck size={16} color="#9333EA" /> : <Bookmark size={16} />}
                  </button>

                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    title="Mark as read"
                  >
                    <Check size={16} color={notif.isRead ? '#059669' : '#7A6F8A'} />
                  </button>

                  <button
                    onClick={() => deleteNotification(notif.id)}
                    className="btn-secondary"
                    style={{ padding: '6px 10px', fontSize: '0.8rem', color: '#DC2626' }}
                    title="Dismiss notification"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <button
                  onClick={() => setSelectedOpportunityModal(notif)}
                  className="btn-primary"
                  style={{ width: '100%', padding: '8px 14px', fontSize: '0.82rem' }}
                >
                  <span>View Opportunity</span>
                  <ArrowRight size={14} />
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* 4. ALERT PREFERENCES MODAL */}
      {showPreferencesModal && (
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
            maxWidth: '550px',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }} className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2D1B4E' }}>Job Alert Preferences</h3>
              <button onClick={() => setShowPreferencesModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="#7A6F8A" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#FAF7FF', padding: '14px', borderRadius: '14px', border: '1px solid #EAE2F8' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: 700, color: '#2D1B4E' }}>
                  <span>In-App Notifications</span>
                  <input
                    type="checkbox"
                    checked={preferences.inAppAlerts}
                    onChange={(e) => setPreferences({ ...preferences, inAppAlerts: e.target.checked })}
                  />
                </label>
              </div>

              <div style={{ background: '#FAF7FF', padding: '14px', borderRadius: '14px', border: '1px solid #EAE2F8' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: 700, color: '#2D1B4E' }}>
                  <span>Email Alerts ({preferences.emailAddress})</span>
                  <input
                    type="checkbox"
                    checked={preferences.emailAlerts}
                    onChange={(e) => setPreferences({ ...preferences, emailAlerts: e.target.checked })}
                  />
                </label>
              </div>

              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '6px', display: 'block' }}>Alert Frequency:</label>
                <select
                  value={preferences.frequency}
                  onChange={(e) => setPreferences({ ...preferences, frequency: e.target.value })}
                  className="form-control"
                >
                  <option value="instant">Instant Real-time Alerts</option>
                  <option value="daily">Daily Evening Digest</option>
                  <option value="weekly">Weekly Summary Digest</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button onClick={() => setShowPreferencesModal(false)} className="btn-primary">
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. OPPORTUNITY DETAILS MODAL */}
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
            maxWidth: '620px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }} className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="badge-pill" style={{ background: '#FAF7FF', color: '#9333EA', marginBottom: '6px' }}>
                  {selectedOpportunityModal.company}
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#2D1B4E' }}>{selectedOpportunityModal.title}</h3>
                <p style={{ color: '#7A6F8A', fontSize: '0.88rem' }}>{selectedOpportunityModal.location} • {selectedOpportunityModal.stipend}</p>
              </div>
              <button onClick={() => setSelectedOpportunityModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="#7A6F8A" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', color: '#4A3E56' }}>
              <div style={{ background: '#FAF7FF', padding: '14px', borderRadius: '14px', border: '1px solid #EAE2F8' }}>
                <strong style={{ color: '#2D1B4E', display: 'block', marginBottom: '4px' }}>Overview:</strong>
                <p>{selectedOpportunityModal.description}</p>
              </div>

              <div style={{ background: '#ECFDF5', padding: '14px', borderRadius: '14px', border: '1px solid #A7F3D0' }}>
                <strong style={{ color: '#059669', display: 'block', marginBottom: '4px' }}>AI Profile Match Analysis:</strong>
                <div>Match Score: <strong>{selectedOpportunityModal.matchPct}%</strong></div>
                <div style={{ fontSize: '0.84rem', marginTop: '2px' }}>{selectedOpportunityModal.matchReason}</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <button onClick={() => { setSelectedOpportunityModal(null); onNavigate('skill-gap'); }} className="btn-secondary">
                  Practice Skill Gap
                </button>
                <a href={selectedOpportunityModal.officialUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ textDecoration: 'none' }}>
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
