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

// Student Profile & Score
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
  score += Math.round((db.studentProfile.cgpa || 7) * 25); // Max ~250
  score += (db.studentProfile.skills?.length || 5) * 15;   // ~150
  score -= (db.studentProfile.backlogHistory || 0) * 30;  // backlog penalty
  score = Math.min(900, Math.max(350, score));

  db.studentProfile.employabilityScore = score;
  saveDb(db);

  res.json({ success: true, profile: db.studentProfile });
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
