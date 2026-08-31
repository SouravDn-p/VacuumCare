# Git / GitHub security — VacuumCare incident

This note documents a real compromise of this project and the GitHub account that owns it. Treat it as an incident-response checklist, not optional reading.

**Do not run `npm install`, `npm run dev`, `next build`, or `eslint` in any repo that still contains the payload.** Those commands load config files and execute the malware.

---

## What happened

In August 2026, obfuscated JavaScript was injected into build/config files and pushed to GitHub using the last legitimate commit (same author, message, and timestamp). It looked like “automatic commits from a script.” That is expected: the attacker rewrote history instead of adding a new commit.

### Infected files

| Project | File | Role |
|---------|------|------|
| Frontend (`VacuumCare`) | `postcss.config.mjs` | Runs when Next.js / PostCSS builds |
| Backend (`VacuumCare-Server`) | `eslint.config.mjs` | Runs when ESLint / Nest lint runs |

How to spot it:

- After `export default …` there is a long run of spaces, then code starting with `global.i = 'A8-649-1'`.
- The malware also adds `import { createRequire } from 'module'` so it can `require()` inside an ESM config. Legitimate `postcss.config.mjs` in this repo does **not** need that import.

Campaign: **NullReceiver / EtherHiding** (same family as PolinRider / Contagious Interview). Typical entry: a malicious or typosquat npm package (`postcss-initial-provider`, `postcss-theme-provider`, `post-css-transfer`, fake Tailwind helpers) or an already-infected clone.

Other public repos under `SouravDn-p` were listed in a [March 2026 OpenSourceMalware report](https://opensourcemalware.com/blog/polinrider-dprk-compromised-hundreds-of-github-repos). Scan **every** GitHub repo, not only VacuumCare.

---

## How the auto-commit script works

On a compromised Windows machine the second stage often drops `temp_auto_push.bat` (sometimes `tempautopush.bat`). It:

1. Reads the **last commit**: date, time, message, author name, author email, current branch.
2. Sets the Windows clock back to that commit’s timestamp.
3. Sets local `user.name` / `user.email` to match the original author.
4. `git add .` then `git commit --amend -m "<original message>" --no-verify`.
5. Restores the real clock.
6. `git push -uf origin <branch> --no-verify` (force-push, skip hooks).

GitHub still shows your last message (for example “fixing build error”). The payload is inside that rewritten commit. A simple `git revert` of “the last commit” can leave the malware in place.

---

## What the payload does at runtime

When Node loads the infected config:

1. It queries public Ethereum RPCs for the latest transaction from attacker wallet `0xa322E5f3…1063e1a`.
2. It decodes the transaction `to` address into two IPv4 C2 servers (blockchain dead-drop so the C2 IP can change without editing the file).
3. It downloads an XOR-encrypted second stage from `http://<ip>:443/0x/cls` and `/0x/ls`.
4. It runs that code with `eval()` and `spawn('node', ['-e', …], { detached: true, windowsHide: true })`.

The second stage typically steals GitHub tokens, npm tokens, `.env` files, SSH keys, browser/crypto data, then infects other local git repos and force-pushes.

Backend GitHub Actions (`VacuumCare-Server/.github/workflows/deploy.yml`) uses secrets `DOCKERHUB_TOKEN`, `EC2_SSH_KEY`, and `EC2_HOST`. If that workflow ran while the infected file was in the tree, treat those secrets as stolen. The EC2 host may also be compromised.

---

## Immediate response (do this in order)

Do GitHub and secret rotation from a **clean device** (phone or another PC), not the infected Windows machine, until it is rebuilt.

### 1. Lock GitHub

- Change the GitHub password.
- Enable 2FA (authenticator app, not SMS).
- Sign out all other sessions (Settings → Sessions).
- Delete every SSH key; add new keys later from a clean machine.
- Revoke all personal access tokens (classic and fine-grained).
- Revoke unknown OAuth apps and GitHub Apps.
- Confirm no extra emails were added to the account.

### 2. Rotate secrets

Rotate anything this PC, Cursor/VS Code, or GitHub Actions could have seen:

- Repo secrets on VacuumCare-Server: `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`, `EC2_SSH_KEY`, `EC2_HOST`
- Docker Hub password / token
- EC2 SSH key: new key pair, replace `authorized_keys`, disable the old key
- App `.env`: database, JWT, Stripe, Cloudinary, SMTP, etc.
- npm token if you have one
- Any API keys stored in the editor

If the backend deployed after infection, consider rebuilding the EC2 instance.

### 3. Clean the source (do not only revert)

Rewrite the config files to clean content, then commit and push a **new** commit. Do not rely on reverting the last message.

Clean frontend `postcss.config.mjs`:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

Backend `eslint.config.mjs`: remove `createRequire` and everything after the closing `);` of `tseslint.config(...)`.

Scan every local clone and every GitHub repo:

```bash
rg -l "A8-649-1|rmcej%otb%|_0x3d50aa" --glob "*.mjs" --glob "*.js"
```

GitHub search: `user:SouravDn-p A8-649-1`

Search for leftover `temp_auto_push.bat` / `tempautopush.bat` in repos and in `%TEMP%`.

### 4. Clean this machine

- Uninstall unknown VS Code / Cursor extensions.
- Delete `node_modules` in every project; do not reuse them.
- After source is clean, reinstall with `npm ci --ignore-scripts` until the tree is trusted.
- Check Task Scheduler and Startup for unexpected `node` processes.
- Run a full malware scan. If this PC held GitHub tokens, wallets, or production keys, a Windows reset is the safer option.

---

## Lock GitHub going forward

- Protect `main`: required pull requests, no force-push except during a documented incident cleanup.
- Enable GitHub secret scanning and push protection.
- Use fine-grained PATs with short expiry. Do not put classic `repo` tokens in env files.
- Prefer signed commits (`git commit -S`).
- Pin npm versions. Review `postinstall` scripts. Do not install random PostCSS/Tailwind helpers.
- In CI, prefer `npm ci --ignore-scripts` unless a script is required and reviewed.
- Never skip hooks (`--no-verify`) on `main` unless you are doing this cleanup.

---

## Detection signatures

Flag any of these in JS/MJS config files:

- `global.i = 'A8-649-1'`
- `_0x3d50aa` / `_0x4540` obfuscation next to `export default`
- `rmcej%otb%` (older PolinRider variant)
- Unexpected `createRequire` in `postcss.config.mjs` or `eslint.config.mjs`
- `temp_auto_push.bat`

Audit these filenames on every clone:

- `postcss.config.mjs` / `postcss.config.js`
- `eslint.config.mjs`
- `tailwind.config.js`
- `next.config.ts` / `next.config.mjs`
- `vite.config.js` / `vite.config.mjs`

---

## Status (this workspace)

| Location | Status |
|----------|--------|
| `VacuumCare/postcss.config.mjs` (local) | Cleaned — payload removed |
| `VacuumCare-Server/eslint.config.mjs` (local) | Still infected until cleaned |
| GitHub `main` on both remotes | Recheck after push; GitHub may still have the old rewritten commit until a clean commit is pushed |

After the backend file is cleaned, push both remotes and re-run the `rg` / GitHub searches above. Keep this file in the frontend so the incident and the hardening steps stay with the repo.
