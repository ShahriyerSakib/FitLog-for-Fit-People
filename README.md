# FitLog — Workout Library

A responsive Next.js App Router workout library and daily training log built for the Programming Hero FitLog assignment.

## Technologies
- Next.js + React + TypeScript
- App Router
- Tailwind CSS
- Lucide React icons
- Sonner toast notifications
- REST API integration
- localStorage persistence

## Features
1. Responsive workout library with API data.
2. Workout detail pages with specs and instructions.
3. Today's Plan with a five-lift cap and live metrics.
4. Saved workouts with localStorage persistence.
5. Mark as Done, remove, and toast feedback.
6. Duration / calories / rating sorting and search.
7. Responsive navbar counters and 404 page.
8. Deployment-friendly App Router structure.

## API
- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

## Run locally
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production
```bash
npm run build
npm start
```

Do not commit `node_modules` or `.next`. The project is intentionally packaged without generated dependencies/build output so GitHub and Netlify can install and build it cleanly.

## Suggested Git commit sequence
1. `chore: initialize nextjs project`
2. `feat: add global layout and navigation`
3. `feat: add workout library api integration`
4. `feat: add workout detail page`
5. `feat: add plan and saved state`
6. `feat: add my plan metrics and actions`
7. `feat: add responsive styling and loading states`
8. `docs: add project readme and deployment notes`
