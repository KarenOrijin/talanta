import React from 'react';
import { SECTORS, FEED, COUNTRIES, SDGS } from '../../data.js';

const MAX_BAR = 1820;

function AlertBar({ onDismiss }) {
  return (
    <div className="alert-bar alert-amber">
      <span className="alert-icon">⚠</span>
      <span className="alert-text">
        <strong>3 projects have overdue disbursement reports</strong> — GCF/FP/201, AFDB/CLI/088, EU/NDICI/044.
        Immediate action required to avoid funding suspension.
      </span>
      <button className="alert-action">Review Now</button>
      <button className="alert-dismiss" onClick={onDismiss}>✕</button>
    </div>
  );
}

function KpiCard({ label, value, sub, subClass }) {
  return (
    <div className="kpi-card">
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">{label}</div>
      {sub && <div className={`kpi-sub ${subClass || ''}`}>{sub}</div>}
    </div>
  );
}

function DonutChart() {
  // SVG donut: radius 70, circumference ~440
  const cx = 90, cy = 90, r = 70;
  const circ = 2 * Math.PI * r;
  const segments = [
    { pct: 42, color: '#1D9E75', label: 'Grants', offset: 0 },
    { pct: 28, color: '#378ADD', label: 'Conc. loans', offset: 42 },
    { pct: 18, color: '#EF9F27', label: 'Market loans', offset: 70 },
    { pct: 12, color: '#5DCAA5', label: 'Guarantees', offset: 88 },
  ];
  let cumulative = 0;
  return (
    <div className="donut-wrap">
      <svg viewBox="0 0 180 180" width="160" height="160">
        {segments.map((seg, i) => {
          const dashArray = (seg.pct / 100) * circ;
          const dashOffset = circ - (cumulative / 100) * circ;
          cumulative += seg.pct;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth="22"
              strokeDasharray={`${dashArray} ${circ - dashArray}`}
              strokeDashoffset={dashOffset}
              style={{ transform: 'rotate(-90deg)', transformOrigin: '90px 90px' }}
            />
          );
        })}
        <text x="90" y="85" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1B2A3F">$4.82B</text>
        <text x="90" y="103" textAnchor="middle" fontSize="11" fill="#6B7C93">Total</text>
      </svg>
      <div className="donut-legend">
        {segments.map((seg, i) => (
          <div key={i} className="legend-item">
            <span className="legend-dot" style={{ background: seg.color }}></span>
            <span className="legend-label">{seg.label}</span>
            <span className="legend-pct">{seg.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Overview({ alertVisible, onDismissAlert }) {
  return (
    <div className="panel-content">
      {alertVisible && <AlertBar onDismiss={onDismissAlert} />}

      <div className="kpi-row">
        <KpiCard label="Total Committed" value="$4.82B" sub="↑ +12% YoY" subClass="kpi-up" />
        <KpiCard label="Disbursed" value="$2.41B" sub="50.1% of committed" />
        <KpiCard label="Active Projects" value="147" sub="34 countries" />
        <KpiCard label="CO₂ Avoided" value="18.4Mt" sub="↑ vs 12Mt target" subClass="kpi-up" />
        <KpiCard label="Beneficiaries" value="6.2M" sub="direct & indirect" />
        <KpiCard label="Reporting Rate" value="87%" sub="⚠ Below 90% threshold" subClass="kpi-warn" />
      </div>

      <div className="g3">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Finance flows by sector</span>
            <span className="card-badge badge-green">$4.82B total</span>
          </div>
          <div className="bar-chart">
            {SECTORS.map(s => (
              <div key={s.n} className="bar-row">
                <div className="bar-label">{s.n}</div>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${(s.v / MAX_BAR) * 100}%`, background: s.c }}
                  ></div>
                </div>
                <div className="bar-val">${s.v}M</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Instrument mix</span>
          </div>
          <DonutChart />
          <div className="sdg-pills">
            {SDGS.map(s => (
              <span key={s.n} className="sdg-pill" style={{ background: s.c + '22', color: s.c, border: `1px solid ${s.c}44` }}>
                {s.n} {s.lbl}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Live activity feed</span>
            <span className="pulse-dot"></span>
          </div>
          <div className="feed-list">
            {FEED.map((item, i) => (
              <div key={i} className="feed-item">
                <div className="feed-icon" style={{ background: item.bg }}>{item.icon}</div>
                <div className="feed-body">
                  <div className="feed-title">{item.title}</div>
                  <div className="feed-meta">{item.meta}</div>
                </div>
                {item.amt && <div className="feed-amt">{item.amt}</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Geographic reach</span>
            <span className="card-badge badge-blue">34 countries</span>
          </div>
          <div className="map-area" style={{ position: 'relative' }}>
            <div className="map-bg">
              <svg viewBox="0 0 400 250" width="100%" height="100%" opacity="0.15">
                <ellipse cx="200" cy="125" rx="180" ry="110" fill="#1D9E75" />
              </svg>
            </div>
            {COUNTRIES.map(c => (
              <div
                key={c.name}
                className={`map-pin ${c.size}`}
                style={{ top: c.top, left: c.left }}
              >
                <div className="pin-dot"></div>
                <div className="pin-label">{c.name}<br /><span className="pin-amt">{c.amt}</span></div>
              </div>
            ))}
          </div>
          <div className="country-pills">
            {COUNTRIES.map(c => (
              <span key={c.name} className="country-pill">{c.name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
