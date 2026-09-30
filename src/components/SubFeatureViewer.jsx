import React from 'react';
import SkillGap from './SkillGap';
import ResumeTools from './ResumeTools';
import MockInterview from './MockInterview';
import GovtSchemes from './GovtSchemes';
import LearningHub from './LearningHub';
import TpoDashboard from './TpoDashboard';
import ConnectedJobsNetwork from './ConnectedJobsNetwork';
import GrowthMap from './GrowthMap';
import MentorGuidancePage from './MentorGuidancePage';
import ElevatorPitchPage from './ElevatorPitchPage';
import LanguageTranslatorPage from './LanguageTranslatorPage';
import RedFlagDetectorPage from './RedFlagDetectorPage';
import EmployabilityScorePage from './EmployabilityScorePage';
import PeerBenchmarkingPage from './PeerBenchmarkingPage';
import SkillDemandRadarPage from './SkillDemandRadarPage';
import StudentProfileDashboard from './StudentProfileDashboard';
import CareerRoadmapPage from './CareerRoadmapPage';
import JobsOpportunitiesPage from './JobsOpportunitiesPage';
import JobAlertsPage from './JobAlertsPage';
import ProjectLabPage from './ProjectLabPage';
import GlobalSearchResultsPage from './GlobalSearchResultsPage';
import SupportFeedbackPage from './SupportFeedbackPage';
import WhyUsPage from './WhyUsPage';
import MindGamesPage from './MindGamesPage';
import BackButton from './BackButton';

export default function SubFeatureViewer({ 
  subFeatureId, 
  studentProfile, 
  onNavigate,
  onGoBack,
  canGoBack,
  onOpenTranslator,
  onUpdateProfile,
  searchQuery = '',
  language = 'English'
}) {
  const wrapWithBack = (element) => (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 20px 0 20px' }}>
      {onGoBack && (
        <BackButton onGoBack={onGoBack} label="Back to Previous Page" />
      )}
      {element}
    </div>
  );

  // 1. Mind Games & Puzzles
  if (subFeatureId === 'mind-games' || subFeatureId === 'puzzles' || subFeatureId === 'mind-games-puzzles' || subFeatureId === 'brain-games') {
    return wrapWithBack(<MindGamesPage studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} language={language} />);
  }

  // 2. Project Lab & Ideas
  if (subFeatureId === 'project-lab' || subFeatureId === 'project-ideas' || subFeatureId === 'projects' || subFeatureId === 'micro-projects') {
    return wrapWithBack(<ProjectLabPage studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }

  // 3. Job Alerts
  if (subFeatureId === 'job-alerts' || subFeatureId === 'alerts') {
    return wrapWithBack(<JobAlertsPage studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }

  // 4. Jobs & Internships
  if (subFeatureId === 'internships-jobs' || subFeatureId === 'jobs-opportunities' || subFeatureId === 'jobs' || subFeatureId === 'opportunities' || subFeatureId === 'internships' || subFeatureId === 'job-opportunities') {
    return wrapWithBack(<JobsOpportunitiesPage studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }

  // 5. Academic Guidance & Career Roadmap
  if (subFeatureId === 'academic-guidance' || subFeatureId === 'career-explorer' || subFeatureId === 'career-roadmap' || subFeatureId === 'guidance' || subFeatureId === 'roadmap') {
    return wrapWithBack(<CareerRoadmapPage studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }

  // 6. Student Profile Analysis
  if (subFeatureId === 'profile-analysis' || subFeatureId === 'profile' || subFeatureId === 'student-profile' || subFeatureId === 'profile-dashboard') {
    return wrapWithBack(
      <StudentProfileDashboard 
        studentProfile={studentProfile} 
        onNavigate={onNavigate} 
        onGoBack={onGoBack}
        onUpdateProfile={onUpdateProfile} 
        language={language} 
      />
    );
  }

  // 7. Skill Demand Radar
  if (subFeatureId === 'skill-demand' || subFeatureId === 'skill-demand-radar' || subFeatureId === 'demand-radar') {
    return wrapWithBack(<SkillDemandRadarPage studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }

  // 8. Peer Benchmarking
  if (subFeatureId === 'peer-benchmarking' || subFeatureId === 'peer-rank' || subFeatureId === 'benchmarking') {
    return wrapWithBack(<PeerBenchmarkingPage studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }

  // 9. Employability Score
  if (subFeatureId === 'employability-score' || subFeatureId === 'score-breakdown') {
    return wrapWithBack(<EmployabilityScorePage studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }

  // 10. AI Red Flag Detector
  if (subFeatureId === 'red-flag-detector' || subFeatureId === 'red-flag' || subFeatureId === 'scam-detector') {
    return wrapWithBack(<RedFlagDetectorPage studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }

  // 11. Mentor Guidance
  if (subFeatureId === 'mentor-guidance' || subFeatureId === 'mentor' || subFeatureId === 'ai-coach') {
    return wrapWithBack(<MentorGuidancePage studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }

  // 12. Growth Map
  if (subFeatureId === 'growth-map' || subFeatureId === 'growth' || subFeatureId === 'progress-map') {
    return wrapWithBack(<GrowthMap studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }

  // 13. Connected Jobs Network
  if (subFeatureId === 'connected-jobs-network' || subFeatureId === 'jobs-network' || subFeatureId === 'network-graph') {
    return wrapWithBack(<ConnectedJobsNetwork studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }

  // 14. Skill Gap Analysis
  if (subFeatureId === 'skill-gap' || subFeatureId === 'skill-gap-analysis' || subFeatureId === 'skillgap') {
    return wrapWithBack(<SkillGap studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }

  // 15. Resume Tools & Assist
  if (subFeatureId === 'resume-assist' || subFeatureId === 'resume' || subFeatureId === 'resume-analyzer' || subFeatureId === 'resume-improvement' || subFeatureId === 'rejected-resume' || subFeatureId === 'company-resume' || subFeatureId === 'jd-analyzer' || subFeatureId === 'resume-reference') {
    return wrapWithBack(<ResumeTools studentProfile={studentProfile} defaultTab={subFeatureId} onGoBack={onGoBack} />);
  }

  // 16. AI Mock Interview Studio
  if (subFeatureId === 'mock-interviews' || subFeatureId === 'mock-interview' || subFeatureId === 'ai-mock-interview' || subFeatureId === 'interviews') {
    return wrapWithBack(<MockInterview studentProfile={studentProfile} onGoBack={onGoBack} />);
  }

  // 17. 30-Sec Elevator Pitch & Communication Skills
  if (subFeatureId === 'communication-skills' || subFeatureId === 'elevator-pitch' || subFeatureId === '30-sec-pitch' || subFeatureId === 'pitch-elevator' || subFeatureId === 'elevator-pitch-30s' || subFeatureId === 'pitch') {
    return wrapWithBack(<ElevatorPitchPage studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }

  // 18. Govt Opportunities & Schemes
  if (subFeatureId === 'govt-opportunities-schemes' || subFeatureId === 'govt-jobs' || subFeatureId === 'govt-schemes' || subFeatureId === 'govt') {
    return wrapWithBack(<GovtSchemes studentProfile={studentProfile} onGoBack={onGoBack} />);
  }

  // 19. Learning Hub & Free Courses
  if (subFeatureId === 'free-courses' || subFeatureId === 'learning-hub' || subFeatureId === 'courses') {
    return wrapWithBack(<LearningHub defaultTab={subFeatureId} onGoBack={onGoBack} />);
  }

  // 20. College / TPO Dashboard
  if (subFeatureId === 'tpo-notices' || subFeatureId === 'tpo' || subFeatureId === 'tpo-dashboard') {
    return wrapWithBack(<TpoDashboard onGoBack={onGoBack} />);
  }

  // 21. AI Language Translator
  if (subFeatureId === 'language-translation' || subFeatureId === 'translator') {
    return wrapWithBack(<LanguageTranslatorPage studentProfile={studentProfile} onGoBack={onGoBack} />);
  }

  // 22. Support & Feedback
  if (subFeatureId === 'support-feedback' || subFeatureId === 'support' || subFeatureId === 'feedback' || subFeatureId === 'rating-feedback' || subFeatureId === 'rating') {
    return wrapWithBack(<SupportFeedbackPage studentProfile={studentProfile} onNavigate={onNavigate} language={language} onGoBack={onGoBack} />);
  }

  // 23. Why Us
  if (subFeatureId === 'why-us' || subFeatureId === 'whyus') {
    return wrapWithBack(<WhyUsPage studentProfile={studentProfile} onNavigate={onNavigate} language={language} onGoBack={onGoBack} />);
  }

  // 24. Global Search Results
  if (subFeatureId === 'search-results' || subFeatureId === 'search') {
    return wrapWithBack(<GlobalSearchResultsPage searchQuery={searchQuery} studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }

  // Fallback catch-all: Never return an empty div / blank page!
  return wrapWithBack(
    <StudentProfileDashboard 
      studentProfile={studentProfile} 
      onNavigate={onNavigate} 
      onGoBack={onGoBack}
      onUpdateProfile={onUpdateProfile} 
      language={language} 
    />
  );
}
