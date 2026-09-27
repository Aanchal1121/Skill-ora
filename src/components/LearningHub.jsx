import React, { useState, useEffect } from 'react';
import { GraduationCap, Layers, ExternalLink, Sparkles, DollarSign, Award, Code } from 'lucide-react';

export default function LearningHub() {
  const [courses, setCourses] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {
        setCourses(data.courses || []);
        setProjects(data.microProjects || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '30px 20px' }} className="fade-in">
      
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
        borderRadius: '24px',
        padding: '30px',
        marginBottom: '28px',
        border: '1px solid #BFDBFE',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div className="badge-pill" style={{ background: '#DBEAFE', color: '#2563EB', borderColor: '#93C5FD', marginBottom: '10px' }}>
            <Sparkles size={16} />
            <span>ROI-AWARE FREE LEARNING & MICRO-PROJECTS</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
            Free Course Mapping & Micro-Project Hiring
          </h1>
          <p style={{ color: '#334155', fontSize: '0.95rem' }}>
            Never pay for basic certifications. We map your skill gaps to free NPTEL, SWAYAM, and GitHub project starters.
          </p>
        </div>
      </div>

      {/* FREE COURSES SECTION */}
      <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <GraduationCap size={22} color="#2563EB" />
        <span>Curated Free Courses & ROI Comparison</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {courses.map(course => (
          <div key={course.id} style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase' }}>
                  {course.provider}
                </span>
                <span className="badge-pill" style={{ background: '#F0FDF4', color: '#16A34A', fontSize: '0.78rem' }}>
                  {course.cost}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '10px' }}>
                {course.title}
              </h3>

              <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '12px', marginBottom: '14px', fontSize: '0.85rem' }}>
                <div style={{ color: '#DC2626', fontWeight: 600 }}>Paid EdTech Alternative: {course.roiComparison.paidAlternativeCost}</div>
                <div style={{ color: '#16A34A', fontWeight: 700 }}>Expected Salary Lift: {course.roiComparison.expectedSalaryIncrease}</div>
                <div style={{ color: '#4F46E5', fontWeight: 600, marginTop: '2px' }}>{course.roiComparison.recommendation}</div>
              </div>
            </div>

            <a href={course.url} target="_blank" rel="noreferrer" className="btn-primary" style={{ textDecoration: 'none', justifyCenter: 'center' }}>
              <span>Start Free Course</span>
              <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>

      {/* MICRO-PROJECT HIRING SECTION */}
      <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Layers size={22} color="#8B5CF6" />
        <span>Hands-on Micro-Projects (Gain Real Experience)</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {projects.map(proj => (
          <div key={proj.id} style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#8B5CF6', textTransform: 'uppercase' }}>
                {proj.domain}
              </span>
              <span className="badge-pill" style={{ background: '#EEF2FF', color: '#4F46E5', fontSize: '0.78rem' }}>
                {proj.employabilityBoost}
              </span>
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', marginBottom: '10px' }}>
              {proj.title}
            </h3>

            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '14px' }}>
              Time Estimate: {proj.timeEstimate} • Difficulty: {proj.difficulty}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
              {proj.skillsGained.map((sk, i) => (
                <span key={i} style={{ background: '#F3E8FF', color: '#7C3AED', padding: '2px 8px', borderRadius: '10px', fontSize: '0.78rem', fontWeight: 600 }}>
                  + {sk}
                </span>
              ))}
            </div>

            <a href={proj.githubStarter} target="_blank" rel="noreferrer" className="btn-secondary" style={{ textDecoration: 'none', width: '100%', justifyCenter: 'center' }}>
              <Code size={16} />
              <span>Get GitHub Starter Code</span>
            </a>
          </div>
        ))}
      </div>

    </div>
  );
}
