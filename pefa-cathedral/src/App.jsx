import { useCallback, useEffect, useMemo, useState } from 'react';
import seedTracker from './data/tracker.json';
import { GIVING } from './config/giving';

const img = (file) => `${(import.meta.env.BASE_URL || '/').replace(/\/?$/, '/')}images/${file}`;

function formatKsh(n) {
  return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(n || 0);
}

function formatDate(iso) {
  if (!iso) return 'Not yet';
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

function CopyRow({ label, value }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(String(value));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };
  return (
    <div className="copy-row">
      <div>
        <span className="copy-label">{label}</span>
        <span className="copy-val">{value}</span>
      </div>
      <button type="button" className="copy-btn" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
    </div>
  );
}

function GiveSecurelyButton() {
  const [status, setStatus] = useState('');
  const give = async () => {
    const text = [
      `M-Pesa Paybill: ${GIVING.mpesaPaybill}`,
      `Account number: ${GIVING.mpesaAccount}`,
      GIVING.accountLabel,
    ].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setStatus('Payment details copied. Open M-Pesa and use Pay Bill.');
    } catch {
      setStatus('Use Paybill and account numbers shown below.');
    }
    document.getElementById('payment-details')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => setStatus(''), 5000);
  };
  return (
    <div className="give-secure-wrap">
      <button type="button" className="btn btn-gold give-secure-btn" onClick={give}>
        Give securely
      </button>
      {status && <p className="give-secure-status" role="status">{status}</p>}
    </div>
  );
}

const basePath = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

export default function App() {
  const [data, setData] = useState(seedTracker);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${basePath}data/tracker.json?t=${Date.now()}`);
      if (!res.ok) return;
      setData(await res.json());
      setError('');
    } catch {
      /* keep bundled seed data */
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
        <div className="hero-inner">
          <p className="eyebrow">PEFA Cathedral · Webuye, Bungoma</p>
          <h1>From a mud house to a coach for Webuye</h1>
          <p className="hero-lead">
            Ten years ago we started in a small mud house. Today 182 members in 14 groups have pledged KSh 4.3 million
            toward a KSh 8,000,000 coach. {summary?.membersPaying ?? 133} have already given. Partners are invited to
            help finish what our congregation started. Every gift is tracked on this page.
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
        </div>
      </section>

      <section id="story" className="section story">
        <div className="story-grid">
          <div>
            <img className="section-img" src={img('story.svg')} alt="Community ministry in Western Kenya" />
            <h2>Our story</h2>
            <p>
              PEFA Cathedral Webuye had no sponsor when we began, only a congregation that believed God had a bigger
              plan. Sunday by Sunday, gift by gift, we built the church we worship in today. Now we want to take the
              church to the people: a coach for congregation, choir, youth, and mission teams across Webuye.
            </p>
            <ul className="pillars">
              <li><strong>Members first:</strong> since May 2026, {summary?.membersOrganized ?? 182} members in {summary?.groupsActive ?? 14} groups pledged KSh 4.3M</li>
              <li><strong>Digital tracker:</strong> every shilling recorded each Sunday, open to the committee</li>
              <li><strong>Receipts and reports:</strong> church receipts, progress updates, and a final report when the coach is bought</li>
              <li><strong>Honour roll:</strong> partners named at the dedication when the coach is handed over</li>
            </ul>
            <h3 className="subhead">Project committee</h3>
            <ul className="committee-list">
              {GIVING.committee.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
          <div className="story-card">
            <p className="quote">
              Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion,
              for God loves a cheerful giver.
            </p>
            <p className="quote-by">2 Corinthians 9:7</p>
            <p className="quote-note">Karen Wanyama · On behalf of Bishop Frank Erima and the Coach Project Committee</p>
          </div>
        </div>
      </section>

      <section id="tracker" className="section tracker">
        <div className="section-head">
          <div>
            <h2>Live fundraising dashboard</h2>
            <p className="muted">Refreshes every 45 seconds · Last update: {formatDate(summary?.updatedAt)}</p>
          </div>
          <ProgressRing percent={summary?.percentRaised ?? 0} />
        </div>

        {error && <p className="banner-warn">{error}</p>}

        <div className="kpi-grid">
          {[
            ['Coach cost', formatKsh(summary?.coachCostKsh ?? GIVING.coachCostKsh)],
            ['Member pledge target', formatKsh(summary?.targetKsh)],
            ['Raised (members)', formatKsh(summary?.raisedKsh)],
            ['Balance on pledge', formatKsh(summary?.balanceKsh)],
            ['Members giving', summary?.membersPaying],
            ['Contribution groups', summary?.groupsActive],
          ].map(([label, val]) => (
            <div key={label} className="kpi">
              <span className="kpi-label">{label}</span>
              <span className="kpi-val">{val ?? 'Not yet'}</span>
            </div>
          ))}
        </div>

        {weeks.length > 0 && (
          <div className="chart-block">
            <h3>Weekly collections (all groups)</h3>
            <div className="chart" aria-label="Weekly collections chart">
              {weeks.map((w) => (
                <div key={w.week} className="bar-wrap" title={`${w.week}: ${formatKsh(w.amountKsh)}`}>
                  <span className="bar" style={{ height: `${Math.max(8, (w.amountKsh / maxWeek) * 100)}%` }} />
                  <span className="bar-lbl">{w.week}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="groups-head">
          <h3>Group progress</h3>
          <div className="filters">
            {['all', 'leading', 'need'].map((f) => (
              <button key={f} type="button" className={filter === f ? 'chip active' : 'chip'} onClick={() => setFilter(f)}>
                {f === 'all' ? 'All groups' : f === 'leading' ? '50% or more' : 'Under 50%'}
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
        <GiveSecurelyButton />
        <div className="give-grid">
          <div>
            <h2>Give now</h2>
            <p>
              New friends can give in minutes. Use the Paybill and account below exactly as shown.
              Every gift is receipted through church finance.
            </p>
            <div id="payment-details" className="give-box payment-box">
              <p className="give-label">M-Pesa Pay Bill</p>
              <CopyRow label="Paybill number" value={GIVING.mpesaPaybill} />
              <CopyRow label="Account number" value={GIVING.mpesaAccount} />
              <p className="give-hint">{GIVING.accountLabel}</p>
            </div>
            <div className="give-box contacts-box">
              <p className="give-label">Visit or call</p>
              <p>
                <a href={`tel:${GIVING.bishop.tel}`}>{GIVING.bishop.name}: {GIVING.bishop.phone}</a>
              </p>
              <p>
                <a href={`tel:${GIVING.chairman.tel}`}>{GIVING.chairman.name}: {GIVING.chairman.phone}</a>
              </p>
              <p>
                <a href={`mailto:${GIVING.emailInfo}`}>{GIVING.emailInfo}</a>
              </p>
            </div>
          </div>
          <div className="give-card">
            <h3>M-Pesa steps</h3>
            <ol>
              {GIVING.mpesaSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <a
              className="btn btn-gold full"
              href={`mailto:${GIVING.emailAccounts}?subject=Coach%20Project%20Gift%20PEFA%20Cathedral%20Webuye`}
            >
              Email accounts office with receipt
            </a>
            <p className="fine-print">
              Partner gifts receive official church receipts and honour roll recognition at dedication.
            </p>
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
