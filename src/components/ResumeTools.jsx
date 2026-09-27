import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Building2, 
  Briefcase, 
  Download,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export default function ResumeTools({ studentProfile }) {
  const [activeSubTab, setActiveSubTab] = useState('analyzer'); // 'analyzer' | 'rejection' | 'templates'
  
  // Analyzer State
  const [resumeText, setResumeText] = useState(`Aarav Sharma - Student at Institute of Technology Jaipur.
CGPA: 7.8 | Branch: Computer Science & Engineering
Skills: HTML, CSS, JavaScript, React.js, Python, SQL, Git.
Projects:
- E-Commerce Web App: Built React frontend for shopping cart with state management.
- Student Database: Created MySQL database script for student records.
Certifications: React Basics (NPTEL)`);
  
  const [jdText, setJdText] = useState(`Role: Junior Full Stack Developer
Company: TechCorp Solutions / Product Startup
Requirements:
- Strong hands-on experience in React.js, JavaScript (ES6+), and Node.js/Express.
- Experience writing REST APIs and working with SQL/MongoDB databases.
- Familiarity with TypeScript, Docker containerization, and Git workflow.
- Good understanding of DSA and System Architecture.`);

  const [targetCompany, setTargetCompany] = useState("Tier-1 Product Startup");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  // Rejection State
  const [rejectionText, setRejectionText] = useState(`Dear Candidate, Thank you for applying to our Software Engineer Intern position. After reviewing your application, we have decided not to move forward with your candidature at this time. We wish you the best in your search.`);
  const [rejectionResult, setRejectionResult] = useState(null);
  const [explaining, setExplaining] = useState(false);

  const handleAnalyzeJd = async () => {
    setAnalyzing(true);
    try {
      const res = await fetch('/api/resume/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jdText, targetCompany })
      });
      const data = await res.json();
      setAnalysisResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleExplainRejection = async () => {
    setExplaining(true);
    try {
      const res = await fetch('/api/resume/rejection-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rejectionText })
      });
      const data = await res.json();
      setRejectionResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setExplaining(false);
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '30px 20px' }} className="fade-in">
      
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
        borderRadius: '24px',
        padding: '30px',
        marginBottom: '28px',
        border: '1px solid #BBF7D0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div className="badge-pill" style={{ background: '#DCFCE7', color: '#16A34A', borderColor: '#86EFAC', marginBottom: '10px' }}>
            <Sparkles size={16} />
            <span>AI RESUME OPTIMIZER</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
            Resume ↔ JD Analyzer & Rejection Corrector
          </h1>
          <p style={{ color: '#334155', fontSize: '0.95rem' }}>
            Side-by-side keyword matching, ATS scoring, STAR bullet rewrites, and reverse-engineered rejection feedback.
          </p>
        </div>

        {/* Subtabs */}
        <div style={{ display: 'flex', gap: '8px', background: '#FFFFFF', padding: '6px', borderRadius: '30px', border: '1px solid #CBD5E1' }}>
          <button 
            onClick={() => setActiveSubTab('analyzer')} 
            className={`tab-pill ${activeSubTab === 'analyzer' ? 'active' : ''}`}
            style={{ fontSize: '0.82rem', padding: '6px 16px' }}
          >
            Resume ↔ JD Diff
          </button>
          <button 
            onClick={() => setActiveSubTab('rejection')} 
            className={`tab-pill ${activeSubTab === 'rejection' ? 'active' : ''}`}
            style={{ fontSize: '0.82rem', padding: '6px 16px' }}
          >
            Explain Rejection
          </button>
          <button 
            onClick={() => setActiveSubTab('templates')} 
            className={`tab-pill ${activeSubTab === 'templates' ? 'active' : ''}`}
            style={{ fontSize: '0.82rem', padding: '6px 16px' }}
          >
            Reference Templates
          </button>
        </div>
      </div>

      {/* SUBTAB 1: RESUME ↔ JD ANALYZER */}
      {activeSubTab === 'analyzer' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Side by side Inputs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            
            {/* Resume Input Box */}
            <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={18} color="#4F46E5" />
                  Your Resume Content
                </label>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Text / Markdown</span>
              </div>
              <textarea 
                className="form-control"
                rows={9}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text or bullet points here..."
              />
            </div>

            {/* JD Input Box */}
            <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Briefcase size={18} color="#3B82F6" />
                  Target Job Description (JD)
                </label>
                <select 
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  style={{ fontSize: '0.78rem', padding: '2px 8px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                >
                  <option value="Tier-1 Product Startup">Startup</option>
                  <option value="TCS / Infosys (Service)">TCS / Infosys</option>
                  <option value="Amazon / Google (Big Tech)">Big Tech</option>
                </select>
              </div>
              <textarea 
                className="form-control"
                rows={9}
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Paste the target Job Description text here..."
              />
            </div>

          </div>

          {/* Run Analysis Button */}
          <div style={{ textAlign: 'center' }}>
            <button 
              onClick={handleAnalyzeJd} 
              className="btn-primary" 
              disabled={analyzing}
              style={{ padding: '14px 32px', fontSize: '1rem' }}
            >
              <Sparkles size={18} />
              <span>{analyzing ? "Analyzing Keywords & Scoring..." : "Run Side-by-Side Resume ↔ JD Diff Analysis"}</span>
            </button>
          </div>

          {/* Analysis Results Display */}
          {analysisResult && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              
              {/* Score Meter & Missing Keywords */}
              <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
                      ATS MATCH RATING
                    </span>
                    <h3 style={{ fontSize: '2.2rem', fontWeight: 800, color: analysisResult.atsScore >= 75 ? '#16A34A' : '#EA580C' }}>
                      {analysisResult.atsScore}% <span style={{ fontSize: '1rem', color: '#64748B' }}>Match</span>
                    </h3>
                  </div>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: analysisResult.atsScore >= 75 ? '#DCFCE7' : '#FFEDD5',
                    color: analysisResult.atsScore >= 75 ? '#16A34A' : '#EA580C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1.2rem'
                  }}>
                    {analysisResult.atsScore}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#DC2626', display: 'block', marginBottom: '8px' }}>
                    Missing JD Keywords (Add these to pass ATS):
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {analysisResult.missingKeywords.map((kw, i) => (
                      <span key={i} style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                    Company Specific Tailoring Advice:
                  </label>
                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5', background: '#F8FAFC', padding: '12px', borderRadius: '12px' }}>
                    {analysisResult.companyAdvice}
                  </p>
                </div>
              </div>

              {/* Live STAR Bullet Rewrites */}
              <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={18} color="#4F46E5" />
                  <span>Live STAR Bullet Rewrites</span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {analysisResult.improvedBullets.map((bullet, i) => (
                    <div key={i} style={{ background: '#F8FAFC', padding: '14px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 700, marginBottom: '4px' }}>
                        BEFORE (Weak):
                      </div>
                      <p style={{ fontSize: '0.85rem', color: '#64748B', textDecoration: 'line-through', marginBottom: '8px' }}>
                        "{bullet.original}"
                      </p>
                      <div style={{ fontSize: '0.8rem', color: '#16A34A', fontWeight: 700, marginBottom: '4px' }}>
                        AFTER (STAR Metric Optimized):
                      </div>
                      <p style={{ fontSize: '0.88rem', color: '#0F172A', fontWeight: 600 }}>
                        "{bullet.improved}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* SUBTAB 2: REJECTION EXPLAINER */}
      {activeSubTab === 'rejection' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle size={20} color="#EA580C" />
              <span>Paste Your Rejection Mail / Post-Interview Feedback</span>
            </h3>

            <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '16px' }}>
              Our AI reverse-engineers the underlying hiring reasons and gives you a concrete action plan so you never repeat the same mistake.
            </p>

            <textarea 
              className="form-control"
              rows={5}
              value={rejectionText}
              onChange={(e) => setRejectionText(e.target.value)}
              placeholder="Paste rejection email or status update..."
              style={{ marginBottom: '16px' }}
            />

            <button onClick={handleExplainRejection} className="btn-primary" disabled={explaining}>
              <Sparkles size={16} />
              <span>{explaining ? "Analyzing Failure Vectors..." : "Reverse-Engineer Rejection Reason"}</span>
            </button>
          </div>

          {rejectionResult && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              
              {/* Probable Cause Vectors */}
              <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#DC2626', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={18} />
                  <span>Inferred Rejection Factors</span>
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {rejectionResult.probableCauses.map((cause, i) => (
                    <div key={i} style={{ background: '#FEF2F2', padding: '12px', borderRadius: '12px', border: '1px solid #FECACA' }}>
                      <strong style={{ fontSize: '0.88rem', color: '#991B1B', display: 'block', marginBottom: '2px' }}>
                        {cause.category}
                      </strong>
                      <p style={{ fontSize: '0.84rem', color: '#450A0A', lineHeight: '1.4' }}>
                        {cause.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actionable Corrective Plan */}
              <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#16A34A', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={18} />
                  <span>Corrective Action Plan</span>
                </h4>

                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: '#334155' }}>
                  {rejectionResult.actionPlan.map((action, i) => (
                    <li key={i} style={{ lineHeight: '1.5' }}>
                      <strong>Step {i + 1}:</strong> {action}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}

        </div>
      )}

      {/* SUBTAB 3: REFERENCE TEMPLATES */}
      {activeSubTab === 'templates' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Building2 size={20} color="#4F46E5" />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>TCS / Infosys NQT Format</h4>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '14px' }}>
              Clear section headers, CGPA emphasis, core CS fundamentals (DBMS, OS, OOPs), and clean single-column layout.
            </p>
            <button className="btn-outline-primary" style={{ fontSize: '0.8rem', width: '100%' }}>
              <Download size={14} style={{ marginRight: '4px' }} /> View & Download Template
            </button>
          </div>

          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Briefcase size={20} color="#3B82F6" />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>Product Startup SDE Format</h4>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '14px' }}>
              Project-first structure highlighting GitHub links, tech stack badges (React, Node, Redis), and live deployment URLs.
            </p>
            <button className="btn-outline-primary" style={{ fontSize: '0.8rem', width: '100%' }}>
              <Download size={14} style={{ marginRight: '4px' }} /> View & Download Template
            </button>
          </div>

          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Sparkles size={20} color="#8B5CF6" />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>Data Analyst & ML Format</h4>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '14px' }}>
              Highlights Python data pipelines, SQL querying metrics, Pandas/PowerBI dashboards, and Kaggle/Kaggle notebook links.
            </p>
            <button className="btn-outline-primary" style={{ fontSize: '0.8rem', width: '100%' }}>
              <Download size={14} style={{ marginRight: '4px' }} /> View & Download Template
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
