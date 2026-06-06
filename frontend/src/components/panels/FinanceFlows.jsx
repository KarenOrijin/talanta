import React from 'react';
import { DONORS, DISB_EVENTS } from '../../data.js';

function KpiCard({ label, value, sub, subClass }) {
  return (
    <div className="kpi-card">
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">{label}</div>
      {sub && <div className={`kpi-sub ${subClass || ''}`}>{sub}</div>}
    </div>
  );
}

export default function FinanceFlows() {
  return (
    <div className="panel-content">
      <div className="kpi-row">
        <KpiCard label="Total Mobilised" value="$4.82B" sub="across all instruments" />
        <KpiCard label="Disbursed" value="$2.41B" sub="50.1% disbursement rate" />
        <KpiCard label="Co-financing Ratio" value="3.2x" sub="leverage on public funds" />
        <KpiCard label="Undisbursed" value="$2.41B" sub="⚠ pending release" subClass="kpi-warn" />
      </div>

      <div className="g3">
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-header">
            <span className="card-title">Donor portfolios</span>
          </div>
          <div className="flow-list">
            {DONORS.map(d => (
              <div key={d.abbr} className="flow-row">
                <div className="flow-abbr" style={{ background: d.c + '22', color: d.c }}>{d.abbr}</div>
                <div className="flow-name">{d.n}</div>
                <div className="flow-track">
                  <div className="flow-bar" style={{ width: `${d.pct}%`, background: d.c }}></div>
                </div>
                <div className="flow-val">${d.v}M</div>
                <div className="flow-pct">{d.pct}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Grant / Debt split</span>
          </div>
          <div className="instrument-bars">
            {[
              { label: 'Grants', pct: 42, color: '#1D9E75' },
              { label: 'Concessional loans', pct: 28, color: '#378ADD' },
              { label: 'Market-rate loans', pct: 18, color: '#EF9F27' },
              { label: 'Guarantees', pct: 12, color: '#5DCAA5' },
            ].map(item => (
              <div key={item.label} className="instr-row">
                <div className="instr-label">{item.label}</div>
                <div className="instr-track">
                  <div className="instr-fill" style={{ width: `${item.pct}%`, background: item.color }}></div>
                </div>
                <div className="instr-pct">{item.pct}%</div>
              </div>
            ))}
          </div>
          <div className="sector-mini-list" style={{ marginTop: '1rem' }}>
            <div className="card-sub-title">By sector</div>
            {[
              { n: 'Renewable Energy', v: '$1,820M', c: '#1D9E75' },
              { n: 'Climate Adaptation', v: '$640M', c: '#378ADD' },
              { n: 'Forests & Land', v: '$480M', c: '#639922' },
              { n: 'Water & WASH', v: '$340M', c: '#5DCAA5' },
            ].map(s => (
              <div key={s.n} className="sector-mini-row">
                <span className="sector-dot" style={{ background: s.c }}></span>
                <span className="sector-mini-name">{s.n}</span>
                <span className="sector-mini-val">{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1rem' }}>
        <div className="card-header">
          <span className="card-title">Disbursement timeline</span>
          <span className="card-badge badge-blue">{DISB_EVENTS.length} recent events</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Project</th>
              <th>IATI ID</th>
            </tr>
          </thead>
          <tbody>
            {DISB_EVENTS.map((ev, i) => (
              <tr key={i}>
                <td>{ev.date}</td>
                <td>
                  <span style={{ color: ev.c, fontWeight: 600 }}>{ev.amt}</span>
                </td>
                <td>{ev.proj}</td>
                <td><span className="mono">{ev.id}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
