import React, { useState, useMemo } from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  Clock, 
  Layers, 
  BookOpen, 
  ArrowRight, 
  Plus, 
  RotateCcw,
  Target,
  Award,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  X,
  Check
} from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function GrowthMap({ studentProfile, onNavigate }) {
  // Graph Filter: 'this-week' | 'last-week' | 'last-4-weeks'
  const [graphFilter, setGraphFilter] = useState('this-week');

  // Tasks checklist state for "Your Next Week's Plan"
  const [nextWeekTasks, setNextWeekTasks] = useState([
    { id: 't1', title: 'Practice SQL joins and subqueries', skill: 'SQL', estimatedTime: '30 mins', priority: 'High', completed: false, dueDate: '2026-10-02' },
    { id: 't2', title: 'Revise Java OOP & Concurrency concepts', skill: 'Java', estimatedTime: '1 hr', priority: 'High', completed: false, dueDate: '2026-10-03' },
    { id: 't3', title: 'Complete REST API backend milestone', skill: 'Spring Boot', estimatedTime: '2 hrs', priority: 'Medium', completed: false, dueDate: '2026-10-04' }
  ]);

  // Form for adding custom task
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSkill, setNewTaskSkill] = useState('Java');
  const [newTaskTime, setNewTaskTime] = useState('45 mins');
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  // History Collapsible Modal/Drawer State
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedHistoryWeek, setSelectedHistoryWeek] = useState('Week 3 (Sep 15 - Sep 21)');

  // Dynamic Weekly Activity Completion Data per filter
  const chartDataConfig = useMemo(() => {
    if (graphFilter === 'last-week') {
      return {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [40, 55, 60, 50, 70, 65, 80],
        completedTasks: [2, 3, 3, 2, 4, 3, 4],
        plannedTasks: [5, 5, 5, 4, 5, 5, 5]
      };
    }
    if (graphFilter === 'last-4-weeks') {
      return {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4 (Current)'],
        data: [52, 60, 68, 75],
        completedTasks: [15, 18, 21, 24],
        plannedTasks: [28, 30, 31, 32]
      };
    }
    // Default 'this-week'
    return {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [60, 80, 70, 85, 90, 65, 75],
      completedTasks: [3, 4, 3, 5, 5, 3, 4],
      plannedTasks: [5, 5, 4, 6, 5, 4, 5]
    };
  }, [graphFilter]);

  const lineChartData = {
    labels: chartDataConfig.labels,
    datasets: [
      {
        label: 'Daily Activity Completion %',
        data: chartDataConfig.data,
        borderColor: '#9333EA',
        backgroundColor: 'rgba(147, 51, 234, 0.12)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#9333EA',
        pointBorderColor: '#FFFFFF',
        pointRadius: 5
      }
    ]
  };

  // Toggle completion of a next week task
  const handleToggleTask = (taskId) => {
    setNextWeekTasks(nextWeekTasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  // Add custom task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: `t-${Date.now()}`,
      title: newTaskTitle.trim(),
      skill: newTaskSkill,
      estimatedTime: newTaskTime,
      priority: 'Medium',
      completed: false,
      dueDate: new Date().toISOString().split('T')[0]
    };
    setNextWeekTasks([...nextWeekTasks, newTask]);
    setNewTaskTitle('');
    setShowAddTaskForm(false);
  };

  // Compute Task Stats dynamically
  const completedTasksCount = 6 + nextWeekTasks.filter(t => t.completed).length;
  const totalPlannedTasks = 8 + nextWeekTasks.length;
  const weeklyCompletionPct = Math.round((completedTasksCount / totalPlannedTasks) * 100);

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '24px 20px' }} className="fade-in">
      
      {/* 1. MY GROWTH MAP OVERVIEW */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Sparkles size={20} color="#9333EA" />
          <span className="badge-pill" style={{ background: '#F3E8FF', color: '#9333EA' }}>
            PERSONALIZED CAREER PROGRESS
          </span>
        </div>

        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
          My Growth Map
        </h1>

        <p style={{ color: '#7A6F8A', fontSize: '1rem' }}>
          Track your progress, understand your growth, and take the next step toward your career goal.
        </p>
      </div>

      {/* THREE COMPACT SUMMARY CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        
        {/* Card 1: Weekly Progress */}
        <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '20px', padding: '22px', boxShadow: '0 4px 18px rgba(147, 51, 234, 0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#9333EA', textTransform: 'uppercase' }}>
              WEEKLY PROGRESS
            </span>
            <span style={{ background: '#ECFDF5', color: '#059669', fontSize: '0.78rem', fontWeight: 700, padding: '3px 10px', borderRadius: '12px' }}>
              +12% vs last week
            </span>
          </div>

          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#2D1B4E', lineHeight: '1.1' }}>
            {weeklyCompletionPct}%
          </div>

          <p style={{ fontSize: '0.88rem', color: '#4A3E56', marginTop: '6px' }}>
            <strong>{completedTasksCount}</strong> of <strong>{totalPlannedTasks}</strong> planned tasks completed this week
          </p>

          <div style={{ height: '6px', background: '#F0EAFA', borderRadius: '3px', overflow: 'hidden', marginTop: '12px' }}>
            <div style={{ width: `${weeklyCompletionPct}%`, height: '100%', background: '#9333EA' }} />
          </div>
        </div>

        {/* Card 2: Skills Improved */}
        <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '20px', padding: '22px', boxShadow: '0 4px 18px rgba(147, 51, 234, 0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0D9488', textTransform: 'uppercase' }}>
              SKILLS IMPROVED
            </span>
            <span style={{ background: '#CCFBF1', color: '#0D9488', fontSize: '0.78rem', fontWeight: 700, padding: '3px 10px', borderRadius: '12px' }}>
              3 Skills Mastered
            </span>
          </div>

          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#2D1B4E', lineHeight: '1.1' }}>
            3 <span style={{ fontSize: '1rem', color: '#7A6F8A', fontWeight: 600 }}>Improved</span>
          </div>

          <p style={{ fontSize: '0.88rem', color: '#4A3E56', marginTop: '6px' }}>
            Currently developing <strong>2 skills</strong> (Spring Boot & REST APIs)
          </p>

          <div style={{ height: '6px', background: '#CCFBF1', borderRadius: '3px', overflow: 'hidden', marginTop: '12px' }}>
            <div style={{ width: '75%', height: '100%', background: '#0D9488' }} />
          </div>
        </div>

        {/* Card 3: Projects Completed */}
        <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '20px', padding: '22px', boxShadow: '0 4px 18px rgba(147, 51, 234, 0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#EA580C', textTransform: 'uppercase' }}>
              PROJECTS COMPLETED
            </span>
            <span style={{ background: '#FFEDD5', color: '#EA580C', fontSize: '0.78rem', fontWeight: 700, padding: '3px 10px', borderRadius: '12px' }}>
              2 Verified Projects
            </span>
          </div>

          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#2D1B4E', lineHeight: '1.1' }}>
            2 <span style={{ fontSize: '1rem', color: '#7A6F8A', fontWeight: 600 }}>Projects</span>
          </div>

          <p style={{ fontSize: '0.88rem', color: '#4A3E56', marginTop: '6px' }}>
            Completed <strong>3 milestones</strong> this week • 1 project in progress
          </p>

          <div style={{ height: '6px', background: '#FFEDD5', borderRadius: '3px', overflow: 'hidden', marginTop: '12px' }}>
            <div style={{ width: '66%', height: '100%', background: '#EA580C' }} />
          </div>
        </div>

      </div>

      {/* 2. WEEKLY PROGRESS GRAPH */}
      <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '28px', marginBottom: '32px', boxShadow: '0 4px 20px rgba(147, 51, 234, 0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E' }}>
              Your Weekly Progress
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#7A6F8A' }}>
              Daily activity completion percentage based on recorded learning tasks.
            </p>
          </div>

          {/* Graph Filter Buttons */}
          <div style={{ display: 'flex', gap: '6px', background: '#F0EAFA', padding: '4px', borderRadius: '20px' }}>
            {[
              { id: 'this-week', label: 'This Week' },
              { id: 'last-week', label: 'Last Week' },
              { id: 'last-4-weeks', label: 'Last 4 Weeks' }
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setGraphFilter(filter.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '16px',
                  border: 'none',
                  background: graphFilter === filter.id ? '#9333EA' : 'transparent',
                  color: graphFilter === filter.id ? '#FFFFFF' : '#7A6F8A',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Container */}
        <div style={{ height: '280px', position: 'relative' }}>
          <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      {/* 3. SKILL DEVELOPMENT */}
      <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '28px', marginBottom: '32px', boxShadow: '0 4px 20px rgba(147, 51, 234, 0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E' }}>
              Skill Development
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#7A6F8A' }}>
              Current assessed skill proficiency vs target role expectations.
            </p>
          </div>

          <button
            onClick={() => onNavigate('skill-gap')}
            className="btn-secondary"
            style={{ fontSize: '0.84rem' }}
          >
            <span>View All Skills in Skill Gap Engine</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Compact Skill Bars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {[
            { name: 'Java', level: 75, target: 90, color: '#9333EA', delta: '+5%' },
            { name: 'SQL', level: 65, target: 85, color: '#0D9488', delta: '+10%' },
            { name: 'Data Structures (DSA)', level: 55, target: 85, color: '#2563EB', delta: '+8%' },
            { name: 'Spring Boot', level: 40, target: 80, color: '#EA580C', delta: '+5%' }
          ].map((skill, idx) => (
            <div key={idx} style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', borderRadius: '16px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#2D1B4E' }}>{skill.name}</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: skill.color }}>
                  {skill.delta} improvement
                </span>
              </div>

              <div style={{ height: '8px', background: '#EAE2F8', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
                <div style={{ width: `${skill.level}%`, height: '100%', background: skill.color }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#7A6F8A' }}>
                <span>Current: <strong>{skill.level}%</strong></span>
                <span>Target: <strong>{skill.target}%</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. YOUR WEEKLY REPORT */}
      <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '28px', marginBottom: '32px', boxShadow: '0 4px 20px rgba(147, 51, 234, 0.06)' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '20px' }}>
          Your Weekly Report
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          
          {/* Achievements */}
          <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '18px', padding: '20px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#059669', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={18} />
              <span>Weekly Achievements</span>
            </h4>
            <ul style={{ paddingLeft: '18px', fontSize: '0.88rem', color: '#2D1B4E', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Improved Java assessment score to 75%</li>
              <li>Completed REST API project milestone</li>
              <li>Practiced 6 career development coding tasks</li>
            </ul>
          </div>

          {/* Areas to Improve */}
          <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '18px', padding: '20px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#D97706', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={18} />
              <span>Areas to Focus & Improve</span>
            </h4>
            <ul style={{ paddingLeft: '18px', fontSize: '0.88rem', color: '#2D1B4E', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>SQL joins and subqueries need additional review</li>
              <li>Missed 1 Spring Boot practice task on Thursday</li>
              <li>Complete 1 mock interview session next week</li>
            </ul>
          </div>

          {/* AI Weekly Insight */}
          <div style={{ background: '#F3E8FF', border: '1px solid #C084FC', borderRadius: '18px', padding: '20px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#9333EA', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={18} />
              <span>AI Weekly Insight</span>
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#4A3E56', lineHeight: '1.5' }}>
              "You completed {weeklyCompletionPct}% of your planned activities this week and practiced Java, SQL, and DSA. Your SQL assessment indicates that joins need more attention. Next week, focus on SQL practice and completing your backend project milestone."
            </p>
          </div>

        </div>
      </div>

      {/* 5. YOUR NEXT WEEK'S PLAN */}
      <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '28px', marginBottom: '32px', boxShadow: '0 4px 20px rgba(147, 51, 234, 0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E' }}>
              Your Next Week's Plan
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#7A6F8A' }}>
              Personalized recommendations based on your target role and skill gaps.
            </p>
          </div>

          <button
            onClick={() => setShowAddTaskForm(!showAddTaskForm)}
            className="btn-secondary"
            style={{ fontSize: '0.84rem' }}
          >
            <Plus size={14} />
            <span>Add Custom Task</span>
          </button>
        </div>

        {/* Custom Task Add Form */}
        {showAddTaskForm && (
          <form onSubmit={handleAddTask} style={{ background: '#FAF7FF', padding: '16px', borderRadius: '16px', border: '1px solid #EAE2F8', marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Practice SQL joins for 30 minutes..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              style={{ flexGrow: 1, minWidth: '220px' }}
              required
            />
            <select className="form-control" value={newTaskSkill} onChange={(e) => setNewTaskSkill(e.target.value)} style={{ width: '130px' }}>
              <option value="Java">Java</option>
              <option value="SQL">SQL</option>
              <option value="Spring Boot">Spring Boot</option>
              <option value="DSA">DSA</option>
            </select>
            <button type="submit" className="btn-primary" style={{ padding: '8px 18px' }}>
              Save Task
            </button>
          </form>
        )}

        {/* Task Recommendations Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {nextWeekTasks.map((task) => (
            <div
              key={task.id}
              style={{
                padding: '16px',
                borderRadius: '16px',
                background: task.completed ? '#F0FDF4' : '#FAF7FF',
                border: `1.5px solid ${task.completed ? '#BBF7D0' : '#EAE2F8'}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => handleToggleTask(task.id)}
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    border: `2px solid ${task.completed ? '#10B981' : '#9333EA'}`,
                    background: task.completed ? '#10B981' : '#FFFFFF',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  {task.completed && <Check size={16} />}
                </button>

                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: task.completed ? '#059669' : '#2D1B4E', textDecoration: task.completed ? 'line-through' : 'none' }}>
                    {task.title}
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: '#7A6F8A', marginTop: '2px' }}>
                    Skill: <strong>{task.skill}</strong> • Est: {task.estimatedTime}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ background: task.priority === 'High' ? '#FEF2F2' : '#FFFBEB', color: task.priority === 'High' ? '#DC2626' : '#D97706', fontSize: '0.75rem', fontWeight: 700, padding: '3px 10px', borderRadius: '10px' }}>
                  {task.priority} Priority
                </span>
                <button
                  onClick={() => alert(`Rescheduled task: ${task.title}`)}
                  style={{ background: 'none', border: 'none', color: '#7A6F8A', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}
                >
                  Reschedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. PROGRESS HISTORY */}
      <div style={{ textAlign: 'center', paddingTop: '10px' }}>
        <button
          onClick={() => setShowHistoryModal(!showHistoryModal)}
          className="btn-secondary"
          style={{ padding: '12px 26px', fontSize: '0.92rem' }}
        >
          <Calendar size={16} />
          <span>{showHistoryModal ? 'Hide Progress History' : 'View Progress History & Previous Reports'}</span>
          {showHistoryModal ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showHistoryModal && (
          <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '28px', marginTop: '20px', textAlign: 'left', boxShadow: '0 8px 24px rgba(147, 51, 234, 0.08)' }} className="fade-in">
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '14px' }}>
              Historical Reports & Comparison
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#7A6F8A', display: 'block', marginBottom: '4px' }}>
                Select Week to Compare:
              </label>
              <select
                className="form-control"
                value={selectedHistoryWeek}
                onChange={(e) => setSelectedHistoryWeek(e.target.value)}
                style={{ maxWidth: '300px' }}
              >
                <option value="Week 3 (Sep 15 - Sep 21)">Week 3 (Sep 15 - Sep 21)</option>
                <option value="Week 2 (Sep 08 - Sep 14)">Week 2 (Sep 08 - Sep 14)</option>
                <option value="Week 1 (Sep 01 - Sep 07)">Week 1 (Sep 01 - Sep 07)</option>
              </select>
            </div>

            <div style={{ background: '#FAF7FF', padding: '16px', borderRadius: '16px', border: '1px solid #EAE2F8' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#9333EA' }}>{selectedHistoryWeek} Summary</div>
              <p style={{ fontSize: '0.85rem', color: '#4A3E56', marginTop: '4px' }}>
                Tasks Completed: <strong>5 / 8 (62%)</strong> • Skills Practiced: Java, SQL • Key Milestone: Java OOP Refactoring Completed.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
