import React, { useState, useEffect } from 'react';
import { Target, CheckCircle2, AlertTriangle, Layers, BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function SkillGap({ studentProfile, onNavigate }) {
  const [targetRole, setTargetRole] = useState(studentProfile?.targetRole || "Full Stack Developer");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAnalysis = async (role) => {
    setLoading(true);
    try {
      const res = await fetch('/api/skill-gap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentSkills: studentProfile?.skills || ["HTML/CSS", "JavaScript", "React", "Python", "SQL"],
          targetRole: role
        })
      });
      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      console.error("Error fetching skill gap:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis(targetRole);
  }, [targetRole, studentProfile]);

  // Radar Chart Data
  const radarChartData = {
    labels: analysis?.targetSkills?.slice(0, 7) || ['Core Syntax', 'DB Querying', 'Frameworks', 'DevOps', 'System Design', 'Git Versioning', 'API Integration'],
    datasets: [
      {
        label: 'Target Role Requirement',
        data: [90, 85, 90, 80, 85, 90, 85],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: '#3B82F6',
        pointBackgroundColor: '#3B82F6'
      },
      {
        label: 'Your Verified Current Skills',
        data: (analysis?.targetSkills?.slice(0, 7) || []).map(skill => 
          analysis?.matched?.includes(skill) ? 85 : 30
        ),
        backgroundColor: 'rgba(79, 70, 229, 0.4)',
        borderColor: '#4F46E5',
        pointBackgroundColor: '#4F46E5'
      }
    ]
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '30px 20px' }} className="fade-in">
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
        borderRadius: '24px',
        padding: '32px',
        marginBottom: '32px',
        border: '1px solid #C7D2FE',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div className="badge-pill" style={{ marginBottom: '12px' }}>
            <Sparkles size={16} />
            <span>AI SKILL GAP ENGINE</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
            Skill Gap & Personalized Roadmap
          </h1>
          <p style={{ color: '#475569', fontSize: '1rem', maxWidth: '650px' }}>
            We compare your current verified academic and project skills against Indian IT industry job expectations to pinpoint exact missing skills and generate a step-by-step roadmap.
          </p>
        </div>

        {/* Target Role Selector */}
        <div style={{
          background: '#FFFFFF',
          padding: '16px 20px',
          borderRadius: '16px',
          border: '1px solid #CBD5E1',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '6px' }}>
            TARGET ROLE:
          </label>
          <select 
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1.5px solid #4F46E5',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: '#4F46E5',
              outline: 'none',
              cursor: 'pointer',
              background: '#EEF2FF'
            }}
          >
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Data Scientist / Analyst">Data Scientist / Analyst</option>
            <option value="AI / ML Engineer">AI / ML Engineer</option>
            <option value="DevOps / Cloud Engineer">DevOps / Cloud Engineer</option>
            <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
            <option value="SDE 1 (Product Companies)">SDE 1 (Product Companies)</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748B' }}>
          Calculating skill gap and fetching learning roadmap...
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          
          {/* LEFT: Radar Chart & Missing Skills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Radar Chart Card */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Target size={20} color="#4F46E5" />
                <span>Skill Demand Radar</span>
              </h3>

              <div style={{ height: '280px' }}>
                <Radar data={radarChartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            {/* Matched vs Missing Skills */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>
                  Skill Comparison Summary
                </h3>
                <span className="badge-pill" style={{
                  background: analysis?.matchPercentage >= 70 ? '#ECFDF5' : '#FFF7ED',
                  color: analysis?.matchPercentage >= 70 ? '#059669' : '#EA580C',
                  borderColor: analysis?.matchPercentage >= 70 ? '#A7F3D0' : '#FFEDD5'
                }}>
                  {analysis?.matchPercentage}% Skill Match
                </span>
              </div>

              {/* Matched Skills Pill */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#16A34A', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} />
                  <span>Skills You Currently Master ({analysis?.matched?.length}):</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {analysis?.matched?.map((skill, idx) => (
                    <span key={idx} style={{
                      background: '#F0FDF4',
                      color: '#16A34A',
                      border: '1px solid #BBF7D0',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.82rem',
                      fontWeight: 600
                    }}>
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills Pill */}
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#DC2626', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={16} />
                  <span>Missing Gaps to Bridge ({analysis?.missing?.length}):</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {analysis?.missing?.map((skill, idx) => (
                    <span key={idx} style={{
                      background: '#FEF2F2',
                      color: '#DC2626',
                      border: '1px solid #FECACA',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.82rem',
                      fontWeight: 600
                    }}>
                      ! {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Personalized 4-Phase Roadmap */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={22} color="#4F46E5" />
                <span>Personalized Learning Roadmap</span>
              </h3>
              <button onClick={() => onNavigate('learning')} className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                Find Free Courses →
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {analysis?.roadmap?.map((item, idx) => (
                <div key={idx} style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '16px',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#4F46E5', textTransform: 'uppercase' }}>
                      {item.phase}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} />
                      {item.estimatedHours}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                    Focus: {item.focus}
                  </h4>

                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }}>
                    {item.action}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
