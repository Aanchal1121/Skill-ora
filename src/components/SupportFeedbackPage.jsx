import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  MessageSquare,
  Star,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Paperclip,
  RotateCcw,
  ShieldCheck,
  User,
  ChevronRight,
  Sparkles,
  Info,
  X,
  FileText,
  Lock,
  ThumbsUp
} from 'lucide-react';
import { t } from '../utils/i18n';

export default function SupportFeedbackPage({ studentProfile, onNavigate, language = 'English' }) {
  const [activeTab, setActiveTab] = useState('support'); // 'support' | 'feedback' | 'rate'

  // ---------------------------------------------------------------------------
  // 1. SUPPORT CENTER STATE
  // ---------------------------------------------------------------------------
  const [supportCategory, setSupportCategory] = useState('Skill Gap Analysis');
  const [supportSubject, setSupportSubject] = useState('');
  const [supportPriority, setSupportPriority] = useState('Medium');
  const [supportDescription, setSupportDescription] = useState('');
  const [supportAttachment, setSupportAttachment] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState(null);

  const [submittedTicketId, setSubmittedTicketId] = useState(null);
  const [supportSuccessMsg, setSupportSuccessMsg] = useState(null);
  const [selectedTicketModal, setSelectedTicketModal] = useState(null);
  const [ticketFollowUpText, setTicketFollowUpText] = useState('');

  // Sample/Saved Tickets list
  const [tickets, setTickets] = useState(() => {
    try {
      const saved = localStorage.getItem('skillaura_support_tickets');
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    return [
      {
        id: 'TKT-84920',
        category: 'Skill Gap Analysis',
        subject: 'Spring Boot skill gap target level calculation',
        priority: 'Medium',
        description: 'Need clarification on how the Spring Boot assessment proficiency level is calculated against Senior Java Backend developer target.',
        status: 'In Progress',
        createdAt: '2026-09-28',
        responses: [
          {
            sender: 'SkillAura TPO Support',
            message: 'Hello Ananya, our career team has reviewed your assessment dataset. The target benchmark is set based on Tier-1 Java job profiles.',
            timestamp: '2026-09-29 10:30 AM'
          }
        ]
      },
      {
        id: 'TKT-71024',
        category: 'Resume Assist',
        subject: 'ATS formatting recommendation for PDF export',
        priority: 'Low',
        description: 'Can I export the ATS optimized resume directly into DOCX format?',
        status: 'Resolved',
        createdAt: '2026-09-20',
        responses: [
          {
            sender: 'SkillAura Technical Support',
            message: 'Yes! PDF and DOCX single-page export formats are supported in Resume Tools.',
            timestamp: '2026-09-21 04:15 PM'
          }
        ]
      }
    ];
  });

  // Fetch tickets from API if available
  useEffect(() => {
    fetch('http://localhost:5000/api/support/tickets')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && Array.isArray(data.tickets) && data.tickets.length > 0) {
          setTickets(data.tickets);
        }
      })
      .catch(() => {});
  }, []);

  const handleAttachmentUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSupportAttachment(file.name);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => setAttachmentPreview(event.target.result);
      reader.readAsDataURL(file);
    } else {
      setAttachmentPreview(null);
    }
  };

  const handleCreateSupportTicket = (e) => {
    e.preventDefault();
    if (!supportSubject.trim() || !supportDescription.trim()) return;

    const newTicketId = `TKT-${Math.floor(10000 + Math.random() * 90000)}`;
    const newTicket = {
      id: newTicketId,
      category: supportCategory,
      subject: supportSubject,
      priority: supportPriority,
      description: supportDescription,
      attachment: supportAttachment,
      status: 'Open',
      createdAt: new Date().toISOString().split('T')[0],
      responses: [
        {
          sender: 'System Auto-Acknowledgement',
          message: `Your ticket ${newTicketId} has been registered successfully. Our support team & campus TPO will respond shortly.`,
          timestamp: 'Just now'
        }
      ]
    };

    const updated = [newTicket, ...tickets];
    setTickets(updated);
    try {
      localStorage.setItem('skillaura_support_tickets', JSON.stringify(updated));
    } catch (e) {}

    // API Post
    fetch('http://localhost:5000/api/support/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTicket)
    }).catch(() => {});

    setSubmittedTicketId(newTicketId);
    setSupportSuccessMsg(`Support Ticket ${newTicketId} created successfully!`);
    setSupportSubject('');
    setSupportDescription('');
    setSupportAttachment(null);
    setAttachmentPreview(null);

    setTimeout(() => {
      setSupportSuccessMsg(null);
    }, 5000);
  };

  const handleReopenTicket = (ticketId) => {
    const updated = tickets.map(t => t.id === ticketId ? {
      ...t,
      status: 'Open',
      responses: [
        ...t.responses,
        {
          sender: studentProfile?.name || 'Student',
          message: 'Student reopened this ticket with persisted inquiry.',
          timestamp: 'Just now'
        }
      ]
    } : t);

    setTickets(updated);
    try {
      localStorage.setItem('skillaura_support_tickets', JSON.stringify(updated));
    } catch (e) {}

    fetch(`http://localhost:5000/api/support/tickets/${ticketId}/reopen`, {
      method: 'POST'
    }).catch(() => {});

    if (selectedTicketModal && selectedTicketModal.id === ticketId) {
      setSelectedTicketModal(prev => ({ ...prev, status: 'Open' }));
    }
  };

  const handleAddFollowUpResponse = (ticketId) => {
    if (!ticketFollowUpText.trim()) return;

    const updated = tickets.map(t => {
      if (t.id === ticketId) {
        const newResponses = [
          ...t.responses,
          {
            sender: studentProfile?.name || 'Student',
            message: ticketFollowUpText,
            timestamp: 'Just now'
          }
        ];
        return { ...t, responses: newResponses, status: t.status === 'Resolved' ? 'Open' : t.status };
      }
      return t;
    });

    setTickets(updated);
    try {
      localStorage.setItem('skillaura_support_tickets', JSON.stringify(updated));
    } catch (e) {}

    if (selectedTicketModal && selectedTicketModal.id === ticketId) {
      setSelectedTicketModal(updated.find(t => t.id === ticketId));
    }
    setTicketFollowUpText('');
  };

  // ---------------------------------------------------------------------------
  // 2. FEEDBACK & SUGGESTIONS STATE
  // ---------------------------------------------------------------------------
  const [feedbackCategory, setFeedbackCategory] = useState('Feature Improvement');
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [feedbackSuccessMsg, setFeedbackSuccessMsg] = useState(null);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    const newFeedback = {
      id: `FB-${Date.now()}`,
      category: feedbackCategory,
      rating: feedbackRating,
      text: feedbackText,
      isAnonymous,
      studentName: isAnonymous ? 'Anonymous Student' : (studentProfile?.name || 'Ananya Roy'),
      createdAt: new Date().toISOString().split('T')[0]
    };

    fetch('http://localhost:5000/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFeedback)
    }).catch(() => {});

    setFeedbackSuccessMsg('Thank you! Your feedback and suggestions have been shared with our team.');
    setFeedbackText('');
    setTimeout(() => setFeedbackSuccessMsg(null), 4000);
  };

  // ---------------------------------------------------------------------------
  // 3. RATE SKILLAURA STATE
  // ---------------------------------------------------------------------------
  const [userRating, setUserRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [ratingSuccessMsg, setRatingSuccessMsg] = useState(null);

  // Platform Ratings Summary
  const [platformRatings, setPlatformRatings] = useState({
    avgRating: 4.8,
    totalRatings: 124,
    userHasRated: false
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/ratings')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.avgRating) {
          setPlatformRatings(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleRateSkillAuraSubmit = (e) => {
    e.preventDefault();

    const ratingPayload = {
      studentId: studentProfile?.id || 'STU-7821',
      studentName: studentProfile?.name || 'Ananya Roy',
      rating: userRating,
      review: reviewText,
      timestamp: new Date().toISOString()
    };

    fetch('http://localhost:5000/api/ratings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ratingPayload)
    }).catch(() => {});

    setPlatformRatings(prev => ({
      ...prev,
      totalRatings: prev.userHasRated ? prev.totalRatings : prev.totalRatings + 1,
      userHasRated: true
    }));

    setRatingSuccessMsg('Your rating & review for SkillAura platform have been recorded successfully!');
    setTimeout(() => setRatingSuccessMsg(null), 4000);
  };

  const supportCategories = [
    'Login and Account Issues',
    'Profile and Personal Information',
    'Skill Gap Analysis',
    'Resume Assist',
    'AI Mock Interview',
    'Project Lab',
    'Internship and Job Opportunities',
    'Language Translator',
    'Technical Issues',
    'Other'
  ];

  const feedbackCategories = [
    'Feature Improvement',
    'New Feature Request',
    'User Interface and Design',
    'Performance',
    'Content and Learning Resources',
    'Other'
  ];

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '24px 20px' }} className="fade-in">
      
      {/* 1. PAGE HEADER */}
      <div style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF7FF 50%, #FFF0F7 100%)',
        borderRadius: '24px',
        padding: '28px',
        marginBottom: '24px',
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
            <HelpCircle size={15} />
            <span>STUDENT HELP & PLATFORM FEEDBACK</span>
          </div>
          <h1 style={{ fontSize: '2.0rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
            Support, Feedback & Rating
          </h1>
          <p style={{ color: '#7A6F8A', fontSize: '0.95rem' }}>
            Get prompt assistance on platform issues, share feature ideas, or rate your experience on SkillAura.
          </p>
        </div>

        {/* 3 Main Section Tabs */}
        <div style={{ display: 'flex', gap: '8px', background: '#FFFFFF', padding: '6px', borderRadius: '16px', border: '1px solid #EAE2F8' }}>
          <button
            onClick={() => setActiveTab('support')}
            className={`tab-pill ${activeTab === 'support' ? 'active' : ''}`}
            style={{ fontSize: '0.88rem', padding: '8px 16px' }}
          >
            🎧 Support Center
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`tab-pill ${activeTab === 'feedback' ? 'active' : ''}`}
            style={{ fontSize: '0.88rem', padding: '8px 16px' }}
          >
            💡 Share Feedback
          </button>
          <button
            onClick={() => setActiveTab('rate')}
            className={`tab-pill ${activeTab === 'rate' ? 'active' : ''}`}
            style={{ fontSize: '0.88rem', padding: '8px 16px' }}
          >
            ⭐ Rate SkillAura
          </button>
        </div>
      </div>

      {/* ====================================================================
          TAB 1: SUPPORT CENTER
         ==================================================================== */}
      {activeTab === 'support' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Support Ticket Submission Form */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '28px',
            border: '1px solid #EAE2F8',
            boxShadow: '0 4px 16px rgba(147, 51, 234, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F0EAFA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333EA' }}>
                <FileText size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2D1B4E', margin: 0 }}>Create a Support Ticket</h3>
                <p style={{ color: '#7A6F8A', fontSize: '0.85rem', margin: 0 }}>Raise queries regarding modules, account, or placement tools.</p>
              </div>
            </div>

            {supportSuccessMsg && (
              <div style={{ background: '#DCFCE7', color: '#15803D', border: '1px solid #86EFAC', padding: '14px 18px', borderRadius: '14px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '0.92rem' }}>
                <CheckCircle2 size={20} color="#15803D" />
                <span>{supportSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateSupportTicket} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '6px' }}>
                    Issue Category:
                  </label>
                  <select
                    value={supportCategory}
                    onChange={(e) => setSupportCategory(e.target.value)}
                    className="form-control"
                  >
                    {supportCategories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '6px' }}>
                    Priority Level:
                  </label>
                  <select
                    value={supportPriority}
                    onChange={(e) => setSupportPriority(e.target.value)}
                    className="form-control"
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority (Urgent)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '6px' }}>
                  Subject / Summary of Issue:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Issue generating AI Mock Interview feedback report..."
                  value={supportSubject}
                  onChange={(e) => setSupportSubject(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '6px' }}>
                  Detailed Description:
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe what happened, error messages seen, or what assistance you need..."
                  value={supportDescription}
                  onChange={(e) => setSupportDescription(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              {/* Optional Attachment */}
              <div style={{ background: '#FAF7FF', padding: '16px', borderRadius: '14px', border: '1px stroke #EAE2F8' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2D1B4E', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '6px' }}>
                  <Paperclip size={16} color="#9333EA" />
                  <span>Attach Screenshot or Log File (Optional)</span>
                </label>
                <input
                  type="file"
                  onChange={handleAttachmentUpload}
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  style={{ fontSize: '0.85rem' }}
                />
                {supportAttachment && (
                  <div style={{ marginTop: '8px', fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>
                    Attached file: {supportAttachment}
                  </div>
                )}
                {attachmentPreview && (
                  <img src={attachmentPreview} alt="Preview" style={{ marginTop: '8px', maxHeight: '120px', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
                )}
              </div>

              <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>
                <Send size={16} />
                <span>Submit Support Ticket</span>
              </button>
            </form>
          </div>

          {/* My Support Requests Section */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '28px',
            border: '1px solid #EAE2F8',
            boxShadow: '0 4px 16px rgba(147, 51, 234, 0.04)'
          }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '16px' }}>
              My Support Requests ({tickets.length})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {tickets.length === 0 ? (
                <p style={{ color: '#7A6F8A', fontSize: '0.9rem' }}>No support tickets submitted yet.</p>
              ) : (
                tickets.map((tkt) => (
                  <div
                    key={tkt.id}
                    style={{
                      background: '#FAF7FF',
                      padding: '18px',
                      borderRadius: '16px',
                      border: '1px solid #EAE2F8',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#9333EA', background: '#F0EAFA', padding: '2px 8px', borderRadius: '6px' }}>
                          {tkt.id}
                        </span>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '8px',
                          background: tkt.status === 'Open' ? '#FEF3C7' : tkt.status === 'In Progress' ? '#EFF6FF' : '#DCFCE7',
                          color: tkt.status === 'Open' ? '#D97706' : tkt.status === 'In Progress' ? '#2563EB' : '#15803D'
                        }}>
                          {tkt.status}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#7A6F8A', fontWeight: 600 }}>Priority: {tkt.priority}</span>
                      </div>

                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2D1B4E', margin: '4px 0 2px 0' }}>
                        {tkt.subject}
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: '#7A6F8A', margin: 0 }}>
                        Category: <strong>{tkt.category}</strong> • Submitted: {tkt.createdAt}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      {tkt.status === 'Resolved' && (
                        <button
                          onClick={() => handleReopenTicket(tkt.id)}
                          style={{ background: '#FFFBEB', color: '#D97706', border: '1px solid #FCD34D', padding: '6px 12px', borderRadius: '10px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <RotateCcw size={14} />
                          <span>Reopen Ticket</span>
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedTicketModal(tkt)}
                        className="btn-secondary"
                        style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                      >
                        View Responses ({tkt.responses?.length || 0})
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      )}

      {/* ====================================================================
          TAB 2: SHARE FEEDBACK & SUGGESTIONS
         ==================================================================== */}
      {activeTab === 'feedback' && (
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '28px',
          border: '1px solid #EAE2F8',
          boxShadow: '0 4px 16px rgba(147, 51, 234, 0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#FFF0F7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DB2777' }}>
              <MessageSquare size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2D1B4E', margin: 0 }}>Share Feedback & Suggestions</h3>
              <p style={{ color: '#7A6F8A', fontSize: '0.85rem', margin: 0 }}>Help us improve SkillAura by sharing user experience ideas or new features.</p>
            </div>
          </div>

          {feedbackSuccessMsg && (
            <div style={{ background: '#DCFCE7', color: '#15803D', border: '1px solid #86EFAC', padding: '14px 18px', borderRadius: '14px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '0.92rem' }}>
              <CheckCircle2 size={20} color="#15803D" />
              <span>{feedbackSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleFeedbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '6px' }}>
                Feedback Category:
              </label>
              <select
                value={feedbackCategory}
                onChange={(e) => setFeedbackCategory(e.target.value)}
                className="form-control"
              >
                {feedbackCategories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '6px' }}>
                Rate Feature Experience (1 to 5 Stars):
              </label>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={28}
                    color="#F59E0B"
                    fill={s <= feedbackRating ? "#F59E0B" : "none"}
                    onClick={() => setFeedbackRating(s)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '6px' }}>
                Your Feedback or Feature Request:
              </label>
              <textarea
                rows={4}
                placeholder="Share your suggestions, user interface feedback, or ideas for new features..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                id="anonToggle"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#9333EA' }}
              />
              <label htmlFor="anonToggle" style={{ fontSize: '0.88rem', color: '#2D1B4E', cursor: 'pointer', fontWeight: 600 }}>
                Submit anonymously (hide my profile details from public reviews)
              </label>
            </div>

            <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>
              <Send size={16} />
              <span>Submit Feedback</span>
            </button>
          </form>
        </div>
      )}

      {/* ====================================================================
          TAB 3: RATE SKILLAURA PLATFORM
         ==================================================================== */}
      {activeTab === 'rate' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{
            background: 'linear-gradient(135deg, #2D1B4E 0%, #4A3E56 100%)',
            borderRadius: '24px',
            padding: '32px',
            color: '#FFFFFF',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(45, 27, 78, 0.15)'
          }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#F6DCEC', margin: '0 0 8px 0' }}>
              Overall SkillAura Rating
            </h2>
            <div style={{ fontSize: '4.0rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
              {platformRatings.avgRating} <span style={{ fontSize: '1.5rem', color: '#B9A0E8' }}>/ 5.0</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', margin: '10px 0' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={28} color="#F59E0B" fill="#F59E0B" />
              ))}
            </div>
            <p style={{ color: '#EAE2F8', fontSize: '0.92rem', margin: 0 }}>
              Based on <strong>{platformRatings.totalRatings} verified student reviews</strong> across colleges.
            </p>
          </div>

          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '28px',
            border: '1px solid #EAE2F8',
            boxShadow: '0 4px 16px rgba(147, 51, 234, 0.04)'
          }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '16px' }}>
              {platformRatings.userHasRated ? 'Update Your Rating & Review' : 'Rate Your Experience with SkillAura'}
            </h3>

            {ratingSuccessMsg && (
              <div style={{ background: '#DCFCE7', color: '#15803D', border: '1px solid #86EFAC', padding: '14px 18px', borderRadius: '14px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '0.92rem' }}>
                <CheckCircle2 size={20} color="#15803D" />
                <span>{ratingSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleRateSkillAuraSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ textAlign: 'center', padding: '16px', background: '#FAF7FF', borderRadius: '16px', border: '1px stroke #EAE2F8' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '8px' }}>
                  Select Star Rating:
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={36}
                      color="#F59E0B"
                      fill={(hoverRating || userRating) >= s ? "#F59E0B" : "none"}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setUserRating(s)}
                      style={{ cursor: 'pointer', transition: 'transform 0.1s ease' }}
                    />
                  ))}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#9333EA', fontWeight: 700, marginTop: '8px' }}>
                  {userRating === 5 ? '5 Stars – Excellent' : userRating === 4 ? '4 Stars – Good' : userRating === 3 ? '3 Stars – Average' : userRating === 2 ? '2 Stars – Poor' : '1 Star – Very Poor'}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '6px' }}>
                  Your Review (Optional):
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us what you like about SkillAura or what could make it better..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="form-control"
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>
                <Star size={16} />
                <span>{platformRatings.userHasRated ? 'Update Rating' : 'Submit Rating'}</span>
              </button>
            </form>
          </div>

        </div>
      )}

      {/* TICKET DETAILS MODAL */}
      {selectedTicketModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '650px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }} className="fade-in">
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="badge-pill" style={{ background: '#F0EAFA', color: '#9333EA', marginBottom: '6px' }}>
                  {selectedTicketModal.id} • {selectedTicketModal.category}
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2D1B4E' }}>{selectedTicketModal.subject}</h3>
                <p style={{ color: '#7A6F8A', fontSize: '0.85rem' }}>Status: <strong>{selectedTicketModal.status}</strong></p>
              </div>
              <button onClick={() => setSelectedTicketModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="#7A6F8A" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem' }}>
              <div style={{ background: '#FAF7FF', padding: '14px', borderRadius: '12px', border: '1px solid #EAE2F8' }}>
                <strong>Issue Description:</strong>
                <p style={{ margin: '4px 0 0 0' }}>{selectedTicketModal.description}</p>
              </div>

              <strong style={{ color: '#2D1B4E', marginTop: '6px' }}>Conversation & Admin Responses:</strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '200px', overflowY: 'auto' }}>
                {(selectedTicketModal.responses || []).map((resp, idx) => (
                  <div key={idx} style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, color: '#9333EA' }}>
                      <span>{resp.sender}</span>
                      <span style={{ color: '#7A6F8A' }}>{resp.timestamp}</span>
                    </div>
                    <p style={{ margin: '4px 0 0 0', color: '#2D1B4E' }}>{resp.message}</p>
                  </div>
                ))}
              </div>

              {/* Add Follow Up Input */}
              <div style={{ marginTop: '10px' }}>
                <textarea
                  rows={2}
                  placeholder="Type a follow-up message or response..."
                  value={ticketFollowUpText}
                  onChange={(e) => setTicketFollowUpText(e.target.value)}
                  className="form-control"
                  style={{ marginBottom: '8px' }}
                />
                <button
                  type="button"
                  onClick={() => handleAddFollowUpResponse(selectedTicketModal.id)}
                  className="btn-primary"
                  style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                >
                  <Send size={14} />
                  <span>Send Reply</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
