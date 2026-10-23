# Reelio

A full-stack movie and TV series browsing site with a dark, modern streaming-platform design. Built with React and Express, with no accounts or login. The watchlist is stored locally in the browser.

## Status

In active development. Built step by step.

- [x] Project setup (Vite + Express)
- [x] Theme, routing and navbar
- [x] Title cards, grids, skeletons and empty states
- [ ] Backend API service layer
- [ ] Home, Movies, Series and Genres pages
- [ ] Detail pages
- [ ] Search
- [ ] Watchlist (localStorage)
- [ ] Series seasons and episodes
- [ ] Player
- [ ] Mobile polish

## Tech stack

**Client:** Vite, React, react-router-dom, styled-components

**Server:** Node.js, Express (ES modules), axios, cors, dotenv, node-cache

## Project structure

```
movie-site/
├── client/    React app
├── server/    Express API layer
└── package.json
```

The React app never talks to the external API directly. The Express server sits in between, fetches and caches data, and normalizes it into one consistent shape for the frontend.

## Getting started

Requires Node.js 18.11 or newer.

Install dependencies:

```bash
npm install
cd client && npm install
cd ../server && npm install
```

Create `server/.env` by copying `server/.env.example` and fill in the values:

```
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
API_BASE_URL=
API_KEY=
```

Run the backend and frontend in two separate terminals from the project root:

```bash
npm run server
```

```bash
npm run client
```

Or both at once:

```bash
npm run dev
```

The site runs at http://localhost:5173 and the API at http://localhost:5000.

## Notes

- `server/.env` is git-ignored. Never commit real keys.
- The Vite dev server proxies `/api` requests to the backend.
