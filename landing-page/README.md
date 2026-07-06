Doctiq — GitHub Pages build notes

This repository is configured to build a static site suitable for GitHub Pages.

What I changed
- Added `index.html` that mounts a client entry at `/src/main.tsx`.
- Added a minimal client bootstrap `src/main.tsx` that tries to start the TanStack Start client and falls back to a basic render.
- Updated `vite.config.ts` to use a relative `base: './'` and to output the build into the `docs/` folder.

How to build and publish

1. Install deps and build (your project uses npm/yarn/bun — adapt accordingly):

```bash
npm install
npm run build
```

2. After a successful build the generated static site will be in `docs/`.

3. In your GitHub repository settings, enable GitHub Pages and set the publishing source to the `docs/` folder on the main branch. GitHub will serve the files from `docs/index.html`.

Notes and caveats
- The project uses `@lovable.dev/vite-tanstack-config` and `@tanstack/react-start`. I added a conservative client bootstrap that attempts the TanStack Start client API first and falls back to a minimal static render if the API isn't available at runtime. If your app relies on advanced SSR hydration from TanStack Start, you may need to replace the fallback with the exact client bootstrap pattern used by your version of the library (for example, calling `startInstance.start()` or `startInstance.startClient()` with proper options).
- If you prefer deploying to the `gh-pages` branch instead of `docs/`, I can add a `deploy` script using the `gh-pages` package.
