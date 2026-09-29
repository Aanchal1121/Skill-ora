import React, { useState, useEffect, useMemo } from 'react';
import { 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  BookOpen, 
  Clock, 
  ArrowRight, 
  Sparkles,
  HelpCircle,
  RotateCcw,
  Plus,
  Bookmark,
  Award,
  Download,
  Filter,
  Check,
  X,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  FileText,
  Calendar,
  Zap,
  BarChart2
} from 'lucide-react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

import { ROLE_ASSESSMENTS } from '../data/assessmentData';
import { ROLE_SKILL_REQUIREMENTS } from '../data/roleSkillRequirements';
import { COURSE_RECOMMENDATIONS, getCourseRelevanceExplanation } from '../data/courseData';
import { 
  calculateSkillProficiency, 
  calculateSkillGap, 
  getPriorityStatus, 
  getConfidenceIndicator, 
  calculateOverallMatch 
} from '../utils/skillGapUtils';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function SkillGap({ studentProfile, onNavigate }) {
  // Navigation sub-tab inside SkillGap module
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'assessment' | 'learning-plan' | 'history'

  // Selected Target Role
  const [targetRole, setTargetRole] = useState(studentProfile?.targetRole || "Data Scientist / Analyst");

  // Assessed Skill State: { "SQL": 80, "Python": 60, ... }
  const [assessedSkills, setAssessedSkills] = useState({
    "SQL": 80,
    "Python": 60,
    "Excel": 90,
    "Power BI": 40,
    "Statistics": 50,
    "Communication": 74
  });

  // Assessment Questions Count & Incorrect Topics State
  const [assessmentMeta, setAssessmentMeta] = useState({
    questionsCount: { "SQL": 5, "Python": 4, "Excel": 3, "Power BI": 2, "Statistics": 2, "Communication": 1 },
    incorrectTopics: { "Power BI": ["DAX Formulas", "Filter Context"], "Statistics": ["p-value interpretation"] }
  });

  // Learning Plan State: list of added courses
  const [learningPlan, setLearningPlan] = useState([
    {
      id: "course-pbi-free-1",
      name: "Power BI Data Analyst Essentials",
      provider: "Microsoft Learn",
      skillCovered: "Power BI",
      duration: "3 weeks",
      status: "In Progress", // 'Not Started' | 'In Progress' | 'Completed'
      targetDate: "2026-10-15",
      progress: 60
    }
  ]);

  // Skill Evidence State: { "SQL": ["NPTEL SQL Cert"], ... }
  const [skillEvidence, setSkillEvidence] = useState({});
  const [evidenceInput, setEvidenceInput] = useState('');

  // History Attempts Log
  const [assessmentHistory, setAssessmentHistory] = useState([
    {
      id: "att-1",
      date: "2026-09-15",
      role: "Data Scientist / Analyst",
      overallScore: 66,
      skills: { "SQL": 80, "Python": 60, "Excel": 90, "Power BI": 40, "Statistics": 50, "Communication": 74 }
    }
  ]);

  // Selected Skill Modal State
  const [selectedSkillModal, setSelectedSkillModal] = useState(null);

  // --- ASSESSMENT QUIZ ENGINE STATE ---
  const roleQuizData = useMemo(() => {
    return ROLE_ASSESSMENTS[targetRole] || ROLE_ASSESSMENTS["Data Scientist / Analyst"];
  }, [targetRole]);

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { qId: selectedOptionIndex }
  const [markedForReview, setMarkedForReview] = useState({}); // { qId: boolean }
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  // Filter & Sort State for Course Recommendations in Skill Modal
  const [courseFilter, setCourseFilter] = useState('All'); // 'All' | 'Free' | 'Paid'
  const [courseSort, setCourseSort] = useState('Default'); // 'Default' | 'FreeFirst' | 'Shortest'

  // Reset quiz state when role changes or quiz starts
  const handleStartAssessment = () => {
    setCurrentQIndex(0);
    setUserAnswers({});
    setMarkedForReview({});
    setReviewMode(false);
    setActiveTab('assessment');
  };

  // Submit Assessment Handler
  const handleSubmitAssessment = () => {
    setShowSubmitConfirm(false);

    // Compute scores per skill
    const questions = roleQuizData.questions;
    const skillCounts = {};
    const skillCorrect = {};
    const incorrectMap = {};

    questions.forEach(q => {
      skillCounts[q.skill] = (skillCounts[q.skill] || 0) + 1;
      const isCorrect = userAnswers[q.id] === q.correctIndex;
      if (isCorrect) {
        skillCorrect[q.skill] = (skillCorrect[q.skill] || 0) + 1;
      } else {
        if (!incorrectMap[q.skill]) incorrectMap[q.skill] = [];
        if (q.topic && !incorrectMap[q.skill].includes(q.topic)) {
          incorrectMap[q.skill].push(q.topic);
        }
      }
    });

    const newAssessedLevels = { ...assessedSkills };
    const newQuestionsCount = { ...assessmentMeta.questionsCount };

    Object.keys(skillCounts).forEach(skill => {
      const correct = skillCorrect[skill] || 0;
      const total = skillCounts[skill];
      newAssessedLevels[skill] = calculateSkillProficiency(correct, total);
      newQuestionsCount[skill] = total;
    });

    setAssessedSkills(newAssessedLevels);
    setAssessmentMeta({
      questionsCount: newQuestionsCount,
      incorrectTopics: incorrectMap
    });

    // Compute overall score
    const totalQ = questions.length;
    const totalAns = Object.keys(userAnswers).reduce((acc, qId) => {
      const q = questions.find(item => item.id === qId);
      return acc + (q && userAnswers[qId] === q.correctIndex ? 1 : 0);
    }, 0);
    const overallPct = Math.round((totalAns / totalQ) * 100);

    // Save to History
    const newAttempt = {
      id: `att-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      role: targetRole,
      overallScore: overallPct,
      skills: { ...newAssessedLevels }
    };
    setAssessmentHistory([newAttempt, ...assessmentHistory]);

    setActiveTab('dashboard');
    alert(`Assessment submitted successfully! Your estimated overall role score is ${overallPct}%. Your skill gaps have been updated.`);
  };

  // Compute Skill Gap Data List for Target Role
  const skillGapList = useMemo(() => {
    const requirements = ROLE_SKILL_REQUIREMENTS[targetRole] || ROLE_SKILL_REQUIREMENTS["Data Scientist / Analyst"];
    return Object.keys(requirements).map(skillName => {
      const reqInfo = requirements[skillName];
      const requiredLevel = reqInfo.required;
      const currentLevel = assessedSkills[skillName] !== undefined ? assessedSkills[skillName] : null;
      const isAssessed = currentLevel !== null;
      const gap = isAssessed ? calculateSkillGap(currentLevel, requiredLevel) : requiredLevel;
      const priority = getPriorityStatus(gap, isAssessed);
      const confidence = getConfidenceIndicator(assessmentMeta.questionsCount[skillName] || 0);

      return {
        skillName,
        requiredLevel,
        currentLevel,
        isAssessed,
        gap,
        priority,
        confidence,
        importance: reqInfo.importance,
        incorrectTopics: assessmentMeta.incorrectTopics[skillName] || []
      };
    });
  }, [targetRole, assessedSkills, assessmentMeta]);

  // Overall Match Pct
  const overallMatchPct = useMemo(() => {
    return calculateOverallMatch(skillGapList);
  }, [skillGapList]);

  // Radar Chart Data Configuration
  const radarChartData = useMemo(() => {
    const labels = skillGapList.map(s => s.skillName);
    const requiredData = skillGapList.map(s => s.requiredLevel);
    const currentData = skillGapList.map(s => s.currentLevel !== null ? s.currentLevel : 0);

    return {
      labels,
      datasets: [
        {
          label: 'Required Role Proficiency',
          data: requiredData,
          backgroundColor: 'rgba(147, 51, 234, 0.15)',
          borderColor: '#9333EA',
          pointBackgroundColor: '#9333EA',
          borderWidth: 2
        },
        {
          label: 'Your Assessed Skill Level',
          data: currentData,
          backgroundColor: 'rgba(16, 185, 129, 0.3)',
          borderColor: '#10B981',
          pointBackgroundColor: '#10B981',
          borderWidth: 2
        }
      ]
    };
  }, [skillGapList]);

  // Add course to learning plan
  const handleAddToLearningPlan = (course) => {
    if (learningPlan.some(c => c.id === course.id)) {
      alert("This course is already in your Learning Plan!");
      return;
    }
    const newCourseEntry = {
      id: course.id,
      name: course.name,
      provider: course.provider,
      skillCovered: course.skillCovered,
      duration: course.duration,
      status: "Not Started",
      targetDate: "",
      progress: 0
    };
    setLearningPlan([...learningPlan, newCourseEntry]);
    alert(`Added "${course.name}" to your Learning Plan!`);
  };

  // Add skill evidence
  const handleAddEvidence = (skillName) => {
    if (!evidenceInput.trim()) return;
    setSkillEvidence({
      ...skillEvidence,
      [skillName]: [...(skillEvidence[skillName] || []), evidenceInput.trim()]
    });
    setEvidenceInput('');
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px' }} className="fade-in">
      
      {/* Top Header Card */}
      <div style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF7FF 50%, #FFF5F9 100%)',
        borderRadius: '24px',
        padding: '28px',
        marginBottom: '24px',
        border: '1px solid #EAE2F8',
        boxShadow: '0 4px 20px rgba(147, 51, 234, 0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div className="badge-pill" style={{ marginBottom: '10px' }}>
            <Sparkles size={16} />
            <span>ENHANCED SKILL ASSESSMENT & GAP ENGINE</span>
          </div>
          <h1 style={{ fontSize: '2.0rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
            Skill Assessment & Skill Gap Analysis
          </h1>
          <p style={{ color: '#7A6F8A', fontSize: '0.95rem', maxWidth: '700px' }}>
            Assess your knowledge with role-based quizzes, discover exact skill gaps, and explore personalized free and paid learning recommendations.
          </p>
        </div>

        {/* Target Role Selector */}
        <div style={{
          background: '#FFFFFF',
          padding: '16px 20px',
          borderRadius: '18px',
          border: '1.5px solid #9333EA',
          boxShadow: '0 4px 14px rgba(147, 51, 234, 0.1)'
        }}>
          <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#9333EA', display: 'block', marginBottom: '6px', letterSpacing: '0.04em' }}>
            TARGET CAREER ROLE:
          </label>
          <select 
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '12px',
              border: '1px solid #E5D9F2',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: '#2D1B4E',
              outline: 'none',
              cursor: 'pointer',
              background: '#F0EAFA'
            }}
          >
            <option value="Data Scientist / Analyst">Data Scientist / Analyst</option>
            <option value="Java Backend Developer">Java Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="AI / ML Engineer">AI / ML Engineer</option>
            <option value="DevOps / Cloud Engineer">DevOps / Cloud Engineer</option>
            <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
            <option value="SDE 1 (Product Companies)">SDE 1 (Product Companies)</option>
          </select>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {[
          { id: 'dashboard', label: '📊 Skill Gap Dashboard', color: '#9333EA' },
          { id: 'assessment', label: '✍️ Take Role Assessment', color: '#EC4899' },
          { id: 'learning-plan', label: `🎯 My Learning Plan (${learningPlan.length})`, color: '#0D9488' },
          { id: 'history', label: `📜 History & Download Summary`, color: '#2563EB' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-pill ${activeTab === tab.id ? 'active' : ''}`}
            style={{ fontSize: '0.88rem', padding: '10px 20px' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: SKILL GAP DASHBOARD */}
      {/* ========================================================================= */}
      {activeTab === 'dashboard' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Action Bar */}
          <div style={{ background: '#FFFFFF', padding: '16px 24px', borderRadius: '18px', border: '1px solid #EAE2F8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="badge-pill" style={{ background: overallMatchPct >= 70 ? '#ECFDF5' : '#FFFBEB', color: overallMatchPct >= 70 ? '#059669' : '#D97706' }}>
                Overall Role Match: {overallMatchPct}%
              </span>
              <span style={{ fontSize: '0.85rem', color: '#7A6F8A' }}>
                Based on latest role skill assessment test.
              </span>
            </div>

            <button
              onClick={handleStartAssessment}
              className="btn-primary"
              style={{ padding: '8px 18px', fontSize: '0.88rem' }}
            >
              <RotateCcw size={16} />
              <span>Retake Role Assessment Test</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            
            {/* LEFT: Radar Chart & Priorities */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Radar Chart Card */}
              <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 18px rgba(185, 160, 232, 0.08)' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Target size={20} color="#9333EA" />
                  <span>Skill Demand Radar</span>
                </h3>
                <div style={{ height: '280px' }}>
                  <Radar data={radarChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>

              {/* Priority Summary */}
              <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 18px rgba(185, 160, 232, 0.08)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '14px' }}>
                  Skill Priority Categorization
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {skillGapList.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#FAF7FF', borderRadius: '12px' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#2D1B4E' }}>{item.skillName}</span>
                      <span style={{ background: item.priority.bg, color: item.priority.color, border: `1px solid ${item.priority.border}`, padding: '3px 10px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 800 }}>
                        {item.priority.label} ({item.gap}% Gap)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT: Interactive Skill Bars Grid */}
            <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 18px rgba(185, 160, 232, 0.08)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2D1B4E', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BarChart2 size={20} color="#9333EA" />
                  <span>Assessed Proficiency vs Role Requirement</span>
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#7A6F8A' }}>Click any skill for details & courses</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {skillGapList.map((skill, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedSkillModal(skill)}
                    style={{
                      padding: '16px',
                      borderRadius: '16px',
                      background: '#FAF7FF',
                      border: '1px solid #EAE2F8',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                    className="feature-card"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#2D1B4E' }}>{skill.skillName}</span>
                        <span style={{ background: skill.priority.bg, color: skill.priority.color, fontSize: '0.74rem', fontWeight: 700, padding: '2px 8px', borderRadius: '10px' }}>
                          {skill.priority.label}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#7A6F8A' }}>
                        Required: <strong style={{ color: '#9333EA' }}>{skill.requiredLevel}%</strong>
                      </div>
                    </div>

                    {/* Progress Bar Container */}
                    <div style={{ position: 'relative', height: '12px', background: '#EAE2F8', borderRadius: '6px', overflow: 'hidden', marginBottom: '8px' }}>
                      {/* Current Assessed Bar */}
                      <div
                        style={{
                          width: `${skill.currentLevel || 0}%`,
                          height: '100%',
                          background: skill.priority.color,
                          borderRadius: '6px',
                          transition: 'width 0.5s ease'
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#7A6F8A' }}>
                      <span>Assessed Score: <strong>{skill.isAssessed ? `${skill.currentLevel}%` : 'Not Assessed'}</strong></span>
                      <span style={{ color: skill.priority.color, fontWeight: 700 }}>
                        {skill.isAssessed ? `Gap: ${skill.gap}%` : 'Assessment Needed'} →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ROLE-BASED SKILL ASSESSMENT QUIZ */}
      {/* ========================================================================= */}
      {activeTab === 'assessment' && (
        <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '28px', boxShadow: '0 4px 20px rgba(147, 51, 234, 0.08)' }} className="fade-in">
          
          {/* Assessment Banner */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #EAE2F8', paddingBottom: '16px' }}>
            <div>
              <span className="badge-pill" style={{ background: '#FCE7F3', color: '#EC4899', marginBottom: '4px' }}>
                OFFICIAL SKILL TEST
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E' }}>
                {targetRole} — Knowledge Assessment
              </h2>
            </div>

            <button onClick={() => setShowSubmitConfirm(true)} className="btn-primary" style={{ background: '#059669' }}>
              <CheckCircle2 size={16} />
              <span>Submit Assessment</span>
            </button>
          </div>

          {/* Question View */}
          {roleQuizData.questions.length > 0 && (
            <div>
              {/* Question Header & Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#9333EA' }}>
                  Question {currentQIndex + 1} of {roleQuizData.questions.length}
                </span>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <span className="badge-pill" style={{ background: '#CCFBF1', color: '#0D9488' }}>
                    Skill: {roleQuizData.questions[currentQIndex].skill}
                  </span>
                  <span className="badge-pill" style={{ background: '#FFEDD5', color: '#EA580C' }}>
                    {roleQuizData.questions[currentQIndex].difficulty}
                  </span>
                </div>
              </div>

              {/* Question Card */}
              <div style={{ background: '#FAF7FF', border: '1.5px solid #EAE2F8', borderRadius: '18px', padding: '24px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2D1B4E', lineHeight: '1.5', marginBottom: '16px' }}>
                  {roleQuizData.questions[currentQIndex].question}
                </h3>

                {/* Options List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {roleQuizData.questions[currentQIndex].options.map((opt, optIdx) => {
                    const qId = roleQuizData.questions[currentQIndex].id;
                    const isSelected = userAnswers[qId] === optIdx;

                    return (
                      <div
                        key={optIdx}
                        onClick={() => setUserAnswers({ ...userAnswers, [qId]: optIdx })}
                        style={{
                          padding: '14px 18px',
                          borderRadius: '12px',
                          border: `1.5px solid ${isSelected ? '#9333EA' : '#EAE2F8'}`,
                          background: isSelected ? '#F3E8FF' : '#FFFFFF',
                          color: isSelected ? '#9333EA' : '#2D1B4E',
                          fontWeight: isSelected ? 700 : 500,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: `2px solid ${isSelected ? '#9333EA' : '#CBD5E1'}`,
                          background: isSelected ? '#9333EA' : '#FFFFFF',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 800
                        }}>
                          {String.fromCharCode(65 + optIdx)}
                        </div>
                        <span style={{ fontSize: '0.92rem' }}>{opt}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Prev / Next Controls & Mark for Review */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <button
                  onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))}
                  disabled={currentQIndex === 0}
                  className="btn-secondary"
                  style={{ opacity: currentQIndex === 0 ? 0.5 : 1 }}
                >
                  ← Previous
                </button>

                <button
                  onClick={() => {
                    const qId = roleQuizData.questions[currentQIndex].id;
                    setMarkedForReview({ ...markedForReview, [qId]: !markedForReview[qId] });
                  }}
                  className="btn-secondary"
                  style={{
                    background: markedForReview[roleQuizData.questions[currentQIndex].id] ? '#F3E8FF' : '#FFFFFF',
                    borderColor: markedForReview[roleQuizData.questions[currentQIndex].id] ? '#9333EA' : '#EAE2F8',
                    color: markedForReview[roleQuizData.questions[currentQIndex].id] ? '#9333EA' : '#2D1B4E'
                  }}
                >
                  🚩 {markedForReview[roleQuizData.questions[currentQIndex].id] ? 'Marked for Review' : 'Mark for Review'}
                </button>

                <button
                  onClick={() => setCurrentQIndex(Math.min(roleQuizData.questions.length - 1, currentQIndex + 1))}
                  disabled={currentQIndex === roleQuizData.questions.length - 1}
                  className="btn-primary"
                  style={{ opacity: currentQIndex === roleQuizData.questions.length - 1 ? 0.5 : 1 }}
                >
                  <span>Next Question</span> →
                </button>
              </div>

              {/* Question Palette Grid */}
              <div style={{ paddingTop: '16px', borderTop: '1px solid #EAE2F8' }}>
                <h4 style={{ fontSize: '0.82rem', fontWeight: 800, color: '#7A6F8A', textTransform: 'uppercase', marginBottom: '10px' }}>
                  Question Navigation Palette:
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {roleQuizData.questions.map((q, idx) => {
                    const isAnswered = userAnswers[q.id] !== undefined;
                    const isMarked = markedForReview[q.id];
                    const isCurrent = currentQIndex === idx;

                    let bg = '#FAF7FF';
                    let border = '#EAE2F8';
                    let color = '#2D1B4E';

                    if (isCurrent) { border = '#9333EA'; }
                    if (isAnswered) { bg = '#ECFDF5'; border = '#A7F3D0'; color = '#059669'; }
                    if (isMarked) { bg = '#F3E8FF'; border = '#C084FC'; color = '#9333EA'; }

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQIndex(idx)}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '10px',
                          background: bg,
                          border: `2px solid ${border}`,
                          color: color,
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          cursor: 'pointer'
                        }}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* Submission Modal Confirmation */}
          {showSubmitConfirm && (
            <div className="cjn-modal-overlay" onClick={() => setShowSubmitConfirm(false)}>
              <div className="cjn-modal-content" onClick={(e) => e.stopPropagation()}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '8px' }}>
                  Confirm Assessment Submission
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#4A3E56', marginBottom: '16px' }}>
                  You have answered <strong>{Object.keys(userAnswers).length}</strong> out of <strong>{roleQuizData.questions.length}</strong> questions.
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={handleSubmitAssessment} className="btn-primary" style={{ background: '#059669', flexGrow: 1, justifyContent: 'center' }}>
                    Yes, Evaluate My Answers
                  </button>
                  <button onClick={() => setShowSubmitConfirm(false)} className="btn-secondary">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: MY LEARNING PLAN */}
      {/* ========================================================================= */}
      {activeTab === 'learning-plan' && (
        <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '28px', boxShadow: '0 4px 20px rgba(147, 51, 234, 0.08)' }} className="fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E' }}>
                My Skill Learning Plan
              </h2>
              <p style={{ color: '#7A6F8A', fontSize: '0.88rem' }}>
                Track courses added to bridge your skill gaps and set target completion dates.
              </p>
            </div>

            <button onClick={() => setActiveTab('dashboard')} className="btn-secondary">
              + Find More Courses in Dashboard
            </button>
          </div>

          {learningPlan.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#7A6F8A' }}>
              No courses in your learning plan yet. Explore the dashboard to add course recommendations.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {learningPlan.map((item, idx) => (
                <div key={idx} style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', borderRadius: '16px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <span className="badge-pill" style={{ background: '#CCFBF1', color: '#0D9488', marginBottom: '6px' }}>
                      Target Skill: {item.skillCovered}
                    </span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2D1B4E' }}>{item.name}</h4>
                    <div style={{ fontSize: '0.84rem', color: '#7A6F8A', marginTop: '2px' }}>
                      {item.provider} • Duration: {item.duration}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7A6F8A', display: 'block' }}>Status:</label>
                      <select
                        className="form-control"
                        value={item.status}
                        onChange={(e) => {
                          const updated = [...learningPlan];
                          updated[idx].status = e.target.value;
                          setLearningPlan(updated);
                        }}
                        style={{ padding: '6px 10px', fontSize: '0.82rem', fontWeight: 700 }}
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    {item.status === 'Completed' && (
                      <button
                        onClick={handleStartAssessment}
                        className="btn-primary"
                        style={{ padding: '6px 14px', fontSize: '0.8rem', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}
                      >
                        Take Reassessment
                      </button>
                    )}

                    <button
                      onClick={() => setLearningPlan(learningPlan.filter((_, i) => i !== idx))}
                      style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer' }}
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: ASSESSMENT HISTORY & DOWNLOAD SUMMARY */}
      {/* ========================================================================= */}
      {activeTab === 'history' && (
        <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '28px', boxShadow: '0 4px 20px rgba(147, 51, 234, 0.08)' }} className="fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E' }}>
                Assessment History & Downloadable Summary
              </h2>
              <p style={{ color: '#7A6F8A', fontSize: '0.88rem' }}>
                Log of past assessment attempts and printable report generation.
              </p>
            </div>

            <button
              onClick={() => {
                alert(`Generated Assessment Summary Report:\nTarget Role: ${targetRole}\nOverall Match: ${overallMatchPct}%\nAssessed Date: ${new Date().toLocaleDateString()}\n\nNote: Estimated score, not an official certification.`);
              }}
              className="btn-primary"
            >
              <Download size={16} />
              <span>Download Assessment Report</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {assessmentHistory.map((att) => (
              <div key={att.id} style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', borderRadius: '16px', padding: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', color: '#9333EA', fontWeight: 700 }}>🗓️ Attempt Date: {att.date}</span>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2D1B4E', marginTop: '2px' }}>Role: {att.role}</h4>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#059669' }}>
                  Score: {att.overallScore}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SKILL DETAILS MODAL & COURSE RECOMMENDATIONS */}
      {/* ========================================================================= */}
      {selectedSkillModal && (
        <div className="cjn-modal-overlay" onClick={() => setSelectedSkillModal(null)}>
          <div className="cjn-modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <span className="badge-pill" style={{ background: selectedSkillModal.priority.bg, color: selectedSkillModal.priority.color }}>
                  {selectedSkillModal.priority.label} ({selectedSkillModal.gap}% Gap)
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', marginTop: '6px' }}>
                  Skill: {selectedSkillModal.skillName}
                </h3>
              </div>
              <button onClick={() => setSelectedSkillModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7A6F8A' }}>
                <X size={20} />
              </button>
            </div>

            {/* Why is this skill important */}
            <div style={{ background: '#FAF7FF', padding: '14px', borderRadius: '14px', border: '1px solid #EAE2F8', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#9333EA', textTransform: 'uppercase' }}>
                WHY IS THIS SKILL IMPORTANT FOR {targetRole.toUpperCase()}?
              </div>
              <p style={{ fontSize: '0.88rem', color: '#4A3E56', marginTop: '4px', lineHeight: '1.4' }}>
                {selectedSkillModal.importance}
              </p>
            </div>

            {/* Confidence & Incorrect Topics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
              <div style={{ background: '#FFF5FA', padding: '12px', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#EC4899' }}>CONFIDENCE INDICATOR</span>
                <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#2D1B4E', marginTop: '2px' }}>
                  {selectedSkillModal.confidence.label}
                </div>
              </div>
              <div style={{ background: '#FFF5FA', padding: '12px', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#EC4899' }}>CURRENT VS TARGET</span>
                <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#2D1B4E', marginTop: '2px' }}>
                  {selectedSkillModal.currentLevel !== null ? `${selectedSkillModal.currentLevel}%` : 'Not Assessed'} / {selectedSkillModal.requiredLevel}%
                </div>
              </div>
            </div>

            {/* Personalized Course Recommendations Section */}
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={18} color="#9333EA" />
              <span>Recommended Free & Paid Courses for {selectedSkillModal.skillName}</span>
            </h4>

            {/* Course Filter Controls */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              {['All', 'Free', 'Paid'].map(f => (
                <button
                  key={f}
                  onClick={() => setCourseFilter(f)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    border: `1px solid ${courseFilter === f ? '#9333EA' : '#EAE2F8'}`,
                    background: courseFilter === f ? '#F3E8FF' : '#FFFFFF',
                    color: courseFilter === f ? '#9333EA' : '#4A3E56',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {f} Courses
                </button>
              ))}
            </div>

            {/* Course Cards List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '280px', overflowY: 'auto', paddingRight: '4px' }}>
              {(COURSE_RECOMMENDATIONS[selectedSkillModal.skillName] || COURSE_RECOMMENDATIONS["SQL"])
                .filter(c => courseFilter === 'All' || (courseFilter === 'Free' && c.isFree) || (courseFilter === 'Paid' && !c.isFree))
                .map(course => (
                  <div key={course.id} style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '14px', padding: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <span style={{ background: course.isFree ? '#ECFDF5' : '#FFEDD5', color: course.isFree ? '#059669' : '#EA580C', fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '8px' }}>
                          {course.isFree ? 'FREE COURSE' : `PAID (${course.price})`}
                        </span>
                        <h5 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#2D1B4E', marginTop: '4px' }}>{course.name}</h5>
                        <div style={{ fontSize: '0.78rem', color: '#7A6F8A' }}>{course.provider} • {course.duration}</div>
                      </div>

                      <button
                        onClick={() => handleAddToLearningPlan(course)}
                        className="btn-secondary"
                        style={{ padding: '6px 12px', fontSize: '0.78rem', borderColor: '#C084FC', color: '#9333EA' }}
                      >
                        + Add to Plan
                      </button>
                    </div>

                    <p style={{ fontSize: '0.82rem', color: '#4A3E56', marginTop: '6px', lineHeight: '1.3' }}>
                      {course.description}
                    </p>

                    {/* Relevance Explanation */}
                    <div style={{ marginTop: '8px', fontSize: '0.75rem', color: '#059669', background: '#F0FDF4', padding: '6px 10px', borderRadius: '8px', fontWeight: 600 }}>
                      💡 {getCourseRelevanceExplanation(course, selectedSkillModal.currentLevel || 0, selectedSkillModal.requiredLevel, selectedSkillModal.skillName)}
                    </div>
                  </div>
                ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
