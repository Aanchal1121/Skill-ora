import React, { useState } from 'react';
import { Search, RotateCcw, X, Plus, Filter, Tag } from 'lucide-react';
import { DOMAINS } from '../data/careerNetworkData';

export default function NetworkFilters({
  selectedDomain,
  setSelectedDomain,
  selectedRole,
  setSelectedRole,
  skillTags,
  setSkillTags,
  filters,
  setFilters,
  onSearch,
  onReset,
  availableRoles = []
}) {
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = (e) => {
    e.preventDefault();
    const trimmed = skillInput.trim();
    if (trimmed && !skillTags.includes(trimmed)) {
      setSkillTags([...skillTags, trimmed]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkillTags(skillTags.filter(s => s !== skillToRemove));
  };

  const popularSkillSuggestions = ['SQL', 'Python', 'Excel', 'Power BI', 'Java', 'React', 'Communication', 'Figma'];

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #EAE2F8',
        padding: '20px',
        boxShadow: '0 4px 18px rgba(185, 160, 232, 0.08)',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}
    >
      {/* Top Search Controls Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', alignItems: 'end' }}>
        
        {/* Domain Dropdown */}
        <div>
          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '6px', display: 'block' }}>
            Domain / Sector
          </label>
          <select
            className="form-control"
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            style={{ fontWeight: 600 }}
          >
            {DOMAINS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Career Role Dropdown */}
        <div>
          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '6px', display: 'block' }}>
            Target Career Role
          </label>
          <select
            className="form-control"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{ fontWeight: 600 }}
          >
            <option value="All">All Roles</option>
            {availableRoles.map(r => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>
        </div>

        {/* Multi-Skill Tag Input */}
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '6px', display: 'block' }}>
            Multi-Skill Tag Search (e.g. SQL + Python + Excel)
          </label>
          <form onSubmit={handleAddSkill} style={{ display: 'flex', gap: '8px' }}>
            <div style={{ position: 'relative', flexGrow: 1 }}>
              <input
                type="text"
                className="form-control"
                placeholder="Type a skill and press Enter or click Add..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
            >
              <Plus size={16} />
              <span>Add Skill</span>
            </button>
          </form>
        </div>

        {/* Search & Reset Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={onSearch}
            className="btn-primary"
            style={{ flexGrow: 1, justifyContent: 'center' }}
          >
            <Search size={16} />
            <span>Search Graph</span>
          </button>

          <button
            onClick={onReset}
            className="btn-secondary"
            title="Reset Graph & Filters"
            style={{ padding: '10px 14px', color: '#DC2626', borderColor: '#FECACA' }}
          >
            <RotateCcw size={16} />
          </button>
        </div>

      </div>

      {/* Selected Skill Tags Display Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#7A6F8A', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Tag size={14} color="#9333EA" /> Active Skill Tags:
        </span>

        {skillTags.length === 0 ? (
          <span style={{ fontSize: '0.8rem', color: '#94A3B8', italic: 'true' }}>
            No skill tags added yet. Click suggested tags below or type above.
          </span>
        ) : (
          skillTags.map(tag => (
            <span
              key={tag}
              style={{
                background: '#F0EAFA',
                color: '#9333EA',
                border: '1px solid #C084FC',
                padding: '4px 10px',
                borderRadius: '16px',
                fontSize: '0.82rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              ⚡ {tag}
              <X
                size={14}
                style={{ cursor: 'pointer', color: '#7E22CE' }}
                onClick={() => handleRemoveSkill(tag)}
              />
            </span>
          ))
        )}
      </div>

      {/* Quick Suggested Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px', paddingTop: '4px', borderTop: '1px dashed #EAE2F8' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7A6F8A' }}>Quick Add:</span>
        {popularSkillSuggestions.map(s => {
          const isSelected = skillTags.includes(s);
          return (
            <button
              key={s}
              onClick={() => {
                if (!isSelected) setSkillTags([...skillTags, s]);
              }}
              style={{
                background: isSelected ? '#F3E8FF' : '#FAF8FE',
                color: isSelected ? '#9333EA' : '#4A3E56',
                border: `1px solid ${isSelected ? '#C084FC' : '#EAE2F8'}`,
                padding: '2px 9px',
                borderRadius: '12px',
                fontSize: '0.76rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              + {s}
            </button>
          );
        })}
      </div>

      {/* Secondary Detailed Filter Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', paddingTop: '8px', borderTop: '1px solid #EAE2F8' }}>
        
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7A6F8A', marginBottom: '2px', display: 'block' }}>
            Job Type
          </label>
          <select
            className="form-control"
            style={{ padding: '6px 10px', fontSize: '0.82rem' }}
            value={filters.jobType}
            onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
          >
            <option value="All">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7A6F8A', marginBottom: '2px', display: 'block' }}>
            Experience Level
          </label>
          <select
            className="form-control"
            style={{ padding: '6px 10px', fontSize: '0.82rem' }}
            value={filters.experienceLevel}
            onChange={(e) => setFilters({ ...filters, experienceLevel: e.target.value })}
          >
            <option value="All">All Levels</option>
            <option value="Internship">Internship</option>
            <option value="Entry-Level (0-1 Years)">Entry-Level / Fresh Grad</option>
            <option value="Fresh Graduate">Fresh Graduate</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7A6F8A', marginBottom: '2px', display: 'block' }}>
            Location
          </label>
          <select
            className="form-control"
            style={{ padding: '6px 10px', fontSize: '0.82rem' }}
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          >
            <option value="All">All Locations</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Pune">Pune</option>
            <option value="Remote">Remote</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7A6F8A', marginBottom: '2px', display: 'block' }}>
            Industry Sector
          </label>
          <select
            className="form-control"
            style={{ padding: '6px 10px', fontSize: '0.82rem' }}
            value={filters.industry}
            onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
          >
            <option value="All">All Industries</option>
            <option value="IT Services & Consulting">IT Services & Consulting</option>
            <option value="IT & Software Services">IT & Software Services</option>
            <option value="Management Consulting & IT">Management Consulting</option>
            <option value="Audit, Tax & Management Consulting">Finance & Audit</option>
          </select>
        </div>

      </div>

    </div>
  );
}
