
# Counter — State Management Practice

This small React + Vite project contains two variations of a simple counter app used for practising state management patterns:

- jotai branch — a version that uses Jotai atoms for state management
- redux branch — an alternate version that uses Redux (classic or Redux Toolkit) for the same UI and behavior

Both branches live in the same repository so you can switch between them to compare approaches and learn differences in wiring, component design and patterns.

## Purpose

This project was created to practise and compare how local/global state is handled with different libraries in React. The UI is intentionally small (a counter with increment/decrement controls and optional derived renders) so the focus stays on state architecture.

## Requirements

- Node.js (v16+ recommended)
- npm (or yarn/pnpm)

## Install & run (powerShell)

Install dependencies and start the dev server in the currently checked-out branch:

```powershell
# install deps (run once after switching branch)
npm install

# start dev server
npm run dev
```

Open http://localhost:5173 (or the URL printed by Vite) to see the app.

## Switching branches

The repository includes two branches. From the project root run:

```powershell
# switch to the jotai branch
git checkout jotai

# switch to the redux branch
git checkout redux
```

After switching branches run `npm install` if dependencies changed, then `npm run dev`.

## What to compare between branches

- Files that define the store (atoms vs reducers/slices)
- How components subscribe to state (hooks like `useAtom` vs `useSelector`/`useDispatch`)
- How derived values and selectors are implemented
- How updates and async flows are handled (if present)

## Notes and learning tips

- Keeping the UI small — the goal is to compare state management approaches, not UI complexity.
- Look for where state is created vs where it's consumed to understand coupling and testability.
- Try implementing a small derived state (e.g., doubled counter or isEven flag) in both branches to feel the ergonomics.

## Scripts (from package.json)

- `npm run dev` — start Vite dev server
- `npm run build` — build for production
- `npm run preview` — preview built app
- `npm run lint` — run ESLint

## Troubleshooting

- If the dev server doesn't start, check the console for missing dependency errors and run `npm install`.
- If you switch branches and the node_modules layout changes, delete `node_modules` and `package-lock.json` and run `npm install` again.

## Where to go next

- Add a new feature (persist counter to localStorage) and implement it in both branches.
- Add unit tests for the store logic (atoms/selectors or reducers).

---
