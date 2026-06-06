import React from 'react';
import { PANEL_TITLES } from '../data.js';

export default function Topbar({ activePanel, role }) {
  const title = PANEL_TITLES[activePanel] || 'Dashboard';
  const [section, page] = title.split(' / ');

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-title">
          <span className="topbar-section">{section}</span>
          {page && <span className="topbar-page"> / {page}</span>}
        </div>
      </div>
      <div className="topbar-right">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input className="search-input" type="text" placeholder="Search projects, donors, countries…" />
        </div>
        <div className="status-pill">
          <span className="pulse-dot"></span>
          IATI Live
        </div>
        <button className="topbar-btn" title="Notifications">
          <span>🔔</span>
          <span className="notif-dot"></span>
        </button>
        <button className="topbar-btn" title="Download">
          <span>⬇</span>
        </button>
        <div className="avatar">SA</div>
      </div>
    </header>
  );
}
