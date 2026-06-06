import React from 'react';
import { VERIFS } from '../../data.js';

const ICON_MAP = { 'badge-green': '✓', 'badge-blue': '🤖', 'badge-amber': '⏳', 'badge-red': '⚠' };
const BG_MAP   = { 'badge-green': 'var(--green-light)', 'badge-blue': 'var(--blue-light)', 'badge-amber': 'var(--amber-light)', 'badge-red': 'var(--red-light)' };

export default function Verification() {
  return (
    <div>
      <div className="page-header">
        <h1>Verification & MRV</h1>
        <p>Automated greenwashing detection, carbon credit verification, and impact claim validation</p>
      </div>

      <div className="kpi-row">
        <div className="kpi">
          <div className="kpi-label">Claims verified</div>
          <div className="kpi-val">234</div>
          <div className="kpi-sub up">this quarter</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Avg. verification score</div>
          <div className="kpi-val">81%</div>
          <div className="kpi-sub">vs. 74% last yr</div>
        </div>
        <div className="kpi warn">
          <div className="kpi-label">Flagged claims</div>
          <div className="kpi-val">17</div>
          <div className="kpi-sub warn">⚠ review needed</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">CO₂ verified</div>
          <div className="kpi-val">14.2Mt</div>
          <div className="kpi-sub">satellite + ground</div>
        </div>
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-hd">
            <h3>Recent verifications</h3>
            <span className="card-action">Run new check</span>
          </div>
          {VERIFS.map((v, i) => (
            <div key={i} className="verify-row">
              <div className="verify-icon" style={{ background: BG_MAP[v.badge] }}>{ICON_MAP[v.badge]}</div>
              <div style={{ flex: 1 }}>
                <div className="verify-title">{v.title}</div>
                <div className="verify-meta">{v.meta}</div>
                <span className={`badge ${v.badge}`} style={{ marginTop: 5, display: 'inline-block' }}>{v.type}</span>
              </div>
              <div className="verify-score" style={{ color: v.scoreC }}>{v.score}</div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-hd"><h3>MRV methodology</h3></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: '🛰', title: 'Satellite monitoring', body: 'Sentinel-2 & Landsat imagery cross-referenced against project polygons every 16 days. Deforestation and land-use change auto-detected.' },
              { icon: '🤖', title: 'AI anomaly detection', body: 'ML model trained on 12,000+ historical climate finance reports. Flags statistical outliers, inconsistent reporting, and missing data.' },
              { icon: '⛓', title: 'On-chain audit trail', body: 'Every disbursement, report submission and verification logged immutably. Shareable with donors, auditors, and regulators.' },
            ].map(m => (
              <div key={m.title} style={{ background: 'var(--surface)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)', marginBottom: 4 }}>{m.icon} {m.title}</div>
                <div style={{ fontSize: 11, color: 'var(--ink3)' }}>{m.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
