import React, { useState } from 'react';
import { 
  UserCheck, 
  Briefcase, 
  Building2, 
  FileText, 
  GraduationCap, 
  Mic, 
  BarChart2, 
  HelpCircle, 
  Globe, 
  LogOut, 
  ChevronDown, 
  ChevronRight,
  Target,
  Sparkles,
  ShieldAlert,
  Award,
  BookOpen,
  MessageSquare,
  Compass,
  TrendingUp,
  Bell,
  Star, 
  Layers,
  Share2
} from 'lucide-react';
import { t, isRTL } from '../utils/i18n';

export default function LeftSidebar({ 
  activeSubFeature, 
  onSelectSubFeature,
  onLogout,
  language = 'English'
}) {
  const [expandedCategories, setExpandedCategories] = useState({
    guidance: true,
    jobs: true,
    tpo: false,
    resume: true,
    learning: true,
    support: false
  });

  const toggleCategory = (catKey) => {
    setExpandedCategories(prev => ({ ...prev, [catKey]: !prev[catKey] }));
  };

  const rtl = isRTL(language);

  const featureMenu = [
    {
      id: 'guidance',
      title: t('career_guidance_header', language) || 'Personalized Career Guidance',
      icon: UserCheck,
      subFeatures: [
        { id: 'profile-analysis', label: t('students-profile-analysis', language) || 'Students Profile Analysis', icon: UserCheck },
        { id: 'academic-guidance', label: t('academic-guidance', language), icon: Compass },
        { id: 'connected-jobs-network', label: t('connected-jobs-network', language) || 'Connected Jobs Network', icon: Share2 },
        { id: 'skill-gap', label: t('skill-gap', language), icon: Sparkles },
        { id: 'employability-score', label: t('employability-score', language), icon: BarChart2 },
        { id: 'skill-demand', label: t('skill-demand', language), icon: TrendingUp }
      ]
    },
    {
      id: 'jobs',
      title: t('opportunities_header', language) || 'Jobs, Internships & Opportunities',
      icon: Briefcase,
      subFeatures: [
        { id: 'jobs-opportunities', label: t('jobs-opportunities', language), icon: Briefcase },
        { id: 'govt-opportunities-schemes', label: t('govt-opportunities-schemes', language), icon: Building2 },
        { id: 'job-alerts', label: t('job-alerts', language), icon: Bell }
      ]
    },
    {
      id: 'tpo',
      title: t('tpo', language) || 'College / TPO Dashboard',
      icon: Building2,
      subFeatures: [
        { id: 'tpo', label: t('tpo', language), icon: Building2 }
      ]
    },
    {
      id: 'resume',
      title: t('resume-assist', language) || 'Resume & Placement Support',
      icon: FileText,
      subFeatures: [
        { id: 'resume-assist', label: t('resume-assist', language), icon: FileText }
      ]
    },
    {
      id: 'learning',
      title: t('tools_header', language) || 'Learning & Skill Development',
      icon: GraduationCap,
      subFeatures: [
        { id: 'project-ideas', label: t('project-ideas', language), icon: Layers },
        { id: 'communication-skills', label: t('communication-skills', language), icon: MessageSquare },
        { id: 'mock-interviews', label: t('mock-interviews', language), icon: Mic }
      ]
    }
  ];

  return (
    <aside className="sidebar-container" style={{ direction: rtl ? 'rtl' : 'ltr' }}>
      <div style={{
        padding: '0 8px 14px 8px',
        borderBottom: '1px solid #EAE2F8',
        marginBottom: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#2D1B4E', letterSpacing: '0.02em' }}>
          Skillora Features
        </h3>
        <span className="badge-pill" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
          {language}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {featureMenu.map((cat) => {
          const CatIcon = cat.icon;
          const isExpanded = expandedCategories[cat.id];

          return (
            <div key={cat.id} style={{ marginBottom: '6px' }}>
              {/* Category Header */}
              <div 
                onClick={() => toggleCategory(cat.id)}
                className={`sidebar-item ${isExpanded ? 'active' : ''}`}
                style={{ justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CatIcon size={18} color={isExpanded ? "#9333EA" : "#7A6F8A"} />
                  <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{cat.title}</span>
                </div>
                {isExpanded ? <ChevronDown size={15} color="#9333EA" /> : <ChevronRight size={15} color="#7A6F8A" />}
              </div>

              {/* Sub-features */}
              {isExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2px', paddingLeft: rtl ? 0 : '6px', paddingRight: rtl ? '6px' : 0 }}>
                  {cat.subFeatures.map((sub) => {
                    const SubIcon = sub.icon;
                    const isSelected = activeSubFeature === sub.id;

                    return (
                      <div
                        key={sub.id}
                        onClick={() => onSelectSubFeature(sub.id)}
                        className={`sidebar-subitem ${isSelected ? 'active' : ''}`}
                      >
                        <SubIcon size={14} color={isSelected ? "#9333EA" : "#7A6F8A"} />
                        <span>{sub.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        <div style={{ margin: '12px 0', borderTop: '1px solid #EAE2F8' }} />

        {/* Translation Option */}
        <div 
          onClick={() => onSelectSubFeature('language-translation')}
          className={`sidebar-item ${activeSubFeature === 'language-translation' ? 'active' : ''}`}
        >
          <Globe size={18} color="#9333EA" />
          <span>{t('language-translation', language)}</span>
        </div>

        {/* Logout */}
        <div 
          onClick={onLogout}
          className="sidebar-item"
          style={{ color: '#DC2626' }}
        >
          <LogOut size={18} color="#DC2626" />
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
}
