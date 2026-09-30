import React, { useState } from 'react';
import { 
  Layers, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Code, 
  Cpu, 
  Database, 
  Cloud, 
  Plus, 
  Github, 
  ExternalLink, 
  Clock, 
  Check, 
  Play, 
  FileText, 
  Terminal, 
  HelpCircle,
  FolderGit2
} from 'lucide-react';

export default function ProjectLabPage({ studentProfile, onNavigate }) {
  // View state: null (Landing) | 'ideas' | 'planner' | 'builder' | 'portfolio'
  const [currentView, setCurrentView] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [activeProjectForPlan, setActiveProjectForPlan] = useState({
    title: 'E-Commerce Microservices Backend with JWT & Redis',
    domain: 'Full-Stack / Backend',
    difficulty: 'Intermediate',
    estTime: '3-4 Weeks',
    techStack: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'Docker']
  });

  const [builderStage, setBuilderStage] = useState(3); // Stage 3: Core Backend
  const [customPlannerTask, setCustomPlannerTask] = useState('');

  // 4 Feature Cards
  const featureCards = [
    {
      id: 'ideas',
      title: 'AI Project Ideas',
      icon: Sparkles,
      color: '#9333EA',
      bgColor: '#FAF7FF',
      description: 'Discover personalized project recommendations matched to your skills, interests, and target career goal.'
    },
    {
      id: 'planner',
      title: 'Project Planner',
      icon: Layers,
      color: '#2563EB',
      bgColor: '#EFF6FF',
      description: 'Break your selected project into structured weekly milestones, database schemas, and API task checklists.'
    },
    {
      id: 'builder',
      title: 'Step-by-Step Builder',
      icon: Terminal,
      color: '#059669',
      bgColor: '#ECFDF5',
      description: 'Get interactive implementation guidance, architecture diagrams, code examples, and debugging assistance.'
    },
    {
      id: 'portfolio',
      title: 'Project Portfolio',
      icon: FolderGit2,
      color: '#DB2777',
      bgColor: '#FFF0F7',
      description: 'Track, manage, and showcase completed projects with GitHub repositories and live deployment links.'
    }
  ];

  // Dataset of AI Project Ideas
  const projectIdeas = [
    {
      id: 1,
      title: 'E-Commerce Microservices Backend',
      domain: 'backend',
      domainLabel: 'Full-Stack / Backend',
      difficulty: 'Intermediate',
      matchReason: 'Matches your Java Core and SQL skills. Bridges your Spring Boot & REST API skill gap.',
      techStack: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'Docker'],
      features: ['JWT Authentication', 'Product Catalog Search', 'Cart Management & Redis Cache'],
      learningOutcomes: 'Master microservice REST architecture, database connection pooling, and Docker deployment.',
      estTime: '3-4 Weeks'
    },
    {
      id: 2,
      title: 'AI Student Attendance & Emotion Analytics',
      domain: 'ai',
      domainLabel: 'Artificial Intelligence / ML',
      difficulty: 'Intermediate',
      matchReason: 'Combines Python programming with OpenCV computer vision for automated smart classroom tracking.',
      techStack: ['Python', 'OpenCV', 'PyTorch', 'FastAPI', 'React'],
      features: ['Facial Recognition Attendance', 'Real-time Video Feed Processing', 'Student Engagement Dashboard'],
      learningOutcomes: 'Learn CNN computer vision models, video frame processing, and FastAPI endpoint serving.',
      estTime: '4 Weeks'
    },
    {
      id: 3,
      title: 'Real-Time Financial Analytics Dashboard',
      domain: 'datascience',
      domainLabel: 'Data Science & Analytics',
      difficulty: 'Beginner',
      matchReason: 'Ideal for honing SQL aggregation skills and interactive PowerBI / React visualization.',
      techStack: ['Python', 'Pandas', 'PostgreSQL', 'PowerBI', 'Streamlit'],
      features: ['Stock Price Telemetry', 'Monthly Revenue Forecast', 'Interactive Filter Metrics'],
      learningOutcomes: 'Master data cleaning, time-series forecasting, and executive dashboard layout.',
      estTime: '2 Weeks'
    },
    {
      id: 4,
      title: 'Automated Multi-Cloud Infrastructure Provisioner',
      domain: 'cloud',
      domainLabel: 'Cloud & DevOps',
      difficulty: 'Advanced',
      matchReason: 'Perfect portfolio builder for Cloud Engineer targets using Terraform & AWS CLI.',
      techStack: ['AWS', 'Terraform', 'Docker', 'GitHub Actions', 'Bash'],
      features: ['Automated VPC & EC2 Scripting', 'S3 Static Site Hosting', 'CI/CD Pipeline Integration'],
      learningOutcomes: 'Learn Infrastructure as Code (IaC), cloud security policies, and automated deployment.',
      estTime: '3-4 Weeks'
    }
  ];

  // Milestone Tasks for Project Planner
  const [plannerTasks, setPlannerTasks] = useState([
    { id: 1, phase: 'Phase 1: Requirements & Database Design', text: 'Design ER Diagram & Relational PostgreSQL Schema', completed: true },
    { id: 2, phase: 'Phase 1: Requirements & Database Design', text: 'Define OpenAPI REST Endpoints Spec', completed: true },
    { id: 3, phase: 'Phase 2: Core Backend Development', text: 'Initialize Spring Boot 3.x project with Maven dependencies', completed: true },
    { id: 4, phase: 'Phase 2: Core Backend Development', text: 'Implement JWT Spring Security Filter & User Auth controller', completed: false },
    { id: 5, phase: 'Phase 3: Integration & Testing', text: 'Configure Redis cache for product catalog GET endpoints', completed: false },
    { id: 6, phase: 'Phase 4: Deployment & Documentation', text: 'Containerize application with Dockerfile and write README.md', completed: false }
  ]);

  // Toggle Planner Task
  const toggleTask = (id) => {
    setPlannerTasks(plannerTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // Add Custom Task
  const handleAddCustomTask = () => {
    if (!customPlannerTask.trim()) return;
    setPlannerTasks([...plannerTasks, { id: Date.now(), phase: 'Custom Milestones', text: customPlannerTask, completed: false }]);
    setCustomPlannerTask('');
  };

  // User Portfolio Dataset
  const [portfolioProjects, setPortfolioProjects] = useState([
    {
      id: 1,
      title: 'E-Commerce Microservices Backend',
      status: 'In Progress',
      tech: ['Java', 'Spring Boot', 'PostgreSQL'],
      github: 'https://github.com/aanchal/ecommerce-microservices',
      summary: 'Engineered RESTful microservices with PostgreSQL persistence, achieving 99.9% uptime in local tests.'
    },
    {
      id: 2,
      title: 'Student Performance & Placement Tracker',
      status: 'Completed',
      tech: ['React', 'Node.js', 'MySQL'],
      github: 'https://github.com/aanchal/student-placement-tracker',
      summary: 'Designed React & MySQL dashboard for tracking student SGPA trends and mock interview feedback.'
    }
  ]);

  const filteredIdeas = projectIdeas.filter(idea => selectedDomain === 'all' || idea.domain === selectedDomain);

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '24px 20px' }} className="fade-in">
      
      {/* 1. MAIN LANDING PAGE */}
      {currentView === null && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Header Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF7FF 50%, #FFF0F7 100%)',
            borderRadius: '24px',
            padding: '28px',
            border: '1px solid #EAE2F8',
            boxShadow: '0 4px 20px rgba(147, 51, 234, 0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <div className="badge-pill" style={{ marginBottom: '8px', background: '#F0EAFA', color: '#9333EA' }}>
                <Layers size={15} />
                <span>PERSONALIZED PROJECT WORKSPACE ENGINE</span>
              </div>
              <h1 style={{ fontSize: '2.0rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
                Project Lab
              </h1>
              <p style={{ color: '#7A6F8A', fontSize: '0.95rem' }}>
                Discover personalized project ideas, plan milestones, get step-by-step implementation guidance, and manage your portfolio.
              </p>
            </div>

            <button onClick={() => setCurrentView('ideas')} className="btn-primary" style={{ padding: '10px 20px' }}>
              <Sparkles size={16} />
              <span>Explore AI Project Ideas</span>
            </button>
          </div>

          {/* 4 Feature Cards Grid */}
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '16px' }}>
              Project Lab Workspaces
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
              {featureCards.map((card) => {
                const IconComp = card.icon;

                return (
                  <div
                    key={card.id}
                    onClick={() => setCurrentView(card.id)}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #EAE2F8',
                      borderRadius: '20px',
                      padding: '24px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 18px rgba(147, 51, 234, 0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <div style={{ background: card.bgColor, color: card.color, padding: '10px', borderRadius: '14px' }}>
                          <IconComp size={24} />
                        </div>
                        <ArrowRight size={18} color="#7A6F8A" />
                      </div>

                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
                        {card.title}
                      </h3>
                      <p style={{ fontSize: '0.86rem', color: '#7A6F8A', lineHeight: '1.5' }}>
                        {card.description}
                      </p>
                    </div>

                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: card.color, marginTop: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>Open Workspace</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ongoing & Saved Projects Section */}
          <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 18px rgba(147, 51, 234, 0.05)' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} color="#9333EA" />
              <span>Ongoing & Active Projects</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {portfolioProjects.map((p) => (
                <div key={p.id} style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', borderRadius: '16px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <span className="badge-pill" style={{ background: p.status === 'Completed' ? '#ECFDF5' : '#FFF0F7', color: p.status === 'Completed' ? '#059669' : '#DB2777', marginBottom: '4px' }}>
                      {p.status}
                    </span>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2D1B4E' }}>{p.title}</h4>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                      {p.tech.map((t, i) => (
                        <span key={i} style={{ background: '#F0EAFA', color: '#9333EA', fontSize: '0.76rem', fontWeight: 700, padding: '2px 8px', borderRadius: '6px' }}>{t}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setCurrentView('builder')} className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                      <span>Continue Development</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 2. SUB-WORKSPACES WITH BACK NAVIGATION */}
      {currentView !== null && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Back Navigation Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <button
              onClick={() => setCurrentView(null)}
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.86rem' }}
            >
              <ArrowLeft size={16} />
              <span>Back to Project Lab Overview</span>
            </button>
            <span style={{ fontSize: '0.84rem', color: '#7A6F8A' }}>| Active Workspace: <strong>{featureCards.find(c => c.id === currentView)?.title}</strong></span>
          </div>

          {/* WORKSPACE 1: AI PROJECT IDEAS */}
          {currentView === 'ideas' && (
            <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '28px' }} className="fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E' }}>AI Project Recommendations</h2>
                  <p style={{ color: '#7A6F8A', fontSize: '0.88rem' }}>Tailored to your Java Backend target goal and current skill level.</p>
                </div>

                {/* Domain Filter Tabs */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {[
                    { id: 'all', label: 'All Domains' },
                    { id: 'backend', label: 'Backend / Full-Stack' },
                    { id: 'ai', label: 'AI / Machine Learning' },
                    { id: 'datascience', label: 'Data Science' },
                    { id: 'cloud', label: 'Cloud / DevOps' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedDomain(tab.id)}
                      className={`tab-pill ${selectedDomain === tab.id ? 'active' : ''}`}
                      style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
                {filteredIdeas.map((idea) => (
                  <div key={idea.id} style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span className="badge-pill" style={{ background: '#F0EAFA', color: '#9333EA', fontSize: '0.76rem' }}>{idea.domainLabel}</span>
                        <span className="badge-pill" style={{ background: '#ECFDF5', color: '#059669', fontSize: '0.76rem' }}>{idea.difficulty}</span>
                      </div>

                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>{idea.title}</h3>
                      <p style={{ fontSize: '0.85rem', color: '#4A3E56', lineHeight: '1.4', marginBottom: '10px' }}>{idea.matchReason}</p>

                      <div style={{ marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.76rem', color: '#7A6F8A', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Tech Stack:</span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {idea.techStack.map((t, i) => (
                            <span key={i} style={{ background: '#FFFFFF', color: '#2D1B4E', border: '1px solid #EAE2F8', fontSize: '0.74rem', fontWeight: 700, padding: '2px 8px', borderRadius: '6px' }}>{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setActiveProjectForPlan(idea);
                        setCurrentView('planner');
                      }}
                      className="btn-primary"
                      style={{ width: '100%', marginTop: '14px', fontSize: '0.84rem' }}
                    >
                      <span>Select & Start Project Planner</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WORKSPACE 2: PROJECT PLANNER */}
          {currentView === 'planner' && (
            <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '28px' }} className="fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span className="badge-pill" style={{ background: '#FAF7FF', color: '#9333EA', marginBottom: '4px' }}>
                    Active Project Plan
                  </span>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E' }}>{activeProjectForPlan.title}</h2>
                  <p style={{ color: '#7A6F8A', fontSize: '0.88rem' }}>Milestone task breakdown and estimated time: {activeProjectForPlan.estTime}</p>
                </div>

                <button onClick={() => setCurrentView('builder')} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.84rem' }}>
                  <span>Open Step-by-Step Builder</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Checklist Tasks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {plannerTasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => toggleTask(t.id)}
                    style={{
                      background: '#FAF7FF',
                      border: '1px solid #EAE2F8',
                      padding: '12px 16px',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '6px',
                      border: `2px solid ${t.completed ? '#059669' : '#C084FC'}`,
                      background: t.completed ? '#059669' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF'
                    }}>
                      {t.completed && <Check size={14} strokeWidth={3} />}
                    </div>
                    <div>
                      <span style={{ fontSize: '0.74rem', color: '#9333EA', fontWeight: 700, display: 'block' }}>{t.phase}</span>
                      <span style={{ fontSize: '0.88rem', fontWeight: 600, color: t.completed ? '#7A6F8A' : '#2D1B4E', textDecoration: t.completed ? 'line-through' : 'none' }}>
                        {t.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Custom Task */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add custom milestone task..."
                  value={customPlannerTask}
                  onChange={(e) => setCustomPlannerTask(e.target.value)}
                  style={{ fontSize: '0.84rem' }}
                />
                <button onClick={handleAddCustomTask} className="btn-primary" style={{ fontSize: '0.82rem', padding: '8px 16px' }}>
                  Add Task
                </button>
              </div>
            </div>
          )}

          {/* WORKSPACE 3: STEP-BY-STEP BUILDER */}
          {currentView === 'builder' && (
            <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '28px' }} className="fade-in">
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '8px' }}>
                Step-by-Step Implementation Builder
              </h2>
              <p style={{ color: '#7A6F8A', fontSize: '0.88rem', marginBottom: '20px' }}>
                Architecture blueprints, environment setup, and Spring Boot REST controller code guidance.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {/* Environment & Architecture Guide */}
                <div style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', borderRadius: '18px', padding: '20px' }}>
                  <h4 style={{ fontSize: '1.0rem', fontWeight: 800, color: '#9333EA', marginBottom: '10px' }}>
                    1. Environment Setup Commands
                  </h4>
                  <div style={{ background: '#2D1B4E', color: '#F6DCEC', padding: '12px', borderRadius: '10px', fontFamily: 'monospace', fontSize: '0.82rem', marginBottom: '14px' }}>
                    $ mvn archetype:generate -DgroupId=com.skillaura -DartifactId=backend-service<br/>
                    $ docker run --name postgres-db -e POSTGRES_PASSWORD=secret -d -p 5432:5432 postgres
                  </div>

                  <h4 style={{ fontSize: '1.0rem', fontWeight: 800, color: '#9333EA', marginBottom: '8px' }}>
                    2. Architecture Component Blueprint
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#4A3E56', lineHeight: '1.5' }}>
                    HTTP REST Controller → Service Layer (`@Service`) → JPA Repository (`@Repository`) → PostgreSQL DB.
                  </p>
                </div>

                {/* Code Snippet Assistant */}
                <div style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', borderRadius: '18px', padding: '20px' }}>
                  <h4 style={{ fontSize: '1.0rem', fontWeight: 800, color: '#059669', marginBottom: '10px' }}>
                    3. Core Spring Boot Controller Code Snippet
                  </h4>
                  <div style={{ background: '#1E1B4B', color: '#A7F3D0', padding: '14px', borderRadius: '10px', fontFamily: 'monospace', fontSize: '0.78rem', whiteSpace: 'pre-wrap' }}>
{`@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.findAll());
    }
}`}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* WORKSPACE 4: PROJECT PORTFOLIO */}
          {currentView === 'portfolio' && (
            <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '28px' }} className="fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E' }}>My Project Portfolio</h2>
                  <p style={{ color: '#7A6F8A', fontSize: '0.88rem' }}>Manage your verified project records and export bullet points to Resume Assist.</p>
                </div>

                <button onClick={() => alert('Add external project dialog opened.')} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.84rem' }}>
                  <Plus size={16} />
                  <span>Add External Project</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {portfolioProjects.map((p) => (
                  <div key={p.id} style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', borderRadius: '18px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
                    <div>
                      <span className="badge-pill" style={{ background: '#ECFDF5', color: '#059669', marginBottom: '6px' }}>{p.status}</span>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2D1B4E' }}>{p.title}</h3>
                      <p style={{ fontSize: '0.86rem', color: '#4A3E56', margin: '4px 0 10px 0' }}>{p.summary}</p>
                      
                      <a href={p.github} target="_blank" rel="noreferrer" style={{ fontSize: '0.82rem', color: '#9333EA', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Github size={14} />
                        <span>{p.github}</span>
                      </a>
                    </div>

                    <button onClick={() => onNavigate('resume-assist')} className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                      <span>Export Bullet to Resume Assist</span>
                      <ArrowRight size={14} />
                    </button>
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
