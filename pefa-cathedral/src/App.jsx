import { useCallback, useEffect, useMemo, useState } from 'react';
import seedTracker from './data/tracker.json';
import { CHURCH, GIVING, LEADERS } from './config/giving';

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

function PageHeader({ kicker, title, lead }) {
  return (
    <header className="page-header">
      {kicker && <p className="eyebrow">{kicker}</p>}
      <h2>{title}</h2>
      {lead && <p className="page-lead">{lead}</p>}
    </header>
  );
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

function ContactCard({ person }) {
  return (
    <article className="contact-card">
      <p className="contact-role">{person.role}</p>
      <h3>{person.name}</h3>
      <p className="muted">{person.note}</p>
      {person.phone && (
        <p>
          <a href={`tel:${person.tel || person.phone.replace(/\s/g, '')}`}>{person.phone}</a>
        </p>
      )}
      {person.email && (
        <p>
          <a href={`mailto:${person.email}`}>{person.email}</a>
        </p>
      )}
    </article>
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
  const [filter, setFilter] = useState('all');

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${basePath}data/tracker.json?t=${Date.now()}`);
      if (!res.ok) return;
      setData(await res.json());
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
  const coachCost = summary?.coachCostKsh ?? GIVING.coachCostKsh;
  const raised = summary?.raisedKsh ?? 0;

  return (
    <div className="site">
      <header className="top">
        <a href="#home" className="brand-btn">
          <div className="brand">{CHURCH.name}</div>
          <p className="brand-sub">{CHURCH.location}</p>
        </a>
        <nav className="nav" aria-label="Main">
          <a href="#home">Home</a>
          <a href="#our-story">Our story</a>
          <a href="#about">About</a>
          <a href="#tracker">Tracker</a>
          <a href="#contact">Contact</a>
          <a href="#give" className="nav-cta">Give</a>
        </nav>
      </header>

      <main className="main-content">
          <section id="home" className="hero">
            <div className="hero-inner">
              <p className="eyebrow">Cathedral Coach Project · {CHURCH.denomination}</p>
              <h1>A ministry coach for Webuye and beyond</h1>
              <p className="hero-lead">
                PEFA Cathedral Webuye is raising {formatKsh(coachCost)} for a ministry coach. The vehicle will serve our
                congregation, choir, youth, and mission teams across Bungoma County. Members have already given{' '}
                {formatKsh(raised)} and every shilling is on our live tracker. We are asking partners to help us finish
                the purchase.
              </p>
              <h2 className="hero-subhead">Why this coach matters</h2>
              <div className="hero-coach-points">
                <ul>
                  <li>Bring elders, children, and rural members to church safely each Sunday</li>
                  <li>Reach villages for outreach, prayer, and community care beyond Webuye town</li>
                  <li>Move choirs, youth, and teams without hiring costly transport every week</li>
                  <li>Support weddings, funerals, and county wide ministry events with one reliable coach</li>
                </ul>
              </div>
              <div className="hero-trust">
                <p>
                  <strong>Accountability:</strong> Paybill {GIVING.mpesaPaybill}, official receipts, named committee,
                  honour roll for partners at dedication.
                </p>
              </div>
              <div className="hero-actions">
                <a className="btn btn-gold" href="#give">Support the coach</a>
                <a className="btn btn-ghost" href="#tracker">See live progress</a>
              </div>
              <p className="scroll-hint">Scroll for our church story (mud house to today), live tracker, and how to give</p>
              {summary && (
                <div className="hero-stats">
                  <div><span className="stat-val">{formatKsh(coachCost)}</span><span className="stat-lbl">coach goal</span></div>
                  <div><span className="stat-val">{formatKsh(summary.raisedKsh)}</span><span className="stat-lbl">raised so far</span></div>
                  <div><span className="stat-val">{summary.membersPaying}</span><span className="stat-lbl">members giving</span></div>
                  <div><span className="stat-val">{summary.groupsActive ?? 14}</span><span className="stat-lbl">giving groups</span></div>
                </div>
              )}
            </div>
          </section>

          <section id="our-story" className="section page-section story-page">
            <PageHeader
              kicker="Our story"
              title="From a mud house to a cathedral of faith"
              lead="This is how God built our congregation before we asked anyone outside our walls to help with the coach."
            />
            <div className="story-page-grid">
              <div className="prose">
                <p>
                  Ten years ago, PEFA Cathedral Webuye began in a small mud house. We had no sponsor and no outside funding,
                  only a congregation that believed God had a bigger plan for us. Every Sunday, members gave what they could.
                  Sunday by Sunday, gift by gift, that faithfulness built the church we worship in today.
                </p>
                <p>
                  We learned to give, to wait, and to trust. We learned accountability because every gift mattered. That
                  discipline still defines who we are as a church.
                </p>
                <p>
                  Today we worship in a building we built together. The mud house chapter is behind us; the coach project on
                  the home page is how we take that same faith into the streets and villages around Webuye.
                </p>
                <a className="text-link" href="#home">Back to coach project</a>
                {' · '}
                <a className="text-link" href="#about">About our church</a>
              </div>
              <aside className="story-card">
                <p className="quote">
                  Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion,
                  for God loves a cheerful giver.
                </p>
                <p className="quote-by">2 Corinthians 9:7</p>
              </aside>
            </div>
          </section>

          <section id="about" className="section page-section about-page">
            <PageHeader
              kicker="About us"
              title="PEFA Cathedral Webuye"
              lead="A worshipping community in Western Kenya, committed to the Gospel, accountable stewardship, and service to our neighbours."
            />
            <div className="about-grid">
              <div className="about-card">
                <h3>Who we are</h3>
                <p>
                  {CHURCH.name} is part of {CHURCH.denomination}. We gather for worship, discipleship, and community outreach
                  in {CHURCH.location}. We are led by {LEADERS[0].name} and serve families across Webuye and Bungoma County.
                </p>
              </div>
              <div className="about-card">
                <h3>Our mission</h3>
                <p>
                  To proclaim Christ, nurture believers, and serve our community with integrity. We believe local churches
                  should be transparent with the resources God provides through his people.
                </p>
              </div>
              <div className="about-card">
                <h3>Coach project</h3>
                <p>
                  The cathedral coach project is the congregation&apos;s initiative to secure reliable ministry transport.
                  Funds are receipted through church finance, overseen by a named committee, and reported on this official
                  project site.
                </p>
              </div>
              <div className="about-card">
                <h3>Accountability</h3>
                <ul className="check-list">
                  <li>Official church receipt for every gift</li>
                  <li>Live fundraising dashboard on this site</li>
                  <li>Progress reports for partners; final report at purchase</li>
                  <li>Partner names on the honour roll at dedication</li>
                </ul>
              </div>
            </div>
            <h3 className="subhead center">Coach Project Committee</h3>
            <div className="contact-grid compact">
              {LEADERS.map((p) => (
                <ContactCard key={p.name} person={p} />
              ))}
            </div>
          </section>

          <section id="tracker" className="section tracker page-section">
            <PageHeader
              kicker="Transparency"
              title="Live fundraising dashboard"
              lead={`Refreshes every 45 seconds. Last update: ${formatDate(summary?.updatedAt)}`}
            />
            <div className="section-head tracker-ring">
              <ProgressRing percent={summary?.percentRaised ?? 0} />
            </div>
            <div className="kpi-grid">
              {[
                ['Coach cost', formatKsh(coachCost)],
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

          <section id="give" className="section give page-section">
            <PageHeader kicker="Give" title="Partner with us" lead="Use M-Pesa Pay Bill below. Every gift is receipted through church finance." />
            <GiveSecurelyButton />
            <div className="give-grid">
              <div>
                <div id="payment-details" className="give-box payment-box">
                  <p className="give-label">M-Pesa Pay Bill</p>
                  <CopyRow label="Paybill number" value={GIVING.mpesaPaybill} />
                  <CopyRow label="Account number" value={GIVING.mpesaAccount} />
                  <p className="give-hint">{GIVING.accountLabel}</p>
                </div>
                <p className="muted">
                  Questions? <a href="#contact">Contact the project secretary</a> or email{' '}
                  <a href={`mailto:${CHURCH.emailAccounts}`}>{CHURCH.emailAccounts}</a>.
                </p>
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
                  href={`mailto:${CHURCH.emailAccounts}?subject=Coach%20Project%20Gift%20PEFA%20Cathedral%20Webuye`}
                >
                  Email receipt to accounts office
                </a>
              </div>
            </div>
          </section>

          <section id="contact" className="section page-section contact-page">
            <PageHeader
              kicker="Contact us"
              title="Visit, call, or write"
              lead="We welcome donors, partners, and guests. Contact the committee to arrange a visit or request a progress report."
            />
            <div className="visit-banner">
              <p><strong>{CHURCH.name}</strong></p>
              <p>{CHURCH.location}</p>
              <p>
                National HQ: <a href={`mailto:${CHURCH.emailInfo}`}>{CHURCH.emailInfo}</a>
              </p>
            </div>
            <div className="contact-highlight">
              <p className="give-label">Project Secretary</p>
              <h3>Mrs Gladys N. Wanyama</h3>
              <p>
                <a href="tel:+254711751437">0711 751 437</a>
                {' · '}
                <a href="mailto:gladyswahiki93@gmail.com">gladyswahiki93@gmail.com</a>
              </p>
              <p className="muted">Best contact for donors, visit requests, and contribution reports.</p>
            </div>
            <div className="contact-grid">
              {LEADERS.map((p) => (
                <ContactCard key={p.name} person={p} />
              ))}
            </div>
          </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <p>© {new Date().getFullYear()} {CHURCH.name}</p>
          <p className="muted">{CHURCH.location} · Figures from the official Payment Tracker</p>
          <p className="footer-nav">
            <a href="#home">Home</a>
            <a href="#our-story">Our story</a>
            <a href="#about">About</a>
            <a href="#tracker">Tracker</a>
            <a href="#give">Give</a>
            <a href="#contact">Contact</a>
            <a href={`${basePath}downloads/index.html`}>Download leads</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
