import React from 'react';
import { NDC_TARGETS, IMPACT_SECTORS } from '../../data.js';

const IMPACT_CARDS = [
  { icon: '🌱', val: '18.4Mt', lbl: 'CO₂ avoided' },
  { icon: '⚡', val: '2.8GW',  lbl: 'Clean capacity installed' },
  { icon: '👥', val: '6.2M',  lbl: 'Beneficiaries reached' },
  { icon: '💧', val: '1.4M',  lbl: 'Water access improved' },
  { icon: '🌳', val: '180K ha', lbl: 'Forest protected' },
  { icon: '♀',  val: '58%',   lbl: 'Female beneficiaries' },
];

export default function ImpactTracker() {
  return (
    <div>
      <div className="page-header">
        <h1>Impact Tracker</h1>
        <p>Verified outcomes against NDC targets — disaggregated by sector, country, and beneficiary type</p>
      </div>

      <div className="impact-grid">
        {IMPACT_CARDS.map(c => (
          <div key={c.lbl} className="impact-card">
            <div className="impact-icon">{c.icon}</div>
            <div className="impact-val">{c.val}</div>
            <div className="impact-lbl">{c.lbl}</div>
          </div>
        ))}
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-hd">
            <h3>NDC target progress</h3>
            <span className="card-hd-sub">national contributions</span>
          </div>
          {NDC_TARGETS.map(t => (
            <div key={t.lbl} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: 'var(--ink2)' }}>{t.lbl}</span>
                <span style={{ fontSize: 11, color: 'var(--ink4)' }}>{t.cur}{t.unit} / {t.tgt}{t.unit}</span>
              </div>
              <div style={{ height: 6, background: 'var(--surface2)', borderRadius: 3 }}>
                <div style={{
                  width: `${t.pct}%`, height: 6, borderRadius: 3,
                  background: t.pct >= 70 ? '#1D9E75' : t.pct >= 45 ? '#EF9F27' : '#E24B4A'
                }}></div>
              </div>
              <div style={{ fontSize: 10, color: 'var(--ink4)', marginTop: 3 }}>{t.pct}% of target</div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-hd"><h3>Impact by sector</h3></div>
          {IMPACT_SECTORS.map((s, i) => (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: i < IMPACT_SECTORS.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.col, flexShrink: 0 }}></div>
              <div style={{ flex: 1, fontSize: 12, color: 'var(--ink2)' }}>{s.n}</div>
              <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--green)' }}>{s.co2} CO₂</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
