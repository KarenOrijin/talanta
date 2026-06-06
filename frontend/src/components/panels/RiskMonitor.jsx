import React from 'react';
import { RISK_FLAGS } from '../../data.js';

function KpiCard({ label, value, sub, subClass }) {
  return (
    <div className="kpi-card">
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">{label}</div>
      {sub && <div className={`kpi-sub ${subClass || ''}`}>{sub}</div>}
    </div>
  );
}

const RISK_SCORES = [
  { label: 'Renewable Energy', score: 72, color: '#1D9E75' },
  { label: 'Climate Adaptation', score: 54, color: '#EF9F27' },
  { label: 'Blue Carbon', score: 38, color: '#E05252' },
  { label: 'WASH', score: 80, color: '#1D9E75' },
  { label: 'Forests', score: 61, color: '#EF9F27' },
  { label: 'Urban Resilience', score: 76, color: '#1D9E75' },
];

export default function RiskMonitor() {
  return (
    <div className="panel-content">
      <div className="alert-bar alert-red">
        <span className="alert-icon">🚨</span>
        <span className="alert-text">
          <strong>3 active high-risk flags</strong> require immediate attention — funding suspension risk on 2 projects.
        </span>
      </div>

      <div className="kpi-row">
        <KpiCard label="High Risk" value="3" sub="immediate action" subClass="kpi-danger" />
        <KpiCard label="Medium Risk" value="14" sub="monitoring required" subClass="kpi-warn" />
        <KpiCard label="Low Risk" value="130" sub="on track" />
        <KpiCard label="Portfolio VaR" value="$84M" sub="value at risk (95% CI)" />
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Risk flags</span>
            <span className="card-badge badge-red">3 high</span>
          </div>
          <div className="risk-list">
            {RISK_FLAGS.map((rf, i) => (
              <div key={i} className="risk-flag-row">
                <div className="risk-header-row">
                  <span className={`badge ${rf.sevC}`}>{rf.sev}</span>
                  <span className="risk-proj">{rf.proj}</span>
                  <button className="act-btn">{rf.action}</button>
                </div>
                <div className="risk-issue">{rf.issue}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Risk scores by project type</span>
          </div>
          <div className="risk-grid">
            {RISK_SCORES.map(rs => (
              <div key={rs.label} className="risk-score-item">
                <div className="risk-score-circle" style={{ borderColor: rs.color, color: rs.color }}>
                  {rs.score}
                </div>
                <div className="risk-score-label">{rs.label}</div>
              </div>
            ))}
          </div>
          <div className="risk-footnote">
            Scores 0–100. Green ≥ 70 · Amber 45–69 · Red &lt; 45. Updated daily via AI risk engine.
          </div>
        </div>
      </div>
    </div>
  );
}
