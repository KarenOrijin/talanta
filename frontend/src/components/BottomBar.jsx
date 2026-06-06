import React from 'react';

export default function BottomBar() {
  return (
    <div className="bottom-bar">
      <div className="bb-item">
        <div className="bb-dot" style={{ background: 'var(--green)' }}></div>
        IATI Registry synced 4m ago
      </div>
      <div className="bb-item">
        <div className="bb-dot" style={{ background: 'var(--blue)' }}></div>
        GCF database live
      </div>
      <div className="bb-item">
        <div className="bb-dot" style={{ background: 'var(--amber)' }}></div>
        3 alerts pending
      </div>
      <div style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--ink4)' }}>
        Talanta v1.0 · © 2025 · <span style={{ color: 'var(--green)' }}>Africa Climate Finance Intelligence Platform</span>
      </div>
    </div>
  );
}
