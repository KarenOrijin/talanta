import React from 'react';
import { VERIFS } from '../../data.js';

function KpiCard({ label, value, sub, subClass }) {
  return (
    <div className="kpi-card">
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">{label}</div>
      {sub && <div className={`kpi-sub ${subClass || ''}`}>{sub}</div>}
    </div>
  );
}

export default function Verification() {
  return (
    <div className="panel-content">
      <div className="kpi-row">
        <KpiCard label="Claims Verified" value="234" sub="last 12 months" />
        <KpiCard label="Avg Score" value="81%" sub="across all verifications" />
        <KpiCard label="Flagged" value="17" sub="⚠ requires review" subClass="kpi-warn" />
        <KpiCard label="CO₂ Verified" value="14.2Mt" sub="satellite + ground truth" />
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent verifications</span>
            <span className="pulse-dot"></span>
          </div>
          <div className="verif-list">
            {VERIFS.map((v, i) => (
              <div key={i} className="verify-row">
                <div className="verify-icon-wrap">
                  <div className="verify-type-circle">
                    <span>{v.type.charAt(0)}</span>
                  </div>
                </div>
                <div className="verify-body">
                  <div className="verify-title">{v.title}</div>
                  <div className="verify-meta">{v.meta}</div>
                  <span className={`badge ${v.badge}`}>{v.type}</span>
                </div>
                <div className="verify-score" style={{ color: v.scoreC }}>
                  {v.score}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">MRV methodology</span>
          </div>
          <div className="mrv-boxes">
            <div className="mrv-box">
              <div className="mrv-icon">🛰</div>
              <div className="mrv-box-title">Satellite monitoring</div>
              <div className="mrv-box-desc">
                Sentinel-2 + Landsat imagery processed every 16 days. Detects land use change,
                vegetation loss, and infrastructure build-out in project polygons.
              </div>
            </div>
            <div className="mrv-box">
              <div className="mrv-icon">🤖</div>
              <div className="mrv-box-title">AI anomaly detection</div>
              <div className="mrv-box-desc">
                Machine learning models trained on historical project data flag inconsistencies
                between reported outputs, disbursed funds, and satellite evidence.
              </div>
            </div>
            <div className="mrv-box">
              <div className="mrv-icon">⛓</div>
              <div className="mrv-box-title">On-chain audit trail</div>
              <div className="mrv-box-desc">
                Verification events, scores, and evidence hashes are timestamped on a
                permissioned ledger — providing tamper-evident records for donors and auditors.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
