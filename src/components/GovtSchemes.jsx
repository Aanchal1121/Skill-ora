import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ExternalLink, 
  AlertTriangle,
  Search,
  Filter
} from 'lucide-react';

export default function GovtSchemes({ studentProfile }) {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fraud Checker State
  const [fraudText, setFraudText] = useState("");
  const [fraudResult, setFraudResult] = useState(null);
  const [checkingFraud, setCheckingFraud] = useState(false);

  useEffect(() => {
    fetch('/api/govt-schemes')
      .then(res => res.json())
      .then(data => {
        setSchemes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleCheckFraud = async () => {
    if (!fraudText.trim()) return;
    setCheckingFraud(true);
    try {
      const res = await fetch('/api/fraud-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingText: fraudText })
      });
      const data = await res.json();
      setFraudResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setCheckingFraud(false);
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '30px 20px' }} className="fade-in">
      
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
        borderRadius: '24px',
        padding: '30px',
        marginBottom: '28px',
        border: '1px solid #BAE6FD',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div className="badge-pill" style={{ background: '#E0F2FE', color: '#0284C7', borderColor: '#7DD3FC', marginBottom: '10px' }}>
            <Sparkles size={16} />
            <span>GOVERNMENT SCHEME INTEGRATOR & TRUST LAYER</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
            Govt Schemes & AI Fraud Red-Flag Detector
          </h1>
          <p style={{ color: '#334155', fontSize: '0.95rem', maxWidth: '680px' }}>
            Unified aggregator for PM Internship Scheme, AICTE, NCS, and state skill missions with automatic eligibility verification and fraud checks.
          </p>
        </div>
      </div>

      {/* AI FRAUD CHECKER BOX */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '20px',
        padding: '24px',
        marginBottom: '32px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <ShieldAlert size={22} color="#DC2626" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A' }}>
            AI Internship Red-Flag Detector (Scan Any Listing)
          </h3>
        </div>

        <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '14px' }}>
          Paste suspicious internship posting text or requirements to scan for registration fee scams, vague terms, or exploitative conditions:
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <textarea 
            className="form-control"
            rows={3}
            value={fraudText}
            onChange={(e) => setFraudText(e.target.value)}
            placeholder="Paste listing snippet (e.g., 'Pay ₹1500 registration fee before joining, remote work')..."
            style={{ flexGrow: 1 }}
          />
          <button onClick={handleCheckFraud} className="btn-primary" disabled={checkingFraud} style={{ height: 'fit-content' }}>
            <ShieldCheck size={16} />
            <span>{checkingFraud ? "Scanning..." : "Check Safety Badge"}</span>
          </button>
        </div>

        {fraudResult && (
          <div style={{
            background: fraudResult.isFraud ? '#FEF2F2' : '#F0FDF4',
            border: `1px solid ${fraudResult.isFraud ? '#FECACA' : '#BBF7D0'}`,
            borderRadius: '16px',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <strong style={{ fontSize: '1rem', color: fraudResult.isFraud ? '#991B1B' : '#166534' }}>
                {fraudResult.trustBadge}
              </strong>
              <span className="badge-pill" style={{
                background: fraudResult.isFraud ? '#FEE2E2' : '#DCFCE7',
                color: fraudResult.isFraud ? '#DC2626' : '#16A34A'
              }}>
                Trust Rating: {fraudResult.trustScore}/100
              </span>
            </div>

            <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: fraudResult.isFraud ? '#7F1D1D' : '#14532D', marginBottom: '8px' }}>
              {fraudResult.redFlags.map((flag, idx) => (
                <li key={idx}>{flag}</li>
              ))}
            </ul>

            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: fraudResult.isFraud ? '#991B1B' : '#166534' }}>
              Recommendation: {fraudResult.recommendation}
            </p>
          </div>
        )}
      </div>

      {/* SCHEMES LISTING GRID */}
      <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
        Verified Government Opportunities ({schemes.length})
      </h2>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>Loading government portals data...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {schemes.map((scheme) => (
            <div key={scheme.id} style={{
              background: '#FFFFFF',
              border: `1px solid ${scheme.trustScore < 50 ? '#FECACA' : '#E2E8F0'}`,
              borderRadius: '20px',
              padding: '24px',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4F46E5', textTransform: 'uppercase' }}>
                    {scheme.provider}
                  </span>
                  <span className="badge-pill" style={{
                    background: scheme.isEligible ? '#DCFCE7' : '#FEE2E2',
                    color: scheme.isEligible ? '#16A34A' : '#DC2626',
                    borderColor: scheme.isEligible ? '#86EFAC' : '#FCA5A5',
                    fontSize: '0.78rem'
                  }}>
                    {scheme.isEligible ? "✓ Eligible" : "✗ Not Eligible"}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                  {scheme.title}
                </h3>

                <div style={{ fontSize: '0.88rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                  <div><strong>Stipend:</strong> <span style={{ color: '#16A34A', fontWeight: 700 }}>{scheme.stipend}</span></div>
                  <div><strong>Duration & Location:</strong> {scheme.duration} ({scheme.location})</div>
                  <div><strong>Min CGPA Required:</strong> {scheme.eligibility.minCgpa}</div>
                </div>

                {!scheme.isEligible && scheme.eligibilityReasons?.length > 0 && (
                  <div style={{ background: '#FEF2F2', padding: '10px', borderRadius: '10px', fontSize: '0.8rem', color: '#991B1B', marginBottom: '14px' }}>
                    <strong>Eligibility Gap:</strong> {scheme.eligibilityReasons.join("; ")}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} /> {scheme.trustStatus}
                </span>

                <a 
                  href={scheme.applyUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-primary"
                  style={{ padding: '6px 14px', fontSize: '0.8rem', textDecoration: 'none' }}
                >
                  <span>Official Portal</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
