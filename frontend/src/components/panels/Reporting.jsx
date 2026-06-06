import React from 'react';
import { GOV_ACTIONS, ROLE_LABELS } from '../../data.js';

const STANDARDS = [
  { icon: '📋', title: 'IATI Standard',           desc: 'Auto-publish XML to IATI Registry',         badge: 'badge-green', label: 'Live',     bg: 'var(--blue-light)' },
  { icon: '🌱', title: 'GCF Performance Framework', desc: 'Mapped to GCF result areas',               badge: 'badge-green', label: 'Live',     bg: 'var(--green-light)' },
  { icon: '📊', title: 'OECD-DAC CRS',             desc: 'Rio markers + climate tagging',             badge: 'badge-amber', label: 'Beta',     bg: 'var(--amber-light)' },
  { icon: '📰', title: 'CSRD / ISSB',              desc: 'ESG disclosure for EU companies',           badge: 'badge-amber', label: 'Q3 2025',  bg: 'var(--blue-light)' },
];

export default function Reporting({ role }) {
  return (
    <div>
      <div className="page-header">
        <h1>Reports & IATI Publishing</h1>
        <p>Submit, approve, and publish climate finance reports — auto-formatted for IATI, GCF, and OECD-DAC standards</p>
      </div>

      <div className="kpi-row">
        <div className="kpi">
          <div className="kpi-label">Reports submitted</div>
          <div className="kpi-val">634</div>
          <div className="kpi-sub">last 12 months</div>
        </div>
        <div className="kpi warn">
          <div className="kpi-label">Pending review</div>
          <div className="kpi-val">48</div>
          <div className="kpi-sub warn">⚠ overdue &gt; 30 days</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">IATI published</div>
          <div className="kpi-val">612</div>
          <div className="kpi-sub">96.5% sync rate</div>
        </div>
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-hd">
            <h3>Pending actions</h3>
            <span className="card-hd-sub">— {ROLE_LABELS[role] || 'Government'} view</span>
          </div>
          {GOV_ACTIONS.map((a, i) => (
            <div key={i} className="action-row">
              <div className="action-icon" style={{ background: a.bg, color: a.col }}>{a.icon}</div>
              <div className="action-text">
                <div className="action-title">{a.title}</div>
                <div className="action-hint">{a.hint}</div>
              </div>
              <button className="action-cta">Act →</button>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-hd"><h3>Report standards supported</h3></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {STANDARDS.map(s => (
              <div key={s.title} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, background: 'var(--surface)', borderRadius: 8 }}>
                <div style={{ width: 28, height: 28, background: s.bg, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{s.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink4)' }}>{s.desc}</div>
                </div>
                <span className={`badge ${s.badge}`} style={{ marginLeft: 'auto' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
