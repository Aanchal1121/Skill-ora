import React, { useState, useEffect } from 'react';
import { Building2, AlertTriangle, Download, TrendingUp, Users, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function TpoDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tpo/analytics')
      .then(res => res.json())
      .then(data => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleExportNaac = () => {
    alert("Exporting NAAC/NIRF Ready Employability & Placement Audit Report (PDF)...");
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '30px 20px' }} className="fade-in">
      
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
        color: '#FFFFFF',
        borderRadius: '24px',
        padding: '30px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ background: '#4F46E5', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
              INSTITUTION B2B PORTAL
            </span>
            <span style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>NIRF & NAAC Ready</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '6px' }}>
            College Training & Placement Officer (TPO) Dashboard
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>
            Real-time early warning system for placement risks, department skill heatmaps, and faculty mentor matching.
          </p>
        </div>

        <button onClick={handleExportNaac} className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.9rem' }}>
          <Download size={16} /> Export NIRF/NAAC Report
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>Loading college placement metrics...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* STATS METRIC CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>TOTAL STUDENTS</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', margin: '4px 0' }}>{analytics?.totalStudents}</div>
              <div style={{ fontSize: '0.8rem', color: '#16A34A', fontWeight: 600 }}>{analytics?.placementEligible} Eligible for Drives</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>PLACEMENT RATE</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#4F46E5', margin: '4px 0' }}>{analytics?.placementRate}</div>
              <div style={{ fontSize: '0.8rem', color: '#4F46E5', fontWeight: 600 }}>{analytics?.placedCount} Placed</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>AVERAGE PACKAGE</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10B981', margin: '4px 0' }}>{analytics?.avgPackage}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Highest: {analytics?.highestPackage}</div>
            </div>

            <div style={{ background: '#FEF2F2', padding: '20px', borderRadius: '16px', border: '1px solid #FECACA', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.8rem', color: '#DC2626', fontWeight: 700, textTransform: 'uppercase' }}>AT-RISK STUDENTS</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#DC2626', margin: '4px 0' }}>{analytics?.atRiskStudents?.length || 3}</div>
              <div style={{ fontSize: '0.8rem', color: '#991B1B', fontWeight: 600 }}>Requires Early Mentor Intervention</div>
            </div>
          </div>

          {/* EARLY WARNING AT-RISK STUDENTS LIST */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '20px', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={20} color="#DC2626" />
              <span>Early Warning System — Students at Placement Risk</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {analytics?.atRiskStudents?.map((stu, i) => (
                <div key={i} style={{ background: '#FEF2F2', padding: '16px', borderRadius: '14px', border: '1px solid #FECACA', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <strong style={{ fontSize: '1rem', color: '#0F172A', display: 'block' }}>
                      {stu.name} ({stu.branch})
                    </strong>
                    <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
                      CGPA: {stu.cgpa} • Backlogs: {stu.backlogs} • Primary Gap: <span style={{ color: '#DC2626', fontWeight: 600 }}>{stu.mainGap}</span>
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="badge-pill" style={{ background: '#FEE2E2', color: '#DC2626' }}>
                      Score: {stu.score}/900
                    </span>
                    <button className="btn-outline-primary" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>
                      Assign Faculty Mentor
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DEPARTMENT SKILL HEATMAP TABLE */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '20px', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>
              Department-Wise Skill Gap Heatmap
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                    <th style={{ padding: '12px' }}>Department</th>
                    <th style={{ padding: '12px' }}>DSA & Logic</th>
                    <th style={{ padding: '12px' }}>Web & App Dev</th>
                    <th style={{ padding: '12px' }}>DevOps & Cloud</th>
                    <th style={{ padding: '12px' }}>Soft Skills</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics?.departmentSkillHeatmap?.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '12px', fontWeight: 700, color: '#0F172A' }}>{row.dept}</td>
                      <td style={{ padding: '12px', color: '#16A34A', fontWeight: 600 }}>{row.dsa}</td>
                      <td style={{ padding: '12px', color: '#16A34A', fontWeight: 600 }}>{row.webDev}</td>
                      <td style={{ padding: '12px', color: '#DC2626', fontWeight: 600 }}>{row.devOps}</td>
                      <td style={{ padding: '12px', color: '#2563EB', fontWeight: 600 }}>{row.softSkills}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
