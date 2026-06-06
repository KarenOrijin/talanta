import React from 'react';
import { FUND_OPPS } from '../../data.js';

const TOOLS = [
  { icon: '🧮', label: 'Capital stack calculator', bg: 'var(--green-light)',  col: 'var(--green-dark)' },
  { icon: '📝', label: 'Application templates',    bg: 'var(--blue-light)',   col: '#1D4ED8' },
  { icon: '🛡', label: 'De-risking tools',         bg: 'var(--amber-light)',  col: '#8A5700' },
  { icon: '🤝', label: 'Advisor network',          bg: 'var(--surface2)',     col: 'var(--ink3)' },
];

export default function FundingAccess() {
  return (
    <div>
      <div className="page-header">
        <h1>Funding Access</h1>
        <p>Match your project to the right climate fund — eligibility checker, application support, and blended finance structuring</p>
      </div>

      <div className="kpi-row">
        <div className="kpi">
          <div className="kpi-label">Funds available</div>
          <div className="kpi-val">42</div>
          <div className="kpi-sub">matched to your profile</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Total accessible</div>
          <div className="kpi-val">$8.4B</div>
          <div className="kpi-sub">GCF + AfDB + EU + bilateral</div>
        </div>
        <div className="kpi warn">
          <div className="kpi-label">Applications open</div>
          <div className="kpi-val">7</div>
          <div className="kpi-sub warn">deadlines within 60 days</div>
        </div>
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-hd">
            <h3>Matched funding opportunities</h3>
            <span className="card-action">View all 42</span>
          </div>
          {FUND_OPPS.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '11px 0', borderBottom: i < FUND_OPPS.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)' }}>{f.name}</span>
                  <span className={`badge ${f.badge}`}>{f.match}% match</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--ink3)' }}>{f.amt} · Deadline {f.deadline}</div>
              </div>
              <button className="action-cta">Apply →</button>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-hd"><h3>Blended finance builder</h3></div>
          <div style={{ background: 'var(--surface)', borderRadius: 10, padding: 14, marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)', marginBottom: 8 }}>Structure a deal</div>
            <div style={{ fontSize: 11, color: 'var(--ink3)', lineHeight: 1.6 }}>
              Combine grants, concessional debt, and guarantees into a bankable blended finance package. Our model calculates optimal capital stacks for African project types.
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {TOOLS.map(t => (
              <div key={t.label} style={{ background: t.bg, borderRadius: 8, padding: 12, textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{t.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 500, color: t.col }}>{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
