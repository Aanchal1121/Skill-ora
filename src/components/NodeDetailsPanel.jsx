import React from 'react';
import { 
  X, 
  Target, 
  Sparkles, 
  Briefcase, 
  Building2, 
  GraduationCap, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  Plus,
  Bookmark,
  BookmarkCheck,
  MessageSquare,
  Compass,
  Zap,
  Clock,
  MapPin,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { NODE_TYPES, getNodeById } from '../data/careerNetworkData';

export default function NodeDetailsPanel({
  selectedNode,
  onClose,
  onNavigate,
  onAddSkillTag,
  onSaveJob,
  isJobSaved,
  onOpenJobModal,
  onOpenCourseModal,
  onOpenGovtModal,
  onSelectNode
}) {
  if (!selectedNode) return null;

  const typeConfig = NODE_TYPES[selectedNode.type.toUpperCase()] || NODE_TYPES.ROLE;

  return (
    <aside
      className="fade-in"
      style={{
        width: '380px',
        maxWidth: '100%',
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #EAE2F8',
        boxShadow: '-4px 0 24px rgba(147, 51, 234, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
        position: 'relative'
      }}
    >
      {/* Panel Header */}
      <div
        style={{
          padding: '20px',
          borderBottom: '1px solid #EAE2F8',
          background: typeConfig.bg,
          position: 'sticky',
          top: 0,
          zIndex: 5
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span
            style={{
              background: '#FFFFFF',
              color: typeConfig.color,
              border: `1px solid ${typeConfig.border}`,
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: typeConfig.color }} />
            {typeConfig.label}
          </span>
          <button
            onClick={onClose}
            style={{
              background: '#FFFFFF',
              border: '1px solid #EAE2F8',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#7A6F8A'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', marginTop: '12px' }}>
          {selectedNode.label}
        </h3>

        {selectedNode.company && (
          <div style={{ fontSize: '0.9rem', color: '#9333EA', fontWeight: 700, marginTop: '2px' }}>
            🏢 {selectedNode.company}
          </div>
        )}
        {selectedNode.department && (
          <div style={{ fontSize: '0.88rem', color: '#7C3AED', fontWeight: 700, marginTop: '2px' }}>
            🏛️ {selectedNode.department}
          </div>
        )}

        {/* Match Pct Pill if available */}
        {selectedNode.matchPct && (
          <div style={{ marginTop: '10px' }}>
            <span className="badge-pill" style={{ background: '#ECFDF5', color: '#059669', borderColor: '#A7F3D0' }}>
              ✓ {selectedNode.matchPct}% Student Match (Illustrative)
            </span>
          </div>
        )}
      </div>

      {/* Panel Body Content based on Node Type */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', flexGrow: 1 }}>
        
        {/* --- A. CAREER ROLE DETAILS --- */}
        {selectedNode.type === 'role' && (
          <>
            <div>
              <h5 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#7A6F8A', textTransform: 'uppercase', marginBottom: '6px' }}>
                Overview
              </h5>
              <p style={{ fontSize: '0.9rem', color: '#4A3E56', lineHeight: '1.5' }}>
                {selectedNode.shortDesc}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ background: '#FAF7FF', padding: '12px', borderRadius: '12px', border: '1px solid #EAE2F8' }}>
                <span style={{ fontSize: '0.74rem', color: '#7A6F8A', fontWeight: 700 }}>SALARY RANGE</span>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#9333EA', marginTop: '2px' }}>
                  {selectedNode.salaryRange}
                </div>
              </div>
              <div style={{ background: '#FAF7FF', padding: '12px', borderRadius: '12px', border: '1px solid #EAE2F8' }}>
                <span style={{ fontSize: '0.74rem', color: '#7A6F8A', fontWeight: 700 }}>DEMAND LEVEL</span>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#059669', marginTop: '2px' }}>
                  {selectedNode.demandLevel}
                </div>
              </div>
            </div>

            {/* Required Skills */}
            <div>
              <h5 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#7A6F8A', textTransform: 'uppercase', marginBottom: '8px' }}>
                Required Skills
              </h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedNode.requiredSkills?.map((skill, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: '#F0EAFA',
                      color: '#9333EA',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '12px',
                      border: '1px solid #E5D9F2'
                    }}
                  >
                    ⚡ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Typical Responsibilities */}
            {selectedNode.responsibilities && (
              <div>
                <h5 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#7A6F8A', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Key Responsibilities
                </h5>
                <ul style={{ paddingLeft: '18px', fontSize: '0.86rem', color: '#4A3E56', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {selectedNode.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Entry Level Qualification */}
            {selectedNode.qualification && (
              <div style={{ background: '#FFF5FA', padding: '12px', borderRadius: '12px', border: '1px solid #F6DCEC' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#EC4899', textTransform: 'uppercase' }}>
                  ENTRY QUALIFICATION
                </div>
                <div style={{ fontSize: '0.85rem', color: '#2D1B4E', fontWeight: 600, marginTop: '2px' }}>
                  🎓 {selectedNode.qualification}
                </div>
              </div>
            )}

            {/* Career Progression Pathways */}
            {selectedNode.careerPathways && (
              <div>
                <h5 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#7A6F8A', textTransform: 'uppercase', marginBottom: '10px' }}>
                  Career Progression Pathway
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {selectedNode.careerPathways.map((step, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: i === 1 ? '#9333EA' : '#F0EAFA',
                          color: i === 1 ? '#FFFFFF' : '#9333EA',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 800
                        }}
                      >
                        {i + 1}
                      </div>
                      <span style={{ fontSize: '0.86rem', fontWeight: i === 1 ? 700 : 500, color: '#2D1B4E' }}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons for Role */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              <button
                className="btn-primary"
                onClick={() => onNavigate('skill-gap')}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Sparkles size={16} />
                <span>View Skill Gap</span>
              </button>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  className="btn-secondary"
                  onClick={() => onNavigate('internships-jobs')}
                  style={{ fontSize: '0.82rem', padding: '8px 12px', justifyContent: 'center' }}
                >
                  <Briefcase size={14} />
                  <span>Explore Jobs</span>
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => onNavigate('academic-guidance')}
                  style={{ fontSize: '0.82rem', padding: '8px 12px', justifyContent: 'center' }}
                >
                  <Compass size={14} />
                  <span>Career Path</span>
                </button>
              </div>
              <button
                className="btn-secondary"
                onClick={() => onNavigate('career-chat')}
                style={{ width: '100%', justifyContent: 'center', color: '#9333EA', borderColor: '#E5D9F2' }}
              >
                <MessageSquare size={15} />
                <span>Ask AI About This Role</span>
              </button>
            </div>
          </>
        )}

        {/* --- B. SKILL DETAILS --- */}
        {selectedNode.type === 'skill' && (
          <>
            <div>
              <h5 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#7A6F8A', textTransform: 'uppercase', marginBottom: '6px' }}>
                Description & Category
              </h5>
              <p style={{ fontSize: '0.9rem', color: '#4A3E56', lineHeight: '1.5' }}>
                {selectedNode.description}
              </p>
              <div style={{ marginTop: '8px' }}>
                <span className="badge-pill" style={{ background: '#CCFBF1', color: '#0D9488', borderColor: '#99F6E4' }}>
                  Category: {selectedNode.category}
                </span>
              </div>
            </div>

            <div style={{ background: '#FAF7FF', padding: '14px', borderRadius: '14px', border: '1px solid #EAE2F8' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#7A6F8A', textTransform: 'uppercase' }}>
                STUDENT VS REQUIRED PROFICIENCY
              </div>
              <div style={{ marginTop: '6px', fontSize: '0.88rem' }}>
                Your Level: <strong style={{ color: '#0D9488' }}>{selectedNode.studentLevel || 'Intermediate'}</strong>
              </div>
              <div style={{ fontSize: '0.88rem', color: '#4A3E56' }}>
                Target Level: <strong style={{ color: '#9333EA' }}>{selectedNode.requiredLevel || 'Advanced'}</strong>
              </div>
            </div>

            {selectedNode.importance && (
              <div>
                <h5 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#7A6F8A', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Industry Importance
                </h5>
                <p style={{ fontSize: '0.86rem', color: '#4A3E56' }}>
                  {selectedNode.importance}
                </p>
              </div>
            )}

            {/* Certifications */}
            {selectedNode.certifications && (
              <div>
                <h5 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#7A6F8A', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Recommended Certifications
                </h5>
                <ul style={{ paddingLeft: '18px', fontSize: '0.86rem', color: '#4A3E56' }}>
                  {selectedNode.certifications.map((cert, i) => (
                    <li key={i}>{cert}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons for Skill */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              <button
                className="btn-primary"
                onClick={() => onAddSkillTag(selectedNode.label)}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Plus size={16} />
                <span>Add to Skill Search</span>
              </button>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  className="btn-secondary"
                  onClick={() => onNavigate('free-courses')}
                  style={{ fontSize: '0.82rem', padding: '8px 12px', justifyContent: 'center' }}
                >
                  <GraduationCap size={14} />
                  <span>Find Courses</span>
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => onNavigate('skill-gap')}
                  style={{ fontSize: '0.82rem', padding: '8px 12px', justifyContent: 'center' }}
                >
                  <Sparkles size={14} />
                  <span>View Gap</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* --- C. JOB OR INTERNSHIP DETAILS --- */}
        {selectedNode.type === 'job' && (
          <>
            <div>
              <p style={{ fontSize: '0.9rem', color: '#4A3E56', lineHeight: '1.5' }}>
                {selectedNode.description}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ background: '#FAF7FF', padding: '10px', borderRadius: '12px', border: '1px solid #EAE2F8' }}>
                <span style={{ fontSize: '0.74rem', color: '#7A6F8A', fontWeight: 700 }}>STIPEND / SALARY</span>
                <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#EC4899' }}>
                  {selectedNode.salary}
                </div>
              </div>
              <div style={{ background: '#FAF7FF', padding: '10px', borderRadius: '12px', border: '1px solid #EAE2F8' }}>
                <span style={{ fontSize: '0.74rem', color: '#7A6F8A', fontWeight: 700 }}>LOCATION</span>
                <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#2D1B4E' }}>
                  {selectedNode.location}
                </div>
              </div>
            </div>

            {selectedNode.eligibility && (
              <div>
                <h5 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#7A6F8A', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Eligibility Criteria
                </h5>
                <p style={{ fontSize: '0.85rem', color: '#2D1B4E', fontWeight: 600 }}>
                  {selectedNode.eligibility}
                </p>
              </div>
            )}

            {/* Required Skills */}
            <div>
              <h5 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#7A6F8A', textTransform: 'uppercase', marginBottom: '6px' }}>
                Required Skills
              </h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedNode.requiredSkills?.map((skill, idx) => (
                  <span key={idx} style={{ background: '#FCE7F3', color: '#EC4899', fontSize: '0.78rem', fontWeight: 700, padding: '3px 8px', borderRadius: '10px' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons for Job */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              <button
                className="btn-primary"
                onClick={() => onOpenJobModal(selectedNode)}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Briefcase size={16} />
                <span>View Job Details</span>
              </button>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  className="btn-secondary"
                  onClick={() => onNavigate('skill-gap')}
                  style={{ fontSize: '0.82rem', padding: '8px 12px', justifyContent: 'center' }}
                >
                  <CheckCircle2 size={14} />
                  <span>Check Match</span>
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => onSaveJob(selectedNode.id)}
                  style={{
                    fontSize: '0.82rem',
                    padding: '8px 12px',
                    justifyContent: 'center',
                    color: isJobSaved ? '#059669' : '#2D1B4E',
                    borderColor: isJobSaved ? '#A7F3D0' : '#EAE2F8'
                  }}
                >
                  {isJobSaved ? <BookmarkCheck size={14} color="#059669" /> : <Bookmark size={14} />}
                  <span>{isJobSaved ? 'Saved' : 'Save Job'}</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* --- D. COMPANY DETAILS --- */}
        {selectedNode.type === 'company' && (
          <>
            <div>
              <span className="badge-pill" style={{ background: '#DBEAFE', color: '#2563EB', borderColor: '#BFDBFE', marginBottom: '8px' }}>
                Industry: {selectedNode.industry}
              </span>
              <p style={{ fontSize: '0.9rem', color: '#4A3E56', lineHeight: '1.5', marginTop: '8px' }}>
                {selectedNode.description}
              </p>
            </div>

            {selectedNode.sampleJobs && (
              <div>
                <h5 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#7A6F8A', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Sample Openings
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {selectedNode.sampleJobs.map((jobName, idx) => (
                    <div key={idx} style={{ background: '#FAF7FF', padding: '8px 12px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, color: '#2D1B4E' }}>
                      💼 {jobName}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              className="btn-primary"
              onClick={() => onNavigate('internships-jobs')}
              style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
            >
              <Building2 size={16} />
              <span>Explore Company Opportunities</span>
            </button>
          </>
        )}

        {/* --- E. COURSE DETAILS --- */}
        {selectedNode.type === 'course' && (
          <>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#EA580C', fontWeight: 700 }}>
                Provided by: {selectedNode.provider}
              </div>
              <p style={{ fontSize: '0.9rem', color: '#4A3E56', lineHeight: '1.5', marginTop: '6px' }}>
                {selectedNode.description}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ background: '#FFEDD5', padding: '10px', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.74rem', color: '#C2410C', fontWeight: 700 }}>DURATION</span>
                <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#C2410C' }}>
                  {selectedNode.duration}
                </div>
              </div>
              <div style={{ background: '#FFEDD5', padding: '10px', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.74rem', color: '#C2410C', fontWeight: 700 }}>PRICE / STATUS</span>
                <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#C2410C' }}>
                  {selectedNode.price}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              <button
                className="btn-primary"
                onClick={() => onOpenCourseModal(selectedNode)}
                style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)' }}
              >
                <GraduationCap size={16} />
                <span>View Course Details</span>
              </button>
              <button
                className="btn-secondary"
                onClick={() => onNavigate('free-courses')}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Plus size={15} />
                <span>Add to Learning Plan</span>
              </button>
            </div>
          </>
        )}

        {/* --- F. GOVERNMENT EXAM DETAILS --- */}
        {selectedNode.type === 'govt' && (
          <>
            <div>
              <p style={{ fontSize: '0.9rem', color: '#4A3E56', lineHeight: '1.5' }}>
                {selectedNode.eligibility}
              </p>
            </div>

            {selectedNode.importantDates && (
              <div style={{ background: '#EDE9FE', padding: '12px', borderRadius: '12px', border: '1px solid #DDD6FE' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase' }}>
                  IMPORTANT DATES
                </div>
                <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#5B21B6', marginTop: '2px' }}>
                  🗓️ {selectedNode.importantDates}
                </div>
              </div>
            )}

            <button
              className="btn-primary"
              onClick={() => onOpenGovtModal(selectedNode)}
              style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)' }}
            >
              <Award size={16} />
              <span>View Opportunity Details</span>
            </button>
          </>
        )}

      </div>
    </aside>
  );
}
