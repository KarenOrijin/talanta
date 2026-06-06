import React from 'react';
import { DONORS, SECTORS, DISB_EVENTS } from '../../data.js';

const MAX_DONOR = Math.max(...DONORS.map(d => d.v));

const INSTRUMENTS = [
  { label: 'Grants',            val: '$2.02B — 42%', pct: 42, c: 'var(--green)' },
  { label: 'Concessional loans', val: '$1.35B — 28%', pct: 28, c: 'var(--blue)' },
  { label: 'Market-rate loans',  val: '$869M — 18%',  pct: 18, c: 'var(--amber)' },
  { label: 'Guarantees',         val: '$578M — 12%',  pct: 12, c: 'var(--green-mid)' },
];

export default function FinanceFlows() {
  return (
    <div>
      <div className="page-header">
        <h1>Finance Flows</h1>
        <p>Track where every dollar is committed, disbursed, and verified across donors and recipients</p>
      </div>

      <div className="kpi-row">
        <div className="kpi">
          <div className="kpi-label">Total mobilised</div>
          <div className="kpi-val">$4.82B</div>
          <div className="kpi-sub up">↑ 12% YoY</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Disbursed</div>
          <div className="kpi-val">$2.41B</div>
          <div className="kpi-sub">50% of committed</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Co-financing ratio</div>
          <div className="kpi-val">3.2×</div>
          <div className="kpi-sub up">blended leverage</div>
        </div>
        <div className="kpi warn">
          <div className="kpi-label">Undisbursed</div>
          <div className="kpi-val">$2.41B</div>
          <div className="kpi-sub warn">⚠ pending 34 reports</div>
        </div>
      </div>

      <div className="g3">
        {/* Donor portfolios */}
        <div className="card">
          <div className="card-hd">
            <h3>Donor portfolios</h3>
            <span className="card-hd-sub">committed USD</span>
          </div>
          <div className="card-scroll">
            {DONORS.map(d => (
              <div key={d.abbr} className="flow-row">
                <div className="flow-dot" style={{ background: d.c }}></div>
                <div style={{ flex: 1 }}>
                  <div className="flow-name">{d.n}</div>
                </div>
                <div className="flow-bar-wrap">
                  <div className="flow-bar-track">
                    <div className="flow-bar-fill" style={{ width: `${Math.round(d.v / MAX_DONOR * 100)}%`, background: d.c }}></div>
                  </div>
                </div>
                <div className="flow-amt">${d.v}M</div>
              </div>
            ))}
          </div>
        </div>

        {/* Grant/debt split + sector */}
        <div className="card">
          <div className="card-hd"><h3>Grant vs. debt split</h3></div>
          {INSTRUMENTS.map(item => (
            <div key={item.label} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 12, color: 'var(--ink3)' }}>
                <span>{item.label}</span>
                <span style={{ fontWeight: 500, color: 'var(--ink)' }}>{item.val}</span>
              </div>
              <div style={{ height: 8, background: 'var(--surface2)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${item.pct}%`, height: 8, background: item.c, borderRadius: 4 }}></div>
              </div>
            </div>
          ))}
          <hr className="green-rule" />
          <div className="section-lbl">Sector allocation</div>
          {SECTORS.map(s => (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.c, flexShrink: 0 }}></div>
              <div style={{ fontSize: 11, color: 'var(--ink3)', flex: 1 }}>{s.n}</div>
              <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--ink)' }}>${s.v}M</div>
            </div>
          ))}
        </div>
      </div>

      {/* Disbursement timeline */}
      <div className="card g-full">
        <div className="card-hd">
          <h3>Disbursement timeline</h3>
          <span className="card-action">Export CSV</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Project</th>
              <th>IATI ID</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {DISB_EVENTS.map((e, i) => (
              <tr key={i}>
                <td style={{ color: 'var(--ink4)' }}>{e.date}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: e.c, flexShrink: 0 }}></div>
                    {e.proj}
                  </div>
                </td>
                <td><span className="mono">{e.id}</span></td>
                <td style={{ fontWeight: 500, color: 'var(--green)' }}>{e.amt}</td>
                <td><span className="badge badge-green">Disbursed</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
