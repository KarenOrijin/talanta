import React from 'react';
import { NAV_PANELS } from '../data.js';

const SECTIONS = ['Core', 'Intelligence', 'Reporting', 'Access'];

export default function Sidebar({ activePanel, onNav, role, onRoleChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">
          <div className="brand-mark">🌿</div>
          <div className="brand-name">Talanta</div>
        </div>
        <div className="brand-tag">Climate Finance Intelligence</div>
      </div>

      {SECTIONS.map(section => {
        const items = NAV_PANELS.filter(p => p.section === section);
        return (
          <React.Fragment key={section}>
            <div className="sidebar-section">{section}</div>
            {items.map(item => (
              <div
                key={item.id}
                className={`nav-item${activePanel === item.id ? ' active' : ''}`}
                onClick={() => onNav(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                {item.badge && (
                  <span className={`nav-badge${item.badgeClass === 'green' ? ' green' : ''}`}>
                    {item.badge}
                  </span>
                )}
              </div>
            ))}
          </React.Fragment>
        );
      })}

      <div className="sidebar-role">
        <div className="role-label">Viewing as</div>
        <div className="role-select-wrap">
          <select value={role} onChange={e => onRoleChange(e.target.value)}>
            <option value="gov">🏛 Government</option>
            <option value="donor">💳 Donor / DFI</option>
            <option value="ngo">🌐 NGO / Implementer</option>
            <option value="investor">📈 Private Investor</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
