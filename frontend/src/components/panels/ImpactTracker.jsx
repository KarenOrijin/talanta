import React from 'react';
import { NDC_TARGETS, IMPACT_SECTORS } from '../../data.js';

const IMPACT_CARDS = [
  { icon: '🌡', label: 'CO₂ Avoided', value: '18.4Mt', sub: 'vs 12Mt target', color: '#1D9E75' },
  { icon: '⚡', label: 'Clean Capacity', value: '2.8GW', sub: 'renewable installed', color: '#378ADD' },
  { icon: '👥', label: 'Beneficiaries', value: '6.2M', sub: 'direct & indirect', color: '#534AB7' },
  { icon: '💧', label: 'Clean Water', value: '1.4M', sub: 'people served', color: '#5DCAA5' },
  { icon: '🌳', label: 'Forest Protected', value: '180K ha', sub: 'no deforestation', color: '#639922' },
  { icon: '♀', label: 'Female Beneficiaries', value: '58%', sub: 'gender-disaggregated', color: '#D4537E' },
];

export default function ImpactTracker() {
  return (
    <div className="panel-content">
      <div className="impact-grid">
        {IMPACT_CARDS.map(card => (
          <div key={card.label} className="impact-card" style={{ borderTop: `3px solid ${card.color}` }}>
            <div className="impact-icon">{card.icon}</div>
            <div className="impact-value" style={{ color: card.color }}>{card.value}</div>
            <div className="impact-label">{card.label}</div>
            <div className="impact-sub">{card.sub}</div>
          </div>
        ))}
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">NDC target progress</span>
            <span className="card-badge badge-amber">2030 targets</span>
          </div>
          <div className="ndc-list">
            {NDC_TARGETS.map(t => {
              const color = t.pct >= 70 ? '#1D9E75' : t.pct >= 45 ? '#EF9F27' : '#E05252';
              return (
                <div key={t.lbl} className="ndc-row">
                  <div className="ndc-header">
                    <span className="ndc-label">{t.lbl}</span>
                    <span className="ndc-vals" style={{ color }}>
                      {t.cur} {t.unit} / {t.tgt} {t.unit}
                    </span>
                  </div>
                  <div className="ndc-track">
                    <div
                      className="ndc-fill"
                      style={{ width: `${t.pct}%`, background: color }}
                    ></div>
                  </div>
                  <div className="ndc-pct" style={{ color }}>{t.pct}%</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Impact by sector</span>
          </div>
          <div className="impact-sector-list">
            {IMPACT_SECTORS.map(s => (
              <div key={s.n} className="impact-sector-row">
                <span className="impact-sector-dot" style={{ background: s.col }}></span>
                <span className="impact-sector-name">{s.n}</span>
                <span className="impact-sector-co2" style={{ color: s.col }}>{s.co2} CO₂</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
