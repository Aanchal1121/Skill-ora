import React from 'react';
import { 
  Target, 
  Briefcase, 
  Sparkles, 
  GraduationCap, 
  Building2, 
  Award,
  ChevronRight,
  Bookmark
} from 'lucide-react';
import { NODE_TYPES } from '../data/careerNetworkData';

export default function NetworkListView({
  nodes,
  selectedNodeId,
  onSelectNode,
  savedJobIds = [],
  onSaveJob
}) {
  // Group nodes by type
  const roles = nodes.filter(n => n.type === 'role');
  const jobs = nodes.filter(n => n.type === 'job');
  const skills = nodes.filter(n => n.type === 'skill');
  const companies = nodes.filter(n => n.type === 'company');
  const courses = nodes.filter(n => n.type === 'course');
  const govts = nodes.filter(n => n.type === 'govt');

  const renderSectionHeader = (title, count, icon, color, bg) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', marginTop: '10px' }}>
      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2D1B4E' }}>
        {title} <span style={{ fontSize: '0.9rem', color: '#7A6F8A', fontWeight: 600 }}>({count})</span>
      </h3>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', paddingBottom: '30px' }} className="fade-in">
      
      {/* 1. CAREER ROLES SECTION */}
      {roles.length > 0 && (
        <div>
          {renderSectionHeader('Career Roles', roles.length, <Target size={20} />, '#9333EA', '#F3E8FF')}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {roles.map(role => {
              const isSelected = role.id === selectedNodeId;
              return (
                <div
                  key={role.id}
                  onClick={() => onSelectNode(role.id)}
                  style={{
                    background: '#FFFFFF',
                    border: `1.5px solid ${isSelected ? '#9333EA' : '#EAE2F8'}`,
                    borderRadius: '16px',
                    padding: '18px',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 8px 24px rgba(147, 51, 234, 0.15)' : '0 4px 14px rgba(185, 160, 232, 0.06)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2D1B4E' }}>{role.label}</h4>
                    {role.matchPct && (
                      <span style={{ background: '#ECFDF5', color: '#059669', fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '10px' }}>
                        {role.matchPct}% Match
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: '0.84rem', color: '#4A3E56', margin: '8px 0', lineHeight: '1.4' }}>
                    {role.shortDesc}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '10px' }}>
                    {role.requiredSkills?.slice(0, 4).map((s, idx) => (
                      <span key={idx} style={{ background: '#F0EAFA', color: '#9333EA', fontSize: '0.75rem', fontWeight: 600, padding: '2px 8px', borderRadius: '8px' }}>
                        ⚡ {s}
                      </span>
                    ))}
                  </div>

                  <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #FAF7FF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#9333EA', fontWeight: 700 }}>
                    <span>{role.salaryRange}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      View Details <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. JOBS & INTERNSHIPS SECTION */}
      {jobs.length > 0 && (
        <div>
          {renderSectionHeader('Jobs & Internships', jobs.length, <Briefcase size={20} />, '#EC4899', '#FCE7F3')}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {jobs.map(job => {
              const isSelected = job.id === selectedNodeId;
              const isSaved = savedJobIds.includes(job.id);
              return (
                <div
                  key={job.id}
                  onClick={() => onSelectNode(job.id)}
                  style={{
                    background: '#FFFFFF',
                    border: `1.5px solid ${isSelected ? '#EC4899' : '#EAE2F8'}`,
                    borderRadius: '16px',
                    padding: '18px',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 8px 24px rgba(236, 72, 153, 0.15)' : '0 4px 14px rgba(185, 160, 232, 0.06)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2D1B4E' }}>{job.label}</h4>
                      <div style={{ fontSize: '0.82rem', color: '#EC4899', fontWeight: 700 }}>🏢 {job.company}</div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); onSaveJob(job.id); }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: isSaved ? '#059669' : '#7A6F8A' }}
                    >
                      <Bookmark size={18} fill={isSaved ? '#059669' : 'none'} />
                    </button>
                  </div>

                  <p style={{ fontSize: '0.84rem', color: '#4A3E56', margin: '8px 0', lineHeight: '1.4' }}>
                    {job.description}
                  </p>

                  <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', fontWeight: 700, color: '#2D1B4E', marginTop: '8px' }}>
                    <span>💰 {job.salary}</span>
                    <span>📍 {job.location}</span>
                  </div>

                  <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #FAF7FF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#EC4899', fontWeight: 700 }}>
                    <span>{job.jobType}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      Inspect Job <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. SKILLS SECTION */}
      {skills.length > 0 && (
        <div>
          {renderSectionHeader('Required & Key Skills', skills.length, <Sparkles size={20} />, '#0D9488', '#CCFBF1')}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
            {skills.map(skill => {
              const isSelected = skill.id === selectedNodeId;
              return (
                <div
                  key={skill.id}
                  onClick={() => onSelectNode(skill.id)}
                  style={{
                    background: '#FFFFFF',
                    border: `1.5px solid ${isSelected ? '#0D9488' : '#EAE2F8'}`,
                    borderRadius: '14px',
                    padding: '14px',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 6px 20px rgba(13, 148, 136, 0.15)' : '0 2px 10px rgba(185, 160, 232, 0.05)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#2D1B4E' }}>⚡ {skill.label}</h4>
                    <span style={{ fontSize: '0.72rem', background: '#CCFBF1', color: '#0D9488', fontWeight: 700, padding: '2px 6px', borderRadius: '6px' }}>
                      {skill.category}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#7A6F8A', marginTop: '6px', lineHeight: '1.3' }}>
                    {skill.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. COURSES SECTION */}
      {courses.length > 0 && (
        <div>
          {renderSectionHeader('Recommended Courses & Certifications', courses.length, <GraduationCap size={20} />, '#EA580C', '#FFEDD5')}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '14px' }}>
            {courses.map(course => {
              const isSelected = course.id === selectedNodeId;
              return (
                <div
                  key={course.id}
                  onClick={() => onSelectNode(course.id)}
                  style={{
                    background: '#FFFFFF',
                    border: `1.5px solid ${isSelected ? '#EA580C' : '#EAE2F8'}`,
                    borderRadius: '16px',
                    padding: '16px',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 6px 20px rgba(234, 88, 12, 0.15)' : '0 2px 10px rgba(185, 160, 232, 0.05)'
                  }}
                >
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#2D1B4E' }}>🎓 {course.label}</h4>
                  <div style={{ fontSize: '0.78rem', color: '#EA580C', fontWeight: 700, marginTop: '2px' }}>{course.provider}</div>
                  <p style={{ fontSize: '0.82rem', color: '#4A3E56', marginTop: '6px' }}>{course.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.78rem', fontWeight: 700, color: '#2D1B4E' }}>
                    <span>⏱️ {course.duration}</span>
                    <span>🏷️ {course.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. COMPANIES & GOVT SECTION */}
      {(companies.length > 0 || govts.length > 0) && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {companies.length > 0 && (
            <div>
              {renderSectionHeader('Hiring Companies', companies.length, <Building2 size={20} />, '#2563EB', '#DBEAFE')}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {companies.map(comp => (
                  <div
                    key={comp.id}
                    onClick={() => onSelectNode(comp.id)}
                    style={{
                      background: '#FFFFFF',
                      border: `1.5px solid ${comp.id === selectedNodeId ? '#2563EB' : '#EAE2F8'}`,
                      borderRadius: '14px',
                      padding: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#2D1B4E' }}>🏢 {comp.label}</h4>
                    <div style={{ fontSize: '0.78rem', color: '#2563EB', fontWeight: 600 }}>{comp.industry}</div>
                    <p style={{ fontSize: '0.82rem', color: '#4A3E56', marginTop: '4px' }}>{comp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {govts.length > 0 && (
            <div>
              {renderSectionHeader('Government Opportunities', govts.length, <Award size={20} />, '#7C3AED', '#EDE9FE')}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {govts.map(govt => (
                  <div
                    key={govt.id}
                    onClick={() => onSelectNode(govt.id)}
                    style={{
                      background: '#FFFFFF',
                      border: `1.5px solid ${govt.id === selectedNodeId ? '#7C3AED' : '#EAE2F8'}`,
                      borderRadius: '14px',
                      padding: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#2D1B4E' }}>🏛️ {govt.label}</h4>
                    <div style={{ fontSize: '0.78rem', color: '#7C3AED', fontWeight: 600 }}>{govt.department}</div>
                    <p style={{ fontSize: '0.82rem', color: '#4A3E56', marginTop: '4px' }}>{govt.eligibility}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
