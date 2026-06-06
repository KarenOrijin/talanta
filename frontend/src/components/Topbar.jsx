import React from 'react';
import { PANEL_TITLES } from '../data.js';

export default function Topbar({ activePanel }) {
  const full  = PANEL_TITLES[activePanel] || 'Overview / Dashboard';
  const parts = full.split(' / ');
  const title = parts[0];
  const sub   = parts[1];

  return (
    <div className="topbar">
      <div className="topbar-title">
        {title}{sub && <span> / {sub}</span>}
      </div>
      <div className="search-box">
        <span style={{ color: 'var(--ink4)', fontSize: 13 }}>⌕</span>
        <input type="text" placeholder="Search projects, donors, countries…" />
      </div>
      <div className="topbar-actions">
        <div className="status-pill">
          <div className="status-dot"></div>
          IATI Live
        </div>
        <div className="tb-btn tb-notif" title="Alerts">🔔</div>
        <div className="tb-btn" title="Export">↓</div>
        <div className="avatar">SA</div>
      </div>
    </div>
  );
}
