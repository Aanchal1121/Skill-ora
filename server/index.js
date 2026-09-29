import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getDb, saveDb } from './db.js';
import {
  analyzeSkillGap,
  analyzeResumeJd,
  explainRejection,
  evaluateMockInterview,
  detectFraudInListing,
  handleCareerChat
} from './aiEngine.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', app: 'CareerLeap Backend API', time: new Date().toISOString() });
});

// Student Profile & Sub-routes
app.get('/api/student/profile', (req, res) => {
  const db = getDb();
  res.json(db.studentProfile);
});

app.post('/api/student/profile', (req, res) => {
  const db = getDb();
  const updatedData = req.body;
  
  db.studentProfile = {
    ...db.studentProfile,
    ...updatedData
  };

  // Recalculate basic employability score
  let score = 500;
  score += Math.round((db.studentProfile.cgpa || 7) * 25);
  score += (db.studentProfile.skills?.length || 5) * 15;
  score -= (db.studentProfile.backlogHistory || 0) * 30;
  score = Math.min(900, Math.max(350, score));

  db.studentProfile.employabilityScore = score;
  saveDb(db);

  res.json({ success: true, profile: db.studentProfile });
});

app.patch('/api/student/profile', (req, res) => {
  const db = getDb();
  const updatedData = req.body;

  db.studentProfile = {
    ...db.studentProfile,
    ...updatedData
  };

  saveDb(db);
  res.json({ success: true, profile: db.studentProfile });
});

// Academic Details & Performance Graph Data
app.get('/api/student/profile/academic', (req, res) => {
  const db = getDb();
  const p = db.studentProfile;
  res.json({
    college: p.college,
    degree: p.degree,
    branch: p.branch,
    year: p.year,
    semester: p.semester,
    gradYear: p.gradYear,
    cgpa: p.cgpa,
    sgpaHistory: p.sgpaHistory || [],
    backlogHistory: p.backlogHistory || 0,
    class10Marks: p.class10Marks || null,
    class12Marks: p.class12Marks || null,
    academicAchievements: p.academicAchievements || []
  });
});

// Skills Overview Data
app.get('/api/student/profile/skills', (req, res) => {
  const db = getDb();
  res.json({
    skills: db.studentProfile.skills || []
  });
});

// Projects & Experience Data
app.get('/api/student/profile/projects', (req, res) => {
  const db = getDb();
  res.json({
    projects: db.studentProfile.projects || [],
    experiences: db.studentProfile.experiences || []
  });
});

// Certifications & Achievements Data
app.get('/api/student/profile/achievements', (req, res) => {
  const db = getDb();
  res.json({
    certifications: db.studentProfile.certifications || [],
    achievements: db.studentProfile.achievements || []
  });
});

// Career Readiness Overview Data
app.get('/api/student/profile/readiness', (req, res) => {
  const db = getDb();
  const p = db.studentProfile;
  res.json({
    employabilityScore: p.employabilityScore || 745,
    maxScore: p.maxScore || 900,
    readinessMetrics: p.readinessMetrics || {}
  });
});

// Student Growth Visualization Data
app.get('/api/student/profile/growth', (req, res) => {
  const db = getDb();
  const p = db.studentProfile;
  res.json({
    scoreHistory: p.scoreHistory || [],
    skillsImprovedCount: p.skills?.filter(s => s.isAssessed && s.proficiency >= 80).length || 4,
    completedProjectsCount: p.projects?.filter(pr => pr.status === 'Completed').length || 2,
    milestoneCount: 5
  });
});

// Recent Activity History
app.get('/api/student/profile/activity', (req, res) => {
  const db = getDb();
  res.json({
    recentActivity: db.studentProfile.recentActivity || []
  });
});

// Skill Gap Analysis & Roadmap
app.post('/api/skill-gap', (req, res) => {
  const { currentSkills, targetRole } = req.body;
  const analysis = analyzeSkillGap(currentSkills, targetRole);
  res.json(analysis);
});

// Resume ↔ JD Analyzer
app.post('/api/resume/analyze', (req, res) => {
  const { resumeText, jdText, targetCompany } = req.body;
  const result = analyzeResumeJd(resumeText, jdText, targetCompany);
  res.json(result);
});

// Rejection Explainer
app.post('/api/resume/rejection-explain', (req, res) => {
  const { rejectionText } = req.body;
  const result = explainRejection(rejectionText);
  res.json(result);
});

// Mock Interview Evaluator
app.post('/api/mock-interview/evaluate', (req, res) => {
  const { question, answer } = req.body;
  const result = evaluateMockInterview(question, answer);
  res.json(result);
});

// Fraud Check
app.post('/api/fraud-check', (req, res) => {
  const { listingText } = req.body;
  const result = detectFraudInListing(listingText);
  res.json(result);
});

// Govt Schemes Aggregator with Auto Eligibility Check
app.get('/api/govt-schemes', (req, res) => {
  const db = getDb();
  const profile = db.studentProfile;

  const enrichedSchemes = db.govtSchemes.map(scheme => {
    let eligible = true;
    const reasons = [];

    if (profile.cgpa < scheme.eligibility.minCgpa) {
      eligible = false;
      reasons.push(`CGPA ${profile.cgpa} below minimum ${scheme.eligibility.minCgpa}`);
    }
    if (profile.backlogHistory > scheme.eligibility.maxBacklogs) {
      eligible = false;
      reasons.push(`Backlogs count (${profile.backlogHistory}) exceeds limit (${scheme.eligibility.maxBacklogs})`);
    }

    return {
      ...scheme,
      isEligible: eligible,
      eligibilityReasons: reasons
    };
  });

  res.json(enrichedSchemes);
});

// Free Courses & Micro Projects
app.get('/api/courses', (req, res) => {
  const db = getDb();
  res.json({
    courses: db.freeCourses,
    microProjects: db.microProjects
  });
});

// TPO Dashboard Analytics
app.get('/api/tpo/analytics', (req, res) => {
  const db = getDb();
  res.json(db.tpoAnalytics);
});

// AI Career Chatbot
app.post('/api/ai/chat', (req, res) => {
  const { query, language } = req.body;
  const reply = handleCareerChat(query, language);
  res.json({ reply, timestamp: new Date().toLocaleTimeString() });
});

app.listen(PORT, () => {
  console.log(`🚀 CareerLeap Backend Server listening on http://localhost:${PORT}`);
});
