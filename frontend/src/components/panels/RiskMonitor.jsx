import React from 'react';
import { RISK_FLAGS } from '../../data.js';

const RISK_SCORES = [
  { lbl: 'Renewable', val: 72, c: 'var(--green)' },
  { lbl: 'Adaptation', val: 54, c: 'var(--amber)' },
  { lbl: 'Blue Carbon', val: 38, c: 'var(--red)' },
  { lbl: 'WASH', val: 80, c: 'var(--green)' },
  { lbl: 'Forests', val: 61, c: 'var(--amber)' },
  { lbl: 'Urban', val: 76, c: 'var(--green)' },
];

export default function RiskMonitor() {
  return (
    <div>
      <div className="page-header">
        <h1>Risk Monitor</h1>
        <p>Physical climate risk, transition risk, and project execution risk — all in one view</p>
      </div>

      <div className="alert-bar">
        <span className="alert-bar-icon">🔴</span>
        <span><strong>3 active flags:</strong> GCF/FP/201 disbursement overdue 47 days · AFDB/CLI/088 reporting gap · EU/NDICI/044 scope change unverified</span>
      </div>

      <div className="kpi-row">
        <div className="kpi danger">
          <div className="kpi-label">High risk projects</div>
          <div className="kpi-val">3</div>
          <div className="kpi-sub down">↑ from 1 last month</div>
        </div>
        <div className="kpi warn">
          <div className="kpi-label">Medium risk</div>
          <div className="kpi-val">14</div>
          <div className="kpi-sub warn">under watch</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Low risk</div>
          <div className="kpi-val">130</div>
          <div className="kpi-sub up">on track</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Portfolio VaR</div>
          <div className="kpi-val">$84M</div>
          <div className="kpi-sub">at 95% confidence</div>
        </div>
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-hd"><h3>Risk flags — requires action</h3></div>
          {RISK_FLAGS.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '11px 0', borderBottom: i < RISK_FLAGS.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <span className={`badge ${r.sevC}`} style={{ flexShrink: 0, marginTop: 2 }}>{r.sev}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)', marginBottom: 2 }}>{r.proj}</div>
                <div style={{ fontSize: 11, color: 'var(--ink3)' }}>{r.issue}</div>
              </div>
              <button style={{ fontSize: 11, padding: '5px 10px', border: '1px solid var(--border2)', borderRadius: 6, background: 'var(--surface)', cursor: 'pointer', color: 'var(--ink3)', whiteSpace: 'nowrap' }}>
                {r.action} →
              </button>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-hd"><h3>Risk scores by project type</h3></div>
          <div className="risk-grid" style={{ marginBottom: 16 }}>
            {RISK_SCORES.map(s => (
              <div key={s.lbl} className="risk-item">
                <div className="risk-val" style={{ color: s.c }}>{s.val}</div>
                <div className="risk-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: 'var(--ink4)' }}>
            Score = 0 (highest risk) → 100 (lowest risk). Composite of physical, transition, and execution risk.
          </div>
        </div>
      </div>
    </div>
  );
}
