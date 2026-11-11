# View the PEFA Cathedral website

## Important

`http://127.0.0.1:5174` from the agent chat only works **on the cloud machine**, not on your laptop. Use the steps below on **your** computer.

## 1. Get the code

The site is on branch **`cursor/pefa-cathedral-website-4c6c`** (PR #2). On `main` it may not exist yet.

```bash
git clone https://github.com/KarenOrijin/talanta.git
cd talanta
git checkout cursor/pefa-cathedral-website-4c6c
cd pefa-cathedral
```

## 2. Requirements

- **Node.js 18 or newer** — check: `node -v`

## 3. Run locally (pick one)

### Option A — Dev server (live reload)

```bash
npm install
npm run dev
```

Open in browser: **http://127.0.0.1:5173/** (not 5174)

### Option B — Production build + preview (if dev fails)

```bash
npm install
npm run start
```

Open: **http://127.0.0.1:4173/**

### Option C — Simple static server (no Vite)

```bash
npm install
npm run build
cd dist
python3 -m http.server 8080
```

Open: **http://127.0.0.1:8080/**

On Windows without Python, use [npx serve dist](https://www.npmjs.com/package/serve):

```bash
npx --yes serve dist -l 8080
```

## 4. Live link (no localhost)

- In Cursor agent chat: **Publish** → app **pefa-cathedral-webuye** → **Public**
- Or after PR merge + GitHub Pages enabled:  
  **https://karenorijin.github.io/talanta/** (workflow in repo)

## Troubleshooting

| Problem | Fix |
|--------|-----|
| `ENOENT` / no `pefa-cathedral` folder | Checkout branch `cursor/pefa-cathedral-website-4c6c` |
| `command not found: npm` | Install Node from https://nodejs.org |
| Port in use | `npm run dev -- --port 3000` then open that port |
| Blank page | Hard refresh; check browser console |
| Tracker empty | Run `python3 scripts/export_tracker.py` then refresh |
