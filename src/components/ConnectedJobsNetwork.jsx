import React, { useState, useMemo } from 'react';
import { 
  Share2, 
  Grid, 
  Network, 
  Bookmark, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  Award,
  ExternalLink,
  Info
} from 'lucide-react';
import NetworkGraph from './NetworkGraph';
import NodeDetailsPanel from './NodeDetailsPanel';
import NetworkFilters from './NetworkFilters';
import NetworkListView from './NetworkListView';
import { 
  INITIAL_NODES, 
  INITIAL_LINKS, 
  EXPANDED_NODES_DATA, 
  EXPANDED_LINKS_DATA, 
  getNodeById 
} from '../data/careerNetworkData';
import './ConnectedJobsNetwork.css';

export default function ConnectedJobsNetwork({ studentProfile, onNavigate }) {
  const [viewMode, setViewMode] = useState('graph'); // 'graph' | 'list'
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [selectedRole, setSelectedRole] = useState('role-data-analyst');
  const [skillTags, setSkillTags] = useState(['SQL', 'Python']);
  const [filters, setFilters] = useState({
    jobType: 'All',
    experienceLevel: 'All',
    location: 'All',
    industry: 'All'
  });

  const [selectedNodeId, setSelectedNodeId] = useState('role-data-analyst');
  const [isExpanded, setIsExpanded] = useState(false);
  const [savedJobIds, setSavedJobIds] = useState(['job-jr-data-analyst']);
  
  // Modals & Toast State
  const [activeModal, setActiveModal] = useState(null); // { type: 'job'|'course'|'govt'|'skillMatch', node: {} }
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter available role nodes for the dropdown
  const availableRoleNodes = useMemo(() => {
    if (selectedDomain === 'All Domains') return INITIAL_NODES.filter(n => n.type === 'role');
    return INITIAL_NODES.filter(n => n.type === 'role' && n.domain === selectedDomain);
  }, [selectedDomain]);

  // Compute filtered nodes & links based on user selections
  const { currentNodes, currentLinks } = useMemo(() => {
    let nodes = [...INITIAL_NODES];
    let links = [...INITIAL_LINKS];

    // 1. Add expanded node dataset if expansion active
    if (isExpanded) {
      // Merge unique expanded nodes
      EXPANDED_NODES_DATA.forEach(en => {
        if (!nodes.find(n => n.id === en.id)) nodes.push(en);
      });
      EXPANDED_LINKS_DATA.forEach(el => {
        if (!links.find(l => l.source === el.source && l.target === el.target)) links.push(el);
      });
    }

    // 2. Filter by Domain if specified
    if (selectedDomain !== 'All Domains') {
      const domainRoleIds = nodes.filter(n => n.type === 'role' && n.domain === selectedDomain).map(n => n.id);
      // Keep connected nodes to those roles
      const connectedNodeIds = new Set(domainRoleIds);
      links.forEach(l => {
        if (domainRoleIds.includes(l.source)) connectedNodeIds.add(l.target);
        if (domainRoleIds.includes(l.target)) connectedNodeIds.add(l.source);
      });
      nodes = nodes.filter(n => connectedNodeIds.has(n.id));
    }

    // 3. Filter by Selected Role if specified
    if (selectedRole !== 'All') {
      const targetRoleId = selectedRole;
      const connectedNodeIds = new Set([targetRoleId]);
      links.forEach(l => {
        if (l.source === targetRoleId) connectedNodeIds.add(l.target);
        if (l.target === targetRoleId) connectedNodeIds.add(l.source);
      });
      // Also include skill matching nodes if skill tags are present
      nodes = nodes.filter(n => connectedNodeIds.has(n.id) || (n.type === 'role' && n.id === targetRoleId));
    }

    // 4. Multi-Skill Tag Ranking & Filter
    if (skillTags.length > 0) {
      const lowerTags = skillTags.map(st => st.toLowerCase());
      // Identify nodes matching skills
      nodes = nodes.map(n => {
        if (n.type === 'skill' && lowerTags.includes(n.label.toLowerCase())) {
          return { ...n, isSearchedSkill: true };
        }
        return n;
      });
    }

    // 5. Secondary Filters (Job type, location, experience)
    if (filters.jobType !== 'All') {
      nodes = nodes.filter(n => n.type !== 'job' || n.jobType?.includes(filters.jobType));
    }
    if (filters.location !== 'All') {
      nodes = nodes.filter(n => n.type !== 'job' || n.location?.includes(filters.location));
    }
    if (filters.industry !== 'All') {
      nodes = nodes.filter(n => n.type !== 'company' || n.industry?.includes(filters.industry));
    }

    return { currentNodes: nodes, currentLinks: links };
  }, [selectedDomain, selectedRole, skillTags, filters, isExpanded]);

  // Selected node object details
  const selectedNode = useMemo(() => {
    return currentNodes.find(n => n.id === selectedNodeId) || currentNodes[0] || null;
  }, [selectedNodeId, currentNodes]);

  // Handlers
  const handleSearch = () => {
    if (selectedRole !== 'All') {
      setSelectedNodeId(selectedRole);
    } else if (currentNodes.length > 0) {
      setSelectedNodeId(currentNodes[0].id);
    }
    showToast('Updated graph view with selected filters!');
  };

  const handleReset = () => {
    setSelectedDomain('All Domains');
    setSelectedRole('role-data-analyst');
    setSkillTags(['SQL', 'Python']);
    setFilters({ jobType: 'All', experienceLevel: 'All', location: 'All', industry: 'All' });
    setSelectedNodeId('role-data-analyst');
    setIsExpanded(false);
    showToast('Graph view reset to initial dataset.');
  };

  const handleAddSkillTag = (skillName) => {
    if (!skillTags.includes(skillName)) {
      setSkillTags([...skillTags, skillName]);
      showToast(`Added '${skillName}' to Multi-Skill Tag Search!`);
    }
  };

  const handleSaveJob = (jobId) => {
    if (savedJobIds.includes(jobId)) {
      setSavedJobIds(savedJobIds.filter(id => id !== jobId));
      showToast('Removed job from saved bookmark list.');
    } else {
      setSavedJobIds([...savedJobIds, jobId]);
      showToast('Job saved to your bookmarks!');
    }
  };

  return (
    <div className="cjn-container fade-in">
      
      {/* Top Header Card */}
      <div className="cjn-header-card">
        <div>
          <h1 className="cjn-header-title">
            <Share2 size={32} color="#9333EA" />
            <span>Connected Jobs Network</span>
          </h1>
          <p className="cjn-header-subtitle">
            Explore how skills, career roles, jobs, courses, and companies are connected.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Saved Jobs Indicator */}
          <div style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', padding: '6px 14px', borderRadius: '20px', fontSize: '0.84rem', fontWeight: 700, color: '#9333EA', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Bookmark size={16} fill="#9333EA" />
            <span>Saved Jobs ({savedJobIds.length})</span>
          </div>

          {/* View Mode Switcher */}
          <div className="cjn-view-toggle">
            <button
              className={`cjn-toggle-btn ${viewMode === 'graph' ? 'active' : ''}`}
              onClick={() => setViewMode('graph')}
            >
              <Network size={16} />
              <span>Graph View</span>
            </button>
            <button
              className={`cjn-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <Grid size={16} />
              <span>List View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Search & Filter Bar */}
      <NetworkFilters
        selectedDomain={selectedDomain}
        setSelectedDomain={setSelectedDomain}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        skillTags={skillTags}
        setSkillTags={setSkillTags}
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
        onReset={handleReset}
        availableRoles={availableRoleNodes}
      />

      {/* Main Content View (Graph View vs List View) */}
      <div className="cjn-main-layout">
        
        {viewMode === 'graph' ? (
          <div className="cjn-graph-wrapper">
            <NetworkGraph
              nodes={currentNodes}
              links={currentLinks}
              selectedNodeId={selectedNodeId}
              onSelectNode={(id) => setSelectedNodeId(id)}
              searchRole={selectedRole}
              skillTags={skillTags}
              isExpanded={isExpanded}
              onToggleExpand={() => {
                setIsExpanded(!isExpanded);
                showToast(isExpanded ? 'Collapsed graph network view.' : 'Expanded network graph with additional nodes!');
              }}
            />
          </div>
        ) : (
          <div style={{ flexGrow: 1, minWidth: 0 }}>
            <NetworkListView
              nodes={currentNodes}
              selectedNodeId={selectedNodeId}
              onSelectNode={(id) => setSelectedNodeId(id)}
              savedJobIds={savedJobIds}
              onSaveJob={handleSaveJob}
            />
          </div>
        )}

        {/* Right-Side Interactive Node Details Panel */}
        {selectedNode && (
          <NodeDetailsPanel
            selectedNode={selectedNode}
            onClose={() => setSelectedNodeId(null)}
            onNavigate={onNavigate}
            onAddSkillTag={handleAddSkillTag}
            onSaveJob={handleSaveJob}
            isJobSaved={savedJobIds.includes(selectedNode?.id)}
            onOpenJobModal={(jobNode) => setActiveModal({ type: 'job', node: jobNode })}
            onOpenCourseModal={(courseNode) => setActiveModal({ type: 'course', node: courseNode })}
            onOpenGovtModal={(govtNode) => setActiveModal({ type: 'govt', node: govtNode })}
            onSelectNode={(id) => setSelectedNodeId(id)}
          />
        )}
      </div>

      {/* --- MODAL POPUPS FOR PROTOTYPE DEMONSTRATION --- */}
      {activeModal && (
        <div className="cjn-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="cjn-modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className="badge-pill" style={{ background: '#F3E8FF', color: '#9333EA' }}>
                Verified Platform Details
              </span>
              <button
                onClick={() => setActiveModal(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7A6F8A' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Job Details Modal */}
            {activeModal.type === 'job' && (
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E' }}>{activeModal.node.label}</h3>
                <div style={{ color: '#EC4899', fontWeight: 700, margin: '4px 0 14px 0' }}>🏢 {activeModal.node.company}</div>

                <div style={{ background: '#FAF7FF', padding: '16px', borderRadius: '16px', border: '1px solid #EAE2F8', marginBottom: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.88rem' }}>
                    <div><strong>Stipend/Salary:</strong> {activeModal.node.salary}</div>
                    <div><strong>Location:</strong> {activeModal.node.location}</div>
                    <div><strong>Job Type:</strong> {activeModal.node.jobType}</div>
                    <div><strong>Experience:</strong> {activeModal.node.experienceLevel}</div>
                  </div>
                </div>

                <h5 style={{ fontWeight: 700, color: '#2D1B4E', marginBottom: '6px' }}>Job Description</h5>
                <p style={{ fontSize: '0.9rem', color: '#4A3E56', lineHeight: '1.5', marginBottom: '14px' }}>
                  {activeModal.node.description}
                </p>

                <h5 style={{ fontWeight: 700, color: '#2D1B4E', marginBottom: '6px' }}>Eligibility Criteria</h5>
                <p style={{ fontSize: '0.9rem', color: '#059669', fontWeight: 600, marginBottom: '20px' }}>
                  ✓ {activeModal.node.eligibility}
                </p>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className="btn-primary"
                    onClick={() => {
                      setActiveModal(null);
                      onNavigate('internships-jobs');
                    }}
                    style={{ flexGrow: 1, justifyContent: 'center' }}
                  >
                    <Briefcase size={16} />
                    <span>Apply via Platform</span>
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      handleSaveJob(activeModal.node.id);
                    }}
                  >
                    <Bookmark size={16} />
                    <span>{savedJobIds.includes(activeModal.node.id) ? 'Saved' : 'Save'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Course Details Modal */}
            {activeModal.type === 'course' && (
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E' }}>{activeModal.node.label}</h3>
                <div style={{ color: '#EA580C', fontWeight: 700, margin: '4px 0 14px 0' }}>🎓 {activeModal.node.provider}</div>

                <p style={{ fontSize: '0.9rem', color: '#4A3E56', lineHeight: '1.5', marginBottom: '16px' }}>
                  {activeModal.node.description}
                </p>

                <div style={{ background: '#FFEDD5', padding: '14px', borderRadius: '14px', marginBottom: '20px' }}>
                  <div><strong>Duration:</strong> {activeModal.node.duration}</div>
                  <div><strong>Difficulty:</strong> {activeModal.node.difficulty}</div>
                  <div><strong>Status:</strong> {activeModal.node.price}</div>
                </div>

                <button
                  className="btn-primary"
                  onClick={() => {
                    setActiveModal(null);
                    onNavigate('free-courses');
                  }}
                  style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)' }}
                >
                  <GraduationCap size={16} />
                  <span>Start Course in Learning Hub</span>
                </button>
              </div>
            )}

            {/* Government Opportunity Modal */}
            {activeModal.type === 'govt' && (
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E' }}>{activeModal.node.label}</h3>
                <div style={{ color: '#7C3AED', fontWeight: 700, margin: '4px 0 14px 0' }}>🏛️ {activeModal.node.department}</div>

                <p style={{ fontSize: '0.9rem', color: '#4A3E56', lineHeight: '1.5', marginBottom: '16px' }}>
                  {activeModal.node.eligibility}
                </p>

                <div style={{ background: '#EDE9FE', padding: '14px', borderRadius: '14px', marginBottom: '20px' }}>
                  <div><strong>Important Dates:</strong> {activeModal.node.importantDates}</div>
                  <div><strong>Qualification Scheme:</strong> {activeModal.node.qualification}</div>
                </div>

                <button
                  className="btn-primary"
                  onClick={() => {
                    setActiveModal(null);
                    onNavigate('govt-jobs');
                  }}
                  style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)' }}
                >
                  <Award size={16} />
                  <span>View Govt Scheme Aggregator</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="cjn-toast">
          <CheckCircle2 size={18} color="#10B981" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
