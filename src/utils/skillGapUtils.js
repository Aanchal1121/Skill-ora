// skillGapUtils.js
// Utility calculations for Skill Gap Analysis, Priority Thresholds, and Confidence Indicators.

export function calculateSkillProficiency(correctAnswers, totalQuestions) {
  if (!totalQuestions || totalQuestions === 0) return null;
  return Math.round((correctAnswers / totalQuestions) * 100);
}

export function calculateSkillGap(currentLevel, requiredLevel) {
  if (currentLevel === null || currentLevel === undefined) return requiredLevel; // Unassessed gap equals required
  return Math.max(0, requiredLevel - currentLevel);
}

export function getPriorityStatus(gap, isAssessed = true) {
  if (!isAssessed) {
    return { label: 'Unassessed', color: '#7A6F8A', bg: '#F0EAFA', border: '#E5D9F2', priorityLevel: 0 };
  }
  if (gap <= 10) {
    return { label: 'On Track', color: '#059669', bg: '#ECFDF5', border: '#A7F3D0', priorityLevel: 1 };
  }
  if (gap <= 25) {
    return { label: 'Moderate Gap', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A', priorityLevel: 2 };
  }
  return { label: 'High Gap', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA', priorityLevel: 3 };
}

export function getConfidenceIndicator(questionsCount) {
  if (!questionsCount || questionsCount < 2) {
    return { label: 'Limited Evidence', color: '#64748B', desc: '1-2 questions answered. Take full test for higher precision.' };
  }
  if (questionsCount < 5) {
    return { label: 'Moderate Evidence', color: '#D97706', desc: '3-4 questions answered. Good baseline assessment.' };
  }
  return { label: 'High Evidence Available', color: '#059669', desc: '5+ questions answered. High confidence score calculation.' };
}

export function calculateOverallMatch(skillDataList) {
  if (!skillDataList || skillDataList.length === 0) return 0;
  
  let totalAssessedWeight = 0;
  let totalEarnedScore = 0;

  skillDataList.forEach(s => {
    const required = s.requiredLevel || 80;
    const current = s.currentLevel !== null ? s.currentLevel : 0;
    totalAssessedWeight += required;
    totalEarnedScore += Math.min(current, required);
  });

  if (totalAssessedWeight === 0) return 0;
  return Math.round((totalEarnedScore / totalAssessedWeight) * 100);
}
