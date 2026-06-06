import React from 'react';
import { NAV_PANELS, ROLE_LABELS } from '../data.js';

const SECTIONS = ['Core', 'Intelligence', 'Reporting', 'Access'];

export default function Sidebar({ activePanel, onNav, role, onRoleChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">T</div>
        <div>
          <div className="brand-name">Talanta</div>
          <div className="brand-sub">Climate Finance Intelligence</div>
        </div>
      </div>

      <div className="sidebar-role">
        <div className="role-label">Viewing as</div>
        <select
          className="role-select"
          value={role}
          onChange={e => onRoleChange(e.target.value)}
        >
          {Object.entries(ROLE_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>

      <nav className="sidebar-nav">
        {SECTIONS.map(section => {
          const items = NAV_PANELS.filter(p => p.section === section);
          return (
            <div key={section} className="nav-section">
              <div className="nav-section-label">{section}</div>
              {items.map(item => (
                <button
                  key={item.id}
                  className={`nav-item${activePanel === item.id ? ' active' : ''}`}
                  onClick={() => onNav(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {item.badge && (
                    <span className={`nav-badge${item.badgeClass ? ' badge-' + item.badgeClass : ''}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-info">
          <div className="footer-dot green-dot"></div>
          <span>IATI Live</span>
        </div>
        <div className="sidebar-footer-info">
          <div className="footer-dot blue-dot"></div>
          <span>GCF Connected</span>
        </div>
      </div>
    </aside>
  );
}
