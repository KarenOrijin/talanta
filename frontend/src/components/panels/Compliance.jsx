import React from 'react';
import { COMPLIANCE_DONORS } from '../../data.js';

function compColor(pct) { return pct >= 90 ? '#1D9E75' : pct >= 75 ? '#EF9F27' : '#E24B4A'; }
function compBadge(pct) { return pct >= 90 ? 'badge-green' : pct >= 75 ? 'badge-amber' : 'badge-red'; }
function compLabel(pct) { return pct >= 90 ? 'Compliant' : pct >= 75 ? 'Partial' : 'Non-compliant'; }

export default function Compliance() {
  return (
    <div>
      <div className="page-header">
        <h1>Compliance</h1>
        <p>IATI reporting compliance by donor and implementer — track fiduciary standards and overdue submissions</p>
      </div>

      <div className="kpi-row">
        <div className="kpi">
          <div className="kpi-label">Overall compliance</div>
          <div className="kpi-val">87%</div>
          <div className="kpi-sub">IATI-linked orgs</div>
        </div>
        <div className="kpi warn">
          <div className="kpi-label">Non-compliant</div>
          <div className="kpi-val">11</div>
          <div className="kpi-sub warn">of 89 organisations</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Avg. report latency</div>
          <div className="kpi-val">12d</div>
          <div className="kpi-sub">from deadline</div>
        </div>
      </div>

      <div className="card g-full">
        <div className="card-hd">
          <h3>IATI compliance by donor</h3>
          <span className="card-action">Send reminders</span>
        </div>
        {COMPLIANCE_DONORS.map(d => (
          <div key={d.name} className="comp-row">
            <div className="comp-name">{d.name}</div>
            <div className="comp-track">
              <div className="comp-fill" style={{ width: `${d.pct}%`, background: compColor(d.pct) }}></div>
            </div>
            <div className="comp-val">{d.pct}%</div>
            <span className={`badge ${compBadge(d.pct)}`}>{compLabel(d.pct)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
