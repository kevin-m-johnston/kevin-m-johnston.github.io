# Marine Weather & Tides

A React/Vite/TypeScript dashboard for weather forecasts and official Canadian tide predictions. It is designed to deploy directly to GitHub Pages.

## Features

- Nanaimo, Ladysmith, Victoria, Comox, and Campbell River presets
- Current weather and wind
- 24-hour hourly forecast
- Seven-day outlook
- Official Canadian Hydrographic Service tide curve
- Upcoming high and low tide events
- Responsive mobile layout
- No API keys required

## Run locally

Install Node.js 20 or newer, open a terminal in this folder, and run:

```bash
npm install
npm run dev
```

Open the local address Vite prints, usually `http://localhost:5173`.

## Build locally

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Create an empty GitHub repository, for example `marine-weather-tides`.
2. Upload/push this entire project to the repository's `main` branch.
3. In GitHub, open **Settings → Pages**.
4. Set **Source** to **GitHub Actions**.
5. Open the **Actions** tab and wait for `Deploy to GitHub Pages` to finish.
6. The site will normally be at `https://YOUR-USERNAME.github.io/marine-weather-tides/`.

`vite.config.ts` uses `base: "./"`, so the build works under either a project subdirectory or a root GitHub Pages repository.

## Data sources

Weather data comes from the keyless Open-Meteo Forecast API.

Tide data comes from the Fisheries and Oceans Canada Integrated Water Level System API. The app downloads the station list, searches for the selected location, picks the closest matching station, and requests `wlp` and `wlp-hilo` predictions.

## Tide API troubleshooting

The tide API may occasionally have a service outage, omit one prediction series, or reject requests from a browser because of service-side CORS changes. The application handles weather and tide errors separately, so weather can still work if tides fail.

To inspect a tide error:

1. Open the deployed page.
2. Press `F12` and select **Console** or **Network**.
3. Look for requests to `api-iwls.dfo-mpo.gc.ca`.

If direct browser access stops working, the next step is a tiny serverless proxy through Cloudflare Workers, Netlify Functions, or Vercel. GitHub Pages alone cannot hide API secrets or run server code.

## Important navigation notice

This dashboard is a planning aid, not a substitute for official marine forecasts, Notices to Mariners, approved nautical charts, tide/current publications, or direct observation of local conditions.
