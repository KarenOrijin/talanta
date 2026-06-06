import React from 'react';

export default function BottomBar() {
  return (
    <footer className="bottom-bar">
      <div className="bottom-bar-left">
        <span className="status-dot green"></span>
        <span>IATI Registry synced 4m ago</span>
        <span className="status-dot blue" style={{ marginLeft: '1rem' }}></span>
        <span>GCF database live</span>
        <span className="status-dot amber" style={{ marginLeft: '1rem' }}></span>
        <span>3 alerts pending</span>
      </div>
      <div className="bottom-bar-right">
        Talanta v1.0 · © 2025 · Africa Climate Finance Intelligence Platform
      </div>
    </footer>
  );
}
