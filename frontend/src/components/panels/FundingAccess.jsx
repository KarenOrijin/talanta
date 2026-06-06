import React from 'react';
import { FUND_OPPS } from '../../data.js';

function KpiCard({ label, value, sub, subClass }) {
  return (
    <div className="kpi-card">
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">{label}</div>
      {sub && <div className={`kpi-sub ${subClass || ''}`}>{sub}</div>}
    </div>
  );
}

const TOOLS = [
  { icon: '📐', label: 'Capital stack calculator', color: '#1D9E75', bg: '#E1F5EE' },
  { icon: '📄', label: 'Application templates', color: '#378ADD', bg: '#EAF3FB' },
  { icon: '🛡', label: 'De-risking tools', color: '#EF9F27', bg: '#FDF3E3' },
  { icon: '🤝', label: 'Advisor network', color: '#6B7C93', bg: '#F4F6F8' },
];

export default function FundingAccess() {
  return (
    <div className="panel-content">
      <div className="kpi-row">
        <KpiCard label="Climate Funds" value="42" sub="indexed & monitored" />
        <KpiCard label="Total Available" value="$8.4B" sub="across all windows" />
        <KpiCard label="Applications Open" value="7" sub="⚠ closing soon" subClass="kpi-warn" />
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Matched funding opportunities</span>
            <span className="card-badge badge-green">AI-matched</span>
          </div>
          <div className="opp-list">
            {FUND_OPPS.map((opp, i) => (
              <div key={i} className="opp-row">
                <div className="opp-info">
                  <div className="opp-name">{opp.name}</div>
                  <div className="opp-meta">
                    <span>{opp.amt}</span>
                    <span className="opp-sep">·</span>
                    <span>Deadline: {opp.deadline}</span>
                  </div>
                </div>
                <span className={`badge ${opp.badge}`}>{opp.match}% match</span>
                <button className="act-btn">Apply</button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Blended finance builder</span>
          </div>
          <p className="card-desc">
            Structure blended finance facilities combining grants, concessional loans,
            and private capital to maximize climate impact and financial sustainability.
          </p>
          <div className="tools-grid">
            {TOOLS.map(t => (
              <div key={t.label} className="tool-card" style={{ background: t.bg, borderLeft: `3px solid ${t.color}` }}>
                <div className="tool-icon">{t.icon}</div>
                <div className="tool-label" style={{ color: t.color }}>{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
