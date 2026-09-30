import React, { useState } from 'react';
import {
  Search,
  Briefcase,
  Compass,
  BookOpen,
  Sliders,
  Award,
  Sparkles,
  ChevronRight,
  Filter,
  CheckCircle2,
  Building,
  GraduationCap,
  Zap,
  ArrowRight,
  Shield,
  FileText,
  Clock,
  Trash2,
  RotateCcw
} from 'lucide-react';

// =============================================================================
// GLOBAL INDEXED SEARCH DATABASE
// =============================================================================
export const GLOBAL_SEARCH_DATABASE = [
  // --- MIND GAMES & PUZZLES ---
  {
    id: 'mg-1',
    category: 'Learning & Skill Development',
    subFeatureId: 'mind-games',
    title: 'Mind Games & Puzzles Dashboard',
    subtitle: 'Cognitive Growth & Aptitude Prep',
    description: 'Interactive logical reasoning, memory match, Sudoku, river crossing, and speed arithmetic puzzles for placement aptitude.',
    tags: ['Mind Games', 'Puzzles', 'Sudoku', 'Logical Reasoning', 'Memory', 'Aptitude', 'Brain'],
    badge: 'New Feature'
  },
  // --- JOBS & INTERNSHIPS ---
  {
    id: 'job-1',
    category: 'Jobs & Internships',
    subFeatureId: 'jobs-opportunities',
    title: 'Java Backend Engineer',
    subtitle: 'TechCorp India • Full-Time',
    description: 'Build high-throughput REST APIs and Spring Boot microservices. Requires Java, SQL, and Git.',
    tags: ['Java', 'Spring Boot', 'SQL', 'Backend', 'Full-Time'],
    badge: 'Verified Opportunity'
  },
  {
    id: 'job-2',
    category: 'Jobs & Internships',
    subFeatureId: 'jobs-opportunities',
    title: 'Full Stack React & Node Developer Intern',
    subtitle: 'InnovateLabs • Remote Internship',
    description: 'Work on React frontend components and Express.js REST APIs. Ideal for 3rd and 4th-year students.',
    tags: ['React', 'Node.js', 'JavaScript', 'Internship', 'Remote'],
    badge: 'Recommended'
  },
  {
    id: 'job-3',
    category: 'Jobs & Internships',
    subFeatureId: 'jobs-opportunities',
    title: 'Data Analyst Graduate Trainee',
    subtitle: 'FinAnalytics • Hybrid',
    description: 'Perform SQL data cleaning, Python Pandas analysis, and PowerBI dashboard visualization.',
    tags: ['Data Analyst', 'SQL', 'Python', 'Pandas', 'PowerBI'],
    badge: 'Verified Opportunity'
  },
  {
    id: 'job-4',
    category: 'Jobs & Internships',
    subFeatureId: 'jobs-opportunities',
    title: 'AI/ML Engineering Intern',
    subtitle: 'CloudScale AI • Bangalore / Hybrid',
    description: 'Train supervised machine learning models, evaluate confusion matrices, and build NLP endpoints.',
    tags: ['AI/ML', 'Python', 'TensorFlow', 'Scikit-Learn', 'Internship'],
    badge: 'High Match'
  },
  {
    id: 'job-5',
    category: 'Jobs & Internships',
    subFeatureId: 'jobs-opportunities',
    title: 'Cloud Infrastructure Support Associate',
    subtitle: 'AWS Partner Tech • Full-Time',
    description: 'Deploy EC2 instances, manage IAM permissions, and configure auto-scaling load balancers.',
    tags: ['Cloud Engineer', 'AWS', 'Linux', 'Docker', 'DevOps'],
    badge: 'Verified Opportunity'
  },

  // --- CAREER ROLES & ROADMAPS ---
  {
    id: 'role-1',
    category: 'Career Roles',
    subFeatureId: 'academic-guidance',
    title: 'Java Developer Career Roadmap',
    subtitle: 'Structured 5-Stage Path',
    description: 'Master Core Java, Spring Boot, REST APIs, Microservices, and Database Indexing step-by-step.',
    tags: ['Java', 'Spring Boot', 'SQL', 'Roadmap', 'Backend'],
    badge: 'Career Path'
  },
  {
    id: 'role-2',
    category: 'Career Roles',
    subFeatureId: 'academic-guidance',
    title: 'AI/ML Engineer Career Roadmap',
    subtitle: 'Structured 5-Stage Path',
    description: 'Learn Python, Applied Mathematics, Supervised ML, Deep Learning, and Neural Network Deployment.',
    tags: ['AI/ML', 'Python', 'Machine Learning', 'Roadmap'],
    badge: 'Career Path'
  },
  {
    id: 'role-3',
    category: 'Career Roles',
    subFeatureId: 'academic-guidance',
    title: 'Data Analyst Career Roadmap',
    subtitle: 'Structured 5-Stage Path',
    description: 'Master SQL Joins, Aggregations, Data Wrangling with Pandas, and Executive Storytelling.',
    tags: ['Data Analyst', 'SQL', 'Python', 'Analytics'],
    badge: 'Career Path'
  },
  {
    id: 'role-4',
    category: 'Career Roles',
    subFeatureId: 'academic-guidance',
    title: 'Cloud Engineer Career Roadmap',
    subtitle: 'Structured 5-Stage Path',
    description: 'Understand Cloud Models (IaaS, PaaS, SaaS), AWS Virtualization, IAM, and DevOps CI/CD.',
    tags: ['Cloud Engineer', 'AWS', 'DevOps', 'Roadmap'],
    badge: 'Career Path'
  },

  // --- SKILLS & COURSES ---
  {
    id: 'skill-1',
    category: 'Skills & Courses',
    subFeatureId: 'free-courses',
    title: 'Java & Spring Boot Microservices Masterclass',
    subtitle: 'SkillAura Learning Hub Course',
    description: 'Free interactive modules on Java OOP pillars, Multithreading, HashMap internals, and Spring Security.',
    tags: ['Java', 'Spring Boot', 'Course', 'Free', 'Backend'],
    badge: 'Free Course'
  },
  {
    id: 'skill-2',
    category: 'Skills & Courses',
    subFeatureId: 'free-courses',
    title: 'React.js & Frontend Architecture',
    subtitle: 'SkillAura Learning Hub Course',
    description: 'Learn State Management, Custom Hooks, Virtual DOM, and Responsive Web Layouts.',
    tags: ['React', 'JavaScript', 'Frontend', 'Course'],
    badge: 'Free Course'
  },
  {
    id: 'skill-3',
    category: 'Skills & Courses',
    subFeatureId: 'free-courses',
    title: 'SQL Database Administration & Query Optimization',
    subtitle: 'SkillAura Learning Hub Course',
    description: 'Master Complex Joins, Subqueries, Indexing strategies, and Normalized Schemas.',
    tags: ['SQL', 'Database', 'PostgreSQL', 'Course'],
    badge: 'Free Course'
  },

  // --- PROJECTS ---
  {
    id: 'proj-1',
    category: 'Projects',
    subFeatureId: 'project-lab',
    title: 'E-Commerce Microservices Backend Platform',
    subtitle: 'Project Lab • Practical Builder',
    description: 'Design and build a scalable shopping cart API using Spring Boot, PostgreSQL, and Docker.',
    tags: ['Java', 'Spring Boot', 'Microservices', 'Project', 'SQL'],
    badge: 'Project Lab'
  },
  {
    id: 'proj-2',
    category: 'Projects',
    subFeatureId: 'project-lab',
    title: 'AI Resume Matcher & Screening Tool',
    subtitle: 'Project Lab • Practical Builder',
    description: 'Build an NLP application that parses uploaded PDF resumes and calculates job match percentage.',
    tags: ['Python', 'AI/ML', 'NLP', 'React', 'Project'],
    badge: 'Project Lab'
  },

  // --- PLATFORM TOOLS ---
  {
    id: 'tool-1',
    category: 'Platform Tools',
    subFeatureId: 'mock-interviews',
    title: 'AI Mock Interview Studio',
    subtitle: 'Live Camera & Voice Interview Room',
    description: 'Practise Technical, HR, Project, and Company-Specific interview questions with AI STAR feedback.',
    tags: ['Mock Interview', 'Voice', 'Camera', 'STAR', 'HR'],
    badge: 'Interactive Tool'
  },
  {
    id: 'tool-2',
    category: 'Platform Tools',
    subFeatureId: 'communication-skills',
    title: '30-Second Elevator Pitch Practice',
    subtitle: 'Speech & Self-Introduction Studio',
    description: 'Generate, edit, and practise speaking a 30-second self-introduction with WPM and filler word checks.',
    tags: ['Elevator Pitch', 'Communication', 'Voice', 'Self-Intro'],
    badge: 'Interactive Tool'
  },
  {
    id: 'tool-3',
    category: 'Platform Tools',
    subFeatureId: 'resume-assist',
    title: 'Resume Assist (Analyzer & Improvement)',
    subtitle: 'ATS Compatibility & Bullet Polishing',
    description: 'Analyze resume score, fix rejected resume formatting, and target company-specific requirements.',
    tags: ['Resume', 'ATS', 'CV', 'Correction'],
    badge: 'Interactive Tool'
  },
  {
    id: 'tool-4',
    category: 'Platform Tools',
    subFeatureId: 'govt-opportunities-schemes',
    title: 'Government Opportunities & Schemes',
    subtitle: 'Central & State Student Schemes',
    description: 'Discover government scholarships, tech apprenticeships, and PSU recruitment notices.',
    tags: ['Government', 'Schemes', 'Scholarships', 'PSU'],
    badge: 'Verified Govt'
  }
];

export default function GlobalSearchResultsPage({ searchQuery = '', studentProfile, onNavigate }) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Perform search filtering
  const currentQuery = localQuery.trim().toLowerCase();

  const filteredResults = GLOBAL_SEARCH_DATABASE.filter(item => {
    if (!currentQuery) return true;

    const matchesTitle = item.title.toLowerCase().includes(currentQuery);
    const matchesSubtitle = item.subtitle.toLowerCase().includes(currentQuery);
    const matchesDesc = item.description.toLowerCase().includes(currentQuery);
    const matchesCategory = item.category.toLowerCase().includes(currentQuery);
    const matchesTags = item.tags.some(t => t.toLowerCase().includes(currentQuery));

    const matchesQuery = matchesTitle || matchesSubtitle || matchesDesc || matchesCategory || matchesTags;
    const matchesCategoryFilter = activeCategoryFilter === 'All' || item.category === activeCategoryFilter;

    return matchesQuery && matchesCategoryFilter;
  });

  // Unique categories for filtering
  const categoriesList = ['All', 'Jobs & Internships', 'Career Roles', 'Skills & Courses', 'Projects', 'Platform Tools'];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FAF7FF 0%, #FFF0F7 100%)',
      padding: '28px 24px',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: '#1E1B4B'
    }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* HEADER SECTION */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '28px',
          border: '1px solid #F3E8FF',
          boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{
              background: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: '700',
              letterSpacing: '0.5px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Sparkles size={14} /> SKILLAURA SMART GLOBAL SEARCH
            </span>
          </div>

          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1E1B4B', margin: '0 0 12px 0' }}>
            {currentQuery ? `Search Results for "${localQuery}"` : 'Explore All SkillAura Opportunities & Resources'}
          </h1>

          {/* Search Input Bar */}
          <div style={{ position: 'relative', maxWidth: '640px' }}>
            <Search size={20} color="#9333EA" style={{ position: 'absolute', left: '16px', top: '14px' }} />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Search jobs, skills, roles, courses, projects, or tools..."
              style={{
                width: '100%',
                padding: '14px 16px 14px 48px',
                borderRadius: '16px',
                border: '2px solid #E9D5FF',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* CATEGORY FILTER PILLS */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {categoriesList.map(cat => {
            const isSel = activeCategoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '20px',
                  border: isSel ? '1.5px solid #9333EA' : '1px solid #E5E7EB',
                  background: isSel ? '#9333EA' : '#FFFFFF',
                  color: isSel ? '#FFFFFF' : '#4B5563',
                  fontSize: '0.88rem',
                  fontWeight: isSel ? '700' : '500',
                  cursor: 'pointer',
                  boxShadow: isSel ? '0 4px 12px rgba(147, 51, 234, 0.2)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* RESULTS GRID */}
        {filteredResults.length === 0 ? (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '48px',
            textAlign: 'center',
            border: '1px solid #F3E8FF'
          }}>
            <Search size={48} color="#D1D5DB" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1E1B4B', margin: '0 0 6px 0' }}>
              No matching results found for "{localQuery}"
            </h3>
            <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '20px' }}>
              Try checking spelling or search for popular topics like <strong>Java</strong>, <strong>React</strong>, <strong>Data Analyst</strong>, <strong>Mock Interview</strong>, or <strong>Projects</strong>.
            </p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {['Java', 'Spring Boot', 'React', 'Data Analyst', 'Mock Interview', 'Project Lab'].map(term => (
                <button
                  key={term}
                  onClick={() => setLocalQuery(term)}
                  style={{
                    background: '#F3E8FF',
                    color: '#7E22CE',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '6px 14px',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '18px' }}>
            {filteredResults.map(item => (
              <div
                key={item.id}
                onClick={() => onNavigate && onNavigate(item.subFeatureId)}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '20px',
                  border: '1px solid #F3E8FF',
                  boxShadow: '0 4px 16px rgba(147, 51, 234, 0.04)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      color: '#9333EA',
                      background: '#F3E8FF',
                      padding: '3px 10px',
                      borderRadius: '8px'
                    }}>
                      {item.category}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#059669', background: '#ECFDF5', padding: '3px 8px', borderRadius: '6px', fontWeight: '700' }}>
                      {item.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1E1B4B', margin: '0 0 4px 0', lineHeight: '1.4' }}>
                    {item.title}
                  </h3>

                  <div style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: '600', marginBottom: '10px' }}>
                    {item.subtitle}
                  </div>

                  <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: '1.5', margin: '0 0 14px 0' }}>
                    {item.description}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {item.tags.slice(0, 3).map((t, idx) => (
                      <span key={idx} style={{ fontSize: '0.72rem', background: '#F9FAFB', color: '#6B7280', padding: '2px 6px', borderRadius: '4px' }}>
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#9333EA', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Open Module <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
