export const SECTORS = [
  { n: 'Renewable Energy', v: 1820, c: '#1D9E75' },
  { n: 'Climate Adaptation', v: 640, c: '#378ADD' },
  { n: 'Forests & Land', v: 480, c: '#639922' },
  { n: 'Water & WASH', v: 340, c: '#5DCAA5' },
  { n: 'Urban Resilience', v: 280, c: '#EF9F27' },
  { n: 'Blue Carbon', v: 160, c: '#534AB7' },
  { n: 'Agriculture', v: 100, c: '#D85A30' },
];

export const DONORS = [
  { n: 'Green Climate Fund', abbr: 'GCF', c: '#1D9E75', v: 1420, pct: 30 },
  { n: 'African Dev. Bank', abbr: 'AfDB', c: '#378ADD', v: 980, pct: 20 },
  { n: 'World Bank / IDA', abbr: 'WB', c: '#639922', v: 820, pct: 17 },
  { n: 'European Union', abbr: 'EU', c: '#534AB7', v: 620, pct: 13 },
  { n: 'USAID', abbr: 'US', c: '#EF9F27', v: 480, pct: 10 },
  { n: 'UK FCDO', abbr: 'UK', c: '#D85A30', v: 280, pct: 6 },
  { n: 'Germany GIZ', abbr: 'DE', c: '#5DCAA5', v: 220, pct: 4 },
];

export const PROJECTS = [
  { id: 'GCF/FP/201', title: 'Kenya Geothermal Expansion', country: 'Kenya', donor: 'GCF', sector: 'Renewable Energy', amt: '$380M', prog: 68, status: 'active' },
  { id: 'AFDB/CLI/088', title: 'Nigeria Solar Mini-Grids', country: 'Nigeria', donor: 'AfDB', sector: 'Renewable Energy', amt: '$240M', prog: 45, status: 'delayed' },
  { id: 'WB/P174892', title: 'Rwanda WASH & Resilience', country: 'Rwanda', donor: 'World Bank', sector: 'Water & WASH', amt: '$120M', prog: 82, status: 'active' },
  { id: 'EU/NDICI/044', title: 'Ghana Irrigation Climate', country: 'Ghana', donor: 'EU', sector: 'Agriculture', amt: '$85M', prog: 31, status: 'review' },
  { id: 'GCF/FP/188', title: 'Senegal Blue Carbon MRV', country: 'Senegal', donor: 'GCF', sector: 'Blue Carbon', amt: '$64M', prog: 55, status: 'active' },
  { id: 'AFDB/FOR/022', title: 'DRC Forest Protection', country: 'DRC', donor: 'AfDB', sector: 'Forests & Land', amt: '$200M', prog: 20, status: 'active' },
  { id: 'UK/BEIS/031', title: 'Ethiopia Solar Irrigation', country: 'Ethiopia', donor: 'UK FCDO', sector: 'Agriculture', amt: '$48M', prog: 90, status: 'completed' },
  { id: 'GIZ/CF/017', title: 'Tanzania Urban Flood Risk', country: 'Tanzania', donor: 'GIZ', sector: 'Urban Resilience', amt: '$32M', prog: 60, status: 'active' },
  { id: 'WB/P182441', title: 'Mozambique Cyclone Adapt.', country: 'Mozambique', donor: 'World Bank', sector: 'Climate Adaptation', amt: '$160M', prog: 38, status: 'active' },
  { id: 'GCF/FP/209', title: 'Zambia Energy Storage', country: 'Zambia', donor: 'GCF', sector: 'Renewable Energy', amt: '$95M', prog: 12, status: 'review' },
];

export const FEED = [
  { icon: '💸', bg: '#E1F5EE', title: 'Disbursement approved — $18.2M', meta: 'Nigeria Solar Mini-Grids · AFDB/CLI/088 · 2 hours ago', amt: '$18.2M' },
  { icon: '📋', bg: '#EAF3FB', title: 'Q1 2024 report submitted', meta: 'Rwanda WASH & Resilience · WB/P174892 · 5 hours ago', amt: null },
  { icon: '⚠', bg: '#FDF3E3', title: 'Risk flag raised — overdue 47 days', meta: 'GCF/FP/201 Kenya Geothermal · 1 day ago', amt: null },
  { icon: '✅', bg: '#EAF3DE', title: 'Impact data verified — 18.4Mt CO₂', meta: 'Satellite + ground verification · 2 days ago', amt: null },
  { icon: '🔗', bg: '#EEEDFE', title: 'IATI sync complete — 14 activities', meta: 'Published to iatiregistry.org · 3 days ago', amt: null },
];

export const COUNTRIES = [
  { name: 'Kenya', top: '42%', left: '66%', size: 'large', amt: '$820M' },
  { name: 'Nigeria', top: '28%', left: '48%', size: 'large', amt: '$640M' },
  { name: 'Rwanda', top: '46%', left: '63%', size: '', amt: '$320M' },
  { name: 'Ghana', top: '32%', left: '43%', size: '', amt: '$280M' },
  { name: 'Senegal', top: '24%', left: '38%', size: '', amt: '$240M' },
  { name: 'Ethiopia', top: '30%', left: '68%', size: '', amt: '$380M' },
  { name: 'DRC', top: '48%', left: '57%', size: '', amt: '$440M' },
  { name: 'Tanzania', top: '50%', left: '66%', size: '', amt: '$260M' },
];

export const SDGS = [
  { n: 'SDG 7', lbl: 'Clean Energy', c: '#EF9F27' },
  { n: 'SDG 13', lbl: 'Climate Action', c: '#1D9E75' },
  { n: 'SDG 6', lbl: 'Clean Water', c: '#378ADD' },
  { n: 'SDG 15', lbl: 'Life on Land', c: '#639922' },
  { n: 'SDG 5', lbl: 'Gender Equity', c: '#D4537E' },
  { n: 'SDG 1', lbl: 'No Poverty', c: '#534AB7' },
  { n: 'SDG 11', lbl: 'Sustainable Cities', c: '#D85A30' },
];

export const VERIFS = [
  { score: '94%', scoreC: 'var(--green)', type: 'Satellite', badge: 'badge-green', title: 'DRC Forest Protection — deforestation check', meta: 'No land-use change detected in project polygon · 16-day cycle · last run May 30' },
  { score: '81%', scoreC: 'var(--green)', type: 'AI Audit', badge: 'badge-blue', title: 'Kenya Geothermal — financial report validation', meta: 'Expenditure patterns consistent · minor data gaps flagged · auto-resolved' },
  { score: '62%', scoreC: 'var(--amber)', type: 'MRV', badge: 'badge-amber', title: 'Senegal Blue Carbon — carbon credit claim', meta: 'Partially verified · field measurement data pending · 3rd party audit scheduled' },
  { score: '37%', scoreC: 'var(--red)', type: 'Flagged', badge: 'badge-red', title: 'Nigeria Solar — disbursement vs. output inconsistency', meta: 'MW installed does not match disbursed amount · escalated to donor · review open' },
];

export const RISK_FLAGS = [
  { sev: 'HIGH', sevC: 'badge-red', proj: 'GCF/FP/201 — Kenya Geothermal', issue: 'Disbursement overdue 47 days — $8.4M tranche unreleased', action: 'Escalate' },
  { sev: 'HIGH', sevC: 'badge-red', proj: 'AFDB/CLI/088 — Nigeria Solar', issue: 'Q4 2023 report not submitted — 6-month gap in IATI data', action: 'Request report' },
  { sev: 'HIGH', sevC: 'badge-red', proj: 'EU/NDICI/044 — Ghana Irrigation', issue: 'Scope change not verified — satellite data contradicts project claims', action: 'Flag for audit' },
  { sev: 'MED', sevC: 'badge-amber', proj: 'GCF/FP/209 — Zambia Energy Storage', issue: 'Procurement delays — 90-day extension requested', action: 'Review' },
  { sev: 'MED', sevC: 'badge-amber', proj: 'WB/P182441 — Mozambique Cyclone', issue: 'Beneficiary data gender disaggregation missing', action: 'Request data' },
];

export const NDC_TARGETS = [
  { lbl: 'CO₂ reduction', cur: 18.4, tgt: 30, unit: 'Mt', pct: 61 },
  { lbl: 'Renewable capacity', cur: 2.8, tgt: 5, unit: 'GW', pct: 56 },
  { lbl: 'Adaptation coverage', cur: 6.2, tgt: 15, unit: 'M people', pct: 41 },
  { lbl: 'Forest protection', cur: 180, tgt: 500, unit: 'K ha', pct: 36 },
  { lbl: 'Clean water access', cur: 1.4, tgt: 3, unit: 'M people', pct: 47 },
];

export const FUND_OPPS = [
  { name: 'GCF Readiness Programme', amt: 'Up to $3M', deadline: 'Jul 15 2025', match: 96, badge: 'badge-green' },
  { name: 'AfDB Sustainable Energy Fund', amt: '$10M–$200M', deadline: 'Aug 1 2025', match: 89, badge: 'badge-green' },
  { name: 'EU Global Gateway — Africa', amt: '€50M–€500M', deadline: 'Sep 30 2025', match: 74, badge: 'badge-blue' },
  { name: 'USAID Power Africa', amt: '$5M–$50M', deadline: 'Oct 15 2025', match: 68, badge: 'badge-blue' },
  { name: 'UK BII Climate Finance', amt: '$20M–$100M', deadline: 'Dec 1 2025', match: 55, badge: 'badge-amber' },
];

export const COMPLIANCE_DONORS = [
  { name: 'GCF', pct: 98, c: '#1D9E75' },
  { name: 'AfDB', pct: 91, c: '#378ADD' },
  { name: 'World Bank', pct: 95, c: '#639922' },
  { name: 'EU NDICI', pct: 84, c: '#534AB7' },
  { name: 'USAID', pct: 76, c: '#EF9F27' },
  { name: 'UK FCDO', pct: 88, c: '#D85A30' },
  { name: 'GIZ', pct: 79, c: '#5DCAA5' },
  { name: 'AFD France', pct: 62, c: '#D4537E' },
];

export const GOV_ACTIONS = [
  { icon: '📊', bg: 'var(--green-light)', col: 'var(--green-dark)', title: 'Submit national NDC progress report', hint: 'Due June 30 · UNFCCC + IATI format' },
  { icon: '✅', bg: 'var(--blue-light)', col: '#1D4ED8', title: 'Approve $8.4M disbursement request', hint: 'GCF/FP/201 — Kenya Geothermal tranche 3' },
  { icon: '🔍', bg: 'var(--amber-light)', col: '#8A5700', title: 'Review risk flag — Ghana Irrigation', hint: 'Scope inconsistency · satellite evidence attached' },
  { icon: '📤', bg: 'var(--green-light)', col: 'var(--green-dark)', title: 'Publish 14 IATI activities', hint: 'Last sync 4 days ago · 22 activities pending' },
];

export const DISB_EVENTS = [
  { date: 'Apr 2024', amt: '$18.2M', proj: 'Nigeria Solar Mini-Grids', c: '#1D9E75', id: 'AFDB/CLI/088' },
  { date: 'Apr 2024', amt: '$12.4M', proj: 'Kenya Geothermal', c: '#378ADD', id: 'GCF/FP/201' },
  { date: 'Mar 2024', amt: '$7.1M', proj: 'Ghana Irrigation', c: '#EF9F27', id: 'EU/NDICI/044' },
  { date: 'Mar 2024', amt: '$3.8M', proj: 'Rwanda WASH', c: '#639922', id: 'WB/P174892' },
  { date: 'Feb 2024', amt: '$5.6M', proj: 'Senegal Blue Carbon', c: '#534AB7', id: 'GCF/FP/188' },
  { date: 'Feb 2024', amt: '$9.2M', proj: 'DRC Forest Protection', c: '#D85A30', id: 'AFDB/FOR/022' },
];

export const IMPACT_SECTORS = [
  { n: 'Renewable Energy', co2: '12.4Mt', col: '#1D9E75' },
  { n: 'Forests & Land', co2: '3.8Mt', col: '#639922' },
  { n: 'Agriculture', co2: '1.2Mt', col: '#EF9F27' },
  { n: 'Blue Carbon', co2: '0.6Mt', col: '#534AB7' },
  { n: 'Urban Resilience', co2: '0.4Mt', col: '#D85A30' },
];

export const NAV_PANELS = [
  { id: 'overview', label: 'Overview', icon: '◉', section: 'Core' },
  { id: 'flows', label: 'Finance Flows', icon: '⇄', section: 'Core' },
  { id: 'projects', label: 'Projects', icon: '◫', badge: '147', badgeClass: 'green', section: 'Core' },
  { id: 'verification', label: 'Verification & MRV', icon: '✓', section: 'Intelligence' },
  { id: 'risk', label: 'Risk Monitor', icon: '⚠', badge: '3', section: 'Intelligence' },
  { id: 'impact', label: 'Impact Tracker', icon: '◈', section: 'Intelligence' },
  { id: 'reporting', label: 'Reports & IATI', icon: '≡', section: 'Reporting' },
  { id: 'compliance', label: 'Compliance', icon: '⊡', section: 'Reporting' },
  { id: 'access', label: 'Funding Access', icon: '◎', section: 'Access' },
];

export const PANEL_TITLES = {
  overview: 'Overview / Dashboard',
  flows: 'Finance Flows / Tracking',
  projects: 'Projects / All Projects',
  verification: 'Verification & MRV / Anti-greenwashing',
  risk: 'Risk Monitor / Portfolio Risk',
  impact: 'Impact Tracker / Outcomes',
  reporting: 'Reports & IATI / Publishing',
  compliance: 'Compliance / Donor Reporting',
  access: 'Funding Access / Opportunities',
};

export const ROLE_LABELS = {
  gov: 'Government',
  donor: 'Donor / DFI',
  ngo: 'NGO / Implementer',
  investor: 'Private Investor',
};
