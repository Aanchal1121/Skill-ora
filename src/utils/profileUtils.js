/**
 * Utility functions to normalize and safely handle student profile fields
 * preventing runtime TypeErrors across components.
 */

export function getNormalizedSkills(skills) {
  if (!skills) {
    return ['Java', 'C++', 'SQL', 'HTML', 'Git', 'React'];
  }
  if (Array.isArray(skills)) {
    const list = skills.map(item => {
      if (typeof item === 'string') return item.trim();
      if (item && typeof item === 'object' && item.name) return String(item.name).trim();
      return item ? String(item).trim() : null;
    }).filter(Boolean);
    return list.length > 0 ? list : ['Java', 'C++', 'SQL', 'HTML'];
  }
  if (typeof skills === 'object') {
    const names = [];
    Object.values(skills).forEach(val => {
      if (Array.isArray(val)) {
        val.forEach(item => {
          if (typeof item === 'string') names.push(item.trim());
          else if (item && typeof item === 'object' && item.name) names.push(String(item.name).trim());
        });
      } else if (typeof val === 'string') {
        names.push(val.trim());
      }
    });
    return names.length > 0 ? names : ['Java', 'C++', 'SQL', 'HTML'];
  }
  if (typeof skills === 'string') {
    const split = skills.split(',').map(s => s.trim()).filter(Boolean);
    return split.length > 0 ? split : ['Java', 'C++', 'SQL', 'HTML'];
  }
  return ['Java', 'C++', 'SQL', 'HTML'];
}

export function formatSkillsList(skills, separator = ', ', limit = null) {
  const normalized = getNormalizedSkills(skills);
  const sliced = limit ? normalized.slice(0, limit) : normalized;
  return sliced.join(separator);
}
