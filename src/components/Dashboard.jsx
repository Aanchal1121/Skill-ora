import React, { useState } from 'react';
import { 
  Award, 
  TrendingUp, 
  User, 
  BarChart2, 
  CheckSquare, 
  ShieldCheck, 
  Sparkles, 
  Save, 
  Edit3, 
  GraduationCap,
  BookOpen,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard({ studentProfile, onUpdateProfile, onNavigate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: studentProfile?.name || "Aarav Sharma",
    college: studentProfile?.college || "Institute of Technology, Jaipur",
    tier: studentProfile?.tier || "Tier 2 College",
    branch: studentProfile?.branch || "Computer Science & Engineering",
    year: studentProfile?.year || "3rd Year (Semester 6)",
    cgpa: studentProfile?.cgpa || 7.8,
    backlogHistory: studentProfile?.backlogHistory || 0,
    targetRole: studentProfile?.targetRole || "Full Stack Developer",
    skills: studentProfile?.skills?.join(", ") || "HTML/CSS, JavaScript, React, Python, SQL, Git"
  });

  const handleSave = async (e) => {
    e.preventDefault();
    const skillsArray = formData.skills.split(",").map(s => s.trim()).filter(Boolean);
    await onUpdateProfile({
      ...formData,
      cgpa: parseFloat(formData.cgpa),
      backlogHistory: parseInt(formData.backlogHistory),
      skills: skillsArray
    });
    setIsEditing(false);
  };

  // Weekly Growth Chart Data
  const weeklyData = studentProfile?.weeklyLogs || [];
  const lineChartData = {
    labels: weeklyData.map(w => w.week),
    datasets: [
      {
        label: 'Employability Score Progress',
        data: weeklyData.map(w => w.score),
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#4F46E5',
        pointRadius: 5
      }
    ]
  };

  // Peer Benchmark Bar Chart Data
  const peerData = studentProfile?.peerPercentiles || { dsaPercentile: 68, projectPercentile: 82, communicationPercentile: 74, overallPercentile: 76 };
  const barChartData = {
    labels: ['DSA Skills', 'Projects', 'Communication', 'Overall Batch'],
    datasets: [
      {
        label: 'Your Percentile vs Batch Average (50th)',
        data: [peerData.dsaPercentile, peerData.projectPercentile, peerData.communicationPercentile, peerData.overallPercentile],
        backgroundColor: ['#4F46E5', '#3B82F6', '#8B5CF6', '#10B981'],
        borderRadius: 8
      }
    ]
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '30px 20px' }} className="fade-in">
      
      {/* Top Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
        color: '#FFFFFF',
        borderRadius: '24px',
        padding: '30px',
        marginBottom: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{
              background: '#4F46E5',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 700
            }}>
              VERIFIABLE CREDIT SCORE
            </span>
            <span style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>NEP 2020 & ABC Linked</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '6px' }}>
            Welcome Back, {formData.name}!
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>
            {formData.college} • {formData.branch} ({formData.year})
          </p>
        </div>

        {/* Big Employability Credit Score Meter */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          padding: '20px 28px',
          textAlign: 'center',
          minWidth: '220px'
        }}>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#A5B4FC', fontWeight: 700 }}>
            EMPLOYABILITY CREDIT SCORE
          </div>
          <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#6EE7B7', lineHeight: '1.1', margin: '4px 0' }}>
            {studentProfile?.employabilityScore || 745} <span style={{ fontSize: '1.2rem', color: '#FFFFFF' }}>/ 900</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#E2E8F0', fontWeight: 600 }}>
            Level: Placement Ready (Top 15%)
          </div>
        </div>
      </div>

      {/* Main Grid: Left Column Score Breakdown & Profile, Right Column Analytics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px'
      }}>
        
        {/* LEFT COLUMN: Profile & Score Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Profile Card / Ingestion Form */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={20} color="#4F46E5" />
                <span>Academic Record & Target</span>
              </h3>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="btn-outline-primary"
                style={{ fontSize: '0.8rem', padding: '4px 12px' }}
              >
                <Edit3 size={14} style={{ marginRight: '4px' }} />
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Name</label>
                  <input 
                    type="text" 
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>CGPA</label>
                    <input 
                      type="number" 
                      step="0.1"
                      className="form-control"
                      value={formData.cgpa}
                      onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Backlog History</label>
                    <input 
                      type="number" 
                      className="form-control"
                      value={formData.backlogHistory}
                      onChange={(e) => setFormData({ ...formData, backlogHistory: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Target Career Role</label>
                  <select 
                    className="form-control"
                    value={formData.targetRole}
                    onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                  >
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Data Scientist / Analyst">Data Scientist / Analyst</option>
                    <option value="AI / ML Engineer">AI / ML Engineer</option>
                    <option value="DevOps / Cloud Engineer">DevOps / Cloud Engineer</option>
                    <option value="SDE 1 (Product Companies)">SDE 1 (Product Companies)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Current Skills (Comma separated)</label>
                  <textarea 
                    className="form-control"
                    rows={2}
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ justifyCenter: 'center', marginTop: '6px' }}>
                  <Save size={16} />
                  <span>Update Profile & Recalculate Score</span>
                </button>
              </form>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F1F5F9' }}>
                  <span style={{ color: '#64748B' }}>CGPA Score:</span>
                  <strong style={{ color: '#0F172A' }}>{studentProfile?.cgpa} / 10.0</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F1F5F9' }}>
                  <span style={{ color: '#64748B' }}>Backlogs:</span>
                  <strong style={{ color: studentProfile?.backlogHistory === 0 ? '#16A34A' : '#DC2626' }}>
                    {studentProfile?.backlogHistory === 0 ? '0 (Clean Record)' : `${studentProfile?.backlogHistory} Backlog(s)`}
                  </strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F1F5F9' }}>
                  <span style={{ color: '#64748B' }}>Target Domain:</span>
                  <strong style={{ color: '#4F46E5' }}>{studentProfile?.targetRole}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', marginBottom: '6px' }}>Verified Skills:</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {studentProfile?.skills?.map((sk, idx) => (
                      <span key={idx} style={{
                        background: '#EEF2FF',
                        color: '#4F46E5',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}>
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Explainable Score Breakdown */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={20} color="#4F46E5" />
              <span>Score Breakdown (Explainable)</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>
                  <span>Academics & CGPA</span>
                  <span>195 / 225 Pts</span>
                </div>
                <div style={{ height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '86%', height: '100%', background: '#4F46E5' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>
                  <span>Technical & DSA Skills</span>
                  <span>220 / 270 Pts</span>
                </div>
                <div style={{ height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '81%', height: '100%', background: '#3B82F6' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>
                  <span>Hands-on Projects & GitHub</span>
                  <span>150 / 180 Pts</span>
                </div>
                <div style={{ height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '83%', height: '100%', background: '#8B5CF6' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>
                  <span>Soft Skills & Communication</span>
                  <span>105 / 135 Pts</span>
                </div>
                <div style={{ height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '77%', height: '100%', background: '#10B981' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>
                  <span>Verified Badges & Certifications</span>
                  <span>75 / 90 Pts</span>
                </div>
                <div style={{ height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '83%', height: '100%', background: '#F59E0B' }} />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Growth Analytics & Peer Benchmark */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Weekly Growth Line Chart */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={20} color="#4F46E5" />
                <span>Weekly Growth Tracking</span>
              </h3>
              <span className="badge-pill" style={{ background: '#ECFDF5', color: '#059669', borderColor: '#A7F3D0' }}>
                +125 Pts this month
              </span>
            </div>

            <div style={{ height: '220px' }}>
              <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Peer Benchmark Bar Chart */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BarChart2 size={20} color="#3B82F6" />
                <span>Peer Benchmark ("Where Do I Stand")</span>
              </h3>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '14px' }}>
              Comparing your verified skills with 480 students in {formData.branch}, {formData.college}.
            </p>

            <div style={{ height: '200px' }}>
              <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Weekly Career Nudge List */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckSquare size={20} color="#10B981" />
              <span>Weekly Career Nudge Action List</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{
                background: '#F8FAFC',
                padding: '12px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #E2E8F0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckSquare size={16} color="#10B981" />
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#334155' }}>
                    Apply to 2 PM Internship Scheme Opportunities
                  </span>
                </div>
                <button onClick={() => onNavigate('govt-schemes')} className="btn-outline-primary" style={{ padding: '2px 10px', fontSize: '0.75rem' }}>
                  Apply →
                </button>
              </div>

              <div style={{
                background: '#F8FAFC',
                padding: '12px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #E2E8F0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckSquare size={16} color="#4F46E5" />
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#334155' }}>
                    Complete NPTEL Python Module 3 Assignment
                  </span>
                </div>
                <button onClick={() => onNavigate('learning')} className="btn-outline-primary" style={{ padding: '2px 10px', fontSize: '0.75rem' }}>
                  Study →
                </button>
              </div>

              <div style={{
                background: '#F8FAFC',
                padding: '12px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #E2E8F0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckSquare size={16} color="#8B5CF6" />
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#334155' }}>
                    Take 1 AI Mock Interview on Web Development
                  </span>
                </div>
                <button onClick={() => onNavigate('mock-interview')} className="btn-outline-primary" style={{ padding: '2px 10px', fontSize: '0.75rem' }}>
                  Practice →
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
