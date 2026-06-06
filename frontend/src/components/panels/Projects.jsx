import React, { useState } from 'react';
import { PROJECTS } from '../../data.js';

const FILTERS = [
  { key: 'all', label: 'All', count: 147 },
  { key: 'Renewable Energy', label: 'Renewable Energy', count: 42 },
  { key: 'Climate Adaptation', label: 'Adaptation', count: 31 },
  { key: 'Forests', label: 'Forests', count: 18 },
  { key: 'Water', label: 'Water', count: 24 },
  { key: 'Urban', label: 'Urban', count: 14 },
];

const STATUS_MAP = {
  active: 'badge-green',
  delayed: 'badge-red',
  review: 'badge-amber',
  completed: 'badge-blue',
};

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p =>
        p.sector.toLowerCase().includes(filter.toLowerCase()) ||
        p.title.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <div className="panel-content">
      <div className="filter-row">
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`filter-chip${filter === f.key ? ' active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
            <span className="filter-count">{f.key === 'all' ? f.count : (filter === f.key ? filtered.length : f.count)}</span>
          </button>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Projects ({filtered.length} shown)</span>
          <span className="card-badge badge-blue">IATI verified</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>IATI ID</th>
              <th>Project</th>
              <th>Country</th>
              <th>Donor</th>
              <th>Committed</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td><span className="mono">{p.id}</span></td>
                <td>{p.title}</td>
                <td>{p.country}</td>
                <td>{p.donor}</td>
                <td><strong>{p.amt}</strong></td>
                <td>
                  <div className="progress-cell">
                    <div className="prog-track">
                      <div
                        className="prog-fill"
                        style={{
                          width: `${p.prog}%`,
                          background: p.prog >= 70 ? '#1D9E75' : p.prog >= 40 ? '#EF9F27' : '#E05252',
                        }}
                      ></div>
                    </div>
                    <span className="prog-pct">{p.prog}%</span>
                  </div>
                </td>
                <td>
                  <span className={`badge ${STATUS_MAP[p.status] || 'badge-blue'}`}>
                    {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
