import React from 'react';
import { GOV_ACTIONS } from '../../data.js';

function KpiCard({ label, value, sub, subClass }) {
  return (
    <div className="kpi-card">
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">{label}</div>
      {sub && <div className={`kpi-sub ${subClass || ''}`}>{sub}</div>}
    </div>
  );
}

const STANDARDS = [
  { name: 'IATI', status: 'Live', badge: 'badge-green', desc: 'International Aid Transparency Initiative — full XML publishing' },
  { name: 'GCF', status: 'Live', badge: 'badge-green', desc: 'Green Climate Fund reporting templates — auto-populated' },
  { name: 'OECD-DAC', status: 'Beta', badge: 'badge-amber', desc: 'Development Assistance Committee CRS++ format — in beta' },
  { name: 'CSRD / ISSB', status: 'Q3 2025', badge: 'badge-amber', desc: 'EU Corporate Sustainability Reporting — roadmap Q3 2025' },
];

export default function Reporting({ role }) {
  return (
    <div className="panel-content">
      <div className="kpi-row">
        <KpiCard label="Total Reports" value="634" sub="all formats" />
        <KpiCard label="Pending" value="48" sub="⚠ awaiting submission" subClass="kpi-warn" />
        <KpiCard label="IATI Published" value="612" sub="to iatiregistry.org" />
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Pending actions</span>
            {role === 'gov' && <span className="card-badge badge-amber">Gov view</span>}
          </div>
          <div className="action-list">
            {GOV_ACTIONS.map((a, i) => (
              <div key={i} className="action-row">
                <div className="action-icon" style={{ background: a.bg, color: a.col }}>
                  {a.icon}
                </div>
                <div className="action-body">
                  <div className="action-title">{a.title}</div>
                  <div className="action-hint">{a.hint}</div>
                </div>
                <button className="act-btn">Act</button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Report standards supported</span>
          </div>
          <div className="standards-list">
            {STANDARDS.map(s => (
              <div key={s.name} className="standard-row">
                <div className="standard-name">{s.name}</div>
                <span className={`badge ${s.badge}`}>{s.status}</span>
                <div className="standard-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
