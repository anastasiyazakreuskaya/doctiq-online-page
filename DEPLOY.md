Repo deploy notes — npm standardization

Policy
- Use npm as the canonical package manager for this repository.
- Do not use Bun or other package managers. If `bun.lock` exists, remove it and regenerate `package-lock.json` with npm.

Local developer steps (landing-page)
1. Ensure Node 20 (recommended):
   - nvm install 20 && nvm use 20
2. Clean and install:
   ```bash
   cd landing-page
   rm -rf node_modules package-lock.json
   rm -f bun.lock
   npm cache clean --force
   npm install
   npm run build
   ```
3. Commit lockfile:
   ```bash
   git add package-lock.json
   git commit -m "chore: add landing-page package-lock.json"
   git push
   ```

Local developer steps (simulation)
1. Ensure Node 20
2. Run:
   ```bash
   cd simulation
   npm ci
   npm run build
   ```

CI notes
- Workflow uses Node 20 and will run `npm ci` when `package-lock.json` is present; otherwise it will run `npm install`.
- This ensures deterministic installs when lockfiles are checked in.

If you hit native-binding errors (e.g. rolldown or rollup native bindings):
- Try cleaning node_modules + reinstall (see above).
- As a temporary workaround, you can run `npm install --no-optional` to avoid native optional bindings, but committing a correct lockfile for the CI platform is preferred.

If you want, I can prepare a small script to preview the combined `public/` locally.
