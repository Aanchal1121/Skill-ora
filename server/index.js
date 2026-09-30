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

// Opportunities & Job Listings APIs
app.get('/api/opportunities', (req, res) => {
  const db = getDb();
  res.json(db.opportunities || []);
});

app.get('/api/opportunities/recommended', (req, res) => {
  const db = getDb();
  const student = db.studentProfile || {};
  const recommended = (db.opportunities || []).map(opp => {
    const matchingSkills = (opp.requiredSkills || []).filter(s =>
      (student.skills || []).some(sk => (sk.name || s).toLowerCase().includes(s.toLowerCase()))
    );
    return {
      ...opp,
      matchExplanation: `Matches ${matchingSkills.length} of your target skills (${matchingSkills.join(', ') || 'General Match'})`,
      matchingSkills
    };
  });
  res.json(recommended);
});

app.get('/api/opportunities/saved', (req, res) => {
  const db = getDb();
  const saved = (db.opportunities || []).filter(o => o.isSaved);
  res.json(saved);
});

app.post('/api/opportunities/save', (req, res) => {
  const db = getDb();
  const { opportunityId, isSaved } = req.body;
  db.opportunities = (db.opportunities || []).map(opp =>
    opp.id === opportunityId ? { ...opp, isSaved } : opp
  );
  saveDb(db);
  res.json({ success: true, opportunities: db.opportunities });
});

app.get('/api/applications', (req, res) => {
  const db = getDb();
  const tracked = (db.opportunities || []).filter(o => o.isSaved || o.status !== 'Saved');
  res.json(tracked);
});

app.patch('/api/applications/:id/status', (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const { status } = req.body;
  db.opportunities = (db.opportunities || []).map(opp =>
    opp.id == id ? { ...opp, status } : opp
  );
  saveDb(db);
  res.json({ success: true });
});

app.get('/api/opportunities/:id', (req, res) => {
  const db = getDb();
  const opp = (db.opportunities || []).find(o => o.id == req.params.id);
  if (opp) res.json(opp);
  else res.status(404).json({ error: 'Opportunity not found' });
});

// Support Center, Feedback & Rating APIs
app.get('/api/support/tickets', (req, res) => {
  const db = getDb();
  res.json({ tickets: db.supportTickets || [] });
});

app.post('/api/support/tickets', (req, res) => {
  const db = getDb();
  const newTicket = req.body;
  db.supportTickets = [newTicket, ...(db.supportTickets || [])];
  saveDb(db);
  res.json({ success: true, ticket: newTicket });
});

app.patch('/api/support/tickets/:id', (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const { status, responseMessage } = req.body;
  db.supportTickets = (db.supportTickets || []).map(t => {
    if (t.id === id) {
      const updatedResponses = responseMessage ? [
        ...(t.responses || []),
        { sender: 'SkillAura TPO / Support Admin', message: responseMessage, timestamp: new Date().toLocaleString() }
      ] : (t.responses || []);
      return { ...t, status: status || t.status, responses: updatedResponses };
    }
    return t;
  });
  saveDb(db);
  res.json({ success: true, tickets: db.supportTickets });
});

app.post('/api/support/tickets/:id/reopen', (req, res) => {
  const db = getDb();
  const { id } = req.params;
  db.supportTickets = (db.supportTickets || []).map(t =>
    t.id === id ? { ...t, status: 'Open' } : t
  );
  saveDb(db);
  res.json({ success: true });
});

app.get('/api/feedback', (req, res) => {
  const db = getDb();
  res.json({ feedback: db.feedbackList || [] });
});

app.post('/api/feedback', (req, res) => {
  const db = getDb();
  const item = req.body;
  db.feedbackList = [item, ...(db.feedbackList || [])];
  saveDb(db);
  res.json({ success: true });
});

app.get('/api/ratings', (req, res) => {
  const db = getDb();
  const list = db.ratingsList || [];
  const total = list.length;
  const sum = list.reduce((acc, r) => acc + (r.rating || 5), 0);
  const avg = total > 0 ? (sum / total).toFixed(1) : '4.8';
  res.json({
    avgRating: parseFloat(avg),
    totalRatings: total || 124,
    ratings: list
  });
});

app.post('/api/ratings', (req, res) => {
  const db = getDb();
  const newRating = req.body;
  const existingIndex = (db.ratingsList || []).findIndex(r => r.studentId === newRating.studentId);
  if (existingIndex >= 0) {
    db.ratingsList[existingIndex] = newRating;
  } else {
    db.ratingsList = [newRating, ...(db.ratingsList || [])];
  }
  saveDb(db);
  res.json({ success: true });
});

// Mind Games & Puzzles Endpoints
app.get('/api/mindgames/stats', (req, res) => {
  const db = getDb();
  res.json(db.mindGamesStats || {});
});

app.post('/api/mindgames/save-score', (req, res) => {
  const db = getDb();
  db.mindGamesStats = {
    ...db.mindGamesStats,
    ...req.body
  };
  saveDb(db);
  res.json({ success: true, mindGamesStats: db.mindGamesStats });
});

app.get('/api/mindgames/leaderboard', (req, res) => {
  const db = getDb();
  const stats = db.mindGamesStats || {};
  res.json({
    leaderboard: [
      { rank: 1, name: db.studentProfile?.name || 'Ananya Roy', xp: stats.totalXP || 840, streak: stats.dailyStreak || 5 },
      { rank: 2, name: 'Rohan Sharma', xp: 720, streak: 6 },
      { rank: 3, name: 'Priya Patel', xp: 680, streak: 4 },
      { rank: 4, name: 'Vikram Verma', xp: 640, streak: 3 }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 SkillAura Backend Server listening on http://localhost:${PORT}`);
});

