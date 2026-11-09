import { useCallback, useEffect, useMemo, useState } from 'react';

function formatKsh(n) {
  return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(n || 0);
}

function formatDate(iso) {
  if (!iso) return '—';
  try {
    return new Intl.DateTimeFormat('en-KE', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function ProgressRing({ percent }) {
  const p = Math.min(100, Math.max(0, percent));
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c - (p / 100) * c;
  return (
    <svg className="progress-ring" viewBox="0 0 128 128" aria-hidden>
      <circle className="ring-bg" cx="64" cy="64" r={r} />
      <circle className="ring-fg" cx="64" cy="64" r={r} strokeDasharray={c} strokeDashoffset={offset} />
      <text x="64" y="58" textAnchor="middle" className="ring-label">{p.toFixed(0)}%</text>
      <text x="64" y="78" textAnchor="middle" className="ring-sub">raised</text>
    </svg>
  );
}

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/data/tracker.json?t=${Date.now()}`);
      if (!res.ok) throw new Error('Could not load tracker');
      setData(await res.json());
      setError('');
    } catch (e) {
      setError(e.message || 'Offline');
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, 45000);
    return () => clearInterval(id);
  }, [load]);

  const summary = data?.summary;
  const groups = data?.groups || [];
  const weeks = data?.weeklyCollections || [];

  const filteredGroups = useMemo(() => {
    if (filter === 'leading') return groups.filter((g) => g.percentDone >= 50);
    if (filter === 'need') return groups.filter((g) => g.percentDone < 50);
    return groups;
  }, [groups, filter]);

  const maxWeek = Math.max(...weeks.map((w) => w.amountKsh), 1);

  return (
    <div className="site">
      <header className="top">
        <div className="brand">PEFA Cathedral</div>
        <nav className="nav">
          <a href="#story">Story</a>
          <a href="#tracker">Live tracker</a>
          <a href="#give" className="nav-cta">Give now</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-glow" aria-hidden />
        <p className="eyebrow">PEFA Cathedral · Webuye, Bungoma</p>
        <h1>Building our cathedral coach — together</h1>
        <p className="hero-lead">
          This campaign is complete in spirit and still open in generosity. Your gift helps us secure a coach
          for ministry, outreach, and faithful member care — with every shilling tracked publicly.
        </p>
        <div className="hero-actions">
          <a className="btn btn-gold" href="#give">Contribute today</a>
          <a className="btn btn-ghost" href="#tracker">View live progress</a>
        </div>
        {summary && (
          <div className="hero-stats">
            <div><span className="stat-val">{formatKsh(summary.raisedKsh)}</span><span className="stat-lbl">raised</span></div>
            <div><span className="stat-val">{formatKsh(summary.balanceKsh)}</span><span className="stat-lbl">to go</span></div>
            <div><span className="stat-val">{summary.groupsActive}</span><span className="stat-lbl">active groups</span></div>
          </div>
        )}
      </section>

      <section id="story" className="section story">
        <div className="story-grid">
          <div>
            <h2>A high-standard ministry for Western Kenya</h2>
            <p>
              Inspired by cathedral-grade communication worldwide — clear giving paths, beautiful storytelling,
              and radical transparency — PEFA Cathedral Webuye invites partners near and far to join a
              finished fundraiser that still welcomes your seed.
            </p>
            <ul className="pillars">
              <li><strong>Accountability</strong> — group-by-group totals updated from our official ledger</li>
              <li><strong>Community</strong> — 131 members across {summary?.groupsActive ?? '—'} servant groups</li>
              <li><strong>Impact</strong> — reliable transport for elders, youth, and rural outreach</li>
            </ul>
          </div>
          <div className="story-card">
            <p className="quote">“Let every gift be seen; let every need be known; let Christ be glorified in our openness.”</p>
            <p className="quote-by">— PEFA Cathedral Webuye leadership</p>
          </div>
        </div>
      </section>

      <section id="tracker" className="section tracker">
        <div className="section-head">
          <div>
            <h2>Live fundraising dashboard</h2>
            <p className="muted">Refreshes automatically every 45 seconds · Last update: {formatDate(summary?.updatedAt)}</p>
          </div>
          <ProgressRing percent={summary?.percentRaised ?? 0} />
        </div>

        {error && <p className="banner-warn">{error}</p>}

        <div className="kpi-grid">
          {[
            ['Target', formatKsh(summary?.targetKsh)],
            ['Raised', formatKsh(summary?.raisedKsh)],
            ['Balance', formatKsh(summary?.balanceKsh)],
            ['Members giving', summary?.membersPaying],
            ['Groups complete', summary?.fullyPaid],
            ['Overpaid (praise)', summary?.overpaid],
          ].map(([label, val]) => (
            <div key={label} className="kpi">
              <span className="kpi-label">{label}</span>
              <span className="kpi-val">{val ?? '—'}</span>
            </div>
          ))}
        </div>

        {weeks.length > 0 && (
          <div className="chart-block">
            <h3>Weekly collections (all groups)</h3>
            <form className="chart" aria-label="Weekly collections chart">
              {weeks.map((w) => (
                <div key={w.week} className="bar-wrap" title={`${w.week}: ${formatKsh(w.amountKsh)}`}>
                  <span
                    className="bar"
                    style={{ height: `${Math.max(8, (w.amountKsh / maxWeek) * 100)}%` }}
                  />
                  <span className="bar-lbl">{w.week}</span>
                </div>
              ))}
            </form>
          </div>
        )}

        <div className="groups-head">
          <h3>Group progress</h3>
          <div className="filters">
            {['all', 'leading', 'need'].map((f) => (
              <button key={f} type="button" className={filter === f ? 'chip active' : 'chip'} onClick={() => setFilter(f)}>
                {f === 'all' ? 'All groups' : f === 'leading' ? '≥ 50%' : 'Under 50%'}
              </button>
            ))}
          </div>
        </div>

        <div className="group-grid">
          {filteredGroups.map((g) => (
            <article key={g.name} className="group-card">
              <div className="group-top">
                <h4>{g.name}</h4>
                <span className="pct">{g.percentDone}%</span>
              </div>
              <div className="track">
                <span className="fill" style={{ width: `${Math.min(100, g.percentDone)}%` }} />
              </div>
              <div className="group-meta">
                <span>{formatKsh(g.raisedKsh)} raised</span>
                <span>{formatKsh(g.balanceKsh)} left</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="give" className="section give">
        <div className="give-grid">
          <div>
            <h2>Your contribution matters</h2>
            <p>
              The main season of the internal fundraiser has closed; we now invite partners — locally and globally —
              to help us cross the finish line. Gifts are receipted through church finance.
            </p>
            <div className="give-box">
              <p className="give-label">M-Pesa & bank</p>
              <p>{data?.giving?.accountName}</p>
              <p className="muted">{data?.giving?.note}</p>
              <p>PEFA HQ: <a href={`mailto:${data?.giving?.contacts?.pefaHq || 'info@pefachurch.org'}`}>{data?.giving?.contacts?.pefaHq || 'info@pefachurch.org'}</a></p>
            </div>
          </div>
          <div className="give-card">
            <h3>Give in three steps</h3>
            <ol>
              <li>Pray and decide your seed amount</li>
              <li>Send via M-Pesa or bank (details from cathedral office)</li>
              <li>Email your receipt to <strong>accounts@pefachurch.org</strong> for recording</li>
            </ol>
            <a className="btn btn-gold full" href="mailto:accounts@pefachurch.org?subject=Coach%20Project%20Gift%20—%20PEFA%20Cathedral%20Webuye">Email accounts office</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} PEFA Cathedral Webuye · Bungoma County, Kenya</p>
        <p className="muted">Figures from the official Payment Tracker dashboard.</p>
      </footer>
    </div>
  );
}
