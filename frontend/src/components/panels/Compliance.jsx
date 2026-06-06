import React from 'react';
import { COMPLIANCE_DONORS } from '../../data.js';

function KpiCard({ label, value, sub, subClass }) {
  return (
    <div className="kpi-card">
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">{label}</div>
      {sub && <div className={`kpi-sub ${subClass || ''}`}>{sub}</div>}
    </div>
  );
}

export default function Compliance() {
  return (
    <div className="panel-content">
      <div className="kpi-row">
        <KpiCard label="Overall Compliance" value="87%" sub="weighted average" />
        <KpiCard label="Non-compliant" value="11" sub="⚠ donors below threshold" subClass="kpi-warn" />
        <KpiCard label="Avg Report Latency" value="12d" sub="days to publish after close" />
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">IATI compliance by donor</span>
          <button className="act-btn">Send reminders</button>
        </div>
        <div className="comp-list">
          {COMPLIANCE_DONORS.map(d => {
            const color = d.pct >= 90 ? '#1D9E75' : d.pct >= 75 ? '#EF9F27' : '#E05252';
            const badgeClass = d.pct >= 90 ? 'badge-green' : d.pct >= 75 ? 'badge-amber' : 'badge-red';
            const badgeLabel = d.pct >= 90 ? 'Compliant' : d.pct >= 75 ? 'Partial' : 'Non-compliant';
            return (
              <div key={d.name} className="comp-row">
                <div className="comp-name">{d.name}</div>
                <div className="comp-track">
                  <div
                    className="comp-fill"
                    style={{ width: `${d.pct}%`, background: color }}
                  ></div>
                </div>
                <div className="comp-pct" style={{ color }}>{d.pct}%</div>
                <span className={`badge ${badgeClass}`}>{badgeLabel}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
