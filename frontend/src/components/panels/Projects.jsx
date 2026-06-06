import React, { useState } from 'react';
import { PROJECTS } from '../../data.js';

const FILTERS = [
  { key: 'all',              label: 'All (147)' },
  { key: 'Renewable Energy', label: 'Renewable Energy' },
  { key: 'Adaptation',       label: 'Adaptation' },
  { key: 'Forests',          label: 'Forests & Land' },
  { key: 'Water',            label: 'Water & WASH' },
  { key: 'Urban',            label: 'Urban Resilience' },
];

const STATUS_CLASS = {
  active:    'badge-green',
  delayed:   'badge-red',
  review:    'badge-amber',
  completed: 'badge-blue',
};

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const rows = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p =>
        p.sector.toLowerCase().includes(filter.toLowerCase()) ||
        p.title.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <div>
      <div className="page-header">
        <h1>Projects</h1>
        <p>147 active climate finance projects across 34 countries — filterable by sector, status, donor, and country</p>
      </div>

      <div className="filter-bar">
        {FILTERS.map(f => (
          <span
            key={f.key}
            className={`filter-chip${filter === f.key ? ' on' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </span>
        ))}
      </div>

      <div className="card g-full">
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
            {rows.map(p => (
              <tr key={p.id}>
                <td><span className="mono">{p.id}</span></td>
                <td style={{ fontWeight: 500 }}>{p.title}</td>
                <td>{p.country}</td>
                <td>{p.donor}</td>
                <td style={{ fontWeight: 500, color: 'var(--green)' }}>{p.amt}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div className="prog-wrap" style={{ width: 52 }}>
                      <div
                        className={`prog-fill${p.prog < 40 ? ' danger' : p.prog < 70 ? ' warn' : ''}`}
                        style={{ width: `${p.prog}%` }}
                      ></div>
                    </div>
                    <span style={{ fontSize: 11, color: 'var(--ink4)' }}>{p.prog}%</span>
                  </div>
                </td>
                <td>
                  <span className={`badge ${STATUS_CLASS[p.status] || 'badge-gray'}`}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
