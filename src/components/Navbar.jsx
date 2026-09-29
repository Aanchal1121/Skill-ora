import React, { useState } from 'react';
import { 
  Sparkles, 
  Globe, 
  User, 
  Search,
  ChevronDown,
  Menu,
  X,
  LogIn
} from 'lucide-react';

import { GLOBAL_SEARCH_DATABASE } from './GlobalSearchResultsPage';
import { SUPPORTED_LANGUAGES, t } from '../utils/i18n';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  language, 
  setLanguage, 
  studentProfile,
  onOpenModal,
  searchQuery,
  setSearchQuery,
  onSelectSubFeature,
  onToggleSidebarMobile,
  isMobileSidebarOpen,
  onOpenAuthModal
}) {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem('skillora_recent_searches');
      return saved ? JSON.parse(saved) : ['Java Developer', 'Mock Interview', 'Spring Boot'];
    } catch (e) {
      return ['Java Developer', 'Mock Interview'];
    }
  });

  const saveRecentSearch = (query) => {
    if (!query.trim()) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(q => q.toLowerCase() !== query.toLowerCase());
      const updated = [query.trim(), ...filtered].slice(0, 5);
      try {
        localStorage.setItem('skillora_recent_searches', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Filter matching search items
  const trimmedQuery = (searchQuery || '').trim().toLowerCase();
  const liveSearchResults = trimmedQuery
    ? GLOBAL_SEARCH_DATABASE.filter(item =>
        item.title.toLowerCase().includes(trimmedQuery) ||
        item.description.toLowerCase().includes(trimmedQuery) ||
        item.category.toLowerCase().includes(trimmedQuery) ||
        item.tags.some(t => t.toLowerCase().includes(trimmedQuery))
      ).slice(0, 5)
    : [];

  const languagesList = [
    { code: 'English', label: '🌐 English' },
    { code: 'Hindi', label: '🇮🇳 हिंदी (Hindi)' },
    { code: 'Marathi', label: '🇮🇳 मराठी (Marathi)' }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #EAE2F8',
      padding: '10px 24px',
      boxShadow: '0 2px 12px rgba(185, 160, 232, 0.08)'
    }}>
      <div style={{
        maxWidth: '1380px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        {/* Left: Mobile menu toggle & Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button 
            onClick={onToggleSidebarMobile}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#2D1B4E'
            }}
            className="mobile-sidebar-btn"
          >
            {isMobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div 
            onClick={() => setActiveTab('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #B9A0E8 0%, #9333EA 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 4px 14px rgba(147, 51, 234, 0.3)'
            }}>
              <Sparkles size={22} />
            </div>
            <div>
              <span style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: '#2D1B4E',
                letterSpacing: '-0.5px'
              }}>
                Skill<span style={{ color: '#9333EA' }}>ora</span>
              </span>
            </div>
          </div>
        </div>

        {/* Center: Nav links & Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexGrow: 1, justifyContent: 'center', maxWidth: '650px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button 
              onClick={() => setActiveTab('home')}
              className={`tab-pill ${activeTab === 'home' ? 'active' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => onOpenModal('about')}
              className="tab-pill"
            >
              About Us
            </button>
            <button 
              onClick={() => onOpenModal('why-us')}
              className="tab-pill"
            >
              Why Us
            </button>
            <button 
              onClick={() => onOpenModal('contact')}
              className="tab-pill"
            >
              Contact
            </button>
          </nav>

          {/* Search bar with Live Autocomplete Dropdown */}
          <div style={{
            position: 'relative',
            flexGrow: 1,
            maxWidth: '280px'
          }}>
            <Search size={15} color="#9333EA" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }} />
            <input 
              type="text"
              placeholder="Search jobs, skills, roles, courses..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchFocused(true);
              }}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  saveRecentSearch(searchQuery);
                  setIsSearchFocused(false);
                  if (onSelectSubFeature) onSelectSubFeature('search-results');
                }
              }}
              style={{
                width: '100%',
                padding: '8px 12px 8px 34px',
                borderRadius: '20px',
                border: isSearchFocused ? '1.5px solid #9333EA' : '1px solid #EAE2F8',
                background: '#FAF7FF',
                fontSize: '0.83rem',
                outline: 'none',
                color: '#2D1B4E',
                boxSizing: 'border-box'
              }}
            />

            {/* LIVE SEARCH AUTOCOMPLETE DROPDOWN */}
            {isSearchFocused && (
              <div style={{
                position: 'absolute',
                top: '110%',
                left: 0,
                right: 0,
                background: '#FFFFFF',
                borderRadius: '16px',
                boxShadow: '0 12px 30px rgba(147, 51, 234, 0.15)',
                border: '1px solid #E9D5FF',
                zIndex: 250,
                padding: '12px',
                maxWidth: '360px',
                width: '320px'
              }}>
                {trimmedQuery ? (
                  <>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Search Results ({liveSearchResults.length}):
                    </div>
                    {liveSearchResults.length === 0 ? (
                      <div style={{ fontSize: '0.82rem', color: '#9CA3AF', padding: '8px 0', textAlign: 'center' }}>
                        No direct match. Press Enter for full global search.
                      </div>
                    ) : (
                      liveSearchResults.map(item => (
                        <div
                          key={item.id}
                          onMouseDown={() => {
                            saveRecentSearch(searchQuery);
                            setIsSearchFocused(false);
                            if (onSelectSubFeature) onSelectSubFeature(item.subFeatureId);
                          }}
                          style={{
                            padding: '8px 10px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2px',
                            transition: 'background 0.2s',
                            marginBottom: '4px'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#FAF7FF'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1E1B4B' }}>{item.title}</span>
                            <span style={{ fontSize: '0.7rem', color: '#9333EA', background: '#F3E8FF', padding: '1px 6px', borderRadius: '4px', fontWeight: '700' }}>
                              {item.category}
                            </span>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.description}
                          </span>
                        </div>
                      ))
                    )}

                    <button
                      onMouseDown={() => {
                        saveRecentSearch(searchQuery);
                        setIsSearchFocused(false);
                        if (onSelectSubFeature) onSelectSubFeature('search-results');
                      }}
                      style={{
                        width: '100%',
                        marginTop: '8px',
                        padding: '8px',
                        borderRadius: '10px',
                        background: '#9333EA',
                        color: '#FFF',
                        border: 'none',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      View All Results for "{searchQuery}" →
                    </button>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Recent Searches:
                    </div>
                    {recentSearches.map((term, idx) => (
                      <div
                        key={idx}
                        onMouseDown={() => {
                          setSearchQuery(term);
                          saveRecentSearch(term);
                          if (onSelectSubFeature) onSelectSubFeature('search-results');
                        }}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '8px',
                          fontSize: '0.82rem',
                          color: '#4B5563',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#FAF7FF'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <Search size={12} color="#9333EA" />
                        <span>{term}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Multilingual Selector */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              style={{
                background: '#FAF7FF',
                border: '1px solid #EAE2F8',
                borderRadius: '20px',
                padding: '6px 12px',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#2D1B4E',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Globe size={15} color="#9333EA" />
              <span>{language}</span>
              <ChevronDown size={14} color="#7A6F8A" />
            </button>

            {isLangDropdownOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '110%',
                background: '#FFFFFF',
                border: '1px solid #EAE2F8',
                borderRadius: '14px',
                boxShadow: '0 8px 24px rgba(185, 160, 232, 0.2)',
                padding: '8px',
                minWidth: '200px',
                maxHeight: '320px',
                overflowY: 'auto',
                zIndex: 300
              }}>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <div
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      try {
                        localStorage.setItem('skillora_user_language', lang.code);
                      } catch (e) {}
                      setIsLangDropdownOpen(false);
                    }}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      background: language === lang.code ? '#F0EAFA' : 'transparent',
                      color: language === lang.code ? '#9333EA' : '#2D1B4E',
                      fontWeight: language === lang.code ? 700 : 500
                    }}
                  >
                    {lang.nativeName}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Login / Auth Button */}
          <button
            onClick={onOpenAuthModal}
            className="btn-secondary"
            style={{ padding: '6px 14px', fontSize: '0.82rem' }}
          >
            <LogIn size={15} color="#9333EA" />
            <span>Login / Register</span>
          </button>

          {/* Profile Icon */}
          <button
            onClick={() => onOpenModal('profile')}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#F6DCEC',
              border: '1.5px solid #B9A0E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#2D1B4E',
              transition: 'all 0.2s ease'
            }}
            title="Student Profile"
          >
            <User size={18} color="#9333EA" />
          </button>

        </div>
      </div>
    </header>
  );
}
