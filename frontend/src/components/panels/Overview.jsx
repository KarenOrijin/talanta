import React from 'react';
import { SECTORS, FEED, COUNTRIES, SDGS } from '../../data.js';

const MAX_SECTOR = Math.max(...SECTORS.map(s => s.v));

export default function Overview({ alertVisible, onDismissAlert }) {
  return (
    <div>
      {/* ── Alert ── */}
      {alertVisible && (
        <div className="alert-bar">
          <span className="alert-bar-icon">⚠</span>
          <span>
            <strong>3 projects</strong> have overdue disbursement reports — risk flags raised for
            GCF/FP/201, AFDB/CLI/088, and EU/NDICI/044.
          </span>
          <button className="alert-bar-close" onClick={onDismissAlert}>×</button>
        </div>
      )}

      {/* ── Page header ── */}
      <div className="page-header">
        <h1>Climate Finance Overview</h1>
        <p>Real-time intelligence across all climate finance flows, projects, and impact outcomes</p>
      </div>

      {/* ── KPIs ── */}
      <div className="kpi-row">
        <div className="kpi">
          <div className="kpi-label">Total committed</div>
          <div className="kpi-val">$4.82B</div>
          <div className="kpi-sub up">↑ +12% YoY</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Disbursed</div>
          <div className="kpi-val">$2.41B</div>
          <div className="kpi-sub">50.1% of committed</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Active projects</div>
          <div className="kpi-val">147</div>
          <div className="kpi-sub">34 countries</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">CO₂ avoided</div>
          <div className="kpi-val">18.4Mt</div>
          <div className="kpi-sub up">↑ vs. 12Mt target</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Beneficiaries</div>
          <div className="kpi-val">6.2M</div>
          <div className="kpi-sub">direct reach</div>
        </div>
        <div className="kpi warn">
          <div className="kpi-label">Reporting rate</div>
          <div className="kpi-val">87%</div>
          <div className="kpi-sub warn">⚠ 13% overdue</div>
        </div>
      </div>

      {/* ── g3: sector bars + instrument mix ── */}
      <div className="g3">
        {/* Sector bars */}
        <div className="card">
          <div className="card-hd">
            <h3>Finance flows by sector</h3>
            <span className="card-hd-sub">USD millions, 2024</span>
          </div>
          {SECTORS.map(s => (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ fontSize: 11, color: 'var(--ink3)', width: 110, textAlign: 'right', flexShrink: 0 }}>{s.n}</div>
              <div style={{ flex: 1, height: 14, background: 'var(--surface2)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${Math.round(s.v / MAX_SECTOR * 100)}%`, height: 14, borderRadius: 4, background: s.c }}></div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink)', fontWeight: 500, width: 44, flexShrink: 0, fontFeatureSettings: "'tnum'" }}>${s.v}M</div>
            </div>
          ))}
        </div>

        {/* Instrument mix */}
        <div className="card">
          <div className="card-hd"><h3>Instrument mix</h3></div>
          <div className="donut-wrap">
            <svg className="donut" viewBox="0 0 36 36">
              <circle r="15.9" cx="18" cy="18" fill="none" stroke="#E1EDE6" strokeWidth="3.2"/>
              <circle r="15.9" cx="18" cy="18" fill="none" stroke="#1D9E75" strokeWidth="3.2"
                strokeDasharray="42 58" strokeDashoffset="25" transform="rotate(-90 18 18)"/>
              <circle r="15.9" cx="18" cy="18" fill="none" stroke="#378ADD" strokeWidth="3.2"
                strokeDasharray="28 72" strokeDashoffset="-17" transform="rotate(-90 18 18)"/>
              <circle r="15.9" cx="18" cy="18" fill="none" stroke="#EF9F27" strokeWidth="3.2"
                strokeDasharray="18 82" strokeDashoffset="-45" transform="rotate(-90 18 18)"/>
              <circle r="15.9" cx="18" cy="18" fill="none" stroke="#5DCAA5" strokeWidth="3.2"
                strokeDasharray="12 88" strokeDashoffset="-63" transform="rotate(-90 18 18)"/>
            </svg>
            <div className="donut-legend">
              <div className="dl-row"><div className="dl-dot" style={{ background: '#1D9E75' }}></div>Grants<div className="dl-val">42%</div></div>
              <div className="dl-row"><div className="dl-dot" style={{ background: '#378ADD' }}></div>Conc. loans<div className="dl-val">28%</div></div>
              <div className="dl-row"><div className="dl-dot" style={{ background: '#EF9F27' }}></div>Market loans<div className="dl-val">18%</div></div>
              <div className="dl-row"><div className="dl-dot" style={{ background: '#5DCAA5' }}></div>Guarantees<div className="dl-val">12%</div></div>
            </div>
          </div>
          <hr className="green-rule" />
          <div className="section-lbl">SDG alignment</div>
          <div className="sdg-row">
            {SDGS.map(s => (
              <span key={s.n} className="sdg-pill" style={{ background: s.c + '22', color: s.c }}>
                {s.n} {s.lbl}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── g2: feed + map ── */}
      <div className="g2">
        {/* Activity feed */}
        <div className="card">
          <div className="card-hd">
            <h3>Live activity feed</h3>
            <span className="card-action">View all</span>
          </div>
          {FEED.map((f, i) => (
            <div key={i} className="feed-item">
              <div className="feed-icon-wrap" style={{ background: f.bg }}>{f.icon}</div>
              <div className="feed-body">
                <div className="feed-title">{f.title}</div>
                <div className="feed-meta">{f.meta}</div>
              </div>
              {f.amt && <div className="feed-amt">{f.amt}</div>}
            </div>
          ))}
        </div>

        {/* Geographic reach */}
        <div className="card">
          <div className="card-hd">
            <h3>Geographic reach</h3>
            <span className="card-hd-sub">Africa focus</span>
          </div>
          <div className="map-area">
            {COUNTRIES.map(c => (
              <div key={c.name} className="map-pin" style={{ top: c.top, left: c.left }} title={`${c.name}: ${c.amt}`}>
                <div className="pin-lbl">{c.name}</div>
                <div className={`pin-dot${c.size === 'large' ? ' large' : ''}`}></div>
              </div>
            ))}
            <div style={{ position: 'absolute', bottom: 8, right: 10, fontSize: 9, color: 'var(--ink4)', fontStyle: 'italic' }}>
              Sub-Saharan Africa · 34 countries
            </div>
          </div>
          <div className="section-lbl">Top recipient countries</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {COUNTRIES.map(c => (
              <span key={c.name} style={{ fontSize: 10, padding: '3px 9px', borderRadius: 12, background: 'var(--surface2)', color: 'var(--ink3)' }}>
                {c.name} <span style={{ color: 'var(--green)', fontWeight: 500 }}>{c.amt}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
