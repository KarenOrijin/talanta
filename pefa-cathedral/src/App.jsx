import { useCallback, useEffect, useMemo, useState } from 'react';
import seedTracker from './data/tracker.json';
import { CHURCH, GIVING, LEADERS } from './config/giving';

const PAGES = ['home', 'our-story', 'about', 'tracker', 'give', 'contact'];

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

function pageFromHash() {
  const raw = window.location.hash.replace('#', '').toLowerCase();
  const aliases = { story: 'our-story', '': 'home' };
  const p = aliases[raw] ?? raw;
  return PAGES.includes(p) ? p : 'home';
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

function NavLink({ page, current, children, className = '' }) {
  const go = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('pefa-navigate', { detail: page }));
  };
  const active = current === page ? ' active' : '';
  return (
    <a href={`#${page}`} className={`${className}${active}`} onClick={go}>
      {children}
    </a>
  );
}

const basePath = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

export default function App() {
  const [page, setPage] = useState(pageFromHash);
  const [data, setData] = useState(seedTracker);
  const [filter, setFilter] = useState('all');

  const navigate = useCallback((next) => {
    const p = PAGES.includes(next) ? next : 'home';
    setPage(p);
    if (window.location.hash !== `#${p}`) {
      window.history.pushState(null, '', `#${p}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onHash = () => setPage(pageFromHash());
    const onNav = (e) => navigate(e.detail);
    window.addEventListener('hashchange', onHash);
    window.addEventListener('pefa-navigate', onNav);
    onHash();
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('pefa-navigate', onNav);
    };
  }, [navigate]);

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
        <button type="button" className="brand-btn" onClick={() => navigate('home')}>
          <div className="brand">{CHURCH.name}</div>
          <p className="brand-sub">{CHURCH.location}</p>
        </button>
        <nav className="nav" aria-label="Main">
          <NavLink page="home" current={page}>Home</NavLink>
          <NavLink page="our-story" current={page}>Our story</NavLink>
          <NavLink page="about" current={page}>About</NavLink>
          <NavLink page="tracker" current={page}>Tracker</NavLink>
          <NavLink page="contact" current={page}>Contact</NavLink>
          <NavLink page="give" current={page} className="nav-cta">Give</NavLink>
        </nav>
      </header>

      <main className="main-content" key={page}>
        {page === 'home' && (
          <section className="hero page-panel">
            <div className="hero-inner">
              <p className="eyebrow">Cathedral Coach Project · {CHURCH.denomination}</p>
              <h1>A ministry coach for Webuye and beyond</h1>
              <p className="hero-lead">
                We are purchasing a coach to carry our congregation, choir, youth, and mission teams to services,
                outreach, and community events across Bungoma County. The vehicle costs {formatKsh(coachCost)}. Our members
                have already given {formatKsh(raised)} with every shilling recorded on our live tracker. We invite partners
                to help us complete what our church has begun.
              </p>
              <div className="hero-coach-points">
                <ul>
                  <li>Safe transport for elders, children, and rural members</li>
                  <li>Outreach beyond the cathedral walls</li>
                  <li>Official receipts, committee oversight, honour roll for partners</li>
                </ul>
              </div>
              <div className="hero-actions">
                <button type="button" className="btn btn-gold" onClick={() => navigate('give')}>Support the coach</button>
                <button type="button" className="btn btn-ghost" onClick={() => navigate('tracker')}>See live progress</button>
              </div>
              {summary && (
                <div className="hero-stats">
                  <div><span className="stat-val">{formatKsh(coachCost)}</span><span className="stat-lbl">coach goal</span></div>
                  <div><span className="stat-val">{formatKsh(summary.raisedKsh)}</span><span className="stat-lbl">raised so far</span></div>
                  <div><span className="stat-val">{summary.membersPaying}</span><span className="stat-lbl">members giving</span></div>
                </div>
              )}
            </div>
          </section>
        )}

        {page === 'our-story' && (
          <section className="section page-section story-page page-panel">
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
                  We learned to give, to wait, and to trust. We learned accountability because every gift mattered. That same
                  spirit now drives the coach project: members organised first, gave first, and opened the books for the
                  committee to see.
                </p>
                <p>
                  Having built a house of worship, we are ready for the next step. We want to take the church to the people.
                  The coach is not a luxury. It is how we serve Webuye beyond our four walls.
                </p>
                <h3 className="subhead">What members have done for the coach</h3>
                <ul className="pillars">
                  <li>Since May 2026, {summary?.membersOrganized ?? 182} members in {summary?.groupsActive ?? 14} groups pledged KSh 4.3 million</li>
                  <li>{summary?.membersPaying ?? 133} members have given {formatKsh(summary?.raisedKsh ?? 1_309_820)} Sunday after Sunday</li>
                  <li>Digital payment tracker updated weekly for full transparency</li>
                </ul>
                <button type="button" className="text-link btn-link" onClick={() => navigate('about')}>About our church</button>
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
        )}

        {page === 'about' && (
          <section className="section page-section about-page page-panel">
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
        )}

        {page === 'tracker' && (
          <section className="section tracker page-section page-panel">
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
        )}

        {page === 'give' && (
          <section className="section give page-section page-panel">
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
                  Questions?{' '}
                  <button type="button" className="btn-link inline" onClick={() => navigate('contact')}>Contact the project secretary</button>
                  {' '}or email <a href={`mailto:${CHURCH.emailAccounts}`}>{CHURCH.emailAccounts}</a>.
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
        )}

        {page === 'contact' && (
          <section className="section page-section contact-page page-panel">
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
        )}
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <p>© {new Date().getFullYear()} {CHURCH.name}</p>
          <p className="muted">{CHURCH.location} · Figures from the official Payment Tracker</p>
          <p className="footer-nav">
            <NavLink page="home" current={page}>Home</NavLink>
            <NavLink page="our-story" current={page}>Our story</NavLink>
            <NavLink page="about" current={page}>About</NavLink>
            <NavLink page="give" current={page}>Give</NavLink>
            <NavLink page="contact" current={page}>Contact</NavLink>
          </p>
        </div>
      </footer>
    </div>
  );
}
