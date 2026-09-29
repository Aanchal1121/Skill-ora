import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Award, 
  TrendingUp, 
  AlertTriangle, 
  Download, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle2, 
  FileText, 
  Briefcase, 
  BookOpen, 
  Mic, 
  Send, 
  Sparkles, 
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function TpoDashboard() {
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedBatch, setSelectedBatch] = useState('2026');
  const [searchStudentQuery, setSearchStudentQuery] = useState('');
  const [activeTab, setActiveTab] = useState('students'); // 'students' | 'drives' | 'analytics' | 'activities' | 'support'
  const [showPostDriveModal, setShowPostDriveModal] = useState(false);
  const [supportNotes, setSupportNotes] = useState({});

  // Summary Metrics
  const metrics = {
    totalStudents: 210,
    activePreparing: 160,
    profileCompleted: 185,
    placedVerified: 42,
    avgEmployabilityScore: 74,
    highestPackage: '₹18.5 LPA (Amazon)',
    avgPackage: '₹6.8 LPA'
  };

  // Searchable Student Directory Dataset
  const [students, setStudents] = useState([
    {
      id: 'STU101',
      name: 'Aanchal Sharma',
      dept: 'CSE',
      batch: '2026',
      cgpa: 8.4,
      targetRole: 'Java Backend Developer',
      score: 72,
      resumeScore: 'ATS 72%',
      status: 'Placed',
      company: 'TCS (₹7.0 LPA)',
      supportNeeded: false,
      gaps: ['Spring Boot', 'REST APIs']
    },
    {
      id: 'STU102',
      name: 'Rohan Verma',
      dept: 'CSE',
      batch: '2026',
      cgpa: 8.1,
      targetRole: 'Full Stack Engineer',
      score: 68,
      resumeScore: 'ATS 65%',
      status: 'Interviewing',
      company: 'InnoTech Solutions',
      supportNeeded: false,
      gaps: ['React', 'Docker']
    },
    {
      id: 'STU103',
      name: 'Priya Patel',
      dept: 'IT',
      batch: '2026',
      cgpa: 7.6,
      targetRole: 'Data Analyst',
      score: 62,
      resumeScore: 'ATS 58%',
      status: 'Preparing',
      company: 'Unplaced',
      supportNeeded: true,
      supportReason: 'Resume ATS score below 60% and unassessed SQL gap.',
      gaps: ['PowerBI', 'Advanced SQL']
    },
    {
      id: 4,
      idStr: 'STU104',
      name: 'Vikram Singh',
      dept: 'ECE',
      batch: '2026',
      cgpa: 7.2,
      targetRole: 'Cloud Engineer',
      score: 59,
      resumeScore: 'Incomplete',
      status: 'Preparing',
      company: 'Unplaced',
      supportNeeded: true,
      supportReason: 'No applications submitted and missing project portfolio.',
      gaps: ['AWS', 'Docker', 'Linux']
    }
  ]);

  // Active Placement Drives Dataset
  const [drives, setDrives] = useState([
    {
      id: 1,
      company: 'TCS Digital & Ninja Drive',
      role: 'Graduate Software Trainee',
      deptEligible: 'CSE / IT / ECE',
      package: '₹3.6 - ₹7.0 LPA',
      deadline: 'Oct 20, 2026',
      appliedCount: 84,
      status: 'Active'
    },
    {
      id: 2,
      company: 'InnoTech Off-Campus Hiring',
      role: 'Java Backend Intern',
      deptEligible: 'CSE / IT',
      package: '₹30,000 / month',
      deadline: 'Oct 15, 2026',
      appliedCount: 52,
      status: 'Active'
    }
  ]);

  // Department Aggregated Skill Gap Analytics
  const departmentGaps = [
    { skill: 'Spring Boot & Microservices', gapPct: 42, priority: 'High', count: 88 },
    { skill: 'AWS Cloud & Docker Containerization', gapPct: 48, priority: 'High', count: 101 },
    { skill: 'RESTful API Architecture', gapPct: 35, priority: 'Medium', count: 74 },
    { skill: 'System Design & Scalability', gapPct: 38, priority: 'Medium', count: 80 }
  ];

  // Export CSV Report
  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "RollNo,Name,Department,CGPA,TargetRole,EmployabilityScore,PlacementStatus\n"
      + students.map(s => `${s.idStr || s.id},${s.name},${s.dept},${s.cgpa},${s.targetRole},${s.score},${s.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Skillora_Placement_Report_${selectedBatch}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Students
  const filteredStudents = students.filter(s => {
    const matchesDept = selectedDept === 'all' || s.dept.toLowerCase() === selectedDept.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      s.name.toLowerCase().includes(searchStudentQuery.toLowerCase()) ||
      (s.idStr || s.id).toLowerCase().includes(searchStudentQuery.toLowerCase()) ||
      s.targetRole.toLowerCase().includes(searchStudentQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '24px 20px' }} className="fade-in">
      
      {/* 1. INSTITUTIONAL TPO HEADER */}
      <div style={{
        background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)',
        color: '#FFFFFF',
        borderRadius: '24px',
        padding: '28px',
        marginBottom: '24px',
        boxShadow: '0 8px 30px rgba(49, 46, 129, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ background: '#6366F1', color: '#FFFFFF', padding: '4px 12px', borderRadius: '16px', fontSize: '0.78rem', fontWeight: 800 }}>
              INSTITUTIONAL B2B PLACEMENT DASHBOARD
            </span>
            <span style={{ fontSize: '0.82rem', color: '#E0E7FF' }}>NIRF & NAAC Audit Ready</span>
          </div>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '4px' }}>
            Imperial Institute of Technology & Science
          </h1>
          <p style={{ color: '#C7D2FE', fontSize: '0.92rem' }}>
            Training & Placement Officer (TPO) Central Command & Placement Readiness Portal.
          </p>
        </div>

        <button onClick={handleExportCSV} className="btn-primary" style={{ background: '#FFFFFF', color: '#312E81', padding: '10px 20px', fontSize: '0.88rem' }}>
          <Download size={16} />
          <span>Export Placement Report (CSV)</span>
        </button>
      </div>

      {/* 2. SUMMARY STATS CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', padding: '18px', borderRadius: '18px', boxShadow: '0 4px 16px rgba(147, 51, 234, 0.05)' }}>
          <span style={{ fontSize: '0.74rem', color: '#7A6F8A', fontWeight: 800, textTransform: 'uppercase' }}>BATCH BATCH STUDENTS</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2D1B4E', margin: '2px 0' }}>{metrics.totalStudents}</div>
          <div style={{ fontSize: '0.76rem', color: '#059669', fontWeight: 700 }}>{metrics.profileCompleted} Profiles Completed</div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', padding: '18px', borderRadius: '18px', boxShadow: '0 4px 16px rgba(147, 51, 234, 0.05)' }}>
          <span style={{ fontSize: '0.74rem', color: '#7A6F8A', fontWeight: 800, textTransform: 'uppercase' }}>PLACEMENT RATE</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#9333EA', margin: '2px 0' }}>78%</div>
          <div style={{ fontSize: '0.76rem', color: '#9333EA', fontWeight: 700 }}>{metrics.placedVerified} Placed / Offers Verified</div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', padding: '18px', borderRadius: '18px', boxShadow: '0 4px 16px rgba(147, 51, 234, 0.05)' }}>
          <span style={{ fontSize: '0.74rem', color: '#7A6F8A', fontWeight: 800, textTransform: 'uppercase' }}>AVG EMPLOYABILITY SCORE</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2563EB', margin: '2px 0' }}>{metrics.avgEmployabilityScore} / 100</div>
          <div style={{ fontSize: '0.76rem', color: '#2563EB', fontWeight: 700 }}>Top 24% Peer Standing</div>
        </div>

        <div style={{ background: '#FEF2F2', border: '1.5px solid #FECACA', padding: '18px', borderRadius: '18px' }}>
          <span style={{ fontSize: '0.74rem', color: '#DC2626', fontWeight: 800, textTransform: 'uppercase' }}>SUPPORT NEEDED</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#DC2626', margin: '2px 0' }}>2 Students</div>
          <div style={{ fontSize: '0.76rem', color: '#DC2626', fontWeight: 700 }}>Early-Warning Interventions</div>
        </div>
      </div>

      {/* 3. TPO NAVIGATION TABS & FILTERS */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #EAE2F8',
        borderRadius: '24px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 4px 20px rgba(147, 51, 234, 0.06)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'students', label: '👨‍🎓 Student Directory' },
              { id: 'drives', label: '🏢 Campus Placement Drives' },
              { id: 'analytics', label: '📊 Batch Skill Heatmap' },
              { id: 'support', label: '⚠️ Support & Early Warning' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-pill ${activeTab === tab.id ? 'active' : ''}`}
                style={{ fontSize: '0.86rem', padding: '8px 16px' }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="form-control"
              style={{ width: 'auto', padding: '6px 12px', fontSize: '0.84rem' }}
            >
              <option value="all">All Departments</option>
              <option value="cse">CSE</option>
              <option value="it">IT</option>
              <option value="ece">ECE</option>
            </select>
          </div>
        </div>

        {/* Tab Content: Student Directory */}
        {activeTab === 'students' && (
          <div className="fade-in">
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <Search size={18} color="#7A6F8A" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                className="form-control"
                placeholder="Search student name, roll number, or target role..."
                value={searchStudentQuery}
                onChange={(e) => setSearchStudentQuery(e.target.value)}
                style={{ paddingLeft: '42px' }}
              />
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#FAF7FF', borderBottom: '2px solid #EAE2F8', color: '#2D1B4E', fontWeight: 800 }}>
                    <th style={{ padding: '12px' }}>Roll No</th>
                    <th style={{ padding: '12px' }}>Student Name</th>
                    <th style={{ padding: '12px' }}>Branch</th>
                    <th style={{ padding: '12px' }}>CGPA</th>
                    <th style={{ padding: '12px' }}>Target Role</th>
                    <th style={{ padding: '12px' }}>Employability</th>
                    <th style={{ padding: '12px' }}>Resume ATS</th>
                    <th style={{ padding: '12px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #EAE2F8' }}>
                      <td style={{ padding: '12px', fontWeight: 700, color: '#7A6F8A' }}>{s.idStr || s.id}</td>
                      <td style={{ padding: '12px', fontWeight: 800, color: '#2D1B4E' }}>{s.name}</td>
                      <td style={{ padding: '12px' }}>{s.dept}</td>
                      <td style={{ padding: '12px', fontWeight: 700 }}>{s.cgpa}</td>
                      <td style={{ padding: '12px', color: '#9333EA', fontWeight: 700 }}>{s.targetRole}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ background: '#F0EAFA', color: '#9333EA', padding: '4px 8px', borderRadius: '8px', fontWeight: 700 }}>
                          {s.score}/100
                        </span>
                      </td>
                      <td style={{ padding: '12px', color: '#059669', fontWeight: 700 }}>{s.resumeScore}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          background: s.status === 'Placed' ? '#ECFDF5' : s.status === 'Interviewing' ? '#EFF6FF' : '#FFFBEB',
                          color: s.status === 'Placed' ? '#059669' : s.status === 'Interviewing' ? '#2563EB' : '#D97706',
                          padding: '4px 10px',
                          borderRadius: '10px',
                          fontSize: '0.78rem',
                          fontWeight: 800
                        }}>
                          {s.status} {s.status === 'Placed' ? `(${s.company})` : ''}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: Campus Drives */}
        {activeTab === 'drives' && (
          <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2D1B4E' }}>Active Campus Recruitment Drives</h4>
              <button onClick={() => alert('Post TPO Placement Drive dialog opened.')} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.84rem' }}>
                <Plus size={16} />
                <span>Post New Placement Drive</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {drives.map((d) => (
                <div key={d.id} style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', borderRadius: '16px', padding: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <span className="badge-pill" style={{ background: '#9333EA', color: '#FFFFFF', marginBottom: '6px' }}>{d.status}</span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2D1B4E' }}>{d.company}</h4>
                    <p style={{ fontSize: '0.86rem', color: '#7A6F8A' }}>Role: {d.role} • Eligible: {d.deptEligible} • Package: <strong style={{ color: '#059669' }}>{d.package}</strong></p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#9333EA' }}>{d.appliedCount} Applied</div>
                    <div style={{ fontSize: '0.78rem', color: '#7A6F8A' }}>Deadline: {d.deadline}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: Batch Skill Analytics */}
        {activeTab === 'analytics' && (
          <div className="fade-in">
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '14px' }}>Batch Skill Gap Heatmap (CSE/IT 2026)</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {departmentGaps.map((g, i) => (
                <div key={i} style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', padding: '16px', borderRadius: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 700, marginBottom: '6px' }}>
                    <span>{g.skill}</span>
                    <span style={{ color: '#DC2626' }}>{g.gapPct}% Batch Gap ({g.count} Students)</span>
                  </div>
                  <div style={{ height: '8px', background: '#EAE2F8', borderRadius: '4px' }}>
                    <div style={{ width: `${g.gapPct}%`, height: '100%', background: '#DC2626', borderRadius: '4px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: Early Warning Support */}
        {activeTab === 'support' && (
          <div className="fade-in">
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#DC2626', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={18} />
              <span>Early Warning System — Students Needing Placement Intervention</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {students.filter(s => s.supportNeeded).map((st) => (
                <div key={st.id} style={{ background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: '16px', padding: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <h5 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#DC2626' }}>{st.name} ({st.dept} - {st.idStr || st.id})</h5>
                    <span style={{ fontSize: '0.8rem', color: '#991B1B', fontWeight: 700 }}>CGPA: {st.cgpa} | Score: {st.score}/100</span>
                  </div>
                  <p style={{ fontSize: '0.86rem', color: '#2D1B4E', marginBottom: '10px' }}><strong>Indicator:</strong> {st.supportReason}</p>
                  <button onClick={() => alert(`Assigned mentor guidance session to ${st.name}`)} className="btn-secondary" style={{ background: '#FFFFFF', fontSize: '0.8rem' }}>
                    Assign Mentor Guidance Action
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
